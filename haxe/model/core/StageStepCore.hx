package model.core;

class StageStepCore<T> implements Step implements Terminatable {
    var eachCollision:EachHitCollision;
    var size:{width:Float, height:Float};
    var stageLifeCycle:StageLifeCycle<T>;

    public function new(eachCollision:EachHitCollision, size:{width:Float, height:Float}, stageLifeCycle:StageLifeCycle<T>) {
        this.eachCollision = eachCollision;
        this.size = size;
        this.stageLifeCycle = stageLifeCycle;
    }

    var isFirstStep = true;
    var isCalledOnEnd = false;

    public function step() {
        if (isFirstStep) {
            stageLifeCycle.onStart();
            isFirstStep = false;
        }
        stageLifeCycle.onStep();

// 全体を移動させる
        eachCollision.eachCollision(function(c:Collision) {
            c.step();
        });
// 全体を衝突させる
        eachCollision.eachHitCollisionPair(function(c1:Collision, c2:Collision) {
            if (CollisionHitTest.hitTest(c1, c2)) {
                c1.eachAttacked(c2);
            }
        });
// 画面外に出た
        eachCollision.eachCollision(function(c:Collision) { if (isOutOfWorld(c)) c.status.terminated = true; });

// 死んだものを消す
        var deads:Array<Collision> = [];
        eachCollision.eachCollision(function(c:Collision) { if (c.isDead()) deads.push(c); });
        eachCollision.remove(deads);

// 死んだ残骸処理
        for (c in deads) c.terminate();

// ステージ終了処理(ステージ終了後もstep自体は呼べる)
        var result = stageLifeCycle.getStageEndCondisionResult();
        if (!isCalledOnEnd && result.result) {
            stageLifeCycle.onEnd(result.couse);
            isCalledOnEnd = true;
        }
    }

    private function isOutOfWorld(c:Collision):Bool {
        if (c.pos.x < -size.width || c.pos.x > size.width * 2) return true;
        if (c.pos.y < -size.height || c.pos.y > size.height * 2) return true;
        return false;
    }

    public function terminate():Void {
        eachCollision.eachCollision(function(c:Collision) { c.terminate(); });
    }
}
