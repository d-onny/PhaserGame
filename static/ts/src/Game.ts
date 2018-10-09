module Castlevania {
    export class Game extends Phaser.Game{
        constructor(){
            super(800,600, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Level2', Level2, false);

            this.state.add('Level3_screen', Level3_screen, false);
            this.state.add('Level3', Level3, false);
            this.state.add('Level3_Gameover', Level3_Gameover,false);
            
            this.state.add('LastLevel', LastLevel, false);

            this.state.start('Boot');

        }
    }
}