// Ambientes y vehículos de los mini-juegos de Malo Bank, con más detalle.
// Construir: node .claude/skills/pxl-pixel-art/bin/pxl.js build arte/ambientes.px.js --out arte/out
// Las imágenes se incrustan en index.html como data URI (MGA), igual que arte/minijuegos.px.js.
// Luz siempre de arriba a la izquierda.
pal({
  k: "#140c1c", W: "#ffffff", w: "#f2ead8", x: "#d8d0c0", g: "#c8c8d0", G: "#8a8a96", n: "#3a3a44", N: "#24242c",
  q: "#24344e", Q: "#4a6a92", z: "#9cc4e4",           // vidrio: oscuro, medio, reflejo
  r: "#d8403a", R: "#a82a2a", e: "#f07060",           // rojo
  y: "#ffd23f", Y: "#fff2a0", o: "#f39a1e", O: "#c06a10",
  b: "#3a6ac8", B: "#24448a", c: "#78a8f0",           // azul
  p: "#8240be", P: "#5a2a8a", v: "#b07cf0",           // violeta NoMuv
  i: "#ff7eb6", I: "#c85a92", j: "#ffc0dc",           // rosa (limusina, unicornio)
  l: "#6cc070", L: "#3a8a40", d: "#a0e090",           // verde
  m: "#8a5a32", M: "#5a3a22", h: "#b07a48",           // madera
  t: "#c8643a", T: "#94402a", u: "#e08a5a",           // teja colonial
  s: "#e8c89a", S: "#c4a070",                          // piedra / vereda
  a: "#f0dcb0", A: "#c8b088", f: "#9a8a6a", F: "#b8a47c", // pared, sombra, zócalo
})
ramps("kNnGgW", "kRre", "kBbc", "kPpv", "kIij", "kLld", "kMmh", "kTtu", "kOoyY")

// ===================== AUTOS VISTOS DE ARRIBA (frente hacia arriba) =====================
// c0 claro, c1 medio, c2 oscuro (lado derecho, en sombra)
function carTop(c, w, h, c0, c1, c2, opt = {}) {
  const L = 2, R = w - 3, T = 1, B = h - 2
  // ruedas que asoman a los costados
  for (const yy of [Math.round(h * .18), Math.round(h * .7)]) { c.rect(0, yy, 2, 6, "N"); c.rect(w - 2, yy, 2, 6, "N"); c.px(0, yy + 1, "n"); c.px(w - 2, yy + 1, "n") }
  // carrocería con esquinas redondeadas
  c.rect(L, T + 1, R - L + 1, B - T - 1, c1); c.hline(L + 1, T, R - L - 1, c1); c.hline(L + 1, B, R - L - 1, c1)
  c.vline(L, T + 2, B - T - 3, c0); c.vline(L + 1, T + 1, B - T - 1, c0)          // lado iluminado
  c.vline(R, T + 2, B - T - 3, c2); c.vline(R - 1, T + 2, B - T - 3, c2)          // lado en sombra
  const wsY = Math.round(h * .26), roofY = wsY + 5, rwY = Math.round(h * .7)
  // capó: pliegue central y faros
  c.vline(Math.floor(w / 2), T + 2, wsY - T - 3, c0)
  c.rect(L + 1, T, 3, 2, "Y"); c.rect(R - 3, T, 3, 2, "Y"); c.px(L + 1, T, "W"); c.px(R - 3, T, "W")
  // parabrisas (trapecio) con reflejo diagonal
  for (let k = 0; k < 5; k++) c.hline(L + 2 + (k < 2 ? 1 : 0), wsY + k, R - L - 3 - (k < 2 ? 2 : 0), k < 2 ? "Q" : "q")
  c.line(L + 4, wsY + 3, L + 6, wsY + 1, "z")
  // techo
  c.rect(L + 2, roofY, R - L - 3, rwY - roofY - 1, opt.roof || c1)
  c.vline(L + 2, roofY, rwY - roofY - 1, c0)
  // espejos
  c.px(L - 1, wsY + 1, c1); c.px(R + 1, wsY + 1, c2)
  // luneta trasera
  for (let k = 0; k < 3; k++) c.hline(L + 3, rwY + k, R - L - 5, k === 0 ? "Q" : "q")
  c.px(L + 4, rwY + 1, "z")
  // baúl y luces traseras
  c.rect(L + 1, B - 1, 3, 2, "r"); c.rect(R - 3, B - 1, 3, 2, "r"); c.hline(L + 4, B, R - L - 7, c2)
  return { wsY, roofY, rwY }
}

