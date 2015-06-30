package model.domain.item;
import model.domain.shot.WeekShot;
import model.core.Position;
import model.core.SteppablePositionCollision;
import model.core.GravityPositionStep;
import model.core.Collision;
class ItemFactory {

    var collisions:SimpleCollisions;

    public function new(collisions:SimpleCollisions) {
        this.collisions = collisions;
    }

    public function create(orgPos:Position, itemType:ItemType):Collision {
        var apply = switch(itemType) {
            case ItemType.doubleshot:applyDoubleShotItem;
            case ItemType.lifeup:applyLifeUpItem;
        }
        return createItem(orgPos, Std.string(itemType), apply);
    }

    function createItem(orgPos:Position, tag:String, onDeadItem:Void -> Void):Collision {
        var params = CollisionParams.circle({r:8, hp:1, ap:0, tagName: TagName.item});
        var speed = new Position(0, -5);
        var pos = GravityPositionStep.createPosition(orgPos, speed);
        var c = new SteppablePositionCollision(params, pos);
        c.registerDead(onDeadItem);
        return c;
    }

    function applyDoubleShotItem() {
        player().createShots = WeekShot.createDoubleShots;
    }

    function applyLifeUpItem() {
        player().lifeUp(10);
    }

    function player():Player {
        return collisions.player();
    }
}

enum ItemType {
    doubleshot;
    lifeup;
}
