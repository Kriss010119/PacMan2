import { Elektronika } from './Elektronika';
import { getMaxScore, getTop } from '../game';
import type { RecordsProps } from '../types';

export const Records = ({ onPlay, onMenu }: RecordsProps) => {
  const top = getTop();

  return (
    <Elektronika
      title="ПАКМЕН"
      score={0}
      max={getMaxScore()}
      level={1}
      lives={3}
      pills={[
        { label: 'ИГРАТЬ', onClick: onPlay },
        { label: 'МЕНЮ', onClick: onMenu },
      ]}
    >
      <div className="crt-center">
        <h2 className="neon-sub">РЕКОРДЫ</h2>

        <ol className="scores-table">
          {Array.from({ length: 5 }, (_, i) => (
            <li key={i} className={i === 0 ? 'first' : ''}>
              <span>{i + 1}.</span>
              <span>{top[i] !== undefined ? String(top[i]).padStart(6, '0') : '------'}</span>
            </li>
          ))}
        </ol>
      </div>
    </Elektronika>
  );
};