// Auto NoMuv del jugador: blanco con techo violeta y cartelito en el techo
sprite("auto_nomuv", { w: 22, h: 36, outline: "k" }, (c) => {
  const g = carTop(c, 22, 36, "W", "w", "x", { roof: "p" })
  c.rect(6, g.roofY + 2, 9, 4, "v"); c.rect(6, g.roofY + 5, 9, 1, "P"); c.rect(7, g.roofY + 3, 7, 1, "W")   // cartel NoMuv
  c.vline(4, g.roofY, g.rwY - g.roofY - 1, "v")
  c.hline(3, 15, 1, "p"); c.vline(2, 11, 18, "W")
})
// Autos del tráfico (cuatro colores con el mismo dibujo)
sprite("auto_a", { w: 22, h: 32, outline: "k" }, (c) => { carTop(c, 22, 32, "e", "r", "R") })
sprite("auto_b", { base: "auto_a", swap: { e: "c", r: "b", R: "B" } })
sprite("auto_c", { base: "auto_a", swap: { e: "Y", r: "y", R: "O" } })
sprite("auto_d", { base: "auto_a", swap: { e: "G", r: "n", R: "N" } })
// 4x4 negra con baca y rueda de auxilio
sprite("cuatro", { w: 24, h: 38, outline: "k" }, (c) => {
  const g = carTop(c, 24, 38, "G", "n", "N")
  c.rect(5, g.roofY + 1, 14, g.rwY - g.roofY - 3, "N")
  for (let yy = g.roofY + 2; yy < g.rwY - 3; yy += 3) c.hline(6, yy, 12, "G")       // baca
  c.vline(5, g.roofY + 1, g.rwY - g.roofY - 3, "G"); c.vline(18, g.roofY + 1, g.rwY - g.roofY - 3, "G")
  c.circ(12, 35, 3, "N"); c.circ(12, 35, 1, "G")                                    // auxilio
})
// Limusina rosada del CEO, con cuerno dorado en el capó
sprite("limo", { w: 24, h: 58, outline: "k" }, (c) => {
  const L = 2, R = 21
  for (const yy of [8, 44]) { c.rect(0, yy, 2, 7, "N"); c.rect(22, yy, 2, 7, "N") }
  c.rect(L, 3, R - L + 1, 53, "i"); c.vline(L, 4, 51, "j"); c.vline(L + 1, 3, 53, "j"); c.vline(R, 4, 51, "I"); c.vline(R - 1, 4, 51, "I")
  c.hline(L + 1, 2, R - L - 1, "i"); c.hline(L + 1, 56, R - L - 1, "i")
  c.rect(3, 2, 3, 2, "Y"); c.rect(18, 2, 3, 2, "Y")
  for (let k = 0; k < 5; k++) c.hline(L + 2 + (k < 2 ? 1 : 0), 12 + k, 16 - (k < 2 ? 2 : 0), k < 2 ? "Q" : "q")
  c.line(6, 15, 8, 13, "z")
  c.rect(4, 17, 16, 30, "I"); c.rect(5, 18, 14, 28, "i")                           // techo largo
  for (let yy = 20; yy < 46; yy += 6) { c.hline(5, yy, 14, "I") }                    // uniones del techo
  c.rect(7, 26, 10, 9, "q"); c.rect(8, 27, 3, 2, "Q")                                // techo solar
  for (let k = 0; k < 3; k++) c.hline(5, 47 + k, 14, k === 0 ? "Q" : "q")
  c.rect(3, 54, 3, 2, "r"); c.rect(18, 54, 3, 2, "r")
  c.vline(11, 4, 7, "j"); c.px(11, 3, "y"); c.px(12, 3, "y"); c.px(11, 2, "Y"); c.px(12, 1, "y")   // cuerno
})
// Colectivo visto de arriba: techo blanco, franja roja, escotillas y equipo de aire
sprite("colectivo", { w: 28, h: 66, outline: "k" }, (c) => {
  for (const yy of [8, 48]) { c.rect(0, yy, 2, 8, "N"); c.rect(26, yy, 2, 8, "N") }
  c.rect(2, 1, 24, 64, "w"); c.vline(2, 1, 64, "W"); c.vline(3, 1, 64, "W"); c.vline(25, 1, 64, "x"); c.vline(24, 1, 64, "x")
  c.rect(2, 1, 24, 2, "y"); c.rect(4, 0, 4, 1, "Y"); c.rect(20, 0, 4, 1, "Y")
  for (let k = 0; k < 4; k++) c.hline(4, 3 + k, 20, k < 2 ? "Q" : "q")             // parabrisas
  c.line(7, 6, 9, 4, "z")
  c.vline(4, 9, 54, "r"); c.vline(23, 9, 54, "R")                                   // franjas rojas
  c.rect(9, 12, 10, 8, "x"); c.rect(10, 13, 8, 6, "g"); for (let yy = 14; yy < 19; yy += 2) c.hline(11, yy, 6, "G")  // aire
  for (const yy of [28, 44]) { c.rect(10, yy, 8, 6, "G"); c.rect(11, yy + 1, 6, 4, "x"); c.hline(11, yy + 1, 6, "W") } // escotillas
  c.rect(6, 58, 16, 5, "x"); c.rect(3, 63, 3, 2, "r"); c.rect(22, 63, 3, 2, "r")
})

