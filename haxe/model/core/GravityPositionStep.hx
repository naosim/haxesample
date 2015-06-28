package model.core;
import model.core.Collision;
import model.core.Position;
class GravityPositionStep {
    var speed:Position;
    var gravity:Position;

    public function new(speed:Position, gravity:Position) {
        this.speed = speed;
        this.gravity = gravity;
    }

    public function step(pos:Position) {
        speed.x += gravity.x;
        speed.y += gravity.y;
        pos.x += speed.x;
        pos.y += speed.y;
    }

    public static var DOWN = 0;
    public static var UP = 1;
    public static var RIGHT = 2;
    public static var LEFT = 3;
    public static function create(speed:Position, ?gravity:Position, ?gravityDirection:Int):GravityPositionStep {
        if(gravity == null) {
            if(gravityDirection == null) gravityDirection = DOWN;
            if(gravityDirection == DOWN) {
                gravity = new Position(0, 0.3);
            } else if(gravityDirection == UP) {
                gravity = new Position(0, -0.3);
            } else if(gravityDirection == RIGHT) {
                gravity = new Position(0.3, 0);
            } else if(gravityDirection == LEFT) {
                gravity = new Position(-0.3, 0);
            }
        }
        return new GravityPositionStep(speed, gravity);

    }

    public static function createPosition(orgPosition:Position, speed:Position, ?gravity:Position, ?gravityDirection:Int) {
        return new SteppablePosition(orgPosition.x, orgPosition.y, create(speed, gravity,gravityDirection).step);
    }
}
