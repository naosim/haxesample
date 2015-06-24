package model.core;

class CollisionStatus {
  public var hitPoint: HitPoint;
  public var attackPoint: Int;

  public function new(hitPoint: HitPoint, attackPoint: Int) {
    this.hitPoint = hitPoint;
    this.attackPoint = attackPoint;
  }
  public function attackedFrom(other: CollisionStatus) {
    hitPoint.value = hitPoint.value - other.attackPoint;
  }

  public function eachAttacked(other: CollisionStatus) {
    attackedFrom(other);
    other.attackedFrom(this);
  }

  public function isDead(): Bool {
    return hitPoint.isDead();
  }
}
