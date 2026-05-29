import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../constants.js';

export default class StageBackground extends Phaser.GameObjects.TileSprite {
  constructor(scene, imageKey) {
    super(scene, 0, 0, GAME_WIDTH, GAME_HEIGHT, imageKey);
    this.setOrigin(0, 0);
    scene.add.existing(this);
  }

  update(d) {
    this.tilePositionY -= 1.5 * d;
  }
}
