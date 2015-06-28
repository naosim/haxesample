package;
import model.domain.WorldStatus;
import model.core.TimelineStage;
import model.domain.Stage;
import model.core.LinearMoveCollision;
import model.core.LinearMovablePosition;
import model.domain.Player;
import model.core.CollisionIdentifier;
import model.core.Position;
import model.core.Collision;
import model.domain.SimpleCollisions;
import model.core.GameStepCore;

@:expose
class Main {
    public static var gameCore:GameStepCore;
    public static var collisions = new SimpleCollisions();

    static public function main(){}

    static public function setup(
        size:{width:Float, height:Float},
        onCreateListener:Collision -> Void,
        onDestoryListener:Collision -> Void
    ) {
        var frame: Int = 0;
        var stage = new Stage();
        var timelineStage = new TimelineStage(stage.timelineEvent);

        gameCore = new GameStepCore(collisions, size, timelineStage.step);

        collisions.setObserver(onCreateListener, onDestoryListener);
        var player = new Player(new Position(WorldStatus.WIDTH / 2, 240));
        collisions.players.push(player);
    }

    public static function getPlayerDirectionFrom(org: Position): Position {
        if(collisions.players.length() == 0) return new Position(0, 1);// 適当w
        return org.directionTo(collisions.players.get(0).pos);
    }


}
