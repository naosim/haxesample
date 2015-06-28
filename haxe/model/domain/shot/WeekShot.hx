package model.domain.shot;
import model.core.Position;
import model.core.Collision.CollisionParams;
import model.core.Collision;
import model.core.LinearMovablePosition;
import model.core.LinearMoveCollision;

class WeekShot extends LinearMoveCollision {
    private static var SPEED = 5;
    private static var RADIUS = 2;
    private static var HP = 1;
    private static var AP = 10;

    public function new(playerPos:Position) {
        var shotPos = LinearMovablePosition.linear(playerPos, new Position(0, -SPEED));
        super(CollisionParams.circle({r: RADIUS, hp: HP, ap: AP, tagName: TagName.shot}), shotPos);
    }

    public override function step() {
        super.step();
        if(pos.y < -10) status.terminated = true;
    }

    public static function create(playerPos:Position): Collision {
        if(Main.collisions.shots.length() >= 10) return null;
        return new WeekShot(playerPos);
    }
}
