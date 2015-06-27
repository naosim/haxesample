package model.core;

@:expose
class GameStepCore implements Step {
    var eachCollision:EachHitCollision;
    var size:{width:Float, height:Float};
    public function new(eachCollision:EachHitCollision, size:{width:Float, height:Float}) {
        this.eachCollision = eachCollision;
        this.size = size;
    }

    public function step() {
        // 全体を移動させる
        eachCollision.eachCollision(function(c:Collision) { c.step(); });
        // 全体を衝突させる
        eachCollision.eachHitCollisionPair(function(c1:Collision, c2:Collision) {
            if (CollisionHitTest.hitTest(c1, c2)) {
                var a = 1;
                c1.eachAttacked(c2);
            }
        });
        // 画面外に出た
        eachCollision.eachCollision(function(c:Collision) { if(isOutOfWorld(c)) c.status.terminated = true; });

        // 死んだものを消す
        var deads:Array<Collision> = [];
        eachCollision.eachCollision(function(c:Collision) { if (c.isDead()) deads.push(c); });
        eachCollision.remove(deads);
    }

    private function isOutOfWorld(c:Collision): Bool {
        if(c.pos.x < - size.width || c.pos.x > size.width * 2) return true;
        if(c.pos.y < - size.height || c.pos.y > size.height * 2) return true;
        return false;
    }
}
