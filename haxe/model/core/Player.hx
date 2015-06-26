package model.core;

import model.core.LinearMoveCollision;
import model.core.shape.Circle;
import model.core.shape.Shape;
@:expose
class Player extends Collision {

    public var speed:Float = 1;

    public override function step() {
    }

    public function new(shape:Shape, status:CollisionStatus, pos:Position) {
        super(shape, status, pos);
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
        var shotPos = LinearMovablePosition.linear(this.pos, new Position(0, -3));
        var shot = LinearMoveCollision.circle({r: 10, hp: 100, ap: 1, pos: shotPos});

        Main.collisions.addShot(shot);
    }

    public static function circle(params:{r:Int, hp:Int, ap:Int, pos:Position}):Player {
        return new Player(new Circle(params.r), new CollisionStatus(new HitPoint(params.hp), params.ap), params.pos);
    }


}
