var player;
var corazon;
var fuego;
var cursors;
var score;
var gameOver;
var scoreText;
var scoreTime;
var scoreTimeText;
var timedEvent;
export class nivel2 extends Phaser.Scene {
    
    constructor() {
      super("nivel2");
      
    }
    init(data) {
        score = data.score;
    }
    preload() {
        this.load.tilemapTiledJSON("map2", "assets/tilemaps/nivel2.json");
        this.load.image("fondo", "assets/imagenes/sky.png");
        this.load.image(
          "plataforma",
          "assets/imagenes/plataforma.png"
        );
    }
    onSecond() {
        if (! gameOver)
        {       
           
            scoreTime = scoreTime - 1;
            scoreTimeText.setText('Tiempo: ' + scoreTime);
            if (scoreTime == 0) {
                timedEvent.paused = true;
                this.scene.start(
                  "retry",
                  { score: score } 
                );
         }            
        }
}
create() {
    scoreTime = 120

    timedEvent = this.time.addEvent({ 
      delay: 1000, 
      callback: this.onSecond, 
      callbackScope: this, 
      loop: true 
    });

    const map = this.make.tilemap({ key: "map2" });

    const tilesetBelow = map.addTilesetImage("sky", "fondo");
    const tilesetplataforma = map.addTilesetImage(
      "plataforma"
    );
    const belowLayer = map.createLayer("fondo", tilesetBelow, 0, 0);
    const worldLayer = map.createLayer("plataforma", tilesetplataforma, 0, 0);
    const objectsLayer = map.getObjectLayer("objetos");

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject("objetos", (obj) => obj.name === "bruja");

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "bruja");

    player.setBounce(0);
    player.setCollideWorldBounds(true);
    if ((cursors = !undefined)) {
        cursors = this.input.keyboard.createCursorKeys();
      }
  
      corazon = this.physics.add.group();
      objectsLayer.objects.forEach((objData) => {
        const { x = 0, y = 0, name, type } = objData;
        switch (type) {
          case "corazon": {
            var star = corazon.create(x, y, "corazon");
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            break;
          }
        }
      });
      fuegos = this.physics.add.group();
      objectsLayer.objects.forEach((objData) => {
        const { x = 0, y = 0, name, type } = objData;
        switch (type) {
          case "fuegos": {
            var fuego = fuegos.create(x, 16, "fuego");
            fuego.setBounce(1);
            fuego.setCollideWorldBounds(true);
            fuego.setVelocity(Phaser.Math.Between(-200, 200), 20);
            fuego.allowGravity = false;
          }
        }
      });
      scoreText = this.add.text(30, 6, "Score:" + score, {
        fontSize: "32px",
        fill: "#FFFFFF",
    });
    scoreTimeText = this.add.text(550, 6, "Tiempo :" + score, {
        fontSize: "32px",
        fill: "#000",
    });
    this.physics.add.collider(player, worldLayer);

    this.physics.add.collider(corazon, worldLayer)
    this.physics.add.collider(fuegos, worldLayer);

    this.physics.add.overlap(player, corazon, this.collectcorazon, null, this);

    this.physics.add.collider(player, fuegos, this.hitfuego, null, this);

    gameOver = false;
}
update() {

    if (corazon.countActive(true) === 0) {
     this.scene.start("nivel3", { score: score, scoreTime : scoreTime });
    }

    if (gameOver) {
        return;
      }
      if (cursors.left.isDown) {
        player.setVelocityX(-160);
  
        player.anims.play("left", true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
  
        player.anims.play("right", true);
    } else {
        player.setVelocityX(0);
  
        player.anims.play("turn");
    }
  
    if (cursors.up.isDown && player.body.blocked.down) {
        player.setVelocityY(-330);
    }
}
collectcorazon(player, corazon) {
    corazon.disableBody(true, true);
    score += 10;
    scoreText.setText("Score: " + score);
}
hitfuego(player, fuegos) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;

    setTimeout(() => {
      this.scene.start("retry", { score: score });
    }, 1000);
}

}