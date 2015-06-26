package model.core;
@:expose
class Position {
    public var x:Float = 0;
    public var y:Float = 0;

    public function new() {
    }

    public static function zero() {
        return new Position();
    }

    public function distanceTo(other:Position) {
        return Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));
    }
}
