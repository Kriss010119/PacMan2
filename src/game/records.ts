import { SCORE_KEY, TOP_KEY } from '../constants/records';

const getMaxScore = (): number => Number(localStorage.getItem(SCORE_KEY) ?? 0) || 0;

const saveScore = (score: number): void => {
  if (score > getMaxScore()) {
    localStorage.setItem(SCORE_KEY, String(score));
  }
};

const getTop = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem(TOP_KEY) ?? '[]');
  } catch {
    return [];
  }
};

const addScore = (score: number): void => {
  if (score <= 0) {
    return;
  }
  const top = [...getTop(), score].sort((a, b) => b - a).slice(0, 5);
  localStorage.setItem(TOP_KEY, JSON.stringify(top));
  saveScore(score);
};

export { getMaxScore, saveScore, addScore, getTop };
