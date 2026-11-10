import { SIZE, NEAR_OPEN, THEMES } from '../../../constants/game';
import { cell, getPole } from './pole';
import { drawBackdrop } from '../../skins';

const wallLayers: HTMLCanvasElement[] = [];

export const getWalls = (level: number): HTMLCanvasElement => {
  if (wallLayers[level]) {
    return wallLayers[level];
  }

  const th = THEMES[level - 1];
  const c = document.createElement('canvas');
  c.width = c.height = SIZE;

  const g = c.getContext('2d')!;
  drawBackdrop(g, th.skin, SIZE);

  const T = th.edge;
  const W = 36;
  const open = (r: number, col: number) => NEAR_OPEN.includes(cell(r, col));

  getPole().forEach((row, i) =>
    [...row].forEach((ch, j) => {
      const color = th.walls[ch];
      if (!color) {
        return;
      }
      const px = j * W;
      const py = i * W;
      if (th.fill) {
        g.fillStyle = th.fill;
        g.fillRect(px, py, W, W);
      }
      g.fillStyle = color;
      if (th.glow) {
        g.shadowColor = th.glow;
        g.shadowBlur = 8;
      }
      if (i < 1 || open(i - 1, j)) {
        g.fillRect(px, py, W, T);
      }
      if (j < 1 || open(i, j - 1)) {
        g.fillRect(px, py, T, W);
      }
      if (j >= 24 || open(i, j + 1)) {
        g.fillRect(px + W - T, py, T, W);
      }
      if (i >= 24 || open(i + 1, j)) {
        g.fillRect(px, py + W - T, W, T);
      }
    }),
  );

  wallLayers[level] = c;
  return c;
};
