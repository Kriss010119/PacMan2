import { Seed } from './Seed';
import { getPole } from '../map/pole';

export class Field {
  cemki: Seed[] = [];
  bigcemki: Seed[] = [];

  constructor() {
    getPole().forEach((row, i) =>
      [...row].forEach((ch, j) => {
        if (ch === '0' || ch === '4') {
          this.cemki.push(new Seed(j * 36 + 18, i * 36 + 18));
        }
        if (ch === '5') {
          this.bigcemki.push(new Seed(j * 36 + 18, i * 36 + 18, true));
        }
      }),
    );
  }

  end(): number {
    return this.cemki.some((s) => s.visible === 1) ? 0 : 1;
  }
}
