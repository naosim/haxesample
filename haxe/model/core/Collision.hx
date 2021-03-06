package model.core;

import model.core.CollisionIdentifier;
import model.core.shape.Shape;

class Collision implements Step implements Terminatable implements CollisionLifeCycle {
    public var pos(default, null):Position;// 画面に対する相対位置
    public var shape(default, null):Shape;
    public var status:CollisionStatus;
    public var identifier:CollisionIdentifier;
    public var deadObserver:Array<Void -> Void> = [];

    public function new(params:CollisionParams, ?pos:Position) {
        this.pos = pos != null ? pos : Position.zero();
        this.shape = params.shape;
        this.status = params.status;
        this.identifier = params.identifier != null ? params.identifier : new CollisionIdentifier();
        this.status.registerDead(function(_, after:Bool) {
            if (after) for (o in deadObserver) o();
        });
        registerDead(onDead);
    }

    public function eachAttacked(other:Collision) {
        status.eachAttacked(other.status);
    }

    var isFirstStep = true;

    public function step() {
        if (isFirstStep) {
            onCreate();
            isFirstStep = false;
        }
        onStep();
// implements subclass
    }

    public function isDead():Bool {
        return status.isDead();
    }

    public function hasTag(tag:String):Bool {
        return identifier.hasTag(tag);
    }

    public function registerHitPoint(l:Float -> Float -> Void) {
        status.registerHitPoint(l);
    }

    public function unregisterHitPoint(l:Float -> Float -> Void) {
        status.unregisterHitPoint(l);
    }

    public function registerDead(o:Void -> Void) {
        deadObserver.push(o);
    }

    public function unregisterDead(o:Void -> Void) {
        deadObserver.remove(o);
    }

    public function setIsAir(isAir:Bool) {
        status.setIsAir(isAir);
    }

    public function terminate():Void {
        onTerminate();
        status.terminate();
        deadObserver = [];
    }

    public function onCreate() {}

    public function onDead() {}

    public function onStep() {}

    public function onTerminate() {}
}