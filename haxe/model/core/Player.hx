package model.core;
import model.core.shape.*;
@:expose
class Player extends Collision {

  public var speed: Float = 1;

  public override function step() {
    /*pos.x = pos.x + 1;*/
  }

  public function up() {
    pos.y = pos.y - speed;
  }

  public function down() {
    pos.y = pos.y + speed;
  }

  public function right() {
    pos.x = pos.x + speed;
  }

  public function left() {
    pos.x = pos.x - speed;
  }

  public function shot() {
    var pos = Position.zero();
    pos.y = -3;
    StepablePosition.linear(pos);
  }

  public static function circle(params: {r: Int, hp: Int, ap: Int, pos: Position}): Player {
    return new Player(new Circle(params.r), new CollisionStatus(new HitPoint(params.hp), params.ap), params.pos);
  }


}
