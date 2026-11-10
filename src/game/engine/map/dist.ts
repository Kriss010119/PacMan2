import { cell, getPole } from './pole';

const VEC = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const cache = new WeakMap<string[], Map<string, number[][]>>();

const isWallCh = (ch: string) => /[A-Z]/.test(ch);

export const distMap = (tc: number, tr: number): number[][] => {
  const pole = getPole();

  let per = cache.get(pole);
  if (!per) {
    per = new Map();
    cache.set(pole, per);
  }

  const key = `${tc},${tr}`;
  const hit = per.get(key);
  if (hit) {
    return hit;
  }

  const D = pole.map((row) => [...row].map(() => Infinity));
  D[tr][tc] = 0;

  const q: number[][] = [[tc, tr]];
  for (let i = 0; i < q.length; i++) {
    const [c, r] = q[i];

    for (const [dc, dr] of VEC) {
      const nc = c + dc;
      const nr = r + dr;
      const ch = cell(nr, nc);

      if (ch && !isWallCh(ch) && ch !== '2' && D[nr][nc] === Infinity) {
        D[nr][nc] = D[r][c] + 1;
        q.push([nc, nr]);
      }
    }
  }
  per.set(key, D);
  return D;
};
