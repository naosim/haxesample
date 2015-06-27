package model.domain;

import model.core.ArrayObserver;
import model.core.EachHitCollision;
import model.core.Collision;

@:expose
class SimpleCollisions implements EachHitCollision {
    public var players(default, null):ArrayObserver<Collision> = collisionArray();
    public var items(default, null):ArrayObserver<Collision> = collisionArray();
    public var shots(default, null):ArrayObserver<Collision> = collisionArray();
    public var enemies(default, null):ArrayObserver<Collision> = collisionArray();
    public var enemyShots(default, null):ArrayObserver<Collision> = collisionArray();

    private var all:Array<ArrayObserver<Collision>>;

    private static function collisionArray(): ArrayObserver<Collision> {
        return new ArrayObserver<Collision>(new Array<Collision>());
    }

    public function new() {
        all = [players, items, shots, enemies, enemyShots];
    }

    public function setObserver(
        onCreateListener:Collision -> Void,
        onDestoryListener:Collision -> Void
    ) {
        for (list in all) list.setObserver(onCreateListener, onDestoryListener);
    }
    public function eachHitCollisionPair(callback:Collision -> Collision -> Void):Void {
        eachHitCollisionPairWithList(players, items, callback);
        eachHitCollisionPairWithList(players, enemies, callback);
        eachHitCollisionPairWithList(players, enemyShots, callback);
        eachHitCollisionPairWithList(shots, enemies, callback);
    }

    private function eachHitCollisionPairWithList(ary1:Iterable<Collision>, ary2:Iterable<Collision>, callback:Collision -> Collision -> Void) {
        for (c1 in ary1) for (c2 in ary2) callback(c1, c2);
    }

    public function eachCollision(callback:Collision -> Void):Void {
        for (list in all) for (c in list) callback(c);
    }

    public function remove(ary:Array<Collision>):Void {
        for (c in ary) for (list in all) list.remove(c);
    }
}

@:expose
class TagName {
    public static var player = "player";
    public static var shot = "shot";
    public static var item = "item";
    public static var enemy = "enemy";
    public static var enemyshot = "enemyshot";
}

