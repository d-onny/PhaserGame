module Castlevania{
    export class LastLevel extends Phaser.State{
        background: Phaser.Sprite;
        person: Phaser.Sprite;
        people: Phaser.Group;
        x_bound: number = 1150;
        y_bound: number = 600;
        music: Phaser.Sound;
        delta_x:number;
        text: Phaser.Text;

        create(){
            this.game.sound.stopAll();
            this.game.world.setBounds(0,0, 2000, 2000);

            //this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0,0, 'room');
            //this.background.scale.setTo(0.8,1);
            this.background.width = 1200;
            this.background.height = 600; 

            // this.person = this.add.sprite(500, 200, 'people',0);
            // //this.person.frame = 0; 

            // this.person = this.add.sprite(580, 100, 'people', 1);
            // this.person = this.add.sprite(580, 100, 'people', 2);

            this.people = this.game.add.group();
            this.people.create(475,194,'people',0);
            this.people.create(580,100,'people',1);
            this.people.create(120,220,'people',2);
            this.people.create(410,150,'people',4);
            // below is josh
            //this.people.create(980,400,'people',3); 
            this.people.create(410,70,'people',11);

            for(let i = 0; i<3; i++)
            {
                this.people.create(975 + i*70, 150, 'people',i+5);
            }

            for(let i = 0; i<3; i++)
            {
                this.people.create(980 + i*60, 296, 'people',i+8);
            }

            



            this.text = this.game.add.text(16,16,'2018: Now', {fontSize: 32, fill: '#000'});

            //change timing on this
            this.game.time.events.add(Phaser.Timer.SECOND*4, this.panCamera, this);


        }

        update(){

        }

        render(){
            //this.game.debug.cameraInfo(this.game.camera,32,32);
            //this.game.debug.inputInfo(32,32);
        }

        panCamera(){
            this.music = this.game.add.audio('doorbell',1, false);
            this.music.play();

            this.game.add.tween(this.camera).to({x: 399},10000, Phaser.Easing.Linear.None, true);

        }
    }
}