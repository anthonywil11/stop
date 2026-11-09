# STOP! Online 🎉

Juego STOP/Basta multijugador para amigos, con salas privadas, 7 rondas, 7 categorías, STOP + 15 segundos, revisión por votación y puntos automáticos.

## Requisitos
- Node.js 20 o superior.

## Ejecutar
```bash
npm install
npm start
```
Abre http://localhost:3000. En el mismo ordenador puedes abrir dos pestañas, pero para probar como dos jugadores utiliza dos navegadores distintos o una ventana privada (la identidad temporal se guarda en `sessionStorage`).

## Publicar fácilmente
Todo está en **un solo servidor**: frontend, Express y Socket.IO. Importa esta carpeta en Replit o en cualquier alojamiento Node.js que admita conexiones WebSocket y ejecuta `npm install` y `npm start`. El servidor usa `process.env.PORT` automáticamente. Comparte la URL pública.

No uses un alojamiento exclusivamente estático: Socket.IO necesita un proceso Node.js activo. El plan gratuito del proveedor puede suspender la instancia y borrar las salas, porque no se usa base de datos.

## Reglas
- 2–16 jugadores, sala privada de seis caracteres, host y enlace de invitación.
- Host elige la letra, puede descartarla y configura 60/90/120 segundos o sin límite.
- Al completar siete respuestas se habilita STOP. El primer STOP bloquea las respuestas de ese jugador y deja hasta 15 segundos a los demás, sin exceder el límite de la ronda.
- En revisión se pueden impugnar palabras; más de la mitad de los otros jugadores **conectados** debe votar para invalidarlas. El host puede cerrar la revisión; también termina cuando todos los conectados pulsan «Terminé de revisar».
- Una palabra válida única = 100 puntos; compartida con una persona = 50; compartida con 2+ personas = 25. Vacía, letra incorrecta o impugnación aprobada = 0.
- La aplicación verifica la inicial, pero **no dispone de diccionario**: las palabras de categoría incorrecta deben impugnarse.
- Máximo siete rondas, clasificación y posibilidad de revancha.

## Limitaciones deliberadas
- Las salas y partidas viven solo en memoria: reiniciar el servidor las borra.
- Un solo proceso Node.js (no ejecutar varias réplicas sin adaptador compartido).
- Si el host se desconecta, se reasigna a otro jugador conectado.
- Las respuestas se transmiten mientras se escriben; una pérdida de conexión justo antes del STOP puede ocasionar que la última pulsación no se guarde. Comprueba la conexión antes de jugar.

## Pruebas
```bash
npm test
```
