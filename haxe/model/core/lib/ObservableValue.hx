package model.core.lib;
class ObservableValue<T> implements Terminatable{
    var value:T;
    var listener:Array<T -> T -> Void> = [];
    public function new(value:T) {
        this.value = value;
    }
    public function getValue() {
        return value;
    }

    public function setValue(value: T) {
        var lastValue = this.value;
        this.value = value;
        if(value != lastValue) for(l in listener) l(lastValue, value);
    }

    public function register(l: T -> T -> Void) {
        listener.push(l);
        l(value, value);
    }

    public function unregister(l: T -> T -> Void) {
        listener.remove(l);
    }

    public function terminate(): Void {
        listener = null;
    }
}
