enchant(); // initialize

var image = {};
var imagePath = function (name) {
    return "js/enchant.js-builds-0.8.2-b/images/" + name + ".png";
};
var addImage = function (name) {
    image[name] = imagePath(name);
};
var addImages = function (names) {
    for(var i = 0; i < names.length; i++) addImage(names[i]);
};

Sprite.prototype.setCenter = function (pos) {
    this.x = Math.floor(pos.x - this.width / 2);
    this.y = Math.floor(pos.y - this.height / 2);
};

var createPlayer = function (c) {
    var bear = new Sprite(32, 32);
    bear.playerCollision = c;
    bear.image = game.assets[image.chara1];
    bear.setCenter(c.pos);
    bear.addEventListener('enterframe', function () {
        bear.setCenter(c.pos);

        if (game.input.up) c.up();
        if (game.input.down) c.down();
        if (game.input.right) c.right();
        if (game.input.left) c.left();
    });
    c.registerHitPoint(function (before, after) {
        var str = '';
        for (i = 0; i < 5; i++) {
            str += i * 10 < after ? '★' : '☆';
        }
        console.log(str, after);
    });
    return bear;
};

var createCommonSprite = function (c) {
    var result = new Sprite(16, 16);
    result.setCenter(c.pos);
    result.addEventListener('enterframe', function () {
        result.setCenter(c.pos);
    });
    return result;
};

var createSpriteWith = function (c, frame, image) {
    var result = createCommonSprite(c);
    result.frame = frame;
    result.image = game.assets[image];
    return result;
};

var createShot = function (c) {
    return createSpriteWith(c, 48, image.icon0);
};

var createEnemy = function (c) {
    return createSpriteWith(c, 16, image.icon0);
};

var createBossEnemy = function (c) {
    return createSpriteWith(c, 11, image.icon0);
};

var createEnemyShot = function (c) {
    return createSpriteWith(c, 45, image.icon0);
};

var createDoubleShotItem = function (c) {
    return createSpriteWith(c, 30, image.icon0);
};

var createLifeUpItem = function (c) {
    return createSpriteWith(c, 14, image.icon0);
};

var showExplosion = function (pos) {
    var result = new Sprite(16, 16);
    result.frame = [0, 1, 2, 3, 4];
    result.image = game.assets[image.effect0];
    result.setCenter(pos);
    var frame = 0;
    result.addEventListener('enterframe', function () {
        if (frame == 4) game.currentScene.removeChild(result);
        frame++;
    });
    game.currentScene.addChild(result);
    return result;
};

var createStage1Scene = function() {
    var scene = new Scene();
    var stageModel = model.domain.StageModel.createStage1Model(
        {width: 320, height: 320},
        {
            onCreateCollision:function (c) {
                var sprite;
                if (c.hasTag("player")) {
                  sprite = player = createPlayer(c);
                } else if (c.hasTag("shot")) {
                  sprite = createShot(c);
                } else if (c.hasTag("enemy")) {
                  if(c.hasTag("boss")) {
                      sprite = createBossEnemy(c);
                  } else {
                      sprite = createEnemy(c);
                  }

                } else if (c.hasTag("enemyshot")) {
                  sprite = createEnemyShot(c);
                } else if (c.hasTag("item")) {
                  if (c.hasTag("doubleshot")) sprite = createDoubleShotItem(c);
                  else if (c.hasTag("lifeup")) sprite = createLifeUpItem(c);
                }

                if (sprite) {
                  c.sprite = sprite;
                  scene.addChild(sprite);
                }

                                      },
            onDestroyCollision: function (c) {// 死んだとき
                scene.removeChild(c.sprite);
                if (c.hasTag('shot') || c.hasTag('enemyshot')) showExplosion(c.pos);
                console.log("delete");
                c.sprite = null;
            },
            onEndStage: function(c) {
                stageModel.terminate();
            }
        }
    );

    scene.stageModel  = stageModel;
    scene.addEventListener('enterframe', function () {
            stageModel.stageStepCore.step();
        });
    return scene;
};
addImages(["chara1", "icon0", "effect0"]);

var game = new Core(320, 320); // game stage
game.preload(image.chara1, image.icon0, image.effect0); // preload image
game.fps = 30;

// スペースキーをaボタンにバインド
game.keybind(' '.charCodeAt(0), 'a');
var player = null;
game.onload = function () {
    var scene = createStage1Scene();
    game.pushScene(scene);
    game.addEventListener('abuttondown', function () {
        // 「a」ボタンを押した時のイベント処理
        console.log("a");
        player.playerCollision.shot();
    });
};

game.start(); // start your game!