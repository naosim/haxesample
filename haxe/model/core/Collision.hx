package model.core;

import model.core.shape.Circle;
import model.core.shape.Shape;
@:expose
class Collision implements Step {
    public var pos(default, null):Position;// 画面に対する相対位置
    public var shape(default, null):Shape;
    public var status:CollisionStatus;

    public function new(shape:Shape, status:CollisionStatus, pos:Position) {
        this.pos = pos != null ? pos : Position.zero();
        this.shape = shape;
        this.status = status;
    }

    public function eachAttacked(other:Collision) {
        status.eachAttacked(other.status);
    }

    public function step() {

    }

    public function isDead():Bool {
        return status.isDead();
    }

    public static function circle(params:{r:Int, hp:Int, ap:Int, pos:Position}):Collision {
        return new Collision(new Circle(params.r), new CollisionStatus(new HitPoint(params.hp), params.ap), params.pos);
    }
}
