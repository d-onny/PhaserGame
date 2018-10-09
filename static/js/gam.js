var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Castlevania;
(function (Castlevania) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseURL = 'static/assets_main/';
            return _this;
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', this.baseURL + 'loader.png');
        };
        Boot.prototype.create = function () {
            //if multitouch is not needed, set the below to 1
            this.input.maxPointers = 1;
            this.game.load.crossOrigin = 'anonymous';
            //disabling the game pause when browser is not in focus
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                //desktop specific settings go in here, check this
                //this.stage.scale.pageAlignHorizontally = true;
                this.scale.pageAlignHorizontally = true;
            }
            else {
                //mobile settings in here, or anything thats not desktop
            }
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    Castlevania.Boot = Boot;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 800, 600, Phaser.AUTO, 'content', null) || this;
            _this.state.add('Boot', Castlevania.Boot, false);
            _this.state.add('Preloader', Castlevania.Preloader, false);
            _this.state.add('MainMenu', Castlevania.MainMenu, false);
            _this.state.add('Level2', Castlevania.Level2, false);
            _this.state.add('Level3_screen', Castlevania.Level3_screen, false);
            _this.state.add('Level3', Castlevania.Level3, false);
            _this.state.add('Level3_Gameover', Castlevania.Level3_Gameover, false);
            _this.state.add('LastLevel', Castlevania.LastLevel, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    Castlevania.Game = Game;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var LastLevel = /** @class */ (function (_super) {
        __extends(LastLevel, _super);
        function LastLevel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.x_bound = 1150;
            _this.y_bound = 600;
            return _this;
        }
        LastLevel.prototype.create = function () {
            this.game.sound.stopAll();
            this.game.world.setBounds(0, 0, 2000, 2000);
            //this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'room');
            //this.background.scale.setTo(0.8,1);
            this.background.width = 1200;
            this.background.height = 600;
            // this.person = this.add.sprite(500, 200, 'people',0);
            // //this.person.frame = 0; 
            // this.person = this.add.sprite(580, 100, 'people', 1);
            // this.person = this.add.sprite(580, 100, 'people', 2);
            this.people = this.game.add.group();
            this.people.create(475, 194, 'people', 0);
            this.people.create(580, 100, 'people', 1);
            this.people.create(120, 220, 'people', 2);
            this.people.create(410, 150, 'people', 4);
            // below is josh
            //this.people.create(980,400,'people',3); 
            this.people.create(410, 70, 'people', 11);
            for (var i = 0; i < 3; i++) {
                this.people.create(975 + i * 70, 150, 'people', i + 5);
            }
            for (var i = 0; i < 3; i++) {
                this.people.create(980 + i * 60, 296, 'people', i + 8);
            }
            this.text = this.game.add.text(16, 16, '2018: Now', { fontSize: 32, fill: '#000' });
            //change timing on this
            this.game.time.events.add(Phaser.Timer.SECOND * 4, this.panCamera, this);
        };
        LastLevel.prototype.update = function () {
        };
        LastLevel.prototype.render = function () {
            //this.game.debug.cameraInfo(this.game.camera,32,32);
            //this.game.debug.inputInfo(32,32);
        };
        LastLevel.prototype.panCamera = function () {
            this.music = this.game.add.audio('doorbell', 1, false);
            this.music.play();
            this.game.add.tween(this.camera).to({ x: 399 }, 10000, Phaser.Easing.Linear.None, true);
        };
        return LastLevel;
    }(Phaser.State));
    Castlevania.LastLevel = LastLevel;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Level2 = /** @class */ (function (_super) {
        __extends(Level2, _super);
        function Level2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.score = 0;
            _this.checker = false;
            _this.count = 24;
            return _this;
        }
        Level2.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'level2');
            this.background.alpha = 0.8;
            this.x_ratio = this.game.world.width / this.background.width;
            this.y_ratio = this.game.world.height / this.background.height;
            this.background.scale.setTo(this.x_ratio, this.y_ratio);
            this.platform = this.game.add.group();
            this.platform.enableBody = true;
            //ground and ledges
            //using floor.init to create the floors in level
            this.ground = this.floor_init(0, this.game.world.height - 64, 'ground');
            this.ground.scale.setTo(2, 2);
            for (var i = -150; i < 250; i += 32) {
                var ledge = this.floor_init(i, 250, 'floor_egg');
                ledge.height = 32;
                ledge.width = 32;
            }
            for (var i = 400; i < 800; i += 32) {
                var ledge = this.floor_init(i, 400, 'floor_egg');
                ledge.height = 32;
                ledge.width = 32;
            }
            //var ledge = this.floor_init(400,400,'ground');
            //ledge = this.floor_init(-150,250,'ground');
            // //TESTING THE NEW CLASS
            // this.unc1 = new unc(this.game, 800, 600, 1);
            // this.unc1 = new unc(this.game, 0, 600, 2);
            //MUSIC PLAYING
            // this.music = this.add.audio('music',1, false);
            // this.music.play();
            this.player = new Castlevania.Player(this.game, 58, this.game.world.height - 300);
            //this.stuff = new Level2_stuff(this.game);
            //making stars
            this.stars = this.game.add.group();
            this.stars.enableBody = true;
            for (var i_1 = 0; i_1 < this.count; i_1++) {
                // i want the stars to start at x = 0 again if pixel range goes over
                var spacing = (i_1 * 70) % (this.game.world.width + 0);
                var star = this.stars.create(spacing, 0, 'dogecoin');
                //star.scale.setTo(0.10);
                star.height = 32;
                star.width = 32;
                star.body.gravity.y = 100;
                star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }
            //text
            this.text = this.game.add.text(16, 16, 'Collect all coins to get to next level!', { fontSize: 32, fill: '#FFFFFF' });
            //create function to perform (this.diag) when signal is dispatched
            this.event = new Phaser.Signal();
            this.event.add(this.diag, this);
            //add or addonce? did addonce to be safe
            //this.player.events.onKilled.addOnce(this.nextLevel, this);
        };
        Level2.prototype.update = function () {
            this.hitPlatform = this.game.physics.arcade.collide(this.player, this.platform);
            this.hitStuff = this.game.physics.arcade.collide(this.stuff, this.platform);
            this.game.physics.arcade.collide(this.stars, this.platform);
            this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        };
        //additional functions
        Level2.prototype.collectStar = function (player, star) {
            star.kill(); //statement does not use this.star, why?
            this.score += 10;
            this.text.text = 'Bitconnect2 coins: ' + this.score;
            var dir = (this.score % 40) / 20;
            // if (dir == 1){
            //     this.unc1 = new unc(this.game, 800, 600, dir);
            // }
            // else if (dir == 0 && this.score >30){
            //     this.unc1 = new unc(this.game, 0, 600, dir);
            // }
            if (this.score > 10 && (this.score % 20 == 0)) {
                this.event.dispatch(dir);
            }
            //check this
            if (this.score > ((this.count - 1) * 10)) {
                this.game.time.events.add(Phaser.Timer.SECOND * 5, this.nextLevel, this);
            }
        };
        Level2.prototype.floor_init = function (x, y, img) {
            var temp = this.platform.create(x, y, img);
            temp.body.immovable = true;
            return temp;
        };
        //diagonal movement done (every 30 pts) from dispatch in collectStar
        Level2.prototype.diag = function (value) {
            if (this.score < 130) {
                this.unc1 = new Castlevania.unc(this.game, value * 800, 600, value, 'unc1');
            }
            else {
                this.unc1 = new Castlevania.unc(this.game, value * 800, 600, value, 'unc2');
            }
        };
        Level2.prototype.nextLevel = function () {
            this.game.state.start('Level3_screen', true, false);
        };
        return Level2;
    }(Phaser.State));
    Castlevania.Level2 = Level2;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Level2_stuff = /** @class */ (function (_super) {
        __extends(Level2_stuff, _super);
        function Level2_stuff(game) {
            var _this = _super.call(this, game) || this;
            game.add.existing(_this);
            game.physics.arcade.enable(_this);
            _this.enableBody = true;
            //this.body.bounce.x = 0.2;
            //this.body.gravity.y = 100;
            _this.create();
            return _this;
        }
        Level2_stuff.prototype.create = function () {
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
        };
        return Level2_stuff;
    }(Phaser.Group));
    Castlevania.Level2_stuff = Level2_stuff;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Level3 = /** @class */ (function (_super) {
        __extends(Level3, _super);
        function Level3() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.count = 0;
            _this.base_year = 1993;
            _this.year = 1993;
            return _this;
            // render(){
            //     this.game.debug.inputInfo(32, 32);
            // }
        }
        Level3.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.background = this.add.sprite(0, 0, 'level3');
            this.background.width = 800;
            this.background.height = 600;
            this.hidden = this.game.add.button(0, 550, 'star', this.onComplete, this);
            this.hidden.alpha = 0;
            this.emitter1 = this.game.add.emitter(400, -32, 2000);
            this.emitter1.maxParticleScale = 0.025;
            this.emitter1.minParticleScale = 0.02;
            this.emitter1.makeParticles('raindrop', 0, 450, true, false);
            //this.emitter1.enableBody = true;
            this.emitter1.width = this.game.world.width * 1.5;
            this.emitter1.setYSpeed(20, 150);
            this.emitter1.setXSpeed(-60, 60);
            this.emitter1.start(false, 4000, 50);
            this.player = new Castlevania.Player_flat(this.game, 200, 500);
            //this.player2 = new Castlevania.Player(this.game, 200,500);
            this.text = this.game.add.text(630, 550, 'Year:' + this.year, { fontSize: 32, fill: '#000' });
            this.year_timer = this.game.time.events;
            //this.year_timer = this.game.time.events.loop(1000, this.onAvoid, this);
            this.year_timer.loop(1000, this.onAvoid, this);
        };
        Level3.prototype.update = function () {
            this.game.physics.arcade.overlap(this.player, this.emitter1, this.onTouch, null, this);
            this.game.physics.arcade.collide(this.emitter1);
            if (this.year == 2017) {
                this.emitter1.kill();
                this.year_timer.removeAll(); //remove the loop event
                this.player.kill();
                this.game.time.events.add(Phaser.Timer.SECOND * 4, this.onComplete, this);
                this.year = 0; //stops this from executing more than once
            }
        };
        Level3.prototype.onTouch = function () {
            this.year = this.base_year;
            this.game.state.start('Level3_Gameover', true, false);
        };
        Level3.prototype.onAvoid = function () {
            this.year += 1;
            this.text.text = 'Year:' + this.year;
        };
        Level3.prototype.onComplete = function () {
            this.game.state.start('LastLevel', true, false);
        };
        return Level3;
    }(Phaser.State));
    Castlevania.Level3 = Level3;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Level3_Gameover = /** @class */ (function (_super) {
        __extends(Level3_Gameover, _super);
        function Level3_Gameover() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level3_Gameover.prototype.create = function () {
            this.screen = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'gameover', this.onPress, this);
            this.screen.anchor.setTo(0.5, 0.5);
            //this.screen.width = 800;
            this.screen.height = 600;
        };
        Level3_Gameover.prototype.onPress = function () {
            this.game.state.start('Level3', true, false);
        };
        return Level3_Gameover;
    }(Phaser.State));
    Castlevania.Level3_Gameover = Level3_Gameover;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Level3_screen = /** @class */ (function (_super) {
        __extends(Level3_screen, _super);
        function Level3_screen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level3_screen.prototype.create = function () {
            this.background = this.game.add.sprite(0, 0, 'screen');
            this.background.width = 800;
            this.background.height = 600;
            this.game.time.events.add(Phaser.Timer.SECOND * 4, this.goNext, this);
        };
        Level3_screen.prototype.goNext = function () {
            this.game.state.start('Level3', true, false);
        };
        return Level3_screen;
    }(Phaser.Group));
    Castlevania.Level3_screen = Level3_screen;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // preload(){
        //     this.music2 = this.game.add.audio('music', );
        // }
        MainMenu.prototype.create = function () {
            //UNCOMMENT THESE LINES WHEN DONE
            this.music = this.game.add.audio('music', 0.4, true);
            this.music.play();
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.background.width = 800;
            this.background.height = 601;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.alpha = 0.85;
            this.logo.scale.setTo(0.75, 0.75);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level2', true, false);
            //this.game.state.start('Level3', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Castlevania.MainMenu = MainMenu;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, 'doggo', 0) || this;
            _this.scaling = 0.5;
            _this.anchor.setTo(0.5, 0);
            _this.animations.add('walk', null, 10, true);
            game.add.existing(_this);
            game.physics.arcade.enable(_this);
            _this.body.bounce.y = 0.2;
            _this.body.gravity.y = 350;
            _this.body.collideWorldBounds = true;
            _this.scale.setTo(_this.scaling);
            return _this;
            //this.events.onKilled.add(this.onDeath, this);
        }
        Player.prototype.create = function () {
        };
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            this.cursors = this.game.input.keyboard.createCursorKeys();
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -150; //doesn't show velocity.x
                this.animations.play('walk');
                if (this.scale.x == this.scaling) {
                    this.scale.x = -1 * this.scaling; // reverses the sprite?
                }
            }
            else if (this.cursors.right.isDown) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1 * this.scaling) {
                    this.scale.x = this.scaling;
                }
            }
            else {
                this.animations.frame = 5;
            }
            //have a separate 'if' statement for vertical movement
            if (this.cursors.up.isDown && this.body.touching.down) {
                this.body.velocity.y = -350;
            }
        };
        Player.prototype.onDeath = function () {
            this.game.state.start('LastLevel', true, false);
        };
        return Player;
    }(Phaser.Sprite));
    Castlevania.Player = Player;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Player_flat = /** @class */ (function (_super) {
        __extends(Player_flat, _super);
        function Player_flat(game, x, y) {
            var _this = _super.call(this, game, x, y, 'plantdog') || this;
            _this.max_xvel = 200;
            _this.max_yvel = 200;
            game.add.existing(_this);
            game.physics.arcade.enable(_this);
            _this.body.collideWorldBounds = true;
            return _this;
        }
        Player_flat.prototype.create = function () {
        };
        Player_flat.prototype.update = function () {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.cursors = this.game.input.keyboard.createCursorKeys();
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -this.max_xvel;
            }
            else if (this.cursors.right.isDown) {
                this.body.velocity.x = this.max_xvel;
            }
            if (this.cursors.up.isDown) {
                this.body.velocity.y = -this.max_yvel;
            }
            else if (this.cursors.down.isDown) {
                this.body.velocity.y = this.max_yvel;
            }
        };
        return Player_flat;
    }(Phaser.Sprite));
    Castlevania.Player_flat = Player_flat;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Preloader = /** @class */ (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseURL = 'static/assets_main/';
            return _this;
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            // this.preloadBar.width = 400;
            // this.preloadBar.height = 40;
            //this.preloadBar.scale.setTo(0.8);
            //make the preloadBar a sprite with a preload property, this just makes it so that the bar will be cropped until everything is loaded
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('q1', this.baseURL + 'q1.png');
            this.load.image('titlepage', this.baseURL + 'titlepage.png');
            this.load.image('logo', this.baseURL + 'logo.png');
            this.load.audio('music', this.baseURL + 'march_song.mp3', true);
            this.load.spritesheet('doggo', this.baseURL + 'DogWalk.png', 112, 68, 10);
            this.load.image('level2', this.baseURL + 'hollowbg.png');
            this.load.image('floor_egg', this.baseURL + 'Arcane_Egg.png');
            this.load.image('ground', this.baseURL + 'platform.png');
            this.load.image('dogecoin', this.baseURL + 'dogecoin.png');
            this.load.image('star', this.baseURL + 'coin.png');
            this.load.image('unc1', this.baseURL + 'unc1.png');
            this.load.image('unc2', this.baseURL + 'unc2.png');
            this.load.image('room', this.baseURL + 'room.png');
            //level3
            this.load.image('screen', this.baseURL + 'level3_instructions.png');
            this.load.image('bullet', this.baseURL + 'bullet.png');
            this.load.image('raindrop', this.baseURL + 'raindrop.png');
            this.load.image('level3', this.baseURL + 'sky3.png');
            this.load.image('gameover', this.baseURL + 'gameover.png');
            //for last level
            this.load.image('plantdog', this.baseURL + 'j_pic.png');
            this.load.audio('doorbell', this.baseURL + 'doorbell.mp3');
            //below is for no spacing img
            //this.load.spritesheet('people', this.baseURL + 'people.png', 60, 80,12);
            this.load.spritesheet('people', this.baseURL + 'people.png', 60, 80, 12, 0, 4);
            //this.load.json('q1', this.baseURL + 'q1.json');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            this.q1screen = this.add.button(this.game.world.centerX, this.game.world.centerY, 'q1', this.startMainMenu, this);
            this.q1screen.anchor.setTo(0.5, 0.5);
            this.q1screen.width = 800;
            this.q1screen.height = 600;
            //tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false); //check this
            //this.game.state.start('LastLevel', true, false);
        };
        return Preloader;
    }(Phaser.State));
    Castlevania.Preloader = Preloader;
})(Castlevania || (Castlevania = {}));
window.onload = function () {
    var game = new Castlevania.Game();
};
var Castlevania;
(function (Castlevania) {
    var unc = /** @class */ (function (_super) {
        __extends(unc, _super);
        function unc(game, x, y, dir, key) {
            var _this = _super.call(this, game, x, y, key) || this;
            _this.base_angle = 10;
            game.add.existing(_this);
            _this.anchor.setTo(0.5, 0.5);
            _this.scale.setTo(0.25);
            _this.angle = _this.base_angle;
            _this.alpha = 0; //0 is transparent
            _this.direction = dir;
            _this.create();
            return _this;
        }
        unc.prototype.create = function () {
            var current = this;
            if (this.direction == 1) {
                this.game.add.tween(this).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None, true);
                var tween1 = this.game.add.tween(this).to({ x: -100, y: -100 }, 8000, Phaser.Easing.Linear.None, true);
                tween1.onComplete.add(this.kill, this);
            }
            else if (this.direction == 0) {
                this.game.add.tween(this).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None, true);
                var tween2 = this.game.add.tween(this).to({ x: 900, y: -100 }, 8000, Phaser.Easing.Linear.None, true);
                tween2.onComplete.add(this.kill, this);
            }
        };
        unc.prototype.update = function () {
            this.angle += 1;
        };
        return unc;
    }(Phaser.Sprite));
    Castlevania.unc = unc;
})(Castlevania || (Castlevania = {}));
