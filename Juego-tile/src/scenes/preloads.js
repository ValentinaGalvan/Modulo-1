export class Preloads extends Phaser.Scene {
  constructor() {
    // key
    super("Preloads");
  }

  preload() {
    this.load.image("logo", "assets/imagenes/logo.png");
    this.load.image("mainmenu", "assets/imagenes/mainmenu.png");
    this.load.image("sky", "assets/imagenes/sky.png");
    this.load.image("fuego", "assets/imagenes/fuego.png");
    this.load.image("corazon", "assets/imagenes/corazon.png");
    this.load.image("victory", "assets/imagenes/ganaste.png");
    this.load.image("gameover", "assets/imagenes/perdiste.png");
    this.load.spritesheet("bruja", "assets/imagenes/bruja.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("bruja", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "bruja", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("bruja", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start("MainMenu");
  }
}