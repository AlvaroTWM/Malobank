// Animaciones de los mini-juegos de Malo Bank (estilo bloques simples, como los sprites originales).
// Construir: node .claude/skills/pxl-pixel-art/bin/pxl.js build arte/minijuegos.px.js --out arte/out
// Las tiras (anims/<nombre>.png) se incrustan en index.html como data URI (MGA).
pal({
  k: "#140c1c", W: "#ffffff", w: "#f2ead8", g: "#c8c8d0", G: "#8a8a96", n: "#3a3a44",
  r: "#d8403a", R: "#a82a2a", o: "#f39a1e", y: "#ffd23f", Y: "#ffe98a",
  s: "#dca07a", S: "#b0784e", b: "#2a4a7a", B: "#1e3458", t: "#2a8a96", T: "#1e6a74",
  m: "#8a5a32", M: "#5a3a22", c: "#9c6a3e", C: "#f0e6c8", l: "#6cc070", L: "#3a8a40",
  p: "#8240be", u: "#7aa0bc", e: "#c83c3c", f: "#3c5aa0", h: "#e6c83c", v: "#5aa05a"
})
ramps("knGgW", "kRro", "kSs", "kBb", "kTt", "kMmc", "kLl")

const TAU = Math.PI * 2
// rueda con rayos que giran
function wheel(c, cx, cy, r, ph) {
  c.circ(cx, cy, r, "k"); c.circ(cx, cy, r - 1, "g"); c.circ(cx, cy, r - 3, "W")
  for (let i = 0; i < 2; i++) {
    const a = ph * TAU / 2 + i * Math.PI / 2
    c.line(Math.round(cx - Math.cos(a) * (r - 2)), Math.round(cy - Math.sin(a) * (r - 2)),
      Math.round(cx + Math.cos(a) * (r - 2)), Math.round(cy + Math.sin(a) * (r - 2)), "G")
  }
  c.px(cx, cy, "k")
}

// 1) Repartidor de Hambris en moto (36x34, 4 cuadros): ruedas giran, rebota, humo y vapor del pedido
anim("delivery", { w: 38, h: 34, frames: 4, fps: 12 }, (c) => {
  const f = c.frame, ph = c.phase, bob = f % 2
  // humo del escape
  const pr = [1, 2, 2, 1][f], px = 3 - f
  c.circ(px + 1, 24 - f, pr, f > 1 ? "g" : "W")
  // carrocería
  c.rect(6, 19 + bob, 26, 6, "r"); c.rect(6, 24 + bob, 26, 2, "R"); c.rect(29, 13 + bob, 4, 8, "r"); c.rect(29, 12 + bob, 5, 2, "R")
  c.rect(10, 18 + bob, 12, 2, "M")
  // caja térmica con el logo
  c.rect(4, 8 + bob, 11, 11, "w"); c.rect(4, 8 + bob, 11, 2, "r"); c.rect(6, 11 + bob, 2, 6, "r"); c.rect(11, 11 + bob, 2, 6, "r"); c.rect(6, 13 + bob, 7, 1, "r")
  // vapor del pedido
  for (let i = 0; i < 2; i++) { const yy = 6 - ((f + i * 2) % 4) + bob; c.px(7 + i * 4 + (f % 2), yy, "W"); c.px(7 + i * 4, yy - 1, "g") }
  // piloto
  c.rect(17, 12 + bob, 6, 7, "o"); c.rect(17, 16 + bob, 6, 3, "B")
  c.rect(23, 13 + bob, 6, 2, "s") // brazo al manubrio
  c.rect(18, 7 + bob, 5, 5, "s"); c.rect(17, 5 + bob, 7, 3, "W"); c.rect(22, 7 + bob, 3, 1, "n")
  c.px(22, 9 + bob, "k")
  // ruedas
  wheel(c, 10, 28, 5, ph); wheel(c, 28, 28, 5, ph + .25)
})

