type Skin = 'classic' | 'forest' | 'karolina';

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Theme {
  name: string;
  skin: Skin;
  bg: string;
  walls: Record<string, string>;
  edge: number;
  fill: string | null;
  glow: string | null;
  speed: number;
  map: string[];
}

interface GameProps {
  level: number;
  onMenu: () => void;
}

interface Ui {
  paused: number;
  score: number;
  max: number;
  level: number;
  lives: number;
}

export { Skin, Rect, Theme, GameProps, Ui };
