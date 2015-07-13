package model.core.shape;
@:expose
class Circle implements Shape {
    public var radius(default, null):Float;
    public var pos(get, null):Position;

    public function get_pos() { return pos; }

    public function new(r:Int) {
        radius = r;
    }
}
