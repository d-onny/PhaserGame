module Castlevania{
    export class Level2_stuff extends Phaser.Group{
        item: Phaser.Group;
        temp: any;
        holder: any;

        constructor(game: Phaser.Game){
            super(game);
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.enableBody = true;

            //this.body.bounce.x = 0.2;
            //this.body.gravity.y = 100;
            this.create();


        }
        
        create(){
            // var self = this;
            // for (var i = 0; i < 12; i++)
            // {
            //     this.temp = this.item.create(i*70, 0, 'star');
            //     this.temp.body.gravity.y = 100;
            //     this.temp.bounce.y = 0.7 + Math.random() *0.2;
            // } 
            this.item = this.game.add.group();
            this.holder = this.item.create(0, 0, 'ground');
            this.holder.body.gravity.y = 300;
            this.holder.body.bounce.y = .5;
        }
    }
}