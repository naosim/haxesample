package model.core;
import model.core.shape.Circle;

class CollisionHitTest {
    var left:Collision;
    var right:Collision;

    public function new(left:Collision, right:Collision) {
        this.left = left;
        this.right = right;
    }

    public static function hitTest(left:Collision, right:Collision):Bool {
        if (Std.is(left.shape, Circle) && Std.is(right.shape, Circle)) {
// trace(left.pos.distanceTo(right.pos), cast(left.shape, Circle).radius + cast(right.shape, Circle).radius);
            return left.pos.distanceTo(right.pos) < cast(left.shape, Circle).radius + cast(right.shape, Circle).radius;
        }
        return false;
    }

}
