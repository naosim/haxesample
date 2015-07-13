package model.core;
class TimelineEvent {
    public var eventFrameFromLastEvent:Int;
    public var eventTask:Void -> Void;

    public function new(
        eventFrameFromLastEvent:Int,
        eventTask:Void -> Void
    ) {
        this.eventFrameFromLastEvent = eventFrameFromLastEvent;
        this.eventTask = eventTask;
    }

}
