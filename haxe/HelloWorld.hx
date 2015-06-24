import model.core.shape.Circle;
import model.core.*;

class HelloWorld {
  static public function main() {
    var gameCore = new GameStepCore();

    var player = Collision.circle({r: 10, hp: 100, ap: 1, pos: Position.zero()});
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

class Player extends Collision {
  var life = 5;
  var score = 0;
}

@:expose
class GameStepCore implements Step {
  private var friends: Array<Collision> = [];
  private var items: Array<Collision> = [];
  private var enemies: Array<Collision> = [];

  public function new(){

  }

  public function step() {
    // 全体を移動させる
    for(list in [friends, items, enemies]) everyStep(list);

    // 全体を衝突させる
    everyCollision(friends, items);
    everyCollision(friends, enemies);

    // 死んだものを消す
    for(list in [friends, items, enemies]) removeDead(list);
  }

  function everyStep(ary: Array<Collision>) {
    for (c in ary) c.step();
  }

  function everyCollision(ary1: Array<Collision>, ary2: Array<Collision>) {
    for (c1 in ary1) for (c2 in ary2) c1.eachAttacked(c2);
  }

  function removeDead(ary: Array<Collision>) {
    var deads: Array<Collision> = [];
    for (c in ary) if(c.isDead()) deads.push(c);
    for (c in deads) ary.remove(c);
  }

  public function addFriend(c: Collision) {
    friends.push(c);
  }

  public function addItem(c: Collision) {
    items.push(c);
  }

  public function addEnemy(c: Collision) {
    enemies.push(c);
  }
}
