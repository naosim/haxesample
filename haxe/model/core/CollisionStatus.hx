package model.core;

import model.core.lib.ObservableValue;
class CollisionStatus implements Terminatable {
    public var hitPoint:HitPoint;
    public var attackPoint:Int;
    public var terminated:Bool = false;
    var isDeadObservable:ObservableValue<Bool> = new ObservableValue<Bool>(false);

    public function new(hitPoint:HitPoint, attackPoint:Int) {
        this.hitPoint = hitPoint;
        this.attackPoint = attackPoint;
        registerHitPoint(function(_, after:Float) {
            if(after <= 0)isDeadObservable.setValue(true);
        });
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
        isDeadObservable.terminate();
    }

    public function registerHitPoint(l: Float -> Float -> Void) {
        hitPoint.register(l);
    }

    public function unregisterHitPoint(l: Float -> Float -> Void) {
        hitPoint.unregister(l);
    }

    public function registerDead(l: Bool -> Bool -> Void) {
        isDeadObservable.register(l);
    }

    public function unregisterDead(l: Bool -> Bool -> Void) {
        isDeadObservable.unregister(l);
    }
}