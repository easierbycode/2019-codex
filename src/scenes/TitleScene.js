import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH, PHASER_VERSION, SCENES } from '../constants.js';
import { atlasSprite, centeredOrigin, pixiOrigin } from '../origin.js';
import { resetRun } from '../state.js';
import { play } from '../sound.js';

export default class TitleScene extends Phaser.Scene {
  constructor() { super(SCENES.TITLE); }

  create() {
    this.add.image(0, 0, 'titleBg').setOrigin(0, 0).setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    const title = centeredOrigin(atlasSprite(this, GAME_WIDTH / 2, 104, 'gameUi', 'titleG.gif'));
    title.setScale(0.9);
    const start = this.add.text(GAME_WIDTH / 2, 328, 'START', { fontFamily: 'monospace', fontSize: '24px', color: '#ffe36a' }).setOrigin(0.5);
    const help = pixiOrigin(this.add.text(34, 374, 'HOW TO PLAY', { fontFamily: 'monospace', fontSize: '12px', color: '#ffffff' }));
    const version = pixiOrigin(this.add.text(8, GAME_HEIGHT - 16, `Phaser ${Phaser.VERSION} (target ${PHASER_VERSION})`, { fontFamily: 'monospace', fontSize: '9px', color: '#b7f7ff' }));
    this.tweens.add({ targets: start, alpha: 0.25, duration: 550, yoyo: true, repeat: -1 });
    help.setInteractive({ useHandCursor: true }).on('pointerup', () => window.howtoModalOpen?.());
    this.input.keyboard?.once('keydown-SPACE', () => this.startGame());
    this.input.once('pointerup', () => this.startGame());
    play('title');
  }

  startGame() {
    resetRun();
    this.scene.start(SCENES.GAME);
  }
}
