package model.core;

import model.core.lib.ObservableFloat;
class HitPoint extends ObservableFloat {
    var _isRigid:Bool = false;

    public function new(value:Int = null) {
        super(value);
        if(value == null) _isRigid = true;
    }

    public function isRigid():Bool {
        return _isRigid;
    }

    public function isDead():Bool {
        return !_isRigid && value <= 0;
    }
}
