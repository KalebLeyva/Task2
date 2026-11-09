# Checkpoint Questions — Task 2

### 1. ¿Por qué escribimos onPress={handlePress} y no onPress={handlePress()}?
Escribir `onPress={handlePress}` pasa la referencia de la función para que React Native la ejecute únicamente cuando el usuario presione el elemento. Si escribiéramos `handlePress()`, la función se ejecutaría inmediatamente durante la fase de renderizado del componente y pasaría el valor de retorno en lugar de la función misma. Esto provocaría ejecuciones accidentales o bucles infinitos de renderizado.

### 2. ¿Cuál es la diferencia entre Button y Pressable? ¿Cuándo elegirías cada uno?
`Button` es un componente preconfigurado y básico que se renderiza con el aspecto nativo de cada plataforma y no admite estilos personalizados mediante la prop `style`. Por su parte, `Pressable` es un contenedor flexible y de bajo nivel que permite envolver cualquier elemento, aplicar estilos personalizados completos y reaccionar a estados de interacción como `pressed`. Se recomienda usar `Button` para acciones estándar y rápidas del sistema, y `Pressable` para botones personalizados con diseño propio.

### 3. ¿Qué recibe la función style de Pressable y qué retorna? Da un ejemplo.
La función `style` de `Pressable` recibe como argumento un objeto con el estado de interacción, principalmente `{ pressed: boolean }`, indicando si el usuario está tocando el botón. Esta función debe retornar un objeto de estilo o un arreglo de estilos que se aplicarán dinámicamente según esa interacción. Por ejemplo: `style={({ pressed }) => [styles.btn, pressed && styles.pressed]}`.

### 4. ¿Por qué no puedes cambiar una variable de estado directamente (isFollowing = true) y qué haces en su lugar?
No se puede mutar una variable de estado directamente porque React depende de la inmutabilidad para detectar cambios y programar el re-renderizado de la interfaz. Si se modifica la variable directamente, el valor en memoria cambia pero la interfaz de usuario no se actualiza. En su lugar, siempre se debe invocar a la función actualizadora provista por el hook, en este caso `setIsFollowing(true)`.

### 5. ¿Por qué followers no es un segundo useState? ¿Qué es un valor derivado (derived value)?
Un valor derivado es un dato que puede calcularse de manera directa e instantánea a partir del estado o de las props existentes durante la ejecución del render. Guardar `followers` en un segundo `useState` sería redundante y requeriría sincronizar dos estados manualmente con efectos, abriendo la puerta a inconsistencias de datos. Al derivarlo con `BASE_FOLLOWERS + (isFollowing ? 1 : 0)`, siempre se mantiene perfectamente sincronizado sin memoria extra.

### 6. ¿Qué significa un componente controlado (controlled input) para TextInput? ¿Cuáles dos props lo hacen controlado?
Un `TextInput` controlado significa que su valor textual no lo gestiona el árbol nativo de forma aislada, sino que está gobernado por el estado de React como la única fuente de la verdad. Las dos props que lo hacen controlado son `value`, que define y fuerza el texto actual desde el estado, y `onChangeText`, que captura lo que teclea el usuario y actualiza inmediatamente dicho estado.

### 7. ¿Por qué selectedSkills.push(skill) es incorrecto cuando selectedSkills es un estado? Escribe el código correcto.
El método `.push()` muta directamente el arreglo original existente en memoria en lugar de crear una nueva referencia, lo que impide que React detecte la modificación y no dispara el re-renderizado de la pantalla. Para agregar un elemento sin mutar, se debe crear una copia con el operador spread: `setSelectedSkills([...selectedSkills, skill])`. Para alternar el valor (quitarlo si ya existe), el código completo correcto es:
`setSelectedSkills(selectedSkills.includes(skill) ? selectedSkills.filter(s => s !== skill) : [...selectedSkills, skill]);`