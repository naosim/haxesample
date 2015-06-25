import model.core.shape.*;
import model.core.*;

@:expose
class Main {
  public static var gameCore: GameStepCore;
  public static var player: Player;
  static public function main() {
    gameCore = new GameStepCore();

    player = Player.circle({r: 10, hp: 100, ap: 1, pos: Position.zero()});
    gameCore.addFriend(player);

    var shot = Collision.circle({r: 1, hp: 1, ap: 5, pos: Position.zero()});
    gameCore.addItem(shot);

    var enemy = Collision.circle({r: 10, hp: 20, ap: 1, pos: Position.zero()});
    gameCore.addEnemy(enemy);

    trace("shot", shot.isDead(), shot.status.hitPoint.value);
    trace("enemy", enemy.isDead(), enemy.status.hitPoint.value);
    enemy.pos.x = 10;
    enemy.pos.x = 10;

    enemy.eachAttacked(shot);

    trace("shot", shot.isDead(), shot.status.hitPoint.value);
    trace("enemy", enemy.isDead(), enemy.status.hitPoint.value);

    trace(CollisionHitTest.hitTest(shot, enemy));

    gameCore.step();
  }


}
