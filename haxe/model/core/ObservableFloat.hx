package model.core;
class ObservableFloat extends ObservableValue<Float>{
    public function new(value:Float) {
        super(value);
    }

    public function addValue(value: Float) {
        setValue(this.value + value);
    }
}
