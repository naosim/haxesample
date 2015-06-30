package model.core;
import model.core.shape.Shape;
import model.core.shape.Circle;

class CollisionParams {
    public var shape:Shape;
    public var status:CollisionStatus;
    public var identifier:CollisionIdentifier;

    public function new(
        shape:Shape,
        status:CollisionStatus,
        ?identifier:CollisionIdentifier) {
        this.shape = shape;
        this.status = status;
        this.identifier = identifier;
    }

    public static function circle(params:{r:Int, hp:Int, ap:Int, ?tagName:String, ?tagNames:Array<String>, ?tag:Tag}):CollisionParams {
        var c = new Circle(params.r);
        var status = new CollisionStatus(new HitPoint(params.hp), params.ap);
        var identifier = params.tag != null ? new CollisionIdentifier(params.tag) : CollisionIdentifier.withTag(params.tagName, params.tagNames);
        return new CollisionParams(c, status, identifier);
    }
}
