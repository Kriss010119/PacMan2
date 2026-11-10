const BASE: Record<string, [number, number]> = {
  pacmen0: [34, 34],
  pacmen0_1: [35, 34],
  pacmen1: [34, 34],
  pacmen1_1: [35, 35],
  pacmen2: [34, 34],
  pacmen2_1: [35, 34],
  pacmen3: [34, 34],
  pacmen3_1: [35, 35],
  elf1: [36, 36],
  elf2: [36, 36],
  elf3: [36, 36],
  elf4: [36, 36],
  pryanik1: [36, 36],
  pryanik2: [36, 36],
  konfeta: [17, 7],
  bigkonfeta: [36, 14],
  podarok: [36, 33],
  life: [18, 17],
};

const SPRITE_NAMES = Object.keys(BASE);

export { SPRITE_NAMES, BASE };
