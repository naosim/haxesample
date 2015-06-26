package model.core;

@:expose
class GameStepCore implements Step {
    private var eachCollision:EachHitCollision;

    public function new(eachCollision:EachHitCollision) {
        this.eachCollision = eachCollision;
    }

    public function step() {
// 全体を移動させる
        eachCollision.eachCollision(function(c:Collision) { c.step(); });

// 全体を衝突させる
        eachCollision.eachHitCollisionPair(function(c1:Collision, c2:Collision) {
            if (CollisionHitTest.hitTest(c1, c2)) c1.eachAttacked(c2);
        });

// 死んだものを消す
        var deads:Array<Collision> = [];
        eachCollision.eachCollision(function(c:Collision) { if (c.isDead()) deads.push(c); });
        eachCollision.remove(deads);
    }
}
