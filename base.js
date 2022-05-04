let player_config = {
    player_speed: 150,
    player_jumpspeed: -600,
}

let config = {
    type: Phaser.AUTO,
    scale: {
        //mode: Phaser.Scale.FIT,
        width: 1650,
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
let points=0;




//CREATE ENEMY
class Enemy{
    direction;
    enemyObject;

    constructor() {
        this.direction = 1;
        this.enemyObject = {};
    }
    createObject(parent, w, h, sprite, fnumber){
        this.enemyObject = parent.physics.add.sprite(w,h, sprite, fnumber).setScale(1.5, 1.5);
    }
    changeDirection(){
        this.direction *= -1;
    }

    addColider(parent, secondObject, thridObject){
        parent.physics.add.collider(this.enemyObject, secondObject);
        parent.physics.add.collider(this.enemyObject, thridObject, ()=>{
            this.changeDirection()
        });
    }
    collideWithPlayer(parent, player){
        parent.physics.add.collider(this.enemyObject, player, ()=>{
            if(player.y + 40 > this.enemyObject.y){
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
    this.load.image("castle", "assets/castle.png");
    this.load.image("obs", "assets/obs.png");
    this.load.spritesheet('hero', 'assets/hero.png', {
        frameWidth: 57, frameHight: 90
    });
    this.load.spritesheet('sprite', 'assets/inimigo.png', {
        frameWidth: 32, frameHight: 23
    });
    this.load.spritesheet('port', 'assets/portafim.png', {
        frameWidth: 70, frameHight: 140
    });
    this.load.spritesheet('castelo', 'assets/castle.png', {
        frameWidth: 70, frameHight: 140
    });
}

function create() {
    W=1650;
    H = game.config.height;

    scoreText = this.add.text(1400, 350, 'score: '+ points, { fontSize: '32px', fill: '#000' });


    /*
    create function
     */

    this.e1 = new Enemy();
    this.e1.createObject(this, 300, 165, 'sprite', 0);
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('sprite', {
            start:0, end:1
        }),
        repate: -1,
        frameRate: 10
    })

    this.e2 = new Enemy();
    this.e2.createObject(this, 1200, 200, 'sprite', 0);
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('sprite', {
            start:0, end:1
        }),
        repate: -1,
        frameRate: 10
    })

    this.e3 = new Enemy();
    this.e3.createObject(this, 1450, 200, 'sprite', 0);
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('sprite', {
            start:0, end:1
        }),
        repate: -1,
        frameRate: 10
    })


    let ground = this.add.tileSprite(0, H - 48, W, 48, 'ground');
    ground.setOrigin(0, 0);
    this.physics.add.existing(ground, true);           // ground.body.allowGravity = false; // ground.body.immovable = true;

    let cloud = this.add.sprite(500, 280, "cloud").setScale(0.75, 0.75)
    let cloud2 = this.add.sprite(850, 100, 'cloud').setScale(0.75,0.75)
    let plants = this.add.sprite(650, H - 70, "plants");
    let plant2 = this.add.sprite(150, H - 80, "plant2").setScale(0.75, 1);
    let castle = this.add.sprite(1590, 590, "castle").setScale(0.10, 0.10);
    this.player = this.physics.add.sprite(40, 90, 'hero', 8)
    this.player.setBounce(0.3)
    this.player.setCollideWorldBounds(true);
    //Player animation and Player movement

    //animation
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero', {
            start: 0, end: 7
        }),
        frameRate: 10,
        repate: -1
    })

    this.anims.create({
        key: 'center',
        frames: this.anims.generateFrameNumbers('hero', {
            start: 8, end: 8
        }),
        frameRate: 10
    })

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


    let fruits = this.physics.add.group({
        key: "apple",
        repeat: 40,
        setScale: { x: 0.05, y: 0.05 },
        setXY: { x: 200, y: 0, stepX: 100 },

    })
    /*
        let fruits = this.physics.add.group({
            key: "apple",
            repeat: 8,
            setScale: { x: 0.05, y: 0.05 },
            setXY: { x: 200, y: 0, stepX: 100 },

        })

     */

    fruits.children.iterate((f) => {
        f.setBounce(Phaser.Math.FloatBetween(0.4, 0.7))
    })


    let blocks = this.physics.add.staticGroup();

    blocks.create(350, 50, "gemBlock").refreshBody();
    blocks.create(170, 165, "obs").setScale(0.20, 0.30).refreshBody();
    blocks.create(600, 165, "obs").setScale(0.20, 0.30).refreshBody();

    blocks.create(1150, 220, "obs").setScale(0.20, 0.30).refreshBody();
    blocks.create(1500, 220, "obs").setScale(0.20, 0.30).refreshBody();




    //plataformas criadas para teste de porta do fim
    //blocks.create(1300, 520, "obs").setScale(0.20, 0.30).refreshBody();
    //blocks.create(1600, 520, "obs").setScale(0.20, 0.30).refreshBody();
    // blocks.create(1400, H-60, 'block').setScale(1, 0.75).refreshBody();
    //blocks.create(1655, H-60, 'block').setScale(1, 0.75).refreshBody();
    //fim de teste


    let platforms = this.physics.add.staticGroup();


    platforms.create(550, 500, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(600, 500, 'block').setScale(1.20, 0.75).refreshBody();
    platforms.create(650, 500, 'block').setScale(1, 0.75).refreshBody();

    platforms.create(800, 350, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(850, 350, 'block').setScale(1.20, 0.75).refreshBody();

    platforms.create(100, 200, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(150, 200, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(200, 200, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(250, 200, 'block').setScale(1.20, 0.75).refreshBody();
    platforms.create(300, 200, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(350, 200, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(400, 200, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(450, 200, 'block').setScale(1.20, 0.75).refreshBody();
    platforms.create(500, 200, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(550, 200, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(600, 200, 'block').setScale(1.20, 0.75).refreshBody();
    platforms.create(650, 200, 'block').setScale(1, 0.75).refreshBody();


    platforms.create(1100, 250, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(1150, 250, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(1200, 250, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(1250, 250, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(1300, 250, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(1350, 250, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(1400, 250, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(1450, 250, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(1500, 250, 'block').setScale(1, 0.75).refreshBody();
    platforms.create(1550, 250, 'block').setScale(1, 0.75).refreshBody();








    // platforms.create(1550, H-60, 'porta').setScale(1,1).refreshBody();

    platforms.add(ground);

    //add a collision detection
    this.physics.add.collider(platforms, this.player)
    this.physics.add.collider(platforms, fruits);
    this.physics.add.collider(blocks, fruits);
    this.physics.add.overlap(this.player, fruits, eatFruit, null, this);
    this.physics.add.collider(this.player, blocks);

    //add enemy obstacle
    this.e1.addColider(this, platforms, blocks);
    this.e1.collideWithPlayer(this, this.player);





    this.e2.addColider(this, platforms, blocks);
    this.e2.collideWithPlayer(this, this.player);

    this.e3.addColider(this, platforms, blocks);
    this.e3.collideWithPlayer(this, this.player);




    this.cameras.main.setBounds(0, 0, W, H);
    this.physics.world.setBounds(0, 0, W, H);

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

    //add enemy obstacle
    this.e1.enemyObject.setVelocityX(50*this.e1.direction);
    this.e1.enemyObject.anims.play('run', true);

    this.e2.enemyObject.setVelocityX(50*this.e2.direction);
    this.e2.enemyObject.anims.play('run', true);

    this.e3.enemyObject.setVelocityX(50*this.e3.direction);
    this.e3.enemyObject.anims.play('run', true);



}

function eatFruit(player, fruit) {
    let texto;
    fruit.disableBody(true, true)
    points=points+10;
    scoreText.setText('score: '+ points);

    if (points == 150){
        texto = this.add.text(1200, 350, 'CHEGUEI', { fontSize: '32px', fill: '#000' })
        player.active = false;
        player.disableBody(true, true);
    }

}