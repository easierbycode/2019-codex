import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH, SCENES } from '../constants.js';
import { hitTest } from '../hit.js';
import { addScore, gameState } from '../state.js';
import { play, stopAll } from '../sound.js';
import Boss from '../objects/Boss.js';
import Bullet from '../objects/Bullet.js';
import Enemy from '../objects/Enemy.js';
import Player from '../objects/Player.js';
import { EVT } from '../objects/BaseUnit.js';
import HUD from '../ui/HUD.js';
import StageBackground from '../ui/StageBackground.js';

const ENEMY_KEYS = ['enemyA', 'enemyB', 'enemyC'];
const BOSS_KEYS = ['boss0', 'boss1', 'boss2', 'boss3', 'bossExtra', 'boss4'];

export default class GameScene extends Phaser.Scene {
  constructor() { super(SCENES.GAME); }

  create() {
    this.recipe = this.cache.json.get('recipe');
    this.stageId = gameState.stageId;
    this.enemyTimer = 35;
    this.bossSpawned = false;
    this.cursors = this.input.keyboard?.createCursorKeys() ?? {};
    this.background = new StageBackground(this, `stageLoop${Math.min(4, this.stageId)}`);
    this.enemies = this.add.group({ runChildUpdate: false });
    this.enemyBullets = this.add.group({ runChildUpdate: false });
    this.playerBullets = this.add.group({ runChildUpdate: false });
    this.player = new Player(this, this.recipe.playerData);
    this.hud = new HUD(this);
    this.showBanner(`ROUND ${this.stageId + 1}`);
    this.sound.play('bgm', { loop: true, volume: 0.35 });
  }

  update(_time, delta) {
    const d = delta / (1000 / 60);
    this.background.update(d);
    this.player.update(d, this.cursors, this.playerBullets);
    this.hud.updateValues(gameState.score, this.player.hp);
    this.spawnWave(d);
    this.enemies.getChildren().forEach((enemy) => enemy.update(d));
    this.enemyBullets.getChildren().forEach((bullet) => bullet.update(d));
    this.playerBullets.getChildren().forEach((bullet) => bullet.update(d));
    this.handleCollisions();
  }

  spawnWave(d) {
    this.enemyTimer -= d;
    if (this.enemyTimer <= 0 && !this.bossSpawned) {
      this.enemyTimer = 62;
      const key = ENEMY_KEYS[Math.floor(Math.random() * ENEMY_KEYS.length)];
      const x = 18 + Math.floor(Math.random() * (GAME_WIDTH - 48));
      const enemy = new Enemy(this, x, -30, this.recipe.enemyData[key]);
      enemy.on(EVT.TAMA_ADD, (unit) => this.enemyShoot(unit));
      this.enemies.add(enemy);
    }
    if (!this.bossSpawned && this.time.now > 28000) this.spawnBoss();
  }

  spawnBoss() {
    this.bossSpawned = true;
    const boss = new Boss(this, this.recipe.bossData[BOSS_KEYS[this.stageId]]);
    boss.on(EVT.TAMA_ADD, (unit) => this.enemyShoot(unit, true));
    boss.on(EVT.DEAD, () => this.nextStage());
    this.enemies.add(boss);
    this.showBanner('FIGHT!');
  }

  enemyShoot(unit, spread = false) {
    const projectile = unit.dataRef.projectileData || unit.dataRef.projectileDataA || unit.dataRef.projectileDataB;
    if (!projectile?.texture) return;
    const count = spread ? 3 : 1;
    for (let i = 0; i < count; i += 1) {
      const vx = spread ? (i - 1) * 1.4 : 0;
      this.enemyBullets.add(new Bullet(this, unit.x + unit.width / 2, unit.y + unit.height, projectile, vx, projectile.speed + 1.2, 'enemy'));
    }
  }

  handleCollisions() {
    this.playerBullets.getChildren().forEach((bullet) => {
      this.enemies.getChildren().forEach((enemy) => {
        if (bullet.active && enemy.active && hitTest(bullet, enemy)) {
          bullet.destroy();
          enemy.damageBy(bullet.damage);
          if (!enemy.active) {
            addScore(enemy.score);
            play('explosion', { volume: 0.35 });
          }
        }
      });
    });
    this.enemyBullets.getChildren().forEach((bullet) => {
      if (bullet.active && this.player.active && hitTest(bullet, this.player)) {
        bullet.destroy();
        this.player.damageBy(bullet.damage);
        play('damage', { volume: 0.45 });
        if (!this.player.active) this.gameOver();
      }
    });
    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.active && this.player.active && hitTest(enemy, this.player)) {
        enemy.damageBy(999);
        this.player.damageBy(1);
        if (!this.player.active) this.gameOver();
      }
    });
  }

  nextStage() {
    gameState.stageId += 1;
    if (gameState.stageId >= BOSS_KEYS.length) {
      this.gameOver();
      return;
    }
    stopAll();
    this.scene.restart();
  }

  gameOver() {
    stopAll();
    this.scene.start(SCENES.RESULT);
  }

  showBanner(text) {
    const banner = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, text, { fontFamily: 'monospace', fontSize: '28px', color: '#ffffff', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
    this.tweens.add({ targets: banner, alpha: 0, y: banner.y - 30, duration: 1400, onComplete: () => banner.destroy() });
  }
}
