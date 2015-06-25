package model.core;
@:expose
class StepablePosition extends Position implements Step {
  private var _step: Position -> Void;
  public function new(step: Position -> Void) {
    super();
    this._step = step;
  }

  public function step(): Void {
    this._step(this);
  }

  public static function linear(diff: Position) {
    return new StepablePosition(function(pos: Position): Void {
      pos.x = pos.x + diff.x;
      pos.y = pos.y + diff.y;
    });
  }
}
