package model.core;
class Position {
    public var x:Float = 0;
    public var y:Float = 0;
    @:allow(PositionCommand)
    var z:Float = 0;

    public function new(x:Float = 0, y:Float = 0) {
        this.x = x;
        this.y = y;
    }

    public static function zero() {
        return new Position();
    }

    public function distanceTo(other:Position):Float {
        return Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));
    }

    public function vectorTo(other:Position):Position {
        return new Position(other.x - x, other.y - y);
    }

    public function multipl(v:Float):Position {
        return new Position(x * v, y * v);
    }

    public function divide(v:Float):Position {
        return new Position(x / v, y / v);
    }

    public function directionTo(other:Position):Position {
        return vectorTo(other).divide(distanceTo(other));
    }
}
