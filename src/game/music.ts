import { LEVEL_MUSIC, MUSIC_VOLUME } from '../constants/audio';

let cur: HTMLAudioElement | null = null;
let curLevel = 0;
let muted = false;

const createTrack = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = MUSIC_VOLUME;
  audio.preload = 'auto';
  return audio;
};

const safePlay = (audio: HTMLAudioElement) => {
  const promise = audio.play();
  if (promise) {
    promise.catch(() => {
      // ждем
    });
  }
};

export const playLevelMusic = (level: number) => {
  if (curLevel === level) {
    return;
  }
  stopMusic();
  curLevel = level;
  const src = LEVEL_MUSIC[level];
  if (!src || muted) {
    return;
  }
  cur = createTrack(src);
  safePlay(cur);
};

export const stopMusic = () => {
  if (!cur) {
    return;
  }
  cur.pause();
  cur.currentTime = 0;
  cur = null;
};

export const pauseMusic = () => {
  cur?.pause();
};

export const resumeMusic = () => {
  if (cur) {
    safePlay(cur);
  }
};

export const setMuted = (value: boolean) => {
  muted = value;
  if (cur) {
    cur.muted = value;
  }
};

export const unlockMusic = () => {
  const tryResume = () => {
    if (cur && cur.paused) {
      safePlay(cur);
    }
    window.removeEventListener('pointerdown', tryResume);
    window.removeEventListener('keydown', tryResume);
  };
  window.addEventListener('pointerdown', tryResume);
  window.addEventListener('keydown', tryResume);
};
