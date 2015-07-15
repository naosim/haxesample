package model.core;
class Rect {
    public var centerPos:Position;
    public var size:Size;

    public function new(centerPos:Position, size:Size) {
        this.centerPos = centerPos;
        this.size = size;
    }

    public function isInside(p:Position):Bool {
        var half = size.half();
        if(p.x < centerPos.x - half.width) return false;
        if(p.x > centerPos.x + half.width) return false;
        if(p.y < centerPos.y - half.height) return false;
        if(p.y > centerPos.y + half.height) return false;
        return true;
    }

    public static function create(x:Float,y:Float,w:Float,h:Float): Rect {
        return new Rect(new Position(x,y), new Size(w,h));
    }
}
