var tagSpriteMap = {
    shot:           [48 + 6, image.icon0],
    enemy: {
        zako:       [16, image.icon0],
        bosschild:  [16, image.icon0],
        boss:       [11, image.icon0]
    },
    enemyshot:      [45, image.icon0],
    item: {
        doubleshot: [30, image.icon0],
        lifeup:     [14, image.icon0]
    }
};

var game = new Core(320, 320); // game stage
game.preload([image.chara1, image.icon0, image.effect0]); // preload image
game.fps = model.domain.WorldStatus.FPS;
// スペースキーをaボタンにバインド
game.keybind(' '.charCodeAt(0), 'a');
var player = null;
game.onload = function () {
    var scene = createStageScene(model.domain.StageModel.createStage1Model, tagSpriteMap);
    game.pushScene(scene);
    game.addEventListener('abuttondown', function () {
        game.currentScene.player.playerCollision.shot();
    });
};

game.start(); // start your game!