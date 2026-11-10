import { RECTS, SEG } from '../constants';

export const Seven = ({ value, digits }: { value: number; digits: number }) => {
  const text = String(Math.min(value, 10 ** digits - 1)).padStart(digits, ' ');

  return (
    <div className="seven">
      {[...text].map((ch, i) => (
        <svg key={i} viewBox="0 0 40 70" width={34} height={60} style={{ transform: 'skewX(-6deg)' }}>
          {Object.entries(RECTS).map(([k, [x, y, w, h]]) => (
            <rect
              key={k}
              x={x}
              y={y}
              width={w}
              height={h}
              rx={2}
              fill={(SEG[ch] ?? '').includes(k) ? '#1d1f1a' : 'rgba(0, 0, 0, 0.08)'}
            />
          ))}
        </svg>
      ))}
    </div>
  );
};
