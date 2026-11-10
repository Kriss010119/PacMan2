import { useEffect, useRef, useState } from 'react';
import { Engine } from '../game';
import { startGame } from '../game/session';
import { Elektronika } from './Elektronika';
import { SIZE } from '../constants/game';
import type { GameProps, Ui } from '../types/game';

export const Game = ({ level, onMenu }: GameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const [ui, setUi] = useState<Ui>({ paused: 1, score: 0, max: 0, level, lives: 3 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const session = startGame(canvas, { level, onMenu }, setUi);
    engineRef.current = session.engine;
    return session.stop;
  }, []);

  const E = () => engineRef.current!;
  const p = ui.paused;
  const overlayTitle = p === -1 ? 'ПАУЗА' : Math.abs(p) === 2 ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ';

  return (
    <Elektronika
      title="ПАКМЕН"
      score={ui.score}
      max={ui.max}
      level={ui.level}
      lives={ui.lives}
      pills={[
        {
          label: 'ПАУЗА',
          red: p === -1,
          onClick: () => {
            if (p === 1 || p === -1) {
              E().togglePause();
            }
          },
        },
        {
          label: 'РЕСТАРТ',
          red: Math.abs(p) >= 2,
          onClick: () => {
            E().restart();
          },
        },
        { label: 'МЕНЮ', onClick: onMenu },
      ]}
      onDirection={(d) => {
        E().setWant(d);
      }}
    >
      <canvas ref={canvasRef} width={SIZE} height={SIZE} style={{ width: SIZE, height: SIZE }} />

      {p !== 1 && (
        <div className="retro-overlay">
          <div className="retro-card">
            <div className="retro-title">{overlayTitle}</div>
            <div className="retro-line">СЧЁТ: {ui.score}</div>
            <div className="retro-line">РЕКОРД: {ui.max}</div>
          </div>
        </div>
      )}
    </Elektronika>
  );
};
