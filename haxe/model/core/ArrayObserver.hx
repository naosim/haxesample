package model.core;
class ArrayObserver<T> {
    private var ary: Array<T>;
    private var onCreateListener:Null<T -> Void>;
    private var onDestoryListener:Null<T -> Void>;

    public function new(ary: Array<T>) {
        this.ary = ary;
    }

    public function setObserver(
        onCreateListener:T -> Void,
        onDestoryListener:T -> Void
    ) {
        this.onCreateListener = onCreateListener;
        this.onDestoryListener = onDestoryListener;

// notify all, first.
        for(o in ary) this.onCreateListener(o);
    }

    public function push(o: T) {
        ary.push(o);
        onCreateListener(o);
    }
    public function remove(o: T) {
        if(ary.remove(o)) {
            onDestoryListener(o);
        }
    }

    public function iterator(): Iterator<T> {
        return ary.iterator();
    }
}

