# Prototipo: Malo Bank en PixiJS

Prueba chica para ver cómo quedaría el juego con un motor de render WebGL (PixiJS v8)
en vez de Canvas 2D. **No reemplaza al juego**: vive aparte en `/prototipo/`.

- Un personaje (El CEO) armado como rig de piezas con animación esqueletal (puño, patada, caminar, victoria).
- Un escenario (Torre Malo Bank de noche) con 10 capas de parallax, luces aditivas, lluvia, reflejos y desenfoque de primer plano.
- Saco de práctica con golpe, hitstop, temblor de cámara y partículas.
- "Modo pixel": el mismo arte dibujado a 480×270 sin suavizado.
- `pixi.min.js` es PixiJS 8.6.6 (licencia MIT) copiado acá para que funcione sin CDN.

Controles: ← → caminar, Z puño, X patada. En celular, botones en pantalla. Si no tocás nada, juega solo.
