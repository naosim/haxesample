var imagePath = function (name) {
    return "js/enchant.js-builds-0.8.2-b/images/" + name + ".png";
};
var addImage = function (name) {
    image[name] = imagePath(name);
};
var image = {};
addImage("chara1");
addImage("icon0");
addImage("effect0");

enchant(); // initialize
var game = new Core(320, 320); // game stage
game.preload(image.chara1, image.icon0, image.effect0); // preload image
game.fps = 30;

// スペースキーをaボタンにバインド
game.keybind(' '.charCodeAt(0), 'a');

var player = null;

Sprite.prototype.setCenter = function (pos) {
    this.x = Math.floor(pos.x - this.width / 2);
    this.y = Math.floor(pos.y - this.height / 2);
}

var createPlayer = function (c) {
    var bear = new Sprite(32, 32);
    bear.playerCollision = c;
    bear.image = game.assets[image.chara1];
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
}

var createCommonSprite = function (c) {
    var result = new Sprite(16, 16);
//    result.collision = c;
    result.setCenter(c.pos);
    result.addEventListener('enterframe', function () {
        result.setCenter(c.pos);
    });
    return result;
}

var createShot = function (c) {
    var result = createCommonSprite(c);
    result.frame = 48;
    result.image = game.assets[image.icon0];
    return result;
}

var createEnemy = function (c) {
    var result = createCommonSprite(c);
    result.frame = 16;
    result.image = game.assets[image.icon0];
    return result;
}

var createEnemyShot = function (c) {
    var result = createCommonSprite(c);
    result.frame = 45;
    result.image = game.assets[image.icon0];
    return result;
}

var createDoubleShotItem = function (c) {
    var result = createCommonSprite(c);
    result.frame = 30;
    result.image = game.assets[image.icon0];
    return result;
}

var createLifeUpItem = function (c) {
    var result = createCommonSprite(c);
    result.frame = 14;
    result.image = game.assets[image.icon0];
    return result;
}

var showExplosion = function (pos) {
    var result = new Sprite(16, 16);
    result.frame = [0, 1, 2, 3, 4];
    result.image = game.assets[image.effect0];
    result.setCenter(pos);
    var frame = 0;
    result.addEventListener('enterframe', function () {
        if (frame == 4) game.rootScene.removeChild(result);
        frame++;
    });
    game.rootScene.addChild(result);
    return result;
}

game.onload = function () {
    var stageModel = model.domain.StageModel.createStage1Model(
//    Main.setupStage1(
        {width: 320, height: 320},
        function (c) {
            var sprite;
            if (c.hasTag("player")) {
                sprite = player = createPlayer(c);
            } else if (c.hasTag("shot")) {
                sprite = createShot(c);
            } else if (c.hasTag("enemy")) {
                sprite = createEnemy(c);
            } else if (c.hasTag("enemyshot")) {
                sprite = createEnemyShot(c);
            } else if (c.hasTag("item")) {
                if (c.hasTag("doubleshot")) sprite = createDoubleShotItem(c);
                else if (c.hasTag("lifeup")) sprite = createLifeUpItem(c);
            }

            if (sprite) {
                c.sprite = sprite;
                game.rootScene.addChild(sprite);
            }

        },
        function (c) {// 死んだとき
            game.rootScene.removeChild(c.sprite);
            if (c.hasTag('shot') || c.hasTag('enemyshot')) showExplosion(c.pos);
            console.log("delete");
            // 念のため解放
            c.sprite.playerCollision = null;
            c.sprite = null;
        });

    game.addEventListener('abuttondown', function () {
        // 「a」ボタンを押した時のイベント処理
        console.log("a");
        player.playerCollision.shot();
    });

    game.rootScene.addEventListener('enterframe', function () {
        stageModel.gameCore.step();
    });
};

game.start(); // start your game!