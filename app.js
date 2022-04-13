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

class Enemy{
    direction;
    enemyObject;

    constructor() {
        this.direction = 1;
        this.enemyObject = {};
    }
    createObjetct(){
        this.enemyObject = parent.physics.add.sprite(w, h, sprite, fnumber).setScale(1.5,1.5);
    }
    chnageDirection(parent, w, h, sprite, fnumber){
        this.direction *= -1;
    }
    addColider(parent, secoundObject, thirdObject){
        parent.physics.add.collider(this.enemyObject, secoundObject);
        parent.physics.add.collider(this.enemyObject, thirdObject, ()=>{
            this.chnageDirection()
        })
    }
    collideWith(parent, player){
        parent.physics.add.collider(this.enemyObject, player, ()=>{
            if(player.y+40 > this.enemyObject.y){
                player.active = false;
                player.disableBody(true, true);
            }else{
                this.enemyObject.active = false;
                this.enemyObject.disableBody(true, true)
            }
        })
    }
}



function preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("apple", "assets/apple.png");
    this.load.image("cloud", "assets/cloud.png");
    this.load.image("plants", "assets/plants.png");
    this.load.image("plant2", "assets/plant2.png");
    this.load.image("gemBlock", "assets/gemBlock.png");
    this.load.image("block", "assets/block.png");
    this.load.image("obs", "assets/obs.png")
    this.load.spritesheet('hero', 'assets/hero.png', {
        frameWidth: 57, frameHight: 90
    });
    this.load.spritesheet('enemy', 'assets/enemy.png', {
        frameWidth: 20, frameHight: 20
    });
}//teste

function create() {
    W = game.config.width;
    H = game.config.height;

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.e1 = new Enemy();
    /*

    this.e1.createObjetct(this, 1700, H-60, 'enemy', 0);


    this.e2 = new Enemy();
    this.e2.createObjetct(this, 1750, H-100, 'pou', 0);
    this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('pou', {
        start: 0, end:1
    }),
    repate: -1,
    frameRate: 10
    })

    */




    let ground = this.add.tileSprite(0, H - 48, W, 48, 'ground');
    ground.setOrigin(0, 0);
    this.physics.add.existing(ground, true);           // ground.body.allowGravity = false; // ground.body.immovable = true;



    let cloud = this.add.sprite(500, 500, "cloud").setScale(0.75, 0.75)  //nuvem
    let nuvem2 = this.add.sprite(1500, 500, "cloud").setScale(0.75, 0.75)  //nuvem
    let nuvem3 = this.add.sprite(1800, 600, "cloud").setScale(0.50, 0.50)
    let nuvem4 = this.add.sprite(200, 650, "cloud").setScale(0.80, 0.80)
    let nuvem5 = this.add.sprite(100, 300, "cloud").setScale(0.80, 0.80)
    let nuvem6 = this.add.sprite(1000, 100, "cloud").setScale(0.80, 0.80)

    let planta = this.add.sprite(1000, H - 70, "plants").setScale(0.50, 1);
    //let planta2 = this.add.sprite(1400, H - 70, "plants").setScale(0.50, 1);
    let plants = this.add.sprite(650, H - 70, "plants");
    //let planta3 = this.add.sprite(1900, H - 70, "plants").setScale(0.75, 1);
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
        repate: -1 //test commit
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
    blocks.create(1050, 700, "block").refreshBody()

    blocks.create(1200, 550, "block").refreshBody()
    blocks.create(1250, 550, "block").refreshBody()
    blocks.create(1300, 550, "block").refreshBody()

    blocks.create(1450, 400, "block").refreshBody()
    blocks.create(1500, 400, "block").refreshBody()
    blocks.create(1550, 400, "block").refreshBody()

    blocks.create(1000, 400, "block").refreshBody()
    blocks.create(950, 400, "block").refreshBody()
    blocks.create(900, 400, "block").refreshBody()
    blocks.create(950, 250, "gemBlock").refreshBody()

    blocks.create(750, 200, "block").refreshBody()
    blocks.create(700, 200, "block").refreshBody()
    blocks.create(650, 200, "block").refreshBody()
    blocks.create(600, 200, "block").refreshBody()
    blocks.create(550, 200, "block").refreshBody()
    blocks.create(500, 200, "block").refreshBody()
    blocks.create(450, 200, "block").refreshBody()
    blocks.create(400, 200, "block").refreshBody()
    blocks.create(350, 200, "block").refreshBody()
    blocks.create(300, 200, "block").refreshBody()
    blocks.create(250, 200, "block").refreshBody()
    blocks.create(200, 200, "block").refreshBody()
    blocks.create(150, 200, "block").refreshBody()
    blocks.create(100, 200, "block").refreshBody()
    blocks.create(400,50, "gemBlock").refreshBody()

//add platforms
    let platforms = this.physics.add.staticGroup();

    //Obstaculos onde vao estar inimigos
    platforms.create(1300, H - 70, "obs").setScale(0.20, 0.30).refreshBody();
    platforms.create(1700, H - 70, "obs").setScale(0.20, 0.30).refreshBody();

    platforms.create(200, 160, "obs").setScale(0.20, 0.30).refreshBody();
    platforms.create(600, 160, "obs").setScale(0.20, 0.30).refreshBody();


    platforms.add(ground);//

    //add a collision detection
    this.physics.add.collider(platforms, this.player)
    this.physics.add.collider(platforms, fruits);
    this.physics.add.collider(blocks, fruits);
    this.physics.add.overlap(this.player, fruits, eatFruit, null, this);
    this.physics.add.collider(this.player, blocks);
    /*
    this.e1.addColider(this, platforms, blocks);
    this.e1.collideWithPlayer(this, this.player);
    this.e2.addColider(this, platforms, blocks);
    this.e2.collideWithPlayer(this, this.player); //


     */

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
    /*
        this.e1.enemyObject.setVelocityX(50*this.e1.direction);
        this.e1.enemyObject.anims.play('run', true);
        this.e2.enemyObject.setVelocityX(-50*this.e1.direction);
        this.e2.enemyObject.anims.play('run', true);

     */
}

function eatFruit(player, fruit) {
    fruit.disableBody(true, true)
}