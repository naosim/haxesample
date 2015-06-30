package model.domain;

import model.domain.SimpleCollisions;
import model.domain.shot.WeekShot;
import model.core.Position;
import model.core.Collision;
import model.core.CollisionParams;

@:expose
class Player extends Collision {

    public var speed:Float = 3;
    static var MAX_LIFE = 50;
    var collisions:SimpleCollisions;

    public override function step() {
    }

    public function new(collisions:SimpleCollisions, ?pos:Position) {
        var params = CollisionParams.circle({r: 8, hp: MAX_LIFE, ap: 20, tagName: TagName.player});
        super(params, pos);
        this.collisions = collisions;

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
        var shots = createShots(collisions, new Position(this.pos.x, this.pos.y - 8));
        if (shots != null) collisions.shots.pushAll(shots);
    }

    public function lifeUp(value:Float) {
        value = Math.min(status.hitPoint.getValue() + value, MAX_LIFE);
        status.hitPoint.setValue(value);
    }

    public var createShots:SimpleCollisions -> Position -> Array<Collision> = WeekShot.create;

    public function getPlayerDirectionFrom(org:Position):Position {
        if (collisions.players.length() == 0) return new Position(0, 1);// 適当w
        return org.directionTo(this.pos);
    }
}