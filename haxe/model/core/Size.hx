package model.core;
class Size {
    public var width:Float = 0;
    public var height:Float = 0;

    public function new(w:Float = 0, h:Float = 0) {
        this.width = w;
        this.height = h;
    }

    public static function zero() {
        return new Size();
    }

    public function half(): Size {
        return new Size(width / 2, height / 2);
    }
}
