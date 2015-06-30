package;
import model.domain.WorldStatus;
import model.core.TimelineStage;
import model.domain.Stage;
import model.domain.Player;
import model.core.Position;
import model.core.Collision;
import model.domain.SimpleCollisions;
import model.core.StageStepCore;

@:expose
class Main {
//    public static var gameCore:GameStepCore;
//    public static var collisions:SimpleCollisions;
//
//    static public function main() {}
//
//    static public function setup(
//        size:{width:Float, height:Float},
//        stage:Stage,
//        onCreateListener:Collision -> Void,
//        onDestoryListener:Collision -> Void
//    ) {
//        collisions = new SimpleCollisions();
//        var timelineStage = new TimelineStage(stage.timelineEvent);
//
//        gameCore = new GameStepCore(collisions, size, timelineStage.step);
//
//        collisions.setObserver(onCreateListener, onDestoryListener);
//        addNewPlayer();
//    }
//
//    static public function setupStage1(
//        size:{width:Float, height:Float},
//        onCreateListener:Collision -> Void,
//        onDestoryListener:Collision -> Void
//    ) {
//        setup(size, new Stage(), onCreateListener, onDestoryListener);
//    }
//
//    static function addNewPlayer() {
//        var player = new Player(new Position(WorldStatus.WIDTH / 2, 240));
//        player.registerDead(addNewPlayer);
//        collisions.players.push(player);
//    }
//
//    public static function getPlayerDirectionFrom(org:Position):Position {
//        if (collisions.players.length() == 0) return new Position(0, 1);// 適当w
//        return org.directionTo(collisions.players.get(0).pos);
//    }
}
