import Phaser from 'phaser';
import { GAME_WIDTH } from '../constants.js';
import { pixiOrigin } from '../origin.js';

export default class HUD extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.bg = scene.add.rectangle(0, 0, GAME_WIDTH, 32, 0x07070b, 0.78).setOrigin(0, 0);
    this.scoreText = scene.add.text(6, 6, 'SCORE 0', { fontFamily: 'monospace', fontSize: '10px', color: '#ffffff' });
    this.hpText = scene.add.text(174, 6, 'HP 3', { fontFamily: 'monospace', fontSize: '10px', color: '#ffffff' });
    this.caGlow = scene.add.circle(GAME_WIDTH - 30, 80, 18, 0xffdd55, 0.22);
    this.caText = scene.add.text(GAME_WIDTH - 40, 76, 'CA', { fontFamily: 'monospace', fontSize: '12px', color: '#fff6aa' });
    pixiOrigin(this.scoreText); pixiOrigin(this.hpText); pixiOrigin(this.caText);
    this.add([this.bg, this.scoreText, this.hpText, this.caGlow, this.caText]);
    scene.add.existing(this);
  }

  updateValues(score, hp) {
    this.scoreText.setText(`SCORE ${score}`);
    this.hpText.setText(`HP ${Math.max(0, hp)}`);
    this.caGlow.setAlpha(0.18 + Math.sin(this.scene.time.now / 120) * 0.08);
  }
}
