package model.domain.enemy;
import model.core.CollisionIdentifier.Tag;
import model.core.Collision.CollisionParams;
import model.core.SteppablePosition;
import model.core.Position;
import model.core.SteppablePositionCollision;

// プレイヤーに向かってまっすぐ飛んでくる
class DashToPlayerEnemy extends SteppablePositionCollision {
    public function new(orgPosition: Position, tag:Tag, options:{?speed:Float, ?radius:Int, ?ap:Int}) {
        var speed = options.speed != null ? options.speed : 3;
        var radius = options.radius != null ? options.radius : 8;
        var ap = options.ap != null ? options.ap : 10;
        var direction = Main.getPlayerDirectionFrom(orgPosition).multipl(speed);
        var movePos = SteppablePosition.linear(orgPosition, direction);
        super(CollisionParams.circle({r: radius, hp: 1, ap: ap, tag: tag}), movePos);
    }
}
