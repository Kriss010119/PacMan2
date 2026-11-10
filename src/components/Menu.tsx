import { useEffect, useState } from 'react';
import { Elektronika } from './Elektronika';
import { THEMES } from '../constants/game';
import { getMaxScore } from '../game/records';
import type { MenuProps } from '../types/ui';

export const Menu = ({ level, onLevel, onPlay, onRecords }: MenuProps) => {
  const [sel, setSel] = useState(0);
  const [bye, setBye] = useState(false);
  const n = THEMES.length;

  const exit = () => {
    setBye(true);
    window.close();
  };
  const nextLevel = (d = 1) => onLevel(((level - 1 + d + n) % n) + 1);

  const items = [
    { label: 'ИГРАТЬ', run: onPlay },
    { label: `УРОВЕНЬ ${level}`, run: () => nextLevel(1) },
    { label: 'РЕКОРДЫ', run: onRecords },
    { label: 'ВЫХОД', run: exit },
  ];

  const onDirection = (d: number) => {
    if (d === 1) {
      setSel((v) => (v + 1) % items.length);
    }
    if (d === 3) {
      setSel((v) => (v + items.length - 1) % items.length);
    }
    if (d === 0) {
      nextLevel(1);
    }
    if (d === 2) {
      nextLevel(-1);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        setSel((v) => (v + 1) % items.length);
      }
      if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        setSel((v) => (v + items.length - 1) % items.length);
      }
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        nextLevel(-1);
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        nextLevel(1);
      }
      if (e.code === 'Enter' || e.code === 'Space') {
        items[sel].run();
      }
      if (e.code === 'Digit1' || e.code === 'Digit2' || e.code === 'Digit3') {
        onLevel(Number(e.code.slice(-1)));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  });

  return (
    <Elektronika
      title="ПАКМЕН"
      score={0}
      max={getMaxScore()}
      level={level}
      lives={3}
      pills={[
        { label: 'ИГРАТЬ', onClick: onPlay },
        { label: 'УРОВЕНЬ', onClick: () => nextLevel(1) },
        { label: 'РЕКОРДЫ', onClick: onRecords },
      ]}
      onDirection={onDirection}
    >
      {bye ? (
        <div className="crt-center">
          <h2>ИГРА ОКОНЧЕНА</h2>
          <p>СПАСИБО ЗА ИГРУ</p>
        </div>
      ) : (
        <div className="crt-center">
          <h1 className="neon-title">ПАКМЕН</h1>

          <ul className="crt-menu">
            {items.map((it, i) => (
              <li key={it.label} className={i === sel ? 'on' : ''} onMouseEnter={() => setSel(i)} onClick={it.run}>
                {i === sel ? '▶ ' : '  '}
                {it.label}
              </li>
            ))}
          </ul>

          <div className="level-pick">
            {THEMES.map((_, i) => (
              <button key={i} className={`level-chip ${level === i + 1 ? 'on' : ''}`} onClick={() => onLevel(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>

          <p className="level-name">{THEMES[level - 1].name}</p>
          <p className="blink">НАЖМИ СТАРТ</p>
        </div>
      )}
    </Elektronika>
  );
};
