import { Ctx } from './helpers';
import type { Skin } from '../../types/game';

const rnd = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

export const drawBackdrop = (g: Ctx, skin: Skin, size: number) => {
  if (skin === 'forest') {
    const r = rnd(7);
    for (let i = 0; i < 70; i++) {
      g.fillStyle = `rgba(${20 + r() * 20},${70 + r() * 50},${30 + r() * 20},.28)`;
      g.beginPath();
      g.arc(r() * size, r() * size, 25 + r() * 60, 0, Math.PI * 2);
      g.fill();
    }
    for (let i = 0; i < 40; i++) {
      g.fillStyle = 'rgba(255,241,118,.35)';
      g.beginPath();
      g.arc(r() * size, r() * size, 1.6, 0, Math.PI * 2);
      g.fill();
    }
  } else if (skin === 'karolina') {
    const rad = g.createRadialGradient(size / 2, size / 2, 10, size / 2, size / 2, size * 0.75);
    rad.addColorStop(0, '#000');
    rad.addColorStop(0.35, '#1a1055');
    rad.addColorStop(1, '#0a2a66');
    g.fillStyle = rad;
    g.fillRect(0, 0, size, size);
    for (let i = 0; i < 34; i++) {
      g.strokeStyle = i % 2 ? 'rgba(149,117,205,.22)' : 'rgba(66,165,245,.2)';
      g.lineWidth = 12;
      g.beginPath();
      g.ellipse(
        size / 2 + Math.sin(i * 0.7) * 10,
        size / 2 + Math.cos(i * 0.5) * 8,
        18 + i * 17,
        14 + i * 16,
        i * 0.11,
        0,
        Math.PI * 2,
      );
      g.stroke();
    }
  }
};
