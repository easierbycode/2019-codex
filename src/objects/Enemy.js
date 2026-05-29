import BaseUnit, { EVT } from './BaseUnit.js';

export default class Enemy extends BaseUnit {
  constructor(scene, x, y, data) {
    super(scene, x, y, { ...data, animationSpeed: 0.12 });
    this.shootTimer = data.interval ?? 180;
    this.hitArea = { x: 5, y: 5, width: Math.max(8, this.width - 10), height: Math.max(8, this.height - 10) };
  }

  update(d) {
    this.y += this.speed * d;
    this.shootTimer -= d;
    if (this.shootTimer <= 0 && this.dataRef.projectileData) {
      this.shootTimer = this.dataRef.interval ?? 180;
      this.emit(EVT.TAMA_ADD, this);
    }
    if (this.y > 520) this.destroy();
  }
}
