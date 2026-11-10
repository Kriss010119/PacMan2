import { cell } from '../map/pole';
import { fl, same, collision } from '../helpers';
import { OPEN } from '../../../constants';
import { distMap } from '../map/dist';
import { drawSprite } from '../../sprites';
import { drawEnemy } from '../../skins';
import { Pacman } from './Pacman';
import type { Skin } from '../../../types';

const KYDA_VEC = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export class Ghost {
  radius = 36;
  start = 0;
  go = 1;
  solevoi = 0;
  kyda: number;
  pac_x = 0;
  pac_y = 0;

  constructor(public x: number, public y: number, private pacman: Pacman, public kto: number) {
    this.kyda = [2, 0, 3, 2][kto];
    this.track();
  }

  private track() {
    const p = this.pacman;
    const dead = this.solevoi === 2;
    switch (this.kto) {
      case 0:
        this.pac_x = dead ? 396 : p.x - p.radius;
        this.pac_y = dead ? 396 : p.y;
        break;
      case 1:
        this.pac_x = dead ? 432 : p.x + p.radius;
        this.pac_y = dead ? 396 : p.y;
        break;
      case 2:
        this.pac_x = dead ? 468 : p.x;
        this.pac_y = dead ? 396 : p.y + p.radius;
        break;
      default:
        this.pac_x = dead ? 432 : p.x;
        this.pac_y = dead ? 432 : p.y - p.radius;
    }
  }

  sol() {
    if (this.solevoi === 0) {
      this.solevoi = 1;
      this.kyda = (this.kyda + 2) % 4;
    }
  }

  sol1() {
    if (this.solevoi === 1) {
      this.solevoi = 0;
      this.kyda = (this.kyda + 2) % 4;
    }
  }

  private dirs(): number[] {
    const r = this.radius;
    const s = this.solevoi;
    const ok = (a: string, b: string) => same(a, b, OPEN) || (s === 2 && a === '3' && b === '3');
    const yy = fl(this.y / 36);
    const y2 = fl((this.y + r - 1) / 36);
    const xx = fl(this.x / 36);
    const x2 = fl((this.x + r - 1) / 36);
    const v = [-1, -1, -1];
    let i = 0;
    if (ok(cell(yy, xx + 1), cell(y2, xx + 1)) && this.kyda !== 2) {
      v[i++] = 0;
    }
    if (ok(cell(yy + 1, xx), cell(yy + 1, x2)) && this.kyda !== 3) {
      v[i++] = 1;
    }
    if (ok(cell(yy, x2 - 1), cell(y2, x2 - 1)) && this.kyda !== 0) {
      v[i++] = 2;
    }
    if (ok(cell(fl((this.y + r - 1) / 36) - 1, xx), cell(fl((this.y + 35) / 36) - 1, x2)) && this.kyda !== 1) {
      v[i++] = 3;
    }
    return v;
  }

  private tryReturn(v: number[]): boolean {
    if (this.solevoi !== 2) {
      return false;
    }
    const tc = fl((this.pac_x + 18) / 36);
    const tr = fl((this.pac_y + 18) / 36);
    const cc = fl((this.x + 18) / 36);
    const cr = fl((this.y + 18) / 36);
    if (cc === tc && cr === tr) {
      return false;
    }
    const D = distMap(tc, tr);
    let best = -1;
    let bd = Infinity;
    for (const d of v) {
      if (d === -1) {
        continue;
      }
      const dd = D[cr + KYDA_VEC[d][1]]?.[cc + KYDA_VEC[d][0]] ?? Infinity;
      if (dd < bd) {
        bd = dd;
        best = d;
      }
    }
    if (best === -1) {
      return false;
    }
    this.kyda = best;
    return true;
  }

  private chase(v: number[]) {
    const dx = this.x - this.pac_x;
    const dy = this.y - this.pac_y;
    const sol1 = this.solevoi === 1;
    const geX = (dx >= 0 && !sol1) || (dx < 0 && sol1);
    const ltX = (dx < 0 && !sol1) || (dx >= 0 && sol1);
    const geY = (dy >= 0 && !sol1) || (dy < 0 && sol1);
    const ltY = (dy < 0 && !sol1) || (dy >= 0 && sol1);

    if (v[0] === 0 && v[1] === 2) {
      if (geX) {
        v[0] = -1;
      }
      if (ltX) {
        v[1] = -1;
      }
    }
    if (v[0] === 0 && v[2] === 2) {
      if (geX) {
        v[0] = -1;
      }
      if (ltX) {
        v[2] = -1;
      }
    }
    if (v[1] === 0 && v[2] === 2) {
      if (geX) {
        v[1] = -1;
      }
      if (ltX) {
        v[2] = -1;
      }
    }
    if (v[0] === 1 && v[1] === 3) {
      if (geY) {
        v[0] = -1;
      }
      if (ltY) {
        v[1] = -1;
      }
    }
    if (v[0] === 1 && v[2] === 3) {
      if (geY) {
        v[0] = -1;
      }
      if (ltY) {
        v[2] = -1;
      }
    }
    if (v[1] === 1 && v[2] === 3) {
      if (geY) {
        v[1] = -1;
      }
      if (ltY) {
        v[2] = -1;
      }
    }

    let count = 0;
    let lastDir = -1;
    for (const d of v) {
      if (d !== -1) {
        count++;
        lastDir = d;
      }
    }
    if (count === 1) {
      this.kyda = lastDir;
      return;
    }

    const pick = (a: number, b: number) => {
      this.kyda = !sol1 ? a : b;
    };
    if (v.includes(0) && v.includes(1)) {
      if (dx >= 0 && dy <= 0) {
        pick(1, 0);
      }
      if (dx <= 0 && dy >= 0) {
        pick(0, 1);
      } else if (dx <= dy) {
        pick(0, 1);
      } else if (dx >= dy) {
        pick(1, 0);
      }
    }
    if (v.includes(2) && v.includes(1)) {
      if (dx >= 0 && dy >= 0) {
        pick(2, 1);
      }
      if (dx <= 0 && dy <= 0) {
        pick(1, 2);
      } else if (-dx <= dy) {
        pick(2, 1);
      } else if (-dx >= dy) {
        pick(1, 2);
      }
    }
    if (v.includes(2) && v.includes(3)) {
      if (dx >= 0 && dy <= 0) {
        pick(2, 3);
      }
      if (dx <= 0 && dy >= 0) {
        pick(3, 2);
      } else if (dx <= dy) {
        pick(3, 2);
      } else if (dx >= dy) {
        pick(2, 3);
      }
    }
    if (v.includes(0) && v.includes(3)) {
      if (dx >= 0 && dy >= 0) {
        pick(3, 0);
      }
      if (dx < 0 && dy < 0) {
        pick(0, 3);
      } else if (-dx <= dy) {
        pick(3, 0);
      } else if (-dx > dy) {
        pick(0, 3);
      }
    }
  }

  private decide() {
    const v = this.dirs();
    if (this.tryReturn(v)) {
      return;
    }
    this.chase(v);
  }

  move(): number {
    this.go += 1;
    if (this.solevoi === 0) {
      this.go %= 100;
    } else if (this.solevoi === 1) {
      this.go %= 2;
    } else {
      this.go %= 100000;
    }
    this.track();

    const atTarget = this.x - this.pac_x === 0 && this.y - this.pac_y === 0;
    if (this.go !== 0 && !atTarget) {
      if (this.start === 0 && this.kto === 0) {
        if (this.x === 254 && this.y === 324) {
          this.start = 1;
        }
        if (this.start === 0 && this.y > 324) {
          this.y -= 1;
        } else if (this.start === 0 && this.x > 252) {
          this.x -= 1;
        }
      } else if (this.start === 0 && this.kto === 1) {
        if (this.x === 612 && this.y === 324) {
          this.start = 1;
        }
        if (this.start === 0 && this.y > 324) {
          this.y -= 1;
        } else if (this.start === 0 && this.x < 612) {
          this.x += 1;
        }
      } else if (this.start === 0 && this.kto === 2) {
        if (this.y === 310) {
          this.start = 1;
        } else {
          this.y -= 1;
        }
      } else if (this.start === 0 && this.kto === 3) {
        if (this.x === 240 && this.y === 324) {
          this.start = 1;
        }
        if (this.start === 0 && this.y > 324) {
          this.y -= 1;
        } else if (this.start === 0 && this.x > 240) {
          this.x -= 1;
        }
      } else {
        const c = cell(fl((this.y + 18) / 36), fl((this.x + 18) / 36));
        if (c === '4' || c === '3') {
          this.decide();
        }
        if (this.kyda === 0) {
          this.x += 1;
        }
        if (this.kyda === 1) {
          this.y += 1;
        }
        if (this.kyda === 2) {
          this.x -= 1;
        }
        if (this.kyda === 3) {
          this.y -= 1;
        }
      }
    } else if (atTarget && this.solevoi === 2) {
      this.solevoi = 0;
      this.kyda = [2, 0, 3, 2][this.kto];
      this.track();
      this.start = 0;
    }
    if (collision(this.pacman, this) && this.solevoi === 1) {
      this.solevoi = 2;
      return 1;
    }
    return 0;
  }

  draw(ctx: CanvasRenderingContext2D, skin: Skin, blink: boolean) {
    if (skin === 'classic') {
      const name = this.solevoi === 0 ? `elf${this.kto + 1}` : this.solevoi === 1 ? 'pryanik1' : 'pryanik2';
      if (drawSprite(ctx, name, this.x, this.y, this.solevoi === 2 ? 'brightness(0.4) sepia(1)' : undefined)) {
        return;
      }
    }
    drawEnemy(ctx, skin, this.x, this.y, this.kto, this.solevoi, this.kyda, blink);
  }
}
