package model.core;
import model.core.Collision;
import model.core.LinearMovablePosition;

class LinearMoveCollision extends Collision {
    var movablePos:LinearMovablePosition;

    public function new(params: CollisionParams, pos:LinearMovablePosition) {
        super(params, pos);
        this.movablePos = pos;
    }

    public override function step() {
        this.movablePos.step();
    }
}
