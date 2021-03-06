package model.core;

/**
* 衝突物のタグ
* View側が衝突物を識別するためのクラス
**/
class CollisionIdentifier {
    public var id:String = createId();
    public var tag:Tag;

    public function new(?tag:Tag) {
        this.tag = tag != null ? tag : new Tag();
    }

    public function hasTag(tagName:String) {
        return tag.has(tagName);
    }

    static var idCount:Int = 0;

    static function createId():String {
        idCount++;
        return "" + idCount;
    }

    public static function withTag(?tag:String, ?tags:Array<String>):CollisionIdentifier {
        return new CollisionIdentifier(new Tag(tag, tags));
    }
}
