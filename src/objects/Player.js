import Phaser from 'phaser';
import BaseUnit from './BaseUnit.js';
import Bullet from './Bullet.js';
import { GAME_HEIGHT, GAME_WIDTH } from '../constants.js';
import { play } from '../sound.js';

export default class Player extends BaseUnit {
  constructor(scene, data) {
    super(scene, GAME_WIDTH / 2 - 18, GAME_HEIGHT - 72, { ...data, hp: data.maxHp ?? 3, animationSpeed: 0.35 });
    this.shootTimer = 0;
    this.targetX = this.x;
    this.targetY = this.y;
    this.hitArea = { x: 7, y: 20, width: Math.max(8, this.width - 14), height: Math.max(8, this.height - 40) };
    scene.input.on('pointermove', (pointer) => {
      this.targetX = pointer.worldX - this.width / 2;
      this.targetY = pointer.worldY - this.height / 2;
    });
  }

  update(d, cursors, bullets) {
    const speed = 4.5 * d;
    if (cursors.left?.isDown) this.targetX -= speed;
    if (cursors.right?.isDown) this.targetX += speed;
    if (cursors.up?.isDown) this.targetY -= speed;
    if (cursors.down?.isDown) this.targetY += speed;
    this.targetX = Phaser.Math.Clamp(this.targetX, 0, GAME_WIDTH - this.width);
    this.targetY = Phaser.Math.Clamp(this.targetY, 42, GAME_HEIGHT - this.height);
    this.x += 0.15 * (this.targetX - this.x) * d;
    this.y += 0.15 * (this.targetY - this.y) * d;
    this.shootTimer -= d;
    if (this.shootTimer <= 0) {
      this.shootTimer = this.dataRef.shootNormal.interval;
      const bullet = new Bullet(this.scene, this.x + this.width / 2 - 5, this.y - 8, this.dataRef.shootNormal, 0, -7, 'player');
      bullets.add(bullet);
      play('shoot', { volume: 0.25 });
    }
  }
}
