import BaseUnit, { EVT } from './BaseUnit.js';
import { GAME_WIDTH } from '../constants.js';

export default class Boss extends BaseUnit {
  constructor(scene, data) {
    const frames = data.anim?.idle ?? data.texture;
    super(scene, GAME_WIDTH / 2 - 48, 64, { ...data, texture: frames, animationSpeed: 0.08 });
    this.baseY = this.y;
    this.t = 0;
    this.shootTimer = data.interval ?? 150;
    this.hitArea = { x: 15, y: 20, width: Math.max(20, this.width - 30), height: Math.max(20, this.height - 30) };
  }

  update(d) {
    this.t += d;
    this.x = GAME_WIDTH / 2 - this.width / 2 + Math.sin(this.t / 45) * 55;
    this.y = this.baseY + Math.sin(this.t / 65) * 12;
    this.shootTimer -= d;
    if (this.shootTimer <= 0) {
      this.shootTimer = this.dataRef.interval ?? 150;
      this.emit(EVT.TAMA_ADD, this);
    }
  }
}
