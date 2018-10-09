module Castlevania{
    export class unc extends Phaser.Sprite{
        base_angle: number = 10;
        direction: number;

        constructor(game:Phaser.Game, x: number, y: number, dir: number, key: string){
            super(game, x, y, key);
            game.add.existing(this);
            this.anchor.setTo(0.5,0.5);
            this.scale.setTo(0.25);
            this.angle = this.base_angle;
            this.alpha = 0; //0 is transparent
            this.direction = dir;
            this.create();
        }

        create(){
            var current = this;
            if (this.direction == 1){
                this.game.add.tween(this).to({alpha: 1}, 4000, Phaser.Easing.Linear.None, true)
                var tween1 = this.game.add.tween(this).to({x: -100, y: -100}, 8000, Phaser.Easing.Linear.None, true)
                tween1.onComplete.add(this.kill, this);
            }
            else if (this.direction == 0){
                this.game.add.tween(this).to({alpha: 1}, 4000, Phaser.Easing.Linear.None, true)
                var tween2 = this.game.add.tween(this).to({x: 900, y: -100}, 8000, Phaser.Easing.Linear.None, true)
                tween2.onComplete.add(this.kill, this);
            }

        }

        update(){
            this.angle +=1;
            
        }
    }
}