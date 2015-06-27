package model.core;

class CollisionStatus implements Terminatable {
    public var hitPoint:HitPoint;
    public var attackPoint:Int;
    public var terminated:Bool = false;

    public function new(hitPoint:HitPoint, attackPoint:Int) {
        this.hitPoint = hitPoint;
        this.attackPoint = attackPoint;
    }

    public function attackedFrom(other:CollisionStatus) {
        hitPoint.addValue(-other.attackPoint);
    }

    public function eachAttacked(other:CollisionStatus) {
        attackedFrom(other);
        other.attackedFrom(this);
    }

    public function isDead():Bool {
        return hitPoint.isDead() || terminated;
    }
    public function terminate(): Void {
        hitPoint.terminate();
    }

    public function registerHitPoint(l: Float -> Float -> Void) {
        hitPoint.register(l);
    }

    public function unregisterHitPoint(l: Float -> Float -> Void) {
        hitPoint.unregister(l);
    }
}