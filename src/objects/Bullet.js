import BaseUnit from './BaseUnit.js';

export default class Bullet extends BaseUnit {
  constructor(scene, x, y, data, velocityX, velocityY, owner = 'player') {
    super(scene, x, y, data);
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.owner = owner;
    this.hitArea = { x: 2, y: 2, width: Math.max(2, this.width - 4), height: Math.max(2, this.height - 4) };
  }

  update(d) {
    this.x += this.velocityX * d;
    this.y += this.velocityY * d;
    if (this.y < -60 || this.y > 540 || this.x < -60 || this.x > 316) this.destroy();
  }
}
