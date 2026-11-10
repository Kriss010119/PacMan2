import { useEffect, useState } from 'react';
import { Seven } from './Seven';
import { PillButton } from './Buttons';
import { THEMES } from '../constants/game';
import { ROUNDS } from '../constants/controls';
import { calcConsoleSize } from '../constants/layout';
import type { ElectronikaProps } from '../types/ui';

export const Elektronika = ({
  title = 'ПАКМЕН',
  score = 0,
  max = 0,
  level = 1,
  lives = 3,
  pills = [],
  onDirection,
  children,
}: ElectronikaProps) => {
  const [scale, setScale] = useState(calcConsoleSize);

  useEffect(() => {
    const onResize = () => {
      setScale(calcConsoleSize());
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const themeName = THEMES[level - 1]?.name ?? '';

  return (
    <div className="el-root">
      <div className="el" style={{ transform: `scale(${scale})` }}>
        <div className="el-title">
          <b>{title}</b>
        </div>

        <div className="el-lcd" style={{ top: 300 }}>
          <small>СЧЁТ</small>
          <Seven value={score} digits={6} />
        </div>
        <div className="el-lcd" style={{ top: 450 }}>
          <small>РЕКОРД</small>
          <Seven value={max} digits={6} />
        </div>
        <div className="el-lcd" style={{ top: 600 }}>
          <small>УРОВЕНЬ</small>
          <div className="el-level">
            <Seven value={level} digits={1} />
            <span>{themeName}</span>
          </div>
        </div>

        <div className="el-recess">
          <div className="el-red">
            <div className="el-dark">
              <div className="stage">
                {children}
                <div className="crt" />
              </div>
            </div>
          </div>
        </div>

        <div className="el-brand">
          <b>электроника</b>
        </div>

        {pills.map((pill, i) => (
          <PillButton key={`${pill.label}-${i}`} top={110 + i * 115} {...pill} />
        ))}

        <div className="el-lives">
          {[0, 1, 2].map((i) => (
            <i key={i} className={`el-led ${i < lives ? 'red' : ''}`} />
          ))}
          <span>жизни</span>
        </div>

        {onDirection &&
          ROUNDS.map((r) => (
            <div key={r.d} className="el-round" style={{ left: r.left, top: r.top }}>
              <button
                onPointerDown={(e) => {
                  e.preventDefault();
                  onDirection(r.d);
                }}
              >
                {r.arrow}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