// 2) Canillita en bici (36x32, 4 cuadros): pedalea, ruedas giran, gorra flamea
anim("canilla", { w: 36, h: 32, frames: 4, fps: 10 }, (c) => {
  const f = c.frame, ph = c.phase, bob = f % 2 ? 0 : 1, a = ph * TAU
  // cuadro de la bici
  c.line(9, 26, 17, 18, "t", 2); c.line(17, 18, 27, 18, "t", 2); c.line(17, 18, 18, 26, "t"); c.line(18, 26, 9, 26, "T"); c.line(27, 18, 27, 26, "t")
  c.rect(25, 14, 5, 2, "n")
  // canasto con diarios
  c.rect(2, 15, 10, 5, "c"); c.rect(3, 13, 8, 2, "C"); c.rect(5, 12, 4, 1, "r")
  // cuerpo
  c.rect(14, 9 + bob, 7, 8, "W"); c.rect(11, 9 + bob, 4, 7, "C")
  c.rect(20, 12 + bob, 6, 2, "s")
  // piernas que pedalean (rodilla gira alrededor del eje)
  const kx = Math.round(18 + Math.cos(a) * 3), ky = Math.round(22 + Math.sin(a) * 3)
  const kx2 = Math.round(18 - Math.cos(a) * 3), ky2 = Math.round(22 - Math.sin(a) * 3)
  c.line(16, 16 + bob, kx2, ky2, "B", 2); c.line(16, 16 + bob, kx, ky, "b", 2)
  c.rect(kx - 1, ky, 3, 2, "k"); c.rect(kx2 - 1, ky2, 3, 2, "n")
  // cabeza y gorra
  c.rect(14, 3 + bob, 6, 6, "s"); c.rect(13, 1 + bob, 7, 3, "r"); c.rect(20, 3 + bob, 3, 1, "r")
  if (f % 2) c.px(12, 2 + bob, "r")
  c.px(18, 5 + bob, "k")
  wheel(c, 8, 26, 5, ph); wheel(c, 28, 26, 5, ph + .25)
})

// 3) Perro que corre (22x14, 4 cuadros)
anim("perro", { w: 22, h: 14, frames: 4, fps: 12, outline: "k" }, (c) => {
  const f = c.frame, up = f % 2
  c.rect(4, 4 - up, 12, 5, "m"); c.rect(14, 1 - up, 6, 5, "m"); c.rect(18, 3 - up, 3, 2, "c"); c.px(17, 2 - up, "k"); c.rect(14, 0 - up, 2, 2, "M")
  c.line(4, 5 - up, 1, [2, 1, 3, 2][f] - up, "m")   // cola
  const L = [[0, 3, 0, 3], [2, 1, 2, 1], [3, 0, 3, 0], [1, 2, 1, 2]][f]
  c.rect(5 + L[0], 9 - up, 2, 3 + up, "M"); c.rect(8 - L[1], 9 - up, 2, 3 + up, "m"); c.rect(12 + L[2], 9 - up, 2, 3 + up, "M"); c.rect(15 - L[3], 9 - up, 2, 3 + up, "m")
})

// 4) Pájaro que aletea (10x7, 4 cuadros)
anim("pajaro", { w: 11, h: 7, frames: 4, fps: 10 }, (c) => {
  const f = c.frame, wy = [0, 2, 4, 2][f]
  c.rect(4, 3, 3, 2, "n"); c.px(7, 3, "o")
  c.line(4, 3, 1, wy + 1 > 3 ? 4 : wy, "n"); c.line(6, 3, 9, wy + 1 > 3 ? 4 : wy, "n")
})

// 5) Manifestantes con cartel (16x27, 4 cuadros), cuatro remeras distintas
for (const [nm, shirt, hair, skin] of [["manif", "e", "M", "s"], ["manif_b", "f", "k", "s"], ["manif_c", "h", "M", "S"], ["manif_d", "v", "k", "S"]])
anim(nm, { w: 16, h: 27, frames: 4, fps: 6, outline: "k" }, (c) => {
  const f = c.frame, b = f % 2, arm = [0, 2, 0, 1][f]
  c.rect(11, 3 + arm, 1, 12, "M")
  c.rect(5, 0 + arm, 11, 6, "w"); c.rect(6, 2 + arm, 9, 1, "r"); c.rect(7, 4 + arm, 6, 1, "e")
  c.rect(2, 9 + b, 6, 5, skin); c.rect(2, 8 + b, 6, 2, hair); c.px(6, 11 + b, "k")
  c.rect(1, 14 + b, 8, 7, shirt); c.rect(9, 10 + arm, 2, 6, skin); c.rect(0, 15 + b, 1, 4, skin)
  c.rect(2, 21, 2, 5, "B"); c.rect(6, 21, 2, 5, "B"); if (b) c.rect(6, 21, 2, 4, "b")
})

// 6) Peatón visto de arriba (8x9, 4 cuadros), para las veredas de Viaje Pya'e
anim("peaton", { w: 8, h: 10, frames: 4, fps: 8 }, (c) => {
  const f = c.frame, st = [0, 1, 0, -1][f]
  c.rect(2 + 0, 4 + st, 1, 3, "n"); c.rect(5, 4 - st, 1, 3, "n")   // piernas
  c.rect(1, 2, 6, 4, "f"); c.rect(0, 3 - st, 1, 2, "s"); c.rect(7, 3 + st, 1, 2, "s")
  c.circ(4, 2, 2, "M"); c.px(4, 1, "m")
})

