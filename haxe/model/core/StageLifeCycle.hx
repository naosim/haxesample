package model.core;
interface StageLifeCycle<T> {
    public function onStart():Void;
    public function onStep():Void;
    public function onEnd(couse:T):Void;
    public function getStageEndCondisionResult():StageEndConditionResult<T>;
}
