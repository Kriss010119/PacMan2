import { drawSprite } from '../../sprites';
import { drawDot } from '../../skins';
import type { Skin } from '../../../types/game';

interface Pos {
  x: number;
  y: number;
}

export class Seed {
  visible = 1;
  o = 1;

  constructor(public cx: number, public cy: number, public big = false) {}

  colis(p: Pos): number {
    if (this.cx >= p.x && this.cx <= p.x + 36 && this.cy >= p.y && this.cy <= p.y + 36 && this.o === 1) {
      this.visible = 0;
      this.o = 0;
      return 1;
    }
    return 0;
  }

  draw(ctx: CanvasRenderingContext2D, skin: Skin) {
    if (this.visible !== 1) {
      return;
    }
    if (skin !== 'classic') {
      drawDot(ctx, skin, this.cx, this.cy, this.big);
      return;
    }
    if (
      drawSprite(ctx, this.big ? 'bigkonfeta' : 'konfeta', this.cx - (this.big ? 18 : 8), this.cy - (this.big ? 7 : 2))
    ) {
      return;
    }
    const rx = this.big ? 10 : 5;
    const ry = this.big ? 7 : 3.5;
    ctx.fillStyle = this.big ? '#ff8a65' : '#ffe9a8';
    ctx.beginPath();
    ctx.ellipse(this.cx, this.cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    if (this.big) {
      for (const s of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(this.cx + s * rx, this.cy);
        ctx.lineTo(this.cx + s * (rx + 7), this.cy - 6);
        ctx.lineTo(this.cx + s * (rx + 7), this.cy + 6);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}
