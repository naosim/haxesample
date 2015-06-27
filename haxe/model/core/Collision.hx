package model.core;

import model.core.CollisionIdentifier;
import model.core.shape.Circle;
import model.core.shape.Shape;

class Collision implements Step implements Terminatable {
    public var pos(default, null):Position;// 画面に対する相対位置
    public var shape(default, null):Shape;
    public var status:CollisionStatus;
    public var identifier:CollisionIdentifier;

    public function new(params: CollisionParams, ?pos: Position) {
        this.pos = pos != null ? pos : Position.zero();
        this.shape = params.shape;
        this.status = params.status;
        this.identifier = params.identifier != null ? params.identifier : new CollisionIdentifier();
    }

    public function eachAttacked(other:Collision) {
        status.eachAttacked(other.status);
    }

    public function step() {
        // implements subclass
    }

    public function isDead():Bool {
        return status.isDead();
    }

    public function hasTag(tag:String):Bool {
        return identifier.hasTag(tag);
    }

    public function registerHitPoint(l: Float -> Float -> Void) {
        status.registerHitPoint(l);
    }
    public function unregisterHitPoint(l: Float -> Float -> Void) {
        status.unregisterHitPoint(l);
    }

    public function terminate(): Void {
        status.terminate();
    }
}

 class CollisionParams {
    public var shape:Shape;
    public var status:CollisionStatus;
    public var identifier:CollisionIdentifier;

    public function new(
        shape:Shape,
        status:CollisionStatus,
        ?identifier:CollisionIdentifier) {
        this.shape = shape;
        this.status = status;
        this.identifier = identifier;
    }

    public static function circle(params:{r:Int, hp:Int, ap:Int, ?tag: String, ?tags: Array<String>}): CollisionParams {
        var c = new Circle(params.r);
        var status = new CollisionStatus(new HitPoint(params.hp), params.ap);
        return new CollisionParams(c, status, CollisionIdentifier.withTag(params.tag, params.tags));
    }
}
