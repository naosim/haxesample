package model.core;

interface EachHitCollision {
  public function eachCollision(callback: Collision -> Void): Void;
  public function eachHitCollisionPair(callback: Collision -> Collision -> Void): Void;
  public function remove(ary: Array<Collision>): Void;
}
