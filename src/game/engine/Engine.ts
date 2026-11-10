import { MAX_LEVEL, SIZE, FONT, THEMES } from '../../constants/game';
import { addScore, getMaxScore, saveScore } from '../records';
import { SPRITE_NAMES, drawSprite, sprite } from '../sprites';
import { fl, overlap, secondsSince, collision } from './helpers';
import { getPole, setPole } from './map/pole';
import { getWalls } from './map/walls';
import { Pacman } from './entities/Pacman';
import { Ghost } from './entities/Ghost';
import { Field } from './entities/Field';
import { Cherry } from './entities/Cherry';

export class Engine {
  paused = 1;
  score = 0;
  level = 1;
  maxScore = getMaxScore();
  want = -1;

  private pacman!: Pacman;
  private ghosts!: Ghost[];
  private pole!: Field;
  private lives = [1, 1, 1];
  private vremia = performance.now();
  private o = 1;
  private cherry = new Cherry(900, 900);
  private freeze = 0;
  private finished = false;
  private first: number;

  constructor(first = 1) {
    this.first = first;
    SPRITE_NAMES.forEach(sprite);
    this.fullReset();
  }

  get tps() {
    return 144 * THEMES[this.level - 1].speed;
  }

  get livesLeft() {
    return this.lives.reduce((a, b) => a + b, 0);
  }

  get themeName() {
    return THEMES[this.level - 1].name;
  }

  private spawnActors() {
    this.pacman = new Pacman();
    this.want = -1;
    this.ghosts = [
      new Ghost(396, 396, this.pacman, 0),
      new Ghost(432, 396, this.pacman, 1),
      new Ghost(468, 396, this.pacman, 2),
      new Ghost(432, 432, this.pacman, 3),
    ];
  }

  private startLevel() {
    setPole(THEMES[this.level - 1].map);
    this.spawnActors();
    this.pole = new Field();
    this.o = 1;
    this.vremia = performance.now();
    this.cherry = new Cherry(900, 900);
    this.freeze = Math.round(this.tps * 1.6);
  }

  private fullReset() {
    this.level = this.first;
    this.lives = [1, 1, 1];
    this.paused = 1;
    this.score = 0;
    this.finished = false;
    this.startLevel();
  }

  private saveRecord() {
    if (this.score > this.maxScore) {
      this.maxScore = this.score;
      saveScore(this.score);
    }
  }

  finish() {
    if (this.finished) {
      return;
    }
    this.finished = true;
    addScore(this.score);
    this.maxScore = Math.max(this.maxScore, this.score);
  }

  setWant(d: number) {
    this.want = d;
  }

  restart() {
    this.fullReset();
  }

  togglePause() {
    this.saveRecord();
    this.paused *= -1;
  }

  tick() {
    if (this.paused !== 1) {
      this.saveRecord();
      return;
    }
    if (this.freeze > 0) {
      this.freeze--;
      return;
    }
    this.tickCherry();
    this.tickSeeds();
    this.tickActors();
    if (this.tickEnd()) {
      return;
    }
    this.tickDeath();
  }

  private tickCherry() {
    const pac = this.pacman;
    const c = this.cherry;
    const pacRect = { x: pac.x, y: pac.y, w: pac.radius, h: pac.radius };
    if (Math.floor(Math.random() * 1000) % 1000 === 0 && c.visible === 0) {
      const { col, row } = this.randomOpenCell();
      this.cherry = new Cherry(col * 36, row * 36);
      this.cherry.visible = 1;
      this.cherry.vremi = performance.now();
    }
    if (secondsSince(c.vremi) >= 30) {
      c.visible = 0;
    }
    if (c.visible === 1 && overlap(pacRect, { x: c.x, y: c.y, w: 36, h: 36 })) {
      c.visible = 0;
      this.score += 150;
    }
  }

  private randomOpenCell() {
    const pole = getPole();
    let col = Math.floor(Math.random() * 1000) % 25;
    let row = Math.floor(Math.random() * 1000) % 25;
    while (pole[row][col] !== '0' && pole[row][col] !== '4') {
      col = Math.floor(Math.random() * 1000) % 25;
      row = Math.floor(Math.random() * 1000) % 25;
    }
    return { col, row };
  }

  private tickSeeds() {
    const pac = this.pacman;
    for (const s of this.pole.cemki) {
      if (s.colis(pac) === 1) {
        this.score += 1;
      }
    }
    for (const s of this.pole.bigcemki) {
      if (s.colis(pac) === 1) {
        this.ghosts.forEach((g) => g.sol());
        this.vremia = performance.now();
        this.o = 0;
      }
    }
    if (secondsSince(this.vremia) >= 5 && this.o === 0) {
      this.ghosts.forEach((g) => g.sol1());
      this.o = 1;
    }
  }

