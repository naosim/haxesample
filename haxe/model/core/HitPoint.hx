package model.core;

class HitPoint {
    public var value:Null<Int>;

    public function new(value:Int = null) {
        this.value = value;
    }

    public function isRigid():Bool {
        return value == null;
    }

    public function isDead():Bool {
        return !isRigid() && value <= 0;
    }
}