// ===================== CASAS DE BARRIO (vistas de frente) =====================
// a: pared, A: pared en sombra, f: zócalo
function casa(c, w, h, opt = {}) {
  const roofH = opt.roofH || 18, wallY = roofH - 2
  // pared
  c.rect(2, wallY, w - 4, h - wallY, "a")
  c.rect(2, wallY, w - 4, 3, "A")                          // sombra bajo el alero
  c.rect(w - 6, wallY, 4, h - wallY, "A")                  // costado en sombra
  c.rect(2, h - 5, w - 4, 5, "f"); c.hline(2, h - 5, w - 4, "F")   // zócalo con salpicadura
  // techo de tejas coloniales: hileras con juntas alternadas
  c.poly([0, roofH, 6, 2, w - 6, 2, w, roofH], "t")
  for (let yy = 4; yy < roofH; yy += 3) {
    const inset = Math.round(6 - (yy - 2) * 6 / (roofH - 2))
    c.hline(inset + 1, yy, w - 2 * inset - 2, "T")
    for (let xx = inset + 2 + (yy % 2) * 2; xx < w - inset - 2; xx += 4) c.px(xx, yy - 1, "u")
  }
  c.hline(6, 2, w - 12, "T"); c.hline(7, 1, w - 14, "T")  // cumbrera
  c.hline(0, roofH, w, "T"); c.hline(1, roofH + 1, w - 2, "k")   // borde del alero
  return wallY
}
function ventana(c, x, y, w, h) {
  c.rect(x - 1, y - 1, w + 2, h + 2, "w")                 // marco
  c.rect(x, y, w, h, "q"); c.rect(x, y, w, Math.ceil(h / 2), "Q")
  c.line(x + 1, y + h - 2, x + 3, y + 1, "z")              // reflejo
  for (let xx = x + 2; xx < x + w; xx += 3) c.vline(xx, y, h, "N")   // reja
  c.hline(x, y + Math.floor(h / 2), w, "N")
  c.rect(x - 2, y + h + 1, w + 4, 2, "x"); c.hline(x - 2, y + h + 2, w + 4, "G")  // alféizar
  c.vline(x + 1, y + h + 3, 3, "A"); c.vline(x + w - 2, y + h + 3, 2, "A")         // manchas de lluvia
}
function puerta(c, x, y, w, h) {
  c.rect(x - 1, y - 1, w + 2, h + 1, "w")
  c.rect(x, y, w, h, "m"); c.vline(x, y, h, "h")
  c.rect(x + 2, y + 2, w - 4, Math.floor(h / 2) - 3, "M"); c.rect(x + 2, y + Math.floor(h / 2) + 1, w - 4, Math.floor(h / 2) - 4, "M")
  c.px(x + w - 3, y + Math.floor(h / 2), "y")
  c.rect(x - 3, y + h, w + 6, 2, "S"); c.hline(x - 3, y + h, w + 6, "s")           // escalón
}
function planta(c, x, y) {
  c.rect(x, y + 5, 6, 4, "o"); c.hline(x, y + 5, 6, "O"); c.vline(x + 5, y + 6, 3, "O")
  c.circ(x + 3, y + 3, 3, "L"); c.circ(x + 2, y + 2, 2, "l"); c.px(x + 1, y + 1, "d")
}
// casa base (pared crema); los colores de la pared cambian por variante
sprite("casa_1", { w: 64, h: 66, outline: "k" }, (c) => {
  const wy = casa(c, 64, 66)
  ventana(c, 9, wy + 12, 15, 14)
  puerta(c, 36, wy + 18, 13, 30)
  c.rect(51, wy + 10, 4, 3, "Y"); c.px(52, wy + 13, "O")                            // farolito
  planta(c, 53, 52)
  c.rect(28, wy + 6, 6, 4, "g"); c.hline(28, wy + 9, 6, "G"); c.vline(30, wy + 10, 4, "A")   // aire acondicionado que gotea
})
sprite("casa_2", { w: 64, h: 66, outline: "k" }, (c) => {
  const wy = casa(c, 64, 66, { roofH: 14 })
  ventana(c, 8, wy + 10, 12, 12); ventana(c, 44, wy + 10, 12, 12)
  puerta(c, 26, wy + 16, 12, 34)
  planta(c, 4, 53)
  c.rect(40, wy + 30, 16, 6, "W"); c.rect(41, wy + 31, 14, 4, "r"); c.rect(43, wy + 32, 10, 2, "W")   // cartel "se vende" chiquito
})
sprite("casa_3", { w: 64, h: 66, outline: "k" }, (c) => {
  const wy = casa(c, 64, 66, { roofH: 20 })
  puerta(c, 10, wy + 14, 13, 32)
  ventana(c, 32, wy + 10, 20, 14)
  c.rect(30, wy + 30, 24, 3, "M"); for (let xx = 31; xx < 54; xx += 3) c.vline(xx, wy + 33, 8, "M")   // barandita
  planta(c, 55, 52)
})
for (const [n, base, A, a2, f] of [["casa_1b", "casa_1", "#e8b4c4", "#c48c9e", "#9a6a7a"], ["casa_2b", "casa_2", "#b4dca0", "#8cb478", "#6a8a5a"],
  ["casa_3b", "casa_3", "#f4d070", "#cca848", "#9a7a30"], ["casa_1c", "casa_1", "#b8c8ec", "#8c9ec8", "#6a7a9a"], ["casa_3c", "casa_3", "#f0b48c", "#c88c64", "#9a6a48"]])
  sprite(n, { base, swap: { a: A, A: a2, f } })
