package model.core;

import model.domain.SimpleCollisions.TagName;
import model.core.Collision.CollisionParams;
import model.core.CollisionIdentifier;
import model.core.CollisionIdentifier.Tag;
import model.core.LinearMoveCollision;
import model.core.shape.Circle;
import model.core.shape.Shape;
@:expose
class Player extends Collision {

    public var speed:Float = 1;

    public override function step() {
    }

    public function new(params: CollisionParams, ?pos: Position) {
        super(params, pos);
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
        var shot = new LinearMoveCollision(CollisionParams.circle({r: 2, hp: 1, ap: 10, tag: TagName.shot}), shotPos);

        Main.collisions.shots.push(shot);
    }


}
