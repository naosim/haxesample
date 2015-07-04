package model.domain;

import model.domain.SimpleCollisions;
import model.domain.shot.WeekShot;
import model.core.Position;
import model.core.Collision;
import model.core.CollisionParams;

@:expose
class Player extends Collision {

    public var speed:Float = 3;
    static var MAX_HP = 50;
    var collisions:SimpleCollisions;
    var controlLocked = true;

    public function new(collisions:SimpleCollisions) {
        var params = CollisionParams.circle({r: 8, hp: 50, ap: 20, tagName: TagName.player});
        super(params, new Position(WorldStatus.WIDTH / 2, WorldStatus.HEIGHT + 10));
        this.collisions = collisions;

        registerHitPoint(function(before:Float, afterFloat):Void {

        });

        setIsAir(true);
    }

    public function up() {
        if(controlLocked) return;
        pos.y = pos.y - speed;
    }

    public function down() {
        if(controlLocked) return;
        pos.y = pos.y + speed;
    }

    public function right() {
        if(controlLocked) return;
        pos.x = pos.x + speed;
    }

    public function left() {
        if(controlLocked) return;
        pos.x = pos.x - speed;
    }

    public function shot() {
        if(controlLocked) return;
        var shots = createShots(collisions, new Position(this.pos.x, this.pos.y - 8));
        if (shots != null) collisions.shots.pushAll(shots);
    }

    public function lifeUp(value:Float) {
        value = Math.min(status.hitPoint.getValue() + value, MAX_HP);
        status.hitPoint.setValue(value);
    }

    public var createShots:SimpleCollisions -> Position -> Array<Collision> = WeekShot.create;

    public function getPlayerDirectionFrom(org:Position):Position {
        if (collisions.players.length() == 0) return new Position(0, 1);// 適当w
        return org.directionTo(this.pos);
    }

    var frame = 0;
    public override function onStep() {
        super.onStep();
        if(frame < 30) {
            pos.y -= 2;
        }
        if(frame == 30 * 1) {
            setIsAir(false);
            controlLocked = false;
        }
        frame++;
    }
}