module Castlevania{
    export class Level2 extends Phaser.State{
        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Castlevania.Player;
        stuff: Castlevania.Level2_stuff; //check this
        platform: Phaser.Group;
        ground: Phaser.Sprite;
        unc: Phaser.Sprite;
        unc1: Phaser.Sprite;
        x_ratio: number;
        y_ratio: number;
        hitPlatform: boolean;
        hitStuff: boolean;
        stars: Phaser.Group;
        text: Phaser.Text;
        score: number = 0;
        event: Phaser.Signal;
        checker: boolean = false;
        count: number = 24;


        create(){
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0,0,'level2');
            this.background.alpha = 0.8;
            this.x_ratio = this.game.world.width/this.background.width;
            this.y_ratio = this.game.world.height/this.background.height;
            this.background.scale.setTo(this.x_ratio, this.y_ratio);

            this.platform = this.game.add.group();
            this.platform.enableBody = true;

            //ground and ledges
            //using floor.init to create the floors in level
            this.ground = this.floor_init(0, this.game.world.height - 64,'ground');
            this.ground.scale.setTo(2,2);

            for (var i = -150; i < 250; i+=32){
                var ledge = this.floor_init(i, 250, 'floor_egg');
                ledge.height = 32;
                ledge.width = 32;
            }

            for (var i = 400; i < 800; i+=32){
                var ledge = this.floor_init(i, 400, 'floor_egg');
                ledge.height = 32;
                ledge.width = 32;
            }


            //var ledge = this.floor_init(400,400,'ground');
            //ledge = this.floor_init(-150,250,'ground');
            

            // //TESTING THE NEW CLASS
            // this.unc1 = new unc(this.game, 800, 600, 1);
            // this.unc1 = new unc(this.game, 0, 600, 2);
            
            //MUSIC PLAYING
            // this.music = this.add.audio('music',1, false);
            // this.music.play();

            this.player = new Player(this.game, 58, this.game.world.height - 300)
            //this.stuff = new Level2_stuff(this.game);

            //making stars
            this.stars = this.game.add.group();
            this.stars.enableBody = true;
            for (let i = 0; i<this.count; i++)
            {
                // i want the stars to start at x = 0 again if pixel range goes over
                let spacing = (i*70) % (this.game.world.width + 0);
                var star = this.stars.create(spacing, 0, 'dogecoin');
                //star.scale.setTo(0.10);
                star.height = 32;
                star.width = 32;
                star.body.gravity.y = 100;
                star.body.bounce.y = 0.7 + Math.random() *0.2;
            }

            //text
            this.text = this.game.add.text(16,16,'Collect all coins to get to next level!', {fontSize: 32, fill: '#FFFFFF'});

            //create function to perform (this.diag) when signal is dispatched
            this.event = new Phaser.Signal();
            this.event.add(this.diag, this)
            
            //add or addonce? did addonce to be safe
            //this.player.events.onKilled.addOnce(this.nextLevel, this);

            
        }

        update() {
            this.hitPlatform = this.game.physics.arcade.collide(this.player, this.platform)
            this.hitStuff = this.game.physics.arcade.collide(this.stuff, this.platform);
            this.game.physics.arcade.collide(this.stars, this.platform);
            this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
            

            
        }

        //additional functions
        collectStar (player,star){
            star.kill(); //statement does not use this.star, why?
            this.score+=10;
            this.text.text = 'Bitconnect2 coins: ' + this.score;

            var dir = (this.score % 40) / 20;
            // if (dir == 1){
            //     this.unc1 = new unc(this.game, 800, 600, dir);
                
            // }
            // else if (dir == 0 && this.score >30){
            //     this.unc1 = new unc(this.game, 0, 600, dir);
            // }
            if (this.score > 10 && (this.score % 20 == 0)){
                this.event.dispatch(dir);
            }

            //check this
            if (this.score > ((this.count-1)*10)){
                this.game.time.events.add(Phaser.Timer.SECOND*5,this.nextLevel, this);
            }
            
        }

        floor_init(x: number, y:number, img:string){
            let temp = this.platform.create(x,y,img);
            temp.body.immovable = true; 
            return temp
        }

        //diagonal movement done (every 30 pts) from dispatch in collectStar
        diag(value:number){

            if (this.score < 130){
                this.unc1 = new unc(this.game, value*800, 600, value, 'unc1');
            }
            else {
                this.unc1 = new unc(this.game, value*800, 600, value, 'unc2');

            }
        }

        nextLevel(){
            this.game.state.start('Level3_screen', true, false);
        }


    }
}