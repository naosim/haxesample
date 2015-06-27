package model.core;

class CollisionStatus {
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
}
