package model.domain.item;
import model.domain.shot.WeekShot;
import model.core.Position;
import model.core.SteppablePositionCollision;
import model.core.GravityPositionStep;
import model.core.Collision;
class ItemFactory {

    public function new() {
    }

    public static function create(orgPos:Position, itemType:ItemType):Collision {
        var apply = switch(itemType) {
            case ItemType.doubleshot:applyDoubleShotItem;
            case ItemType.lifeup:applyLifeUpItem;
        }
        return createItem(orgPos, Std.string(itemType), apply);
    }

    static function createItem(orgPos:Position, tag:String, onDeadItem:Void -> Void):Collision {
        var params = CollisionParams.circle({r:8, hp:1, ap:0, tagName: TagName.item});
        var speed = new Position(0, -5);
        var pos = GravityPositionStep.createPosition(orgPos, speed);
        var c = new SteppablePositionCollision(params, pos);
        c.registerDead(onDeadItem);
        return c;
    }

    static function applyDoubleShotItem() {
        player().createShots = WeekShot.createDoubleShots;
    }

    static function applyLifeUpItem() {
        player().lifeUp(10);
    }

    static function player():Player {
        return Main.collisions.player();
    }
}

enum ItemType {
    doubleshot;
    lifeup;
}
