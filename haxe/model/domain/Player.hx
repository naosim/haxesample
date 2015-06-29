package model.domain;

import model.domain.shot.WeekShot;
import model.core.SteppablePosition;
import model.core.Position;
import model.core.Collision;
import model.core.Collision.CollisionParams;

@:expose
class Player extends Collision {

    public var speed:Float = 3;

    public override function step() {
    }

    public function new(?pos:Position) {
        var params = CollisionParams.circle({r: 8, hp: 50, ap: 20, tagName: TagName.player});
        super(params, pos);

        registerHitPoint(function(before:Float, afterFloat):Void {

        });
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
        if (Main.collisions.shots.length() >= 10) return;
        var shotPos = SteppablePosition.linear(this.pos, new Position(0, -3));
        var shot = WeekShot.create(new Position(this.pos.x, this.pos.y - 8));
        if (shot != null) Main.collisions.shots.push(shot);
    }
}