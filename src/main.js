import Phaser from 'phaser';
import { FPS, GAME_HEIGHT, GAME_WIDTH, PHASER_VERSION, SCENES } from './constants.js';
import { initSound } from './sound.js';
import GameScene from './scenes/GameScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import ResultScene from './scenes/ResultScene.js';
import TitleScene from './scenes/TitleScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'canvas',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: true,
  backgroundColor: '#000000',
  fps: { target: FPS, forceSetTimeOut: true },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PreloadScene, TitleScene, GameScene, ResultScene],
};

const game = new Phaser.Game(config);
initSound(game);

window.game = game;
window.__PHASER_TARGET_VERSION__ = PHASER_VERSION;
window.__PHASER_SCENES__ = SCENES;