// Local de Hambris: toldo a rayas, vidriera y cartel (el texto lo escribe el juego)
sprite("local_hambris", { w: 72, h: 66, outline: "k" }, (c) => {
  c.rect(2, 4, 68, 62, "r"); c.rect(64, 4, 6, 62, "R"); c.rect(2, 61, 68, 5, "R")
  c.rect(6, 6, 60, 13, "w"); c.rect(6, 17, 60, 2, "x")                               // cartel
  for (let xx = 0; xx < 72; xx += 8) { c.rect(xx, 21, 4, 8, "W"); c.rect(xx + 4, 21, 4, 8, "r") }   // toldo
  for (let xx = 0; xx < 72; xx += 4) c.rect(xx + 1, 29, 2, 2, xx % 8 ? "r" : "W")
  c.hline(0, 21, 72, "R")
  c.rect(6, 34, 34, 22, "q"); c.rect(6, 34, 34, 9, "Q"); c.line(9, 52, 15, 36, "z"); c.line(12, 52, 18, 36, "z")   // vidriera
  c.rect(5, 33, 36, 1, "w"); c.rect(5, 56, 36, 2, "x")
  c.rect(10, 46, 10, 8, "y"); c.rect(11, 47, 8, 2, "O"); c.rect(24, 48, 8, 6, "o")  // combos en la vidriera
  c.rect(46, 33, 16, 28, "w"); c.rect(47, 34, 14, 27, "q"); c.rect(47, 34, 14, 10, "Q"); c.vline(54, 34, 27, "w")  // puerta de vidrio
  c.rect(51, 46, 1, 4, "W"); c.rect(56, 46, 1, 4, "W")
})
// Casa del cliente que espera el pedido: más ancha, con dos ventanas (la puerta y el cliente los dibuja el juego)
sprite("casa_entrega", { w: 92, h: 66, outline: "k" }, (c) => {
  const wy = casa(c, 92, 66, { roofH: 12 })
  ventana(c, 9, wy + 10, 16, 13); ventana(c, 67, wy + 10, 16, 13)
  c.rect(36, wy + 18, 22, 37, "w")                                                  // marco de la puerta
  planta(c, 28, 52); planta(c, 60, 52)
})

