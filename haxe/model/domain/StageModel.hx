package model.domain;
import model.core.Position;
import model.core.TimelineStage;
import model.core.Collision;
import model.core.StageStepCore;

@:expose
class StageModel {
    static public function main() {}

    public var gameCore:StageStepCore;
    public var collisions:SimpleCollisions = new SimpleCollisions();

    public function new() {
    }

    public function setup(
        size:{width:Float, height:Float},
        stage:Stage,
        onCreateListener:Collision -> Void,
        onDestoryListener:Collision -> Void
    ) {
        var timelineStage = new TimelineStage(stage.timelineEvent);

        gameCore = new StageStepCore(collisions, size, timelineStage.step);

        collisions.setObserver(onCreateListener, onDestoryListener);
        addNewPlayer();
    }

    function addNewPlayer() {
        var player = new Player(collisions, new Position(WorldStatus.WIDTH / 2, 240));
        collisions.players.push(player);
        player.registerDead(addNewPlayer);
    }

    static public function createStage1Model(
        size:{width:Float, height:Float},
        onCreateListener:Collision -> Void,
        onDestoryListener:Collision -> Void
    ) {
        var result = new StageModel();
        result.setup(size, new Stage(result.collisions), onCreateListener, onDestoryListener);
        return result;
    }
}
