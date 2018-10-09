module Castlevania{
    export class Level3_screen extends Phaser.Group{
        background: Phaser.Sprite;

        create(){
            this.background = this.game.add.sprite(0,0,'screen');
            this.background.width = 800;
            this.background.height = 600;

            this.game.time.events.add(Phaser.Timer.SECOND*4,this.goNext, this);

        }

        goNext(){
            this.game.state.start('Level3', true, false);
        }
    }
}