import { ell, poly, Ctx } from './helpers';
import type { Skin } from '../../types/game';

export const drawHero = (c: Ctx, skin: Skin, x: number, y: number, face: number, flip: boolean, alt: boolean) => {
  c.save();
  c.translate(x, y);
  if (skin === 'forest') {
    hedgehog(c, flip, alt);
  } else if (skin === 'karolina') {
    girl(c, face, alt);
  } else {
    classicHero(c, face, alt);
  }
  c.restore();
};

const classicHero = (c: Ctx, face: number, alt: boolean) => {
  const ang = [0, Math.PI / 2, Math.PI, -Math.PI / 2][face];
  const open = alt ? 0.08 * Math.PI : 0.28 * Math.PI;
  c.fillStyle = '#ff7043';
  c.beginPath();
  c.moveTo(18, 18);
  c.arc(18, 18, 16, ang + open, ang + 2 * Math.PI - open);
  c.closePath();
  c.fill();
  ell(c, 18 + Math.cos(ang - 1.1) * 8, 18 + Math.sin(ang - 1.1) * 8, 2.5, 2.5, '#111');
};

const hedgehog = (c: Ctx, flip: boolean, alt: boolean) => {
  if (flip) {
    c.translate(36, 0);
    c.scale(-1, 1);
  }
  const s = alt ? 2 : -2;
  ell(c, 12 + s, 32, 3.5, 2.2, '#8d6e63');
  ell(c, 24 - s, 32, 3.5, 2.2, '#8d6e63');
  c.fillStyle = '#4e342e';
  c.beginPath();
  for (let i = 0; i <= 16; i++) {
    const a = Math.PI + (i / 16) * Math.PI * 1.15 - 0.1;
    const r = i % 2 ? 13 : 18;
    const px = 16 + Math.cos(a) * r;
    const py = 24 + Math.sin(a) * r * 0.95;
    if (i) {
      c.lineTo(px, py);
    } else {
      c.moveTo(px, py);
    }
  }
  c.lineTo(16, 30);
  c.closePath();
  c.fill();
  ell(c, 16, 23, 12, 9, '#6d4c41');
  ell(c, 26, 23, 8, 7, '#e0c29a');
  ell(c, 33.5, 23.5, 2.4, 2.1, '#111');
  ell(c, 28, 20, 2, 2.2, '#111');
  ell(c, 28.6, 19.3, 0.7, 0.7, '#fff');
  poly(
    c,
    [
      [22, 17],
      [25, 13],
      [27, 18],
    ],
    '#d7b98e',
  );
};

const girl = (c: Ctx, face: number, alt: boolean) => {
  const sw = alt ? 3 : -3;
  ell(c, 13 + sw / 2, 33, 3.5, 2.2, '#37474f');
  ell(c, 23 - sw / 2, 33, 3.5, 2.2, '#37474f');
  poly(
    c,
    [
      [10, 33],
      [26, 33],
      [24, 20],
      [12, 20],
    ],
    '#26a69a',
  );
  poly(
    c,
    [
      [16, 20],
      [20, 20],
      [18, 28],
    ],
    '#e0f2f1',
  );
  ell(c, 18, 13, 10.5, 10.5, '#7e57c2');
  if (face !== 3) {
    ell(c, 18, 14, 8, 8, '#ffe0b2');
    poly(
      c,
      [
        [9, 6],
        [27, 6],
        [26, 11],
        [10, 11],
      ],
      '#7e57c2',
    );
    const dx = face === 0 ? 2 : face === 2 ? -2 : 0;
    ell(c, 14.5 + dx, 15, 1.6, 2, '#1a1033');
    ell(c, 21.5 + dx, 15, 1.6, 2, '#1a1033');
  }
  const lx = face === 2 ? 4 : 32;
  const ly = 24 + (alt ? 2 : -1);
  c.fillStyle = 'rgba(255,235,59,.35)';
  c.beginPath();
  c.arc(lx, ly, 6, 0, Math.PI * 2);
  c.fill();
  ell(c, lx, ly, 3, 3.4, '#ffee58');
};
