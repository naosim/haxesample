package model.core;
class TimelineStage implements Step {

    var frameFromLastEvent:Int = 0;
    var timeline:Array<TimelineEvent>;
    var nextEvent:TimelineEvent;

    public function new(timeline:Array<TimelineEvent>) {
        this.timeline = timeline;
        nextEvent = timeline.shift();
    }

    public function step():Void {
        if (nextEvent != null && frameFromLastEvent >= nextEvent.eventFrameFromLastEvent) {
            nextEvent.eventTask();
            nextEvent = timeline.shift();
            frameFromLastEvent = 0;
        }
        frameFromLastEvent++;
    }
}
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