import { MAPS } from './maps';
import type { Theme } from '../types/game';

export const SIZE = 900;
export const MAX_LEVEL = 3;
export const FONT = '"Press Start 2P", "Courier New", monospace';
export const OPEN = ['0', '4', '5'];
export const PAC_OPEN = ['0', '2', '4', '5'];
export const NEAR_OPEN = ['0', '2', '3', '4', '5'];

const WALL_COLORS: Record<string, string> = {
  D: '#701f7e',
  G: '#00e430',
  M: '#ff00ff',
  Y: '#fdf900',
  R: '#e62937',
  S: '#0079f1',
};

export const THEMES: Theme[] = [
  {
    name: 'NEON CITY',
    skin: 'classic',
    bg: '#000',
    walls: WALL_COLORS,
    edge: 6,
    fill: null,
    glow: null,
    speed: 1,
    map: MAPS[0],
  },
  {
    name: 'FOREST',
    skin: 'forest',
    bg: '#0a2312',
    walls: {
      D: '#33691e',
      G: '#43a047',
      M: '#7cb342',
      Y: '#9ccc65',
      R: '#8d6e63',
      S: '#6d4c41',
    },
    edge: 5,
    fill: 'rgba(46,125,50,0.38)',
    glow: null,
    speed: 1.25,
    map: MAPS[1],
  },
  {
    name: 'KAROLINA',
    skin: 'karolina',
    bg: '#06061f',
    walls: {
      D: '#5c6bc0',
      G: '#4fc3f7',
      M: '#b388ff',
      Y: '#7e57c2',
      R: '#9575cd',
      S: '#29b6f6',
    },
    edge: 4,
    fill: 'rgba(103,58,183,0.3)',
    glow: '#7c4dff',
    speed: 1.5,
    map: MAPS[2],
  },
];
