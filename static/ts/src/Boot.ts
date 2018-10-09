module Castlevania{
    export class Boot extends Phaser.State{
        baseURL: string = 'static/assets_main/';
        preload(){
            this.load.image('preloadBar', this.baseURL + 'loader.png');
        }

        create(){
            //if multitouch is not needed, set the below to 1
            this.input.maxPointers = 1;
            this.game.load.crossOrigin = 'anonymous';
            //disabling the game pause when browser is not in focus
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop){
                //desktop specific settings go in here, check this
                //this.stage.scale.pageAlignHorizontally = true;
                this.scale.pageAlignHorizontally = true;
            }
            else {
                //mobile settings in here, or anything thats not desktop
            }
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        }
    }
}