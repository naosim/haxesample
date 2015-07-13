package model.core;
class StageEndConditionResult<T> {
    public var result:Bool;
    public var couse:T;

    public function new(result:Bool, ?couse:T) {
        this.result = result;
        this.couse = couse;
    }
}
