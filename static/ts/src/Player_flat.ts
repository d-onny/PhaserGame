module Castlevania{
    export class Player_flat extends Phaser.Sprite{
        cursors: Phaser.CursorKeys;
        max_xvel: number = 200;
        max_yvel: number = 200;

        constructor(game: Phaser.Game, x: number, y:number){
            super(game, x, y, 'plantdog');
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;

        }

        create(){

        }

        update(){
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.cursors = this.game.input.keyboard.createCursorKeys();
            if(this.cursors.left.isDown){
                this.body.velocity.x = -this.max_xvel;
            }
            else if(this.cursors.right.isDown){
                this.body.velocity.x = this.max_xvel;
            }
            
            if(this.cursors.up.isDown){
                this.body.velocity.y = -this.max_yvel;
            }
            else if (this.cursors.down.isDown){
                this.body.velocity.y = this.max_yvel;
            }
        }
    }
}