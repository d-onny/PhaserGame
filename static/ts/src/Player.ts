module Castlevania{
    export class Player extends Phaser.Sprite{
        cursors: Phaser.CursorKeys;
        scaling:number = 0.5;

        constructor(game: Phaser.Game,x: number, y:number){
            super(game, x, y, 'doggo', 0);
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', null, 10, true);
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 350;
            this.body.collideWorldBounds = true;
            this.scale.setTo(this.scaling);
            //this.events.onKilled.add(this.onDeath, this);
        }

        create(){
        }
        update(){
            this.body.velocity.x = 0;
            this.cursors = this.game.input.keyboard.createCursorKeys();
            if (this.cursors.left.isDown){
                this.body.velocity.x = -150; //doesn't show velocity.x
                this.animations.play('walk');

                if (this.scale.x == this.scaling){
                    this.scale.x = -1 * this.scaling; // reverses the sprite?
                }
            }
            else if (this.cursors.right.isDown){

                this.body.velocity.x = 150;
                this.animations.play('walk');
                

                if(this.scale.x == -1* this.scaling) {
                    this.scale.x = this.scaling;
                }

            }
            else {
                this.animations.frame = 5;
            }

            //have a separate 'if' statement for vertical movement
            if (this.cursors.up.isDown && this.body.touching.down){
                this.body.velocity.y = -350;
            }

        }

        onDeath(){
            this.game.state.start('LastLevel', true, false);
        }
    }
}