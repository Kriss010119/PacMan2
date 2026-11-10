import type { Rect } from '../../types/game';

const fl = Math.floor;

const same = (a: string, b: string, set: string[]) => a === b && set.includes(a);

const overlap = (a: Rect, b: Rect) => {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
};

const secondsSince = (t: number) => fl((performance.now() - t) / 1000);

interface HasRadius {
  x: number;
  y: number;
  radius: number;
}

const collision = (p: HasRadius, g: HasRadius) => {
  return overlap({ x: p.x, y: p.y, w: p.radius, h: p.radius }, { x: g.x + 9, y: g.y, w: g.radius - 18, h: g.radius });
};

export { fl, same, overlap, collision, secondsSince };
