export type Ctx = CanvasRenderingContext2D;

export const ell = (c: Ctx, x: number, y: number, rx: number, ry: number, fill: string) => {
  c.fillStyle = fill;
  c.beginPath();
  c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  c.fill();
};

export const poly = (c: Ctx, pts: number[][], fill: string) => {
  c.fillStyle = fill;
  c.beginPath();
  pts.forEach(([x, y], i) => {
    if (i) {
      c.lineTo(x, y);
    } else {
      c.moveTo(x, y);
    }
  });
  c.closePath();
  c.fill();
};
