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

//    public static function circle(params:{r:Int, hp:Int, ap:Int, pos:LinearMovablePosition}):LinearMoveCollision {
//        var c = new Circle(params.r);
//        var status = new CollisionStatus(new HitPoint(params.hp), params.ap);
//        return new LinearMoveCollision(c, status, params.pos);
//    }

}
