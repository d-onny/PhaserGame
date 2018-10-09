module Castlevania{
    export class Level3 extends Phaser.State{
        background: Phaser.Sprite;
        emitter1: Phaser.Particles.Arcade.Emitter;
        emitter2: Phaser.Particles.Arcade.Emitter;
        player: Castlevania.Player_flat;
        player2: Castlevania.Player;
        text: Phaser.Text;
        count: number = 0;
        base_year: number = 1993;
        year: number = 1993;
        year_timer: Phaser.Timer;
        event: Phaser.Signal;
        hidden: Phaser.Button;

        create(){
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0,0, 'level3');
            this.background.width = 800;
            this.background.height = 600;
            
            this.hidden = this.game.add.button(0, 550, 'star',this.onComplete, this);
            this.hidden.alpha = 0;

            this.emitter1 = this.game.add.emitter(400, -32, 2000);
            this.emitter1.maxParticleScale = 0.025;
            this.emitter1.minParticleScale = 0.02;
            this.emitter1.makeParticles('raindrop',0,450, true, false);
            //this.emitter1.enableBody = true;
            
            
            this.emitter1.width = this.game.world.width * 1.5;
            this.emitter1.setYSpeed(20,150);
            this.emitter1.setXSpeed(-60,60);
            this.emitter1.start(false, 4000, 50);

            this.player = new Castlevania.Player_flat(this.game, 200,500);
            //this.player2 = new Castlevania.Player(this.game, 200,500);
            this.text = this.game.add.text(630,550,'Year:' + this.year, {fontSize: 32, fill: '#000'});

            this.year_timer = this.game.time.events;
            //this.year_timer = this.game.time.events.loop(1000, this.onAvoid, this);
            this.year_timer.loop(1000, this.onAvoid, this);

        }

        update(){
            this.game.physics.arcade.overlap(this.player, this.emitter1, this.onTouch, null, this);
            this.game.physics.arcade.collide(this.emitter1);

            if (this.year == 2017){
                this.emitter1.kill();
                this.year_timer.removeAll(); //remove the loop event
                this.player.kill();
                this.game.time.events.add(Phaser.Timer.SECOND*4,this.onComplete, this);
                this.year = 0; //stops this from executing more than once
            }
        }

        onTouch(){
            this.year = this.base_year;
            this.game.state.start('Level3_Gameover', true, false);

        }

        onAvoid(){
            this.year +=1;
            this.text.text = 'Year:' + this.year;
        }

        onComplete(){
            this.game.state.start('LastLevel', true, false);
        }

        // render(){
        //     this.game.debug.inputInfo(32, 32);
        // }
    }
}