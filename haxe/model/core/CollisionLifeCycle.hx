package model.core;
interface CollisionLifeCycle {
    public function onCreate():Void;
    public function onDead():Void;
    public function onStep():Void;
    public function onTerminate():Void;
}
