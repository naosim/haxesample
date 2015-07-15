package model.core;
class MapStage implements Step {
    public var displayRect: Rect;
    public var worldSize: Size;
    public var mapStageOptMode: MapStageOptMode;

    var frameFromLastEvent:Int = 0;
    var timeline:Array<TimelineEvent>;
    var nextEvent:TimelineEvent;
    var mapStageEvents:Array<MapStageEvent>;

    public function new(displayRect: Rect, worldSize: Size, mapStageEvents:Array<MapStageEvent>) {
        this.displayRect = displayRect;
        this.worldSize = worldSize;
        this.mapStageEvents = mapStageEvents;
    }

    public function getDisplayRect(): Rect {
        return displayRect;
    }

    public function step():Void {
        for(mapStageEvent in mapStageEvents) {
            var isInside = displayRect.isInside(mapStageEvent.pos);
            if(isInside && !mapStageEvent.isDisplay) {
                // send event
                mapStageEvent.runAction();
                mapStageEvent.isDisplay = true;
            } else if(!isInside && mapStageEvent.isDisplay) {
                mapStageEvent.isDisplay = false;
            }
        }

    }
}

enum MapStageOptMode {
    none; sortX; sortY;
}

class MapStageEvent {
    public var pos:Position;
    public var isDisplay:Bool = false;
    var action: Void -> Void;
    public function new(pos:Position, action: Void -> Void) {
        this.action = action;
    }

    public function runAction() {
        this.action();
    }
}