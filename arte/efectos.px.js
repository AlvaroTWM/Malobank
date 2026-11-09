// Efectos de pelea para Malo Bank (se dibujan alrededor de los personajes, no los reemplazan).
// Construir: node .claude/skills/pxl-pixel-art/bin/pxl.js build arte/efectos.px.js --out arte/out
pal({ k: "#140c1c", W: "#ffffff", y: "#ffe14d", Y: "#ffd23f", o: "#f39a1e", r: "#d8403a",
      d: "#8a7a68", D: "#b8a488", c: "#d8c3a0", C: "#efe0c4" })
ramps("kroYyW", "kdDcC")

// chispa de impacto: destello -> estrella -> astillas -> se apaga (4 cuadros de 24x24)
anim("chispa", { w: 24, h: 24, frames: 4, fps: 20 }, (c) => {
  const f = c.frame, cx = 12, cy = 12
  const star = (r, r2, col) => {
    const pts = []
    for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8 + 0.2, rr = i % 2 ? r2 : r; pts.push(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) }
    c.poly(pts, col)
  }
  if (f === 0) { c.circ(cx, cy, 5, "y"); c.circ(cx, cy, 3, "W") }
  if (f === 1) { star(11, 4, "o"); star(9, 3, "Y"); star(6, 2, "W"); c.circ(cx, cy, 2, "W") }
  if (f === 2) {
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.2; c.line(cx + Math.cos(a) * 6, cy + Math.sin(a) * 6, cx + Math.cos(a) * 11, cy + Math.sin(a) * 11, i % 2 ? "Y" : "W") }
    c.ring(cx, cy, 4, "y")
  }
  if (f === 3) { for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.6; c.px(cx + Math.cos(a) * 11 | 0, cy + Math.sin(a) * 11 | 0, "o") } c.ring(cx, cy, 6, "o") }
})

// nube de polvo al caer o saltar (4 cuadros de 20x12)
anim("polvo", { w: 20, h: 12, frames: 4, fps: 12 }, (c) => {
  const f = c.frame, r = [2, 3, 3, 1][f], col = ["C", "c", "D", "d"][f]
  for (const [x, y, k] of [[5, 8, 1], [10, 7, 1.3], [15, 8, 1]]) {
    const rr = Math.max(1, Math.round(r * k)), xx = Math.round(x + (x - 10) * f * 0.15)
    c.circ(xx, y - f, rr, col); if (f < 3) c.hline(xx - rr + 1, y - f - rr, Math.max(1, rr), "C")
  }
})
