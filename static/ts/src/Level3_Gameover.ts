module Castlevania{
    export class Level3_Gameover extends Phaser.State{
        screen: Phaser.Button;

        create(){
            this.screen = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'gameover', this.onPress, this);
            this.screen.anchor.setTo(0.5,0.5);
            //this.screen.width = 800;
            this.screen.height = 600;
        }


        onPress(){
            this.game.state.start('Level3', true, false);
        }
    }
}