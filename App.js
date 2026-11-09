import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Pressable,
  Button,
  Alert,
  TextInput,
} from 'react-native';

const MAX_MESSAGE = 140;
const BASE_FOLLOWERS = 1200;

const BIO =
  'Building cross-platform apps with React Native. I love clean layouts, accessible design and sharing what I learn with the community. Always exploring new tools in the mobile ecosystem, contributing to open-source libraries, and mentoring new developers who are taking their first steps in tech.';

const SKILLS = ['React Native', 'JavaScript', 'UI Design', 'Git', 'Flexbox'];

const COLORS = {
  background: '#EEF1F6',
  card: '#FFFFFF',
  text: '#1E293B',
  muted: '#64748B',
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  border: '#E2E8F0',
  online: '#22C55E',
  offline: '#94A3B8',
};

export default function App() {
  // Step 3: State for Follow
  const [isFollowing, setIsFollowing] = useState(false);

  // Step 4: State for Message Composer
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Step 5: States for Bio, Online Status, and Skills
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Step 3: Followers derived value
  const followers = BASE_FOLLOWERS + (isFollowing ? 1 : 0);

  const STATS = [
    { label: 'Projects', value: '24' },
    { label: 'Followers', value: followers.toLocaleString() },
    { label: 'Following', value: '180' },
  ];

  // Handlers
  const handleFollowPress = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMessagePress = () => {
    setIsComposerOpen(!isComposerOpen);
  };

  const handleSharePress = () => {
    Alert.alert('Share Profile', 'Sharing link copied to clipboard!');
  };

  const handleSendPress = () => {
    Alert.alert('Message sent', message);
    setMessage('');
    setIsComposerOpen(false);
  };

  const handleSkillPress = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((item) => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const isSendDisabled = message.trim().length === 0;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        {/* Banner */}
        <Image
          source={require('./assets/banner.png')}
          style={styles.banner}
          resizeMode="cover"
        />

        <View style={styles.content}>
          {/* Header Row: Avatar & Info */}
          <View style={styles.headerRow}>
            {/* Step 5: Avatar toggles online status */}
            <Pressable
              style={({ pressed }) => [
                styles.avatarWrapper,
                pressed && styles.pressed,
              ]}
              onPress={() => setIsOnline(!isOnline)}
            >
              <Image
                source={require('./assets/avatar.png')}
                style={styles.avatar}
              />
              <View
                style={[
                  styles.onlineBadge,
                  !isOnline && styles.offlineBadge,
                ]}
              />
            </Pressable>

            <View style={styles.headerTexts}>
              <Text style={styles.name}>Alex Rivera</Text>
              <Text style={styles.role}>Mobile Developer</Text>
              <Text style={styles.location}>Lisbon, Portugal</Text>
            </View>
          </View>

          {/* Step 5: Expandable Bio */}
          <Text
            style={styles.bio}
            numberOfLines={isBioExpanded ? undefined : 3}
          >
            {BIO}
          </Text>
          <Pressable onPress={() => setIsBioExpanded(!isBioExpanded)}>
            <Text style={styles.link}>
              {isBioExpanded ? 'Show less' : 'Read more'}
            </Text>
          </Pressable>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            {STATS.map((stat, index) => (
              <View
                key={stat.label}
                style={[
                  styles.stat,
                  index < STATS.length - 1 && styles.statDivider,
                ]}
              >
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Step 5: Selectable Skills */}
          <View style={styles.skillsContainer}>
            {SKILLS.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <Pressable
                  key={skill}
                  style={({ pressed }) => [
                    styles.tag,
                    isSelected && styles.tagSelected,
                    pressed && styles.pressed,
                  ]}
                  onPress={() => handleSkillPress(skill)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      isSelected && styles.tagTextSelected,
                    ]}
                  >
                    {skill}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.hint}>
            Tap a skill to select it · {selectedSkills.length} selected
          </Text>

          {/* Step 1, 2, 3: Action Buttons */}
          <View style={styles.actionsRow}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                isFollowing ? styles.buttonFollowing : styles.followButton,
                pressed && styles.pressed,
              ]}
              onPress={handleFollowPress}
            >
              <Text
                style={
                  isFollowing
                    ? styles.followingButtonText
                    : styles.followButtonText
                }
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.messageButton,
                pressed && styles.pressed,
              ]}
              onPress={handleMessagePress}
            >
              <Text style={styles.messageButtonText}>
                {isComposerOpen ? 'Close' : 'Message'}
              </Text>
            </Pressable>
          </View>

          {/* Step 4: Controlled Message Composer */}
          {isComposerOpen && (
            <View style={styles.composer}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={(newText) => setMessage(newText)}
                maxLength={MAX_MESSAGE}
                placeholder="Write a message..."
                placeholderTextColor={COLORS.muted}
              />
              <View style={styles.composerFooter}>
                <Text style={styles.counter}>
                  {message.length}/{MAX_MESSAGE} characters
                </Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.sendButton,
                    isSendDisabled && styles.sendButtonDisabled,
                    pressed && !isSendDisabled && styles.pressed,
                  ]}
                  disabled={isSendDisabled}
                  onPress={handleSendPress}
                >
                  <Text style={styles.sendText}>Send</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Step 1: Core Button for Share */}
          <View style={styles.shareWrapper}>
            <Button
              title="Share profile"
              color={COLORS.primary}
              onPress={handleSharePress}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.text,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  banner: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
  },
  avatarWrapper: {
    position: 'relative',
    width: 96,
    height: 96,
    marginTop: -48,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: COLORS.card,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.card,
  },
  headerTexts: {
    flex: 1,
    marginLeft: 16,
    marginTop: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  role: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.text,
    marginTop: 16,
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statDivider: {
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  tagText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButton: {
    backgroundColor: COLORS.primary,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  followingButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  messageButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
  },
  messageButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Task 2 specific styles
  buttonFollowing: {
    backgroundColor: COLORS.primaryLight,
  },
  composer: {
    marginTop: 16,
  },
  composerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  counter: {
    fontSize: 12,
    color: COLORS.muted,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.muted,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  link: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  offlineBadge: {
    backgroundColor: COLORS.offline,
  },
  pressed: {
    opacity: 0.6,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shareWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
  tagSelected: {
    backgroundColor: COLORS.primary,
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
});