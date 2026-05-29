import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH, SCENES } from '../constants.js';
import { centeredOrigin, pixiOrigin } from '../origin.js';
import { gameState, resetRun } from '../state.js';
import { play } from '../sound.js';

export default class TitleScene extends Phaser.Scene {
  constructor() { super(SCENES.TITLE); }

  create() {
    this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'titleBg').setOrigin(0, 0);

    pixiOrigin(this.add.sprite(5, 20, 'gameUi', 'titleG.gif'));
    centeredOrigin(this.add.sprite(GAME_WIDTH / 2, 75, 'gameUi', 'logo.gif'));
    centeredOrigin(this.add.sprite(GAME_WIDTH / 2, 130, 'gameUi', 'subTitleEn.gif'));

    this.add.rectangle(0, GAME_HEIGHT - 120, GAME_WIDTH, 120, 0x000000, 1).setOrigin(0, 0);
    pixiOrigin(this.add.sprite(0, GAME_HEIGHT - 40, 'gameUi', 'titleCopyright.gif'));

    this.createHighScore();
    this.createTitleButtons();
    this.createStartArea();

    this.input.keyboard?.once('keydown-SPACE', () => this.startGame());
    play('title');
  }

  update() {
    const bg = this.children.list[0];
    if (bg instanceof Phaser.GameObjects.TileSprite) bg.tilePositionX += 0.5;
  }

  createHighScore() {
    const label = pixiOrigin(this.add.sprite(32, GAME_HEIGHT - 106, 'gameUi', 'hiScoreTxt.gif'));
    const score = String(gameState.hiScore).padStart(10, '0');
    let x = label.x + label.width + 3;
    for (const digit of score) {
      const sprite = pixiOrigin(this.add.sprite(x, label.y - 2, 'gameUi', `bigNum${digit}.gif`));
      x += sprite.width;
    }
    const tweet = centeredOrigin(this.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT - 71, 'gameUi', 'twitterBtn0.gif'));
    tweet.setInteractive({ useHandCursor: true });
    tweet.on('pointerover', () => tweet.setFrame('twitterBtn1.gif'));
    tweet.on('pointerout', () => tweet.setFrame('twitterBtn0.gif'));
    tweet.on('pointerdown', () => tweet.setFrame('twitterBtn2.gif'));
    tweet.on('pointerup', () => tweet.setFrame('twitterBtn0.gif'));
  }

  createTitleButtons() {
    const howto = pixiOrigin(this.add.sprite(15, 10, 'gameUi', 'howtoBtn0.gif'));
    howto.setInteractive({ useHandCursor: true });
    howto.on('pointerover', () => howto.setFrame('howtoBtn1.gif'));
    howto.on('pointerout', () => howto.setFrame('howtoBtn0.gif'));
    howto.on('pointerdown', () => howto.setFrame('howtoBtn2.gif'));
    howto.on('pointerup', () => {
      howto.setFrame('howtoBtn0.gif');
      window.howtoModalOpen?.();
    });

    const staff = pixiOrigin(this.add.sprite(GAME_WIDTH - 61 - 15, 10, 'gameUi', 'staffrollBtn0.gif'));
    staff.setInteractive({ useHandCursor: true });
    staff.on('pointerover', () => staff.setFrame('staffrollBtn1.gif'));
    staff.on('pointerout', () => staff.setFrame('staffrollBtn0.gif'));
    staff.on('pointerdown', () => staff.setFrame('staffrollBtn2.gif'));
    staff.on('pointerup', () => staff.setFrame('staffrollBtn0.gif'));
  }

  createStartArea() {
    const startText = centeredOrigin(this.add.sprite(GAME_WIDTH / 2, 330, 'gameUi', 'titleStartText.gif'));
    this.tweens.add({ targets: startText, alpha: 0, duration: 300, yoyo: true, repeat: -1, hold: 800 });

    const flashCover = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT - 120, 0xffffff, 0).setOrigin(0, 0);
    const startZone = this.add.zone(0, 50, GAME_WIDTH, GAME_HEIGHT - 170).setOrigin(0, 0).setInteractive({ useHandCursor: true });
    startZone.on('pointerover', () => startText.setScale(1.05));
    startZone.on('pointerout', () => startText.setScale(1));
    startZone.on('pointerup', () => {
      flashCover.setAlpha(0.3);
      this.tweens.add({ targets: flashCover, alpha: 0, duration: 1500 });
      this.startGame();
    });
  }

  startGame() {
    resetRun();
    this.scene.start(SCENES.GAME);
  }
}
