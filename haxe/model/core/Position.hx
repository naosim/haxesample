package model.core;
class Position {
    public var x:Float = 0;
    public var y:Float = 0;
    @:allow(PositionCommand)
    var z: Float = 0;

    public function new(x:Float = 0, y:Float = 0) {
        this.x = x;
        this.y = y;
    }

    public static function zero() {
        return new Position();
    }

    public function distanceTo(other:Position) {
        return Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));
    }
}
