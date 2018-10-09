module Castlevania {
    export class Preloader extends Phaser.State{
        preloadBar: Phaser.Sprite;
        baseURL: string = 'static/assets_main/';
        q1screen: Phaser.Button;
        preload(){
            this.preloadBar = this.add.sprite(200,250, 'preloadBar');
            // this.preloadBar.width = 400;
            // this.preloadBar.height = 40;
            //this.preloadBar.scale.setTo(0.8);
            //make the preloadBar a sprite with a preload property, this just makes it so that the bar will be cropped until everything is loaded
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('q1', this.baseURL + 'q1.png');

            this.load.image('titlepage', this.baseURL + 'titlepage.png');
            this.load.image('logo', this.baseURL + 'logo.png');
            this.load.audio('music', this.baseURL + 'march_song.mp3', true);
            this.load.spritesheet('doggo', this.baseURL + 'DogWalk.png', 112, 68, 10);
            this.load.image('level2', this.baseURL + 'hollowbg.png');
            this.load.image('floor_egg', this.baseURL + 'Arcane_Egg.png');
            this.load.image('ground',this.baseURL + 'platform.png');
            this.load.image('dogecoin', this.baseURL + 'dogecoin.png');
            this.load.image('star', this.baseURL + 'coin.png');
            this.load.image('unc1', this.baseURL + 'unc1.png');
            this.load.image('unc2', this.baseURL + 'unc2.png');
            this.load.image('room', this.baseURL + 'room.png');

            //level3
            this.load.image('screen', this.baseURL + 'level3_instructions.png');
            this.load.image('bullet', this.baseURL + 'bullet.png');
            this.load.image('raindrop',this.baseURL + 'raindrop.png');
            this.load.image('level3', this.baseURL + 'sky3.png');
            this.load.image('gameover', this.baseURL + 'gameover.png');

            //for last level
            this.load.image('plantdog', this.baseURL + 'j_pic.png');
            this.load.audio('doorbell', this.baseURL + 'doorbell.mp3');
            //below is for no spacing img
            //this.load.spritesheet('people', this.baseURL + 'people.png', 60, 80,12);
            this.load.spritesheet('people', this.baseURL + 'people.png', 60, 80,12,0,4);


            //this.load.json('q1', this.baseURL + 'q1.json');
        }

        create(){
            var tween = this.add.tween(this.preloadBar).to({alpha:0}, 1000, Phaser.Easing.Linear.None,true);
            this.q1screen = this.add.button(this.game.world.centerX, this.game.world.centerY, 'q1', this.startMainMenu, this)
            this.q1screen.anchor.setTo(0.5,0.5);
            this.q1screen.width = 800;
            this.q1screen.height = 600;
            //tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu(){
            this.game.state.start('MainMenu', true, false); //check this
            //this.game.state.start('LastLevel', true, false);
        }
    }
}