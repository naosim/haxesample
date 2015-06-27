package model.core;

/**
* 衝突物のタグ
* View側が衝突物を識別するためのクラス
**/
import haxe.ds.HashMap;
@:expose
class CollisionIdentifier {
    public var id: String = createId();
    public var tag: Tag;
    public function new(?tag:Tag) {
        this.tag = tag != null ? tag : new Tag();
    }

    static var idCount: Int = 0;
    static function createId(): String {
        idCount++;
        return "" + idCount;
    }

    public static function withTag(?tag:String,?tags:Array<String>): CollisionIdentifier {
        return new CollisionIdentifier(new Tag(tag, tags));
    }
}

class Tag {
    var tags: Map<String, Bool> = new Map();
    public function new(?tag:String,?tags:Array<String>) {
        if(tag != null) {
            this.tags[tag] = true;
        } else if(tags != null) {
            for(t in tags) this.tags[t] = true;
        }
    }
    public function has(tag: String): Bool {
        return this.tags.exists(tag);
    }
}
