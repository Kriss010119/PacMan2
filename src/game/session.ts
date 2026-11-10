import { Engine } from './engine';
import { calcConsoleSize, SIZE, KEYS, MAX_PX, MAX_MS } from '../constants';
import type { GameProps, Ui } from '../types';
import { playLevelMusic, stopMusic, pauseMusic, resumeMusic } from './music';

export interface Session {
  engine: Engine;
  stop: () => void;
}

const mkCanvas = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const ctx = canvas.getContext('2d')!;
  const dpr = Math.min(Math.ceil((window.devicePixelRatio || 1) * Math.max(1, calcConsoleSize())), MAX_PX);
  canvas.width = SIZE * dpr;
  canvas.height = SIZE * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
  return ctx;
};

const toggleFs = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen?.();
  }
};

const onKey = (e: KeyboardEvent, engine: Engine, onMenu: () => void) => {
  if (e.code in KEYS) {
    e.preventDefault();
    engine.setWant(KEYS[e.code]);
  }

  if (e.repeat) {
    return;
  }

  if (e.code === 'KeyR') {
    engine.restart();
  }

  if (e.code === 'KeyP') {
    engine.togglePause();
  }

  if (e.code === 'KeyM') {
    onMenu();
  }

  if (e.code === 'KeyF') {
    toggleFs();
  }
};

const toUi = (engine: Engine): Ui => ({
  paused: engine.paused,
  score: engine.score,
  max: engine.maxScore,
  level: engine.level,
  lives: engine.livesLeft,
});

const sameUi = (a: Ui, b: Ui): boolean => {
  return a.paused === b.paused && a.score === b.score && a.max === b.max && a.level === b.level && a.lives === b.lives;
};

export const startGame = (canvas: HTMLCanvasElement, props: GameProps, onUi: (ui: Ui) => void): Session => {
  const ctx = mkCanvas(canvas);
  const engine = new Engine(props.level);

  const syncMusic = () => {
    if (engine.paused === 1) {
      playLevelMusic(engine.level);
      resumeMusic();
    } else {
      pauseMusic();
    }
  };

  syncMusic();

  const handler = (e: KeyboardEvent) => {
    onKey(e, engine, props.onMenu);
  };

  const onVisibility = () => {
    if (document.hidden) {
      pauseMusic();
    } else if (engine.paused === 1) {
      resumeMusic();
    }
  };

  window.addEventListener('keydown', handler);
  document.addEventListener('visibilitychange', onVisibility);

  let last = performance.now();
  let acc = 0;
  let prev: Ui | null = null;

  let raf = requestAnimationFrame(function loop(now) {
    acc += Math.min(now - last, MAX_MS);
    last = now;

    const step = 1000 / engine.tps;
    while (acc >= step) {
      engine.tick();
      acc -= step;
    }

    syncMusic();
    engine.draw(ctx);

    const next = toUi(engine);
    if (!prev || !sameUi(prev, next)) {
      prev = next;
      onUi(next);
    }

    raf = requestAnimationFrame(loop);
  });

  const stop = () => {
    stopMusic();
    cancelAnimationFrame(raf);
    window.removeEventListener('keydown', handler);
    document.removeEventListener('visibilitychange', onVisibility);
    engine.finish();
  };

  return { engine, stop };
};
