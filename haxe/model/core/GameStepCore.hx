package model.core;
import model.core.shape.*;

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
