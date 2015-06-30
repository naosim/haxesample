package model.domain;
import model.domain.item.ItemFactory.ItemType;
@:expose
class TagName {
    public static var player = "player";
    public static var shot = "shot";
    public static var item = "item";
    public static var enemy = "enemy";
    public static var enemyshot = "enemyshot";

    public static var doubleshot = Std.string(ItemType.doubleshot);
    public static var lifeup = Std.string(ItemType.lifeup);
}