  private tickActors() {
    this.pacman.move(this.want);
    for (const g of this.ghosts) {
      if (g.move() === 1) {
        this.score += 200;
      }
    }
  }

  private tickEnd(): boolean {
    if (this.pole.end() !== 1) {
      return false;
    }
    if (this.level < MAX_LEVEL) {
      this.level++;
      this.startLevel();
      return true;
    }
    this.paused = 2;
    this.finish();
    return false;
  }

  private tickDeath() {
    const pac = this.pacman;
    if (!this.ghosts.some((g) => g.solevoi === 0 && collision(pac, g))) {
      return;
    }
    this.spawnActors();
    this.freeze = Math.round(this.tps * 0.8);
    if (this.lives[0] === 1) {
      this.lives[0] = 0;
    } else if (this.lives[1] === 1) {
      this.lives[1] = 0;
    } else if (this.lives[2] === 1) {
      this.lives[2] = 0;
      this.paused = 3;
      this.finish();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const th = THEMES[this.level - 1];
    ctx.fillStyle = th.bg;
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.drawImage(getWalls(this.level), 0, 0);

    this.pole.cemki.forEach((s) => s.draw(ctx, th.skin));
    this.pole.bigcemki.forEach((s) => s.draw(ctx, th.skin));
    this.drawCherry(ctx);
    this.pacman.draw(ctx, th.skin);
    const blink = this.frightenedBlink();
    this.ghosts.forEach((g) => g.draw(ctx, th.skin, blink));

    this.drawLives(ctx);
    this.drawScore(ctx);
    this.drawFrightenedTimer(ctx);
    this.drawFreezeScreen(ctx, th.name);
    ctx.textAlign = 'left';
  }

  private drawLives(ctx: CanvasRenderingContext2D) {
    this.lives.forEach((alive, i) => {
      if (!alive) {
        return;
      }
      const x = 380 + i * 40;
      const y = 436;
      if (drawSprite(ctx, 'life', x + 1, y + 1)) {
        return;
      }
      ctx.fillStyle = '#e62937';
      ctx.beginPath();
      ctx.arc(x + 14, y + 16, 8, Math.PI, 0);
      ctx.arc(x + 26, y + 16, 8, Math.PI, 0);
      ctx.lineTo(x + 34, y + 20);
      ctx.lineTo(x + 20, y + 34);
      ctx.lineTo(x + 6, y + 20);
      ctx.closePath();
      ctx.fill();
    });
  }

  private drawScore(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.font = `16px ${FONT}`;
    ctx.fillText(`SCORE ${this.score}`, 432, 478);
  }

  private drawFrightenedTimer(ctx: CanvasRenderingContext2D) {
    if (this.o !== 0) {
      return;
    }
    const s = secondsSince(this.vremia);
    ctx.font = `28px ${FONT}`;
    ctx.fillText(String(5 - s), 432, 396);
  }

  private drawFreezeScreen(ctx: CanvasRenderingContext2D, name: string) {
    if (this.freeze <= 0 || this.paused !== 1) {
      return;
    }
    ctx.fillStyle = 'rgba(0,0,0,.85)';
    ctx.fillRect(250, 380, 400, 110);
    ctx.fillStyle = '#ffd54f';
    ctx.font = `26px ${FONT}`;
    ctx.fillText(`LEVEL ${this.level}`, 450, 402);
    ctx.fillStyle = '#fff';
    ctx.font = `14px ${FONT}`;
    ctx.fillText(name, 450, 450);
  }

  private frightenedBlink() {
    if (this.o !== 0) {
      return false;
    }
    const left = 5000 - (performance.now() - this.vremia);
    return left < 1500 && Math.floor(left / 150) % 2 === 0;
  }

  private drawCherry(ctx: CanvasRenderingContext2D) {
    const ch = this.cherry;
    if (ch.visible !== 1) {
      return;
    }
    if (drawSprite(ctx, 'podarok', ch.x, ch.y)) {
      return;
    }
    ctx.fillStyle = '#d32f2f';
    ctx.fillRect(ch.x + 6, ch.y + 10, 24, 20);
    ctx.fillStyle = '#ffd54f';
    ctx.fillRect(ch.x + 16, ch.y + 10, 4, 20);
    ctx.fillRect(ch.x + 6, ch.y + 18, 24, 4);
    ctx.fillRect(ch.x + 4, ch.y + 6, 28, 5);
  }
}
