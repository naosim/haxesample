enchant(); // initialize

Sprite.prototype.setCenter = function (pos) {
    this.x = Math.floor(pos.x - this.width / 2);
    this.y = Math.floor(pos.y - this.height / 2);
};

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

addImages(["chara1", "icon0", "effect0"]);



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

var createSprite = function(c, map) {
    if(!map) map = tagSpriteMap;
    for(key in map) {
        if(c.hasTag(key)) {
            var value = map[key];
            if(Array.isArray(value)) {
                console.log(key);
                return createSpriteWith(c, value[0], value[1]);
            } else {
                return createSprite(c, value);
            }
        }
    }
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

var createStageScene = function(createStageModel, tagSpriteMap) {
    var scene = new Scene();
    var stageModel = createStageModel(
        {width: 320, height: 320},
        {
            onCreateCollision:function (c) {
                var sprite;
                if (c.hasTag("player")) {
                  sprite = player = scene.player = createPlayer(c);
                }

                if(!sprite) {
                    sprite = createSprite(c, tagSpriteMap);
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