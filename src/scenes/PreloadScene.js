import Phaser from 'phaser';
import { ATLASES, IMAGES, RECIPE, SCENES, SOUNDS } from '../constants.js';

export default class PreloadScene extends Phaser.Scene {
  constructor() { super(SCENES.PRELOAD); }

  preload() {
    this.add.text(64, 225, 'LOADING...', { fontFamily: 'monospace', fontSize: '14px', color: '#ffffff' });
    ATLASES.forEach(([key, textureURL, atlasURL]) => this.load.atlas(key, textureURL, atlasURL));
    Object.entries(IMAGES).forEach(([key, url]) => this.load.image(key, url));
    this.load.json('recipe', RECIPE);
    Object.entries(SOUNDS).forEach(([key, url]) => this.load.audio(key, url));
  }

  create() {
    window.__PHASER_VERSION__ = Phaser.VERSION;
    this.scene.start(SCENES.TITLE);
  }
}
