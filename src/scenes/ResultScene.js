import Phaser from 'phaser';
import { GAME_WIDTH, SCENES } from '../constants.js';
import { gameState } from '../state.js';

export default class ResultScene extends Phaser.Scene {
  constructor() { super(SCENES.RESULT); }
  create() {
    this.add.rectangle(0, 0, 256, 480, 0x000000).setOrigin(0, 0);
    this.add.text(GAME_WIDTH / 2, 170, 'RESULT', { fontFamily: 'monospace', fontSize: '24px', color: '#ffffff' }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, 220, `SCORE ${gameState.score}\nHI ${gameState.hiScore}`, { fontFamily: 'monospace', fontSize: '16px', align: 'center', color: '#ffe36a' }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, 310, 'CLICK TO TITLE', { fontFamily: 'monospace', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5);
    this.input.once('pointerup', () => this.scene.start(SCENES.TITLE));
  }
}
