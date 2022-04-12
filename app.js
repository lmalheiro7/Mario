let player_config = {
    player_speed: 150,
    player_jumpspeed: -600,
}

let config = {
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.FIT,
        width: 3000,
        height: innerHeight - 5,
    },
    backgroundColor: '#049cd8',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000,
            },
            // debug: true
        }
    },
    scene: { preload, create, update, }
};

let game = new Phaser.Game(config);

function preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("apple", "assets/apple.png");
    this.load.image("cloud", "assets/cloud.png");
    this.load.image("plants", "assets/plants.png");
    this.load.image("plant2", "assets/plant2.png");
    this.load.image("gemBlock", "assets/gemBlock.png");
    this.load.image("block", "assets/block.png");
    this.load.spritesheet('hero', 'assets/hero.png', {
        frameWidth: 57, frameHight: 90
    });
}

function create() {
    W = game.config.width;
    H = game.config.height;



    let ground = this.add.tileSprite(0, H - 48, W, 48, 'ground');
    ground.setOrigin(0, 0);
    this.physics.add.existing(ground, true);           // ground.body.allowGravity = false; // ground.body.immovable = true;


    let cloud = this.add.sprite(500, 500, "cloud").setScale(0.75, 0.75)  //nuvem
    let nuvem2 = this.add.sprite(1500, 500, "cloud").setScale(0.75, 0.75)  //nuvem
    let nuvem3 = this.add.sprite(1800, 600, "cloud").setScale(0.50, 0.50)
    let nuvem4 = this.add.sprite(200, 650, "cloud").setScale(0.80, 0.80)

    let planta = this.add.sprite(1000, H - 70, "plants").setScale(0.50, 1);
    let planta2 = this.add.sprite(1400, H - 70, "plants").setScale(0.50, 1);
    let plants = this.add.sprite(650, H - 70, "plants");
    let planta3 = this.add.sprite(1900, H - 70, "plants").setScale(0.75, 1);
    let planta4 = this.add.sprite(2300, H-70, "plants").setScale(0.75, 1);


    let plant2 = this.add.sprite(100, H - 80, "plant2").setScale(0.75, 1);

    this.player = this.physics.add.sprite(40, 90, 'hero', 8) //boneco
    this.player.setBounce(0.3)   //Tamanho dos passos
    this.player.setCollideWorldBounds(true);

    //Player animation and Player movement

    //Animações para o boneco andar


    //ANIMAÇÃO PARA BONECO CORRER PARA A ESQUERDA
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero', {
            start: 0, end: 7
        }),
        frameRate: 10,
        repate: -1
    })

    //ANIMACAO PARA BONECO CORRER PARA A DIREITA
    this.anims.create({
        key: 'rigth',
        frames: this.anims.generateFrameNumbers('hero', {
            start: 9, end: 15
        }),
        frameRate: 10,
        repate: -1
    })

    //Keyboard

    this.cursors = this.input.keyboard.createCursorKeys();



 //ANIMACOES...FRUTAS, OBSTACULOS
    let fruits = this.physics.add.group({
        key: "apple",
        repeat: 20,
        setScale: { x: 0.05, y: 0.05 },
        setXY: { x: 200, y: 0, stepX: 100 },  //distancia das frutas
    })

        //SALTO DAS FRUTAS
    fruits.children.iterate((f) => {
        f.setBounce(Phaser.Math.FloatBetween(0.4, 0.7))
    })

    //add blocks
    let blocks = this.physics.add.staticGroup();
    //           LARGURA    ALTURA
    blocks.create(950, 700, "block").refreshBody()
    blocks.create(950, 700, "block").refreshBody()
    blocks.create(1000, 700, "block").refreshBody()

    blocks.create(1250, 650, "block").refreshBody()

    blocks.create(1000, 500, "gemBlock").refreshBody()


    blocks.create(850, 850, "gemBlock").refreshBody()


    blocks.create(800, H - 70, "obs").refreshBody()
   // blocks.create(1050, 490, "block").refreshBody()
   // blocks.create(1110, 490, "gemBlock").refreshBody();
   // blocks.create(1167, 490, "block").refreshBody()
    //blocks.create(1227, 490, "gemBlock").refreshBody();
    //blocks.create(1284, 490, "block").refreshBody()
   // blocks.create(1167, 350, "gemBlock").refreshBody();

//add platforms
    let platforms = this.physics.add.staticGroup();
     platforms.create(600, 400, 'ground').setScale(3, 0.75).refreshBody()
     platforms.create(700, 300, 'ground').setScale(3, 0.75).refreshBody();
     platforms.create(290, 320, 'ground').setScale(3, 0.75).refreshBody()
    platforms.add(ground);

    //add a collision detection
    this.physics.add.collider(platforms, this.player)
    this.physics.add.collider(platforms, fruits);
    this.physics.add.collider(blocks, fruits);
    this.physics.add.overlap(this.player, fruits, eatFruit, null, this);
    this.physics.add.collider(this.player, blocks);


    this.cameras.main.setBounds(0, 0, W, H);   //gravidade
    this.physics.world.setBounds(0, 0, W, H);  //gravidade
    this.cameras.main.startFollow(this.player, true, true);
    this.cameras.main.setZoom(1.5);


}


function update() {

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-player_config.player_speed);
        this.player.anims.play('left', true)
    }
    else if (this.cursors.right.isDown) {
        this.player.setVelocityX(player_config.player_speed);
        this.player.anims.play('rigth', true)
    }
    else {
        this.player.setVelocityX(0);
        this.player.anims.play('center', 'true')
    }

    //add jumping ablility
    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(player_config.player_jumpspeed)
    }
}

function eatFruit(player, fruit) {
    fruit.disableBody(true, true)
}