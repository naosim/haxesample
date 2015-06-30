package model.domain;

import model.domain.item.ItemFactory;
import model.core.TimelineStage.TimelineEvent;
import model.core.CollisionIdentifier.Tag;
import model.domain.enemy.StraightAndShotEnemy;
import model.domain.enemy.DashToPlayerEnemy;
import model.core.Collision.CollisionParams;
import model.core.Collision;
import model.core.Position;
import model.core.Step;
class Stage implements Step {
// 2分間のゲームなら
// 2[min] * 60[sec] * 30[fps]
// -> 3600フレーム
    static var FPS = 30;

    public var timelineEvent:Array<TimelineEvent>;

    public function new() {
        timelineEvent = [
            new TimelineEvent(3 * FPS, this.dashOneself(50)),
            new TimelineEvent(3 * FPS, this.dashOneself(280)),
            new TimelineEvent(3 * FPS, this.dashOneself(50)),
            new TimelineEvent(3 * FPS, this.straighatAndShot(0)),
            new TimelineEvent(3 * FPS, this.straighatAndShot(WorldStatus.WIDTH))
        ];

    }

    public function step():Void {
    }

    function push(enemies:Array<Collision>) {
        for (e in enemies) Main.collisions.enemies.push(e);
    }

    function dashOneself(orgx:Float):Void -> Void {
        return function():Void {
            var result:Array<Collision> = [];
            for (i in 0...5) {
                result.push(new DashToPlayerEnemy(new Position(orgx, -20 * i - 8), new Tag(TagName.enemy), {}));
            }
            push(result);
        }
    }

    function straighatAndShot(orgx:Float):Void -> Void {
        return function():Void {
            var result:Array<Collision> = [];
            var d = orgx < WorldStatus.WIDTH / 2 ? -1 : 1;
            for (i in 0...5) {
                var collision = new StraightAndShotEnemy(new Position(orgx + 15 * i * d, -i * 5));
                createItemWhenEnemyDead(collision);
                result.push(collision);
            }
            push(result);
        }
    }

    function createItemWhenEnemyDead(collision:Collision) {
        collision.registerDead(function() {
            Main.collisions.items.push(createItem(collision.pos));
        });
    }

    function createItem(orgPos:Position):Collision {
        return ItemFactory.create(orgPos, ItemType.doubleshot);
    }
}
