import { MAPS } from '../../../constants';

let current: string[] = MAPS[0];

const cell = (r: number, c: number): string => current[r]?.[c] ?? '';

const setPole = (map: string[]) => {
  current = map;
};

const getPole = () => current;

export { cell, getPole, setPole };
