package model.core;

import model.core.lib.ObservableFloat;
class HitPoint extends ObservableFloat {
    var _isRigid:Bool = false;

    public function new(value:Int = null) {
        if (value == null) {
            _isRigid = true;
            value = 0;
        }
        super(value);
    }

    public function isRigid():Bool {
        return _isRigid;
    }

    public function setIsRigid(isRigid:Bool) {
        this._isRigid = isRigid;
    }

    public function isDead():Bool {
        return !_isRigid && value <= 0;
    }

    public override function addValue(value:Float) {
        if(!isRigid()) super.addValue(value);
    }
    public override function setValue(value:Float) {
        if(!isRigid()) super.setValue(value);
    }
}
