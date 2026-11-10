import { cell } from '../map/pole';
import { fl, same } from '../helpers';
import { OPEN, PAC_OPEN } from '../../../constants';
import { drawSprite } from '../../sprites';
import { drawHero } from '../../skins';
import type { Skin } from '../../../types';

export class Pacman {
  x = 432;
  y = 828;
  radius = 36;
  kyda = 0;
  dir = -1;
  alt = false;
  side = false;
  private startTime = performance.now();

  get face() {
    return this.dir < 0 ? 3 : this.dir;
  }

  private phase(): number {
    const us = Math.floor((performance.now() - this.startTime) * 1000);
    return ((-us % 1_000_000) + 1_000_000) % 1_000_000;
  }

  private frame(limit: number) {
    const m = this.phase();
    this.alt = !(m <= limit || m >= 750_000);
  }

  private can(d: number): boolean {
    const r = this.radius;
    const x = this.x;
    const y = this.y;
    switch (d) {
      case 2:
        return same(
          cell(fl(y / 36), fl((x + r - 1) / 36) - 1),
          cell(fl((y + r - 1) / 36), fl((x + r - 1) / 36) - 1),
          PAC_OPEN,
        );
      case 0:
        return same(cell(fl(y / 36), fl(x / 36) + 1), cell(fl((y + r - 1) / 36), fl(x / 36) + 1), PAC_OPEN);
      case 3:
        return same(
          cell(fl((y + r - 1) / 36) - 1, fl(x / 36)),
          cell(fl((y + 35) / 36) - 1, fl((x + r - 1) / 36)),
          OPEN,
        );
      case 1:
        return same(cell(fl(y / 36) + 1, fl(x / 36)), cell(fl(y / 36) + 1, fl((x + r - 1) / 36)), OPEN);
    }
    return false;
  }

  move(want: number) {
    if ((this.x < 36 || this.x > 828) && this.kyda === 0) {
      this.x -= 1;
      this.dir = 2;
      if (this.x < -36) {
        this.x = 900;
      }
    } else if ((this.x < 36 || this.x > 828) && this.kyda === 1) {
      this.x += 1;
      this.dir = 0;
      if (this.x > 900) {
        this.x = -36;
      }
    } else {
      if (want >= 0 && want !== this.dir && this.can(want)) {
        this.dir = want;
      }
      if (this.dir >= 0 && this.can(this.dir)) {
        if (this.dir === 0) {
          this.x += 1;
          this.kyda = 1;
          this.side = false;
        } else if (this.dir === 2) {
          this.x -= 1;
          this.kyda = 0;
          this.side = true;
        } else if (this.dir === 3) {
          this.y -= 1;
        } else {
          this.y += 1;
        }
        this.frame(this.dir === 1 ? 250_000 : 500_000);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, skin: Skin) {
    if (skin === 'classic') {
      ctx.fillStyle = '#000';
      ctx.fillRect(this.x, this.y, this.radius, this.radius);
      if (drawSprite(ctx, `pacmen${this.face}${this.alt ? '_1' : ''}`, this.x, this.y)) {
        return;
      }
    }
    drawHero(ctx, skin, this.x, this.y, this.face, this.side, this.alt);
  }
}
