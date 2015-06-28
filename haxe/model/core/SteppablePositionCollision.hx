package model.core;
import model.core.Collision;
import model.core.SteppablePosition;

class SteppablePositionCollision extends Collision {
    var movablePos:SteppablePosition;

    public function new(params: CollisionParams, pos:SteppablePosition) {
        super(params, pos);
        this.movablePos = pos;
    }

    public override function step() {
        this.movablePos.step();
    }
}
