import model.core.shape.*;
import model.core.*;
import model.domain.*;

@:expose
class Main {
  public static var gameCore: GameStepCore;
  public static var player: Player;
  public static var collisions = new SimpleCollisions();
  static public function main() {
    gameCore = new GameStepCore(collisions);

    player = Player.circle({r: 10, hp: 100, ap: 1, pos: Position.zero()});
    collisions.addPlayer(player);

    var shot = Collision.circle({r: 1, hp: 1, ap: 5, pos: Position.zero()});
    collisions.addItem(shot);

    var enemy = Collision.circle({r: 10, hp: 20, ap: 1, pos: Position.zero()});
    collisions.addEnemy(enemy);
  }


}
