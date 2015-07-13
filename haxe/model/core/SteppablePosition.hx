package model.core;

class SteppablePosition extends Position implements Step {
    private var _step:Position -> Void;

    public function new(x:Float, y:Float, step:Position -> Void) {
        super(x, y);
        this._step = step;
    }

    public function step():Void {
        this._step(this);
    }

    public static function linear(defaultPosition:Position, diff:Position):SteppablePosition {
        return new SteppablePosition(defaultPosition.x, defaultPosition.y, function(pos:Position):Void {
            pos.x = pos.x + diff.x;
            pos.y = pos.y + diff.y;
        });
    }
}
