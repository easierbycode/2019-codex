import Phaser from 'phaser';
import { ensureAnim } from '../anims.js';
import { pixiOrigin } from '../origin.js';

export const EVT = { DEAD: 'dead', TAMA_ADD: 'tamaAdd' };

let nextId = 0;

export default class BaseUnit extends Phaser.GameObjects.Container {
  constructor(scene, x, y, data, atlas = 'gameAsset') {
    super(scene, x, y);
    this.dataRef = data;
    this.atlas = atlas;
    this.hp = data.hp ?? 1;
    this.maxHp = data.maxHp ?? this.hp;
    this.score = data.score ?? 0;
    this.spgage = data.spgage ?? 0;
    this.speed = data.speed ?? 1;
    this.damage = data.damage ?? 1;
    this.id = nextId++;

    const frames = data.texture ?? data.anim?.idle ?? ['player00.gif'];
    this.character = pixiOrigin(scene.add.sprite(0, 0, atlas, frames[0]));
    this.add(this.character);
    if (frames.length > 1) {
      this.character.play(ensureAnim(scene, `${data.name ?? 'unit'}-${this.id}`, atlas, frames, data.animationSpeed ?? 0.1));
    }

    this.setSize(this.character.width, this.character.height);
    this.hitArea = { x: 0, y: 0, width: this.width, height: this.height };
    scene.add.existing(this);
  }

  damageBy(amount = 1) {
    this.hp -= amount;
    if (this.hp <= 0) this.kill();
  }

  kill() {
    this.emit(EVT.DEAD, this);
    this.destroy();
  }
}
