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
        return (switch(itemType) {
            case ItemType.doubleShot:createDoubleShotItem;
            case ItemType.lifeUp:createDoubleShotItem;
        })(orgPos);
    }

    static function createItem(orgPos:Position, onDeadItem:Void -> Void):Collision {
        var params = CollisionParams.circle({r:8, hp:1, ap:0, tagName: TagName.item});
        var speed = new Position(0, -5);
        var pos = GravityPositionStep.createPosition(orgPos, speed);
        var c = new SteppablePositionCollision(params, pos);
        c.registerDead(onDeadItem);
        return c;
    }

    static function createDoubleShotItem(orgPos:Position):Collision {
        return createItem(orgPos, function() {
            var player:Player = cast(Main.collisions.players.get(0), Player);
            player.createShots = WeekShot.createDoubleShots;
        });
    }
}

enum ItemType {
    doubleShot;
    lifeUp;
}
