package model.domain;
import model.core.Position;
import model.core.TimelineStage;
import model.core.Collision;
import model.core.GameStepCore;

@:expose
class StageModel {
    public var gameCore:GameStepCore;
    public var collisions:SimpleCollisions = new SimpleCollisions();

    public function new() {
    }

    public function setup(
        size:{width:Float, height:Float},
        stage:Stage,
        onCreateListener:Collision -> Void,
        onDestoryListener:Collision -> Void
    ) {
        var stage = new Stage();
        var timelineStage = new TimelineStage(stage.timelineEvent);

        gameCore = new GameStepCore(collisions, size, timelineStage.step);

        collisions.setObserver(onCreateListener, onDestoryListener);
        addNewPlayer();
        collisions.player().registerDead(addNewPlayer);
    }

    static public function createStage1Model(
        size:{width:Float, height:Float},
        onCreateListener:Collision -> Void,
        onDestoryListener:Collision -> Void
    ) {
        var result = new StageModel();
        result.setup(size, new Stage(), onCreateListener, onDestoryListener);
        return result;
    }

    function addNewPlayer() {
        var player = new Player(new Position(WorldStatus.WIDTH / 2, 240));
        collisions.players.push(player);
    }
}
