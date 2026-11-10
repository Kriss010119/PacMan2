const SEG: Record<string, string> = {
  '0': 'abcdef',
  '1': 'bc',
  '2': 'abdeg',
  '3': 'abcdg',
  '4': 'bcfg',
  '5': 'acdfg',
  '6': 'acdefg',
  '7': 'abc',
  '8': 'abcdefg',
  '9': 'abcdfg',
};

const RECTS = {
  a: [7, 2, 26, 6],
  b: [32, 8, 6, 24],
  c: [32, 38, 6, 24],
  d: [7, 62, 26, 6],
  e: [2, 38, 6, 24],
  f: [2, 8, 6, 24],
  g: [7, 32, 26, 6],
};

export { SEG, RECTS };
