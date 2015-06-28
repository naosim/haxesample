package model.domain.enemy;
import model.core.CollisionIdentifier.Tag;
import model.core.Collision;
import model.core.Collision.CollisionParams;
import model.core.SteppablePosition;
import model.core.Position;
import model.core.SteppablePositionCollision;

// まっすぐ飛んで、途中で玉を打つ
class StraightAndShotEnemy extends SteppablePositionCollision {
    public function new(orgPosition: Position, speed:Float = 3) {
        var x = orgPosition.x < WorldStatus.WIDTH / 2 ? 1 : -1;// 左右のどっちに進むか
        var direction = new Position(x, 0.5).multipl(speed);
        var movePos = SteppablePosition.linear(orgPosition, direction);
        super(CollisionParams.circle({r: 8, hp: 1, ap: 10, tagNames: [TagName.enemy, Type.getClassName(Type.getClass(this))]}), movePos);
    }

    var frame = 0;
    public override function step() {
        super.step();
        if(frame == 100) {
            Main.collisions.enemyShots.push(new DashToPlayerEnemy(pos, new Tag(TagName.enemyshot), {radius: 2}));
        }

        frame++;
    }
}
