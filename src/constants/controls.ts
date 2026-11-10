const ROUNDS = [
  { d: 3, arrow: '▲', left: 90, top: 830 },
  { d: 1, arrow: '▼', left: 90, top: 990 },
  { d: 2, arrow: '◀', left: 1560, top: 830 },
  { d: 0, arrow: '▶', left: 1560, top: 990 },
];

const KEYS: Record<string, number> = {
  ArrowRight: 0,
  ArrowDown: 1,
  ArrowLeft: 2,
  ArrowUp: 3,

  KeyD: 0,
  KeyS: 1,
  KeyA: 2,
  KeyW: 3,
};

export { ROUNDS, KEYS };
