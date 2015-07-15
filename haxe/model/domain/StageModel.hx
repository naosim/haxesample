package model.domain;
import model.core.Size;
import model.core.Rect;
import model.core.MapStage;
import model.core.Terminatable;
import model.core.StageLifeCycle;
import model.core.StageEndConditionResult;
import model.core.Position;
import model.core.TimelineStage;
import model.core.Collision;
import model.core.StageStepCore;

@:expose
class StageModel implements StageLifeCycle<String> implements Terminatable {
    static public function main() {}

    public var stageStepCore:StageStepCore<String>;
    public var collisions:SimpleCollisions = new SimpleCollisions();
    var stage: Stage;
    var mapStage:MapStage;
    var callback: StageModelCallback;

    var life = 5;

    public function new() {
    }

    public function setup(
        size:{width:Float, height:Float},
        stage:Stage,
        callback: StageModelCallback
    ) {
        this.stage = stage;
        this.callback = callback;
        this.mapStage = new MapStage(Rect.create(WorldStatus.WIDTH/2, WorldStatus.HEIGHT/2, WorldStatus.WIDTH * 10, WorldStatus.HEIGHT * 10), new Size(WorldStatus.WIDTH, WorldStatus.HEIGHT), []);
        stageStepCore = new StageStepCore<String>(collisions, size, this, this.mapStage.getDisplayRect);
        collisions.setObserver(callback.onCreateCollision, callback.onDestroyCollision);
        addNewPlayer();
    }

    function addNewPlayer() {
        if(life <= 0) return;
        var player = new Player(collisions);
        collisions.players.push(player);
        player.registerDead(addNewPlayer);
        life--;
    }

    static public function createStage1Model(
        size:{width:Float, height:Float},
        callback: StageModelCallback
    ) {
        var result = new StageModel();
        var stage = new Stage(result.collisions);
        result.setup(size, stage, callback);
        return result;
    }

    public function getStageEndCondisionResult():StageEndConditionResult<String> {
        if(stage.bossDead) {
            return new StageEndConditionResult(true, "bossdead");
        }else if(life < 1) {
            return new StageEndConditionResult(true, "playerdead");
        }
        return new StageEndConditionResult(false);
    }


    public function onStart():Void {
        if(callback.onStartStage != null)callback.onStartStage();
    }

    public function onStep():Void {
        mapStage.step();
    }

    public function onEnd(couse:String):Void {
        trace(couse);
        if(callback.onEndStage != null)callback.onEndStage(couse);
    }

    public function terminate():Void {
        stageStepCore.terminate();
//        stageStepCore = null;
        collisions = null;
        callback = null;
        stage = null;
    }

}
// JSへのコールバックを想定
typedef StageModelCallback = {
    ?onCreateCollision:Collision -> Void,
    ?onDestroyCollision:Collision -> Void,
    ?onStartStage:Void -> Void,
    ?onEndStage:String -> Void,
}
