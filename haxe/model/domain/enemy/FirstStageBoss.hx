package model.domain.enemy;
import model.core.Tag;
import model.core.Position;
import model.core.CollisionParams;
import model.core.Collision;
class FirstStageBoss extends Collision {
    static var SPEED = 3;
    static var SHOT_INTERVAL = 30;
    var moveStatus = 0;
    var directionChangeInterval = 70;
    var frame = 0;
    var collisions:SimpleCollisions;
    public function new(collisions:SimpleCollisions) {
        super(CollisionParams.circle({r:8, hp: 300, ap:10, tagNames:[TagName.enemy, TagName.boss]}), new Position(40, 40));
        this.collisions = collisions;
    }

    var children:Array<Collision> = [];
    public override function onCreate() {
        for(i in 0...12) {
            var degree = i * 30;
            var c = new Collision(CollisionParams.circle({r:8, hp: 30, ap:10, tagNames:[TagName.enemy, TagName.bosschild]}), new Position(0, 0));
            children.push(c);
            collisions.enemies.push(c);
        }
    }

    public override function onDead() {}

    public override function onStep() {
        // ボスの位置
        var moveStatus = Math.floor(frame / directionChangeInterval) % 4;
        switch( Math.floor(frame / directionChangeInterval) % 4 ) {
            case 0: pos.x += SPEED;
            case 1: pos.y += SPEED;
            case 2: pos.x -= SPEED;
            case 3: pos.y -= SPEED;
            default:
                throw "バグってる";
        }

        // 子供の位置
        var radius = 40;
        for(i in 0...12) {
            var degree = i * 30 + frame;
            var c = children[i];
            var th = degree * Math.PI / 180;
            c.pos.x = radius * Math.cos(th) + pos.x;
            c.pos.y = radius * Math.sin(th) + pos.y;
        }

        // 定期的に玉を打つ
        if (frame % SHOT_INTERVAL == SHOT_INTERVAL - 1) {
            collisions.enemyShots.push(new DashToPlayerEnemy(collisions, pos, new Tag(TagName.enemyshot), {radius: 2}));
        }

        frame++;
    }

    public override function onTerminate() {}
}
