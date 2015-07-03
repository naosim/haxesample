package model.domain;
import model.core.StageLifeCycle;
import model.core.StageEndConditionResult;
import model.core.Position;
import model.core.TimelineStage;
import model.core.Collision;
import model.core.StageStepCore;

@:expose
class StageModel implements StageLifeCycle<String> {
    static public function main() {}

    public var stageStepCore:StageStepCore<String>;
    public var collisions:SimpleCollisions = new SimpleCollisions();
    var timelineStage:TimelineStage;

    public function new() {
    }

    public function setup(
        size:{width:Float, height:Float},
        stage:Stage,
        onCreateListener:Collision -> Void,
        onDestoryListener:Collision -> Void
    ) {
        this.timelineStage = new TimelineStage(stage.timelineEvent);
        stageStepCore = new StageStepCore<String>(collisions, size, getStageEndConditionResult, this);
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

    function getStageEndConditionResult() {
        return new StageEndConditionResult(false);
    }


    public function onStart():Void {}

    public function onStep():Void {
        timelineStage.step();
    }

    public function onEnd(couse:String):Void {}
}
