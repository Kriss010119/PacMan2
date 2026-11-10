import { ell, poly, Ctx } from './helpers';
import type { Skin } from '../../types/game';

const VEC = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const eyes = (c: Ctx, state: number, kyda: number, xs: number[], yy: number, r: number) => {
  const [vx, vy] = VEC[kyda] ?? [0, 0];
  for (const ex of xs) {
    ell(c, ex, yy, r, r * 1.2, '#fff');
    ell(c, ex + vx * r * 0.45, yy + vy * r * 0.45, r * 0.5, r * 0.5, state === 1 ? '#3949ab' : '#111');
  }
};

const slime = (c: Ctx, kto: number, state: number, kyda: number) => {
  const col = ['#e62937', '#ff6dc2', '#0079f1', '#ffcb00'][kto];
  c.fillStyle = state === 0 ? col : state === 1 ? '#5c6bc0' : '#4e342e';
  c.beginPath();
  c.arc(18, 18, 16, Math.PI, 0);
  [
    [34, 34],
    [26, 29],
    [18, 34],
    [10, 29],
    [2, 34],
  ].forEach(([px, py]) => {
    c.lineTo(px, py);
  });
  c.closePath();
  c.fill();
  eyes(c, state, kyda, [18], 16, 6);
};

const fox = (c: Ctx, kto: number, state: number, kyda: number, blink: boolean) => {
  if (state === 2) {
    eyes(c, 2, kyda, [12, 24], 18, 4);
    return;
  }
  const fur = state === 1 ? (blink ? '#fff' : '#b0bec5') : ['#ef6c00', '#e64a19', '#ff8f00', '#bf6a2c'][kto];
  poly(
    c,
    [
      [3, 17],
      [5, 3],
      [13, 11],
      [23, 11],
      [31, 3],
      [33, 17],
      [18, 34],
    ],
    fur,
  );
  poly(
    c,
    [
      [6, 8],
      [11, 12],
      [6, 15],
    ],
    state === 1 ? '#78909c' : '#5d2e0c',
  );
  poly(
    c,
    [
      [30, 8],
      [25, 12],
      [30, 15],
    ],
    state === 1 ? '#78909c' : '#5d2e0c',
  );
  poly(
    c,
    [
      [18, 34],
      [7, 23],
      [18, 19],
      [29, 23],
    ],
    '#fff7ec',
  );
  ell(c, 18, 28.5, 2.6, 2, '#111');
  if (state === 1) {
    eyes(c, 1, kyda, [12, 24], 17, 3.6);
  } else {
    ell(c, 12, 17, 2.4, 2.8, '#111');
    ell(c, 24, 17, 2.4, 2.8, '#111');
    ell(c, 12.7, 16, 0.8, 0.8, '#fff');
    ell(c, 24.7, 16, 0.8, 0.8, '#fff');
  }
};

const button = (c: Ctx, kto: number, state: number, blink: boolean) => {
  if (state === 2) {
    c.strokeStyle = 'rgba(179,157,219,.7)';
    c.lineWidth = 3;
    c.beginPath();
    c.arc(18, 18, 13, 0, Math.PI * 2);
    c.stroke();
    return;
  }
  const col = state === 1 ? (blink ? '#fff' : '#9fa8da') : ['#e53935', '#fdd835', '#26c6da', '#66bb6a'][kto];
  ell(c, 18, 18, 16.5, 16.5, col);
  c.strokeStyle = 'rgba(0,0,0,.28)';
  c.lineWidth = 2.5;
  c.beginPath();
  c.arc(18, 18, 12.5, 0, Math.PI * 2);
  c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.45)';
  c.lineWidth = 1.5;
  c.beginPath();
  c.arc(18, 18, 15.2, Math.PI * 1.1, Math.PI * 1.7);
  c.stroke();
  for (const [dx, dy] of [
    [-4.5, -4.5],
    [4.5, -4.5],
    [-4.5, 4.5],
    [4.5, 4.5],
  ]) {
    ell(c, 18 + dx, 18 + dy, 2.6, 2.6, '#14082e');
  }
  c.strokeStyle = '#d7ccc8';
  c.lineWidth = 1.2;
  c.beginPath();
  c.moveTo(13.5, 13.5);
  c.lineTo(22.5, 22.5);
  c.moveTo(22.5, 13.5);
  c.lineTo(13.5, 22.5);
  c.stroke();
};

export const drawEnemy = (
  c: Ctx,
  skin: Skin,
  x: number,
  y: number,
  kto: number,
  state: number,
  kyda: number,
  blink: boolean,
) => {
  c.save();
  c.translate(x, y);
  if (skin === 'forest') {
    fox(c, kto, state, kyda, blink);
  } else if (skin === 'karolina') {
    button(c, kto, state, blink);
  } else {
    slime(c, kto, state, kyda);
  }
  c.restore();
};
