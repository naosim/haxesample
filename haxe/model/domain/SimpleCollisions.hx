package model.domain;

import model.core.EachHitCollision;
import model.core.Collision;

@:expose
class SimpleCollisions implements EachHitCollision {
    private var players:Array<Collision> = [];
    private var items:Array<Collision> = [];
    private var shots:Array<Collision> = [];
    private var enemies:Array<Collision> = [];
    private var enemyShots:Array<Collision> = [];

    public var onCreateListener:Collision -> Void;
    public var onDestoryListener:Collision -> Void;

    private var all:Array<Array<Collision>>;

    public function new() {
        all = [players, items, shots, enemies, enemyShots];
    }

    public function addPlayer(c:Collision) {
        players.push(c);
    }

    public function addItem(c:Collision) {
        items.push(c);
    }

    public function addShot(c:Collision) {
        shots.push(c);
    }

    public function addEnemy(c:Collision) {
        enemies.push(c);
    }

    public function addEnemyShot(c:Collision) {
        enemyShots.push(c);
    }

    public function eachHitCollisionPair(callback:Collision -> Collision -> Void):Void {
        eachHitCollisionPairWithList(players, items, callback);
        eachHitCollisionPairWithList(players, enemies, callback);
        eachHitCollisionPairWithList(players, enemyShots, callback);
        eachHitCollisionPairWithList(shots, enemies, callback);
    }

    private function eachHitCollisionPairWithList(ary1:Array<Collision>, ary2:Array<Collision>, callback:Collision -> Collision -> Void) {
        for (c1 in ary1) for (c2 in ary2) callback(c1, c2);
    }

    public function eachCollision(callback:Collision -> Void):Void {
        for (list in all) for (c in list) callback(c);
    }

    public function remove(ary:Array<Collision>):Void {
        for (c in ary) for (list in all) list.remove(c);
    }
}
