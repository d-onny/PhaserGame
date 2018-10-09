module Castlevania{
    export class MainMenu extends Phaser.State{
        background: Phaser.Sprite;
        logo: Phaser.Sprite;
        music: Phaser.Sound;

        // preload(){
        //     this.music2 = this.game.add.audio('music', );
        // }

        create(){
            //UNCOMMENT THESE LINES WHEN DONE
            this.music = this.game.add.audio('music', 0.4, true)
            this.music.play();

            this.background = this.add.sprite(0,0,'titlepage');
            this.background.alpha = 0;
            this.background.width = 800;
            this.background.height = 601;

            this.logo = this.add.sprite(this.world.centerX, -300,'logo');
            this.logo.anchor.setTo(0.5,0.5);
            this.logo.alpha = 0.85;
            this.logo.scale.setTo(0.75,0.75);

            this.add.tween(this.background).to({alpha:1}, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({y:220}, 2000,Phaser.Easing.Elastic.Out, true);
            
            this.input.onDown.addOnce(this.fadeOut,this);
        }
        
        fadeOut() {
            this.add.tween(this.background).to({alpha:0}, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({y:800},2000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startGame, this);
        }

        startGame() {
            this.game.state.start('Level2', true, false);
            //this.game.state.start('Level3', true, false);
        }
    }
}