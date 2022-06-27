import { Preloads } from "../scenes/preloads.js";
import { MainMenu } from "../scenes/mainmenu.js";
import{nivel1} from "../scenes/nivel1.js";
import{nivel2} from "../scenes/nivel2.js";
import{nivel3}from "../scenes/nivel3.js";
import {victory} from "../scenes/victory.js";
import { retry } from "../scenes/retry.js";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [Preloads, MainMenu, nivel1 , nivel2, nivel3, victory, retry], // Listado de todas las escenas del juego, en orden
  // La primera escena es con la cual empieza el juego
};

var game = new Phaser.Game(config);