// 7) Billete que flamea (14x9, 4 cuadros)
anim("billete", { w: 14, h: 10, frames: 4, fps: 10 }, (c) => {
  const f = c.frame, ww = [12, 9, 4, 9][f], x = Math.round(7 - ww / 2)
  c.rect(x - 1, 1, ww + 2, 9, "k"); c.rect(x, 2, ww, 7, f === 2 ? "L" : "l")
  if (ww > 6) { c.rect(x + Math.round(ww / 2) - 2, 3, 4, 5, "L"); c.px(x + 1, 3, "W") }
})

// 8) Cupón con brillo (18x12, 4 cuadros)
anim("cupon", { w: 20, h: 14, frames: 4, fps: 8 }, (c) => {
  const f = c.frame
  c.rect(1, 1, 18, 12, "k"); c.rect(2, 2, 16, 10, f % 2 ? "y" : "Y")
  for (let y = 3; y < 11; y += 2) c.px(5, y, "k")
  c.text(8, 5, "%", "r")
  const sx = [16, 17, 3, 2][f], sy = [0, 11, 11, 0][f]
  c.px(sx, sy, "W"); c.px(sx - 1, sy, "Y"); c.px(sx + 1, sy, "Y"); c.px(sx, Math.max(0, sy - 1), "Y")
})

// 9) Humo / polvo de rueda (8x8, 4 cuadros, no repite)
anim("humo", { w: 9, h: 9, frames: 4, fps: 12, loop: false }, (c) => {
  const f = c.frame, r = [1, 2, 3, 2][f], col = ["W", "g", "g", "G"][f]
  c.circ(4, 6 - f, r, col); if (f < 3) c.px(4 - r + 1, 6 - f - r + 1, "W")
})

// 10) Obrero de U-Bloq que saluda y festeja (14x22, 4 cuadros)
anim("obrero", { w: 14, h: 23, frames: 4, fps: 6, outline: "k" }, (c) => {
  const f = c.frame, wave = [0, 3, 0, 3][f]
  c.rect(3, 0, 7, 3, "y"); c.rect(2, 3, 9, 1, "y")
  c.rect(4, 4, 5, 5, "s"); c.px(7, 6, "k")
  c.rect(3, 9, 7, 8, "o"); c.rect(3, 11, 7, 1, "Y"); c.rect(3, 14, 7, 1, "Y")
  c.rect(1, 10, 2, 5, "s"); c.rect(10, 6 - wave + 3, 2, 5, "s"); c.rect(10, 5 - wave + 3, 3, 2, "s")
  c.rect(3, 17, 3, 5, "b"); c.rect(7, 17, 3, 5, "b")
})

// 11) Gancho de la grúa con luz que titila (10x8, 2 cuadros)
anim("gancho", { w: 10, h: 9, frames: 2, fps: 3 }, (c) => {
  c.rect(1, 0, 8, 4, "y"); c.rect(1, 3, 8, 1, "R"); c.rect(4, 4, 2, 2, "n"); c.line(5, 6, 3, 8, "n"); c.line(5, 6, 7, 8, "n")
  c.px(2, 1, c.frame ? "r" : "R")
})

// 12) Estrellita de "¡JUSTA!" (12x12, 4 cuadros, no repite)
anim("brillo", { w: 13, h: 13, frames: 4, fps: 14, loop: false }, (c) => {
  const f = c.frame, r = [2, 5, 6, 4][f], col = f < 2 ? "W" : "y"
  c.line(6 - r, 6, 6 + r, 6, col); c.line(6, 6 - r, 6, 6 + r, col)
  if (f > 0) { c.px(6 - r + 2, 6 - r + 2, "Y"); c.px(6 + r - 2, 6 + r - 2, "Y"); c.px(6 - r + 2, 6 + r - 2, "Y"); c.px(6 + r - 2, 6 - r + 2, "Y") }
  c.circ(6, 6, f === 3 ? 0 : 1, "W")
})

// 13) Moto de arriba (8x20, 2 cuadros): el piloto se bambolea
anim("motoTop", { w: 10, h: 21, frames: 2, fps: 6, outline: "k" }, (c) => {
  const s = c.frame
  c.rect(4, 0, 2, 4, "n"); c.rect(3, 4, 4, 15, "R"); c.rect(4, 18, 2, 3, "n")
  c.rect(0 + s, 5, 10 - s, 1, "n")                         // manubrio
  c.rect(1 + s, 8, 8, 5, "f"); c.rect(0 + s, 7, 2, 3, "s"); c.rect(8 + s - 1, 7, 2, 3, "s")
  c.circ(5 + (s ? 0 : 0), 9, 2, "h"); c.px(5, 8, "Y")
  c.rect(3, 14, 4, 4, "o")                                 // mochila de delivery
})

