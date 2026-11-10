import { ell, poly, Ctx } from './helpers';
import type { Skin } from '../../types/game';

export const drawDot = (c: Ctx, skin: Skin, cx: number, cy: number, big: boolean) => {
  if (skin === 'forest') {
    if (big) {
      ell(c, cx, cy, 8, 8, '#e53935');
      ell(c, cx - 2.5, cy - 3, 2.5, 2, 'rgba(255,255,255,.6)');
      poly(
        c,
        [
          [cx, cy - 8],
          [cx + 8, cy - 11],
          [cx + 4, cy - 5],
        ],
        '#43a047',
      );
    } else {
      ell(c, cx, cy + 1, 3, 3.5, '#a1887f');
      ell(c, cx, cy - 2, 3.4, 2, '#5d4037');
    }
  } else if (skin === 'karolina') {
    const r = big ? 10 : 4;
    const g = c.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, big ? '#f3e5f5' : '#e1f5fe');
    g.addColorStop(0.5, big ? '#b388ff' : '#4fc3f7');
    g.addColorStop(1, 'rgba(124,77,255,0)');
    c.fillStyle = g;
    c.beginPath();
    c.arc(cx, cy, r, 0, Math.PI * 2);
    c.fill();
  }
};
