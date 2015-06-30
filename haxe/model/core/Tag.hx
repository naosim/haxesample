package model.core;

class Tag {
    var tags:Map<String, Bool> = new Map();

    public function new(?tag:String, ?tags:Array<String>) {
        if (tag != null) {
            this.tags[tag] = true;
        } else if (tags != null) {
            for (t in tags) this.tags[t] = true;
        }
    }

    public function has(tag:String):Bool {
        return this.tags.exists(tag);
    }
}
