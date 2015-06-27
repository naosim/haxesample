package;
import model.domain.Player;
import model.core.CollisionIdentifier;
import model.core.Position;
import model.core.Collision;
import model.domain.SimpleCollisions;
import model.core.GameStepCore;

@:expose
class Main {
    public static var gameCore:GameStepCore;
    public static var player:Player;
    public static var collisions = new SimpleCollisions();

    static public function main(){}

    static public function setup(
        size:{width:Float, height:Float},
        onCreateListener:Collision -> Void,
        onDestoryListener:Collision -> Void
    ) {
        gameCore = new GameStepCore(collisions, size);
        collisions.setObserver(onCreateListener, onDestoryListener);
        var params = CollisionParams.circle({r: 8, hp: 100, ap: 20, tag: TagName.player});
        player = new Player(params, new Position(160, 240));
        collisions.players.push(player);

        var enemy = new Collision(CollisionParams.circle({r: 8, hp: 5, ap: 5, tag: TagName.enemy}), new Position(80, 20));
        collisions.enemies.push(enemy);
    }


}