// ===================== UNICORNIO Y PONYS (Unicornio a la Fuga) =====================
// Pinta una grilla de texto dentro de una función (las patas cambian por cuadro).
function paint(c, x0, y0, str) {
  str.split("\n").filter((r) => r.trim()).forEach((row, y) => [...row.trim()].forEach((ch, x) => { if (ch !== ".") c.px(x0 + x, y0 + y, ch) }))
}
// Galope: cada pata es una lista de desplazamientos por fila (adelante +, atrás -).
const POSE = { A: [0, 1, 1, 2, 2], B: [0, 0, 0, 0, 0], C: [0, 0, -1, -1, -2], D: [0, 1, 2, 1, 0] }
const GALOPE = ["ABCD", "BCDA", "CDAB", "DABC"]   // [adelante cerca, adelante lejos, atrás cerca, atrás lejos]
function pata(c, x, y, pose, col, hoof) {
  const o = POSE[pose]
  o.forEach((dx, k) => c.px(x + dx, y + k, col))
  const last = o[o.length - 1]; c.px(x + last, y + o.length, hoof); c.px(x + last + 1, y + o.length, hoof)
}
function galope(c, f, y, near, far, col, shade, hoof) {
  const g = (k) => GALOPE[k][f]
  pata(c, far[0], y, g(1), shade, hoof); pata(c, far[1], y, g(3), shade, hoof)
  pata(c, near[0], y, g(0), col, hoof); pata(c, near[1], y, g(2), col, hoof)
}
// El CEO convertido en unicornio: blanco, crin arcoíris, cuerno dorado y corbata violeta. Galopa.
anim("unicornio", { w: 24, h: 21, frames: 4, fps: 10, outline: "k" }, (c) => {
  const f = c.frame, up = f === 1 || f === 2 ? 0 : 1
  galope(c, f, 14 + up, [16, 6], [14, 4], "W", "g", "I")
  const tail = [`
..rr
.ryy
ryyb
ryb.
.b..`, `
.rr.
rryy
ryyb
yb..
b...`]
  paint(c, 0, 7 + up, tail[f % 2])
  paint(c, 0, up, `
......................Y.
.....................yY.
.................rr.yO..
................roWWWW..
...............royWkWWW.
...............oylWWWWWj
..............yylbWWWWxx
.............ylbpWWWx...
.............lbpWWW.....
....WWWWWWWWWWbWWWW.....
...WWWWWWWWWWWWWWpW.....
...WWWWWWWWWWWWWWPW.....
...gWWWWWWWWWWWWWpW.....
....gggWWWWWWWWWWg......
......gggggggggggg......`)
})
// Pony asustado que huye: ojo grande, gotita de sudor y un detalle de cada perseguidor.
function pony(name, col, acc) {
  const [b0, b1, mn] = col
  anim(name, { w: 21, h: 18, frames: 4, fps: 12, outline: "k" }, (c) => {
    const f = c.frame, up = f === 1 || f === 2 ? 0 : 1
    galope(c, f, 11 + up, [13, 5], [11, 3], b0, b1, "N")
    paint(c, 0, 5 + up, f % 2 ? `
.MM
MM.
M..` : `
MM.
M..
.M.`)
    paint(c, 1, up, `
.............Mbb....
............MbbbbB..
...........MbWWWbbb.
...........MbWWkbbbb
..........MbbbbbbbBB
..........MbbbbB....
.........Mbbbbbb....
..bbbbbbbbbbbbbb....
..bbbbbbbbbbbbbb....
..Bbbbbbbbbbbbbb....
...BBbbbbbbbbbB.....
.....BBBBBBBBB......`.replace(/b/g, "1").replace(/B/g, "2").replace(/M/g, "3"))
    // reemplazar marcadores por los colores del pony
    for (let y = 0; y < c.h; y++) for (let x = 0; x < c.w; x++) {
      const k = c.key(x, y); if (k === "1") c.px(x, y, b0); else if (k === "2") c.px(x, y, b1); else if (k === "3") c.px(x, y, mn); else if (k === "M") c.px(x, y, mn)
    }
    if (f < 2) { c.px(20, 1 + up, "c"); c.px(20, 2 + up, "z") }                        // gotita de sudor
    acc(c, up)
  })
}
pony("pony_pol", ["b", "B", "N"], (c, u) => {                                       // policía: gorra con chapita
  c.rect(13, u - 1 < 0 ? 0 : u - 1, 5, 2, "B"); c.hline(16, u + 1, 4, "N"); c.px(15, u, "y")
})
pony("pony_reg", ["g", "G", "n"], (c, u) => {                                       // regulador: anteojos y carpeta
  c.hline(13, u + 1, 5, "N"); c.vline(13, u + 2, 2, "N"); c.vline(17, u + 2, 2, "N"); c.rect(5, u + 7, 5, 4, "w"); c.hline(6, u + 8, 3, "G"); c.hline(6, u + 10, 3, "G")
})
pony("pony_abo", ["h", "m", "k"], (c, u) => {                                       // abogada: moño rojo y corbata
  c.px(13, u, "r"); c.px(12, u + 1, "r"); c.px(14, u + 1, "R"); c.px(15, u + 7, "r"); c.px(15, u + 8, "R"); c.px(15, u + 9, "r")
})
pony("pony_blq", ["i", "I", "R"], (c, u) => {                                       // Ña Bloqueada: candado colgado
  c.rect(14, u + 7, 4, 3, "y"); c.px(15, u + 6, "O"); c.px(16, u + 6, "O"); c.px(15, u + 8, "O")
})
