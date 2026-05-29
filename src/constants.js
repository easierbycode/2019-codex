export const GAME_WIDTH = 256;
export const GAME_HEIGHT = 480;
export const FPS = 30;
export const PHASER_VERSION = '4.1.0';

export const SCENES = {
  PRELOAD: 'PreloadScene',
  TITLE: 'TitleScene',
  GAME: 'GameScene',
  RESULT: 'ResultScene',
};

export const ATLASES = [
  ['gameAsset', 'assets/img/game_asset.png', 'assets/game_asset.json'],
  ['gameUi', 'assets/img/game_ui.png', 'assets/game_ui.json'],
  ['titleUi', 'assets/img/title_ui.png', 'assets/title_ui.json'],
];

export const IMAGES = {
  titleBg: 'assets/title_bg.jpg',
  stageLoop0: 'assets/img/stage/stage_loop0.png',
  stageLoop1: 'assets/img/stage/stage_loop1.png',
  stageLoop2: 'assets/img/stage/stage_loop2.png',
  stageLoop3: 'assets/img/stage/stage_loop3.png',
  stageLoop4: 'assets/img/stage/stage_loop4.png',
};

export const RECIPE = 'assets/game.json';

export const SOUNDS = {
  shoot: 'assets/sounds/se_shoot.mp3',
  explosion: 'assets/sounds/se_explosion.mp3',
  damage: 'assets/sounds/se_damage.mp3',
  ca: 'assets/sounds/se_ca.mp3',
  title: 'assets/sounds/scene_title/voice_titlecall.mp3',
  bgm: 'assets/sounds/boss_bison_bgm.mp3',
};

export const ITEM_TYPES = { POWERUP: 'powerup', BARRIER: 'barrier', SP: 'sp' };
