import { BASE } from '../constants';

const cache = new Map<string, HTMLImageElement | null>();

export const SPRITE_NAMES = Object.keys(BASE);

export const sprite = (name: string): HTMLImageElement | null => {
  if (!cache.has(name)) {
    cache.set(name, null);
    const img = new Image();
    img.onload = () => {
      cache.set(name, img);
    };
    img.src = `image/${name}.png`;
  }
  return cache.get(name) ?? null;
};

export const drawSprite = (
  ctx: CanvasRenderingContext2D,
  name: string,
  x: number,
  y: number,
  filter?: string,
): boolean => {
  const img = sprite(name);
  if (!img) {
    return false;
  }
  const [w, h] = BASE[name];
  if (filter) {
    ctx.save();
    ctx.filter = filter;
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
  } else {
    ctx.drawImage(img, x, y, w, h);
  }
  return true;
};
