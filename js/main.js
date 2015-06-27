(function (console, $hx_exports) { "use strict";
$hx_exports.model = $hx_exports.model || {};
$hx_exports.model.core = $hx_exports.model.core || {};
$hx_exports.model.core.shape = $hx_exports.model.core.shape || {};
;$hx_exports.model.domain = $hx_exports.model.domain || {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var model_core_EachHitCollision = function() { };
model_core_EachHitCollision.__name__ = true;
model_core_EachHitCollision.prototype = {
	__class__: model_core_EachHitCollision
};
var model_domain_SimpleCollisions = $hx_exports.model.domain.SimpleCollisions = function() {
	this.enemyShots = model_domain_SimpleCollisions.collisionArray();
	this.enemies = model_domain_SimpleCollisions.collisionArray();
	this.shots = model_domain_SimpleCollisions.collisionArray();
	this.items = model_domain_SimpleCollisions.collisionArray();
	this.players = model_domain_SimpleCollisions.collisionArray();
	this.all = [this.players,this.items,this.shots,this.enemies,this.enemyShots];
};
model_domain_SimpleCollisions.__name__ = true;
model_domain_SimpleCollisions.__interfaces__ = [model_core_EachHitCollision];
model_domain_SimpleCollisions.collisionArray = function() {
	return new model_core_ArrayObserver([]);
};
model_domain_SimpleCollisions.prototype = {
	setObserver: function(onCreateListener,onDestoryListener) {
		var _g = 0;
		var _g1 = this.all;
		while(_g < _g1.length) {
			var list = _g1[_g];
			++_g;
			list.setObserver(onCreateListener,onDestoryListener);
		}
	}
	,eachHitCollisionPair: function(callback) {
		this.eachHitCollisionPairWithList(this.players,this.items,callback);
		this.eachHitCollisionPairWithList(this.players,this.enemies,callback);
		this.eachHitCollisionPairWithList(this.players,this.enemyShots,callback);
		this.eachHitCollisionPairWithList(this.shots,this.enemies,callback);
	}
	,eachHitCollisionPairWithList: function(ary1,ary2,callback) {
		var $it0 = $iterator(ary1)();
		while( $it0.hasNext() ) {
			var c1 = $it0.next();
			var $it1 = $iterator(ary2)();
			while( $it1.hasNext() ) {
				var c2 = $it1.next();
				callback(c1,c2);
			}
		}
	}
	,eachCollision: function(callback) {
		var _g = 0;
		var _g1 = this.all;
		while(_g < _g1.length) {
			var list = _g1[_g];
			++_g;
			var $it0 = list.iterator();
			while( $it0.hasNext() ) {
				var c = $it0.next();
				callback(c);
			}
		}
	}
	,remove: function(ary) {
		var _g = 0;
		while(_g < ary.length) {
			var c = ary[_g];
			++_g;
			var _g1 = 0;
			var _g2 = this.all;
			while(_g1 < _g2.length) {
				var list = _g2[_g1];
				++_g1;
				list.remove(c);
			}
		}
	}
	,__class__: model_domain_SimpleCollisions
};
var Main = $hx_exports.Main = function() { };
Main.__name__ = true;
Main.main = function() {
};
Main.setup = function(size,onCreateListener,onDestoryListener) {
	Main.gameCore = new model_core_GameStepCore(Main.collisions,size);
	Main.collisions.setObserver(onCreateListener,onDestoryListener);
	var params = model_core_CollisionParams.circle({ r : 8, hp : 100, ap : 20, tag : model_domain_TagName.player});
	Main.player = new model_core_Player(params,new model_core_Position(160,240));
	Main.collisions.players.push(Main.player);
	var enemy = new model_core_Collision(model_core_CollisionParams.circle({ r : 8, hp : 5, ap : 5, tag : model_domain_TagName.enemy}),new model_core_Position(80,20));
	Main.collisions.enemies.push(enemy);
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var model_core_ArrayObserver = function(ary) {
	this.ary = ary;
};
model_core_ArrayObserver.__name__ = true;
model_core_ArrayObserver.prototype = {
	setObserver: function(onCreateListener,onDestoryListener) {
		this.onCreateListener = onCreateListener;
		this.onDestoryListener = onDestoryListener;
		var _g = 0;
		var _g1 = this.ary;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			this.onCreateListener(o);
		}
	}
	,push: function(o) {
		this.ary.push(o);
		this.onCreateListener(o);
	}
	,remove: function(o) {
		if(HxOverrides.remove(this.ary,o)) this.onDestoryListener(o);
	}
	,iterator: function() {
		return HxOverrides.iter(this.ary);
	}
	,__class__: model_core_ArrayObserver
};
var model_core_Terminatable = function() { };
model_core_Terminatable.__name__ = true;
model_core_Terminatable.prototype = {
	__class__: model_core_Terminatable
};
var model_core_Step = function() { };
model_core_Step.__name__ = true;
model_core_Step.prototype = {
	__class__: model_core_Step
};
var model_core_Collision = $hx_exports.model.core.Collision = function(params,pos) {
	if(pos != null) this.pos = pos; else this.pos = model_core_Position.zero();
	this.shape = params.shape;
	this.status = params.status;
	if(params.identifier != null) this.identifier = params.identifier; else this.identifier = new model_core_CollisionIdentifier();
};
model_core_Collision.__name__ = true;
model_core_Collision.__interfaces__ = [model_core_Terminatable,model_core_Step];
model_core_Collision.prototype = {
	eachAttacked: function(other) {
		this.status.eachAttacked(other.status);
	}
	,step: function() {
	}
	,isDead: function() {
		return this.status.isDead();
	}
	,hasTag: function(tag) {
		return this.identifier.tag.has(tag);
	}
	,registerHit: function(l) {
		this.status.hitPoint.register(l);
	}
	,unregisterHit: function(l) {
		this.status.hitPoint.unregister(l);
	}
	,terminate: function() {
		this.status.terminate();
	}
	,__class__: model_core_Collision
};
var model_core_CollisionParams = function(shape,status,identifier) {
	this.shape = shape;
	this.status = status;
	this.identifier = identifier;
};
model_core_CollisionParams.__name__ = true;
model_core_CollisionParams.circle = function(params) {
	var c = new model_core_shape_Circle(params.r);
	var status = new model_core_CollisionStatus(new model_core_HitPoint(params.hp),params.ap);
	return new model_core_CollisionParams(c,status,model_core_CollisionIdentifier.withTag(params.tag,params.tags));
};
model_core_CollisionParams.prototype = {
	__class__: model_core_CollisionParams
};
var model_core_CollisionHitTest = function(left,right) {
	this.left = left;
	this.right = right;
};
model_core_CollisionHitTest.__name__ = true;
model_core_CollisionHitTest.hitTest = function(left,right) {
	if(js_Boot.__instanceof(left.shape,model_core_shape_Circle) && js_Boot.__instanceof(right.shape,model_core_shape_Circle)) return left.pos.distanceTo(right.pos) < (js_Boot.__cast(left.shape , model_core_shape_Circle)).radius + (js_Boot.__cast(right.shape , model_core_shape_Circle)).radius;
	return false;
};
model_core_CollisionHitTest.prototype = {
	__class__: model_core_CollisionHitTest
};
var model_core_CollisionIdentifier = $hx_exports.model.core.CollisionIdentifier = function(tag) {
	this.id = model_core_CollisionIdentifier.createId();
	if(tag != null) this.tag = tag; else this.tag = new model_core_Tag();
};
model_core_CollisionIdentifier.__name__ = true;
model_core_CollisionIdentifier.createId = function() {
	model_core_CollisionIdentifier.idCount++;
	return "" + model_core_CollisionIdentifier.idCount;
};
model_core_CollisionIdentifier.withTag = function(tag,tags) {
	return new model_core_CollisionIdentifier(new model_core_Tag(tag,tags));
};
model_core_CollisionIdentifier.prototype = {
	__class__: model_core_CollisionIdentifier
};
var model_core_Tag = function(tag,tags) {
	this.tags = new haxe_ds_StringMap();
	if(tag != null) {
		this.tags.set(tag,true);
		true;
	} else if(tags != null) {
		var _g = 0;
		while(_g < tags.length) {
			var t = tags[_g];
			++_g;
			{
				this.tags.set(t,true);
				true;
			}
		}
	}
};
model_core_Tag.__name__ = true;
model_core_Tag.prototype = {
	has: function(tag) {
		return this.tags.exists(tag);
	}
	,__class__: model_core_Tag
};
var model_core_CollisionStatus = function(hitPoint,attackPoint) {
	this.terminated = false;
	this.hitPoint = hitPoint;
	this.attackPoint = attackPoint;
};
model_core_CollisionStatus.__name__ = true;
model_core_CollisionStatus.__interfaces__ = [model_core_Terminatable];
model_core_CollisionStatus.prototype = {
	attackedFrom: function(other) {
		this.hitPoint.addValue(-other.attackPoint);
	}
	,eachAttacked: function(other) {
		this.attackedFrom(other);
		other.attackedFrom(this);
	}
	,isDead: function() {
		return this.hitPoint.isDead() || this.terminated;
	}
	,terminate: function() {
		this.hitPoint.terminate();
	}
	,__class__: model_core_CollisionStatus
};
var model_core_GameStepCore = $hx_exports.model.core.GameStepCore = function(eachCollision,size) {
	this.eachCollision = eachCollision;
	this.size = size;
};
model_core_GameStepCore.__name__ = true;
model_core_GameStepCore.__interfaces__ = [model_core_Step];
model_core_GameStepCore.prototype = {
	step: function() {
		var _g = this;
		this.eachCollision.eachCollision(function(c) {
			c.step();
		});
		this.eachCollision.eachHitCollisionPair(function(c1,c2) {
			if(model_core_CollisionHitTest.hitTest(c1,c2)) {
				var a = 1;
				c1.eachAttacked(c2);
			}
		});
		this.eachCollision.eachCollision(function(c3) {
			if(_g.isOutOfWorld(c3)) c3.status.terminated = true;
		});
		var deads = [];
		this.eachCollision.eachCollision(function(c4) {
			if(c4.isDead()) deads.push(c4);
		});
		this.eachCollision.remove(deads);
	}
	,isOutOfWorld: function(c) {
		if(c.pos.x < -this.size.width || c.pos.x > this.size.width * 2) return true;
		if(c.pos.y < -this.size.height || c.pos.y > this.size.height * 2) return true;
		return false;
	}
	,__class__: model_core_GameStepCore
};
var model_core_ObservableValue = $hx_exports.model.core.ObservableValue = function(value) {
	this.listener = [];
	this.value = value;
};
model_core_ObservableValue.__name__ = true;
model_core_ObservableValue.__interfaces__ = [model_core_Terminatable];
model_core_ObservableValue.prototype = {
	getValue: function() {
		return this.value;
	}
	,setValue: function(value) {
		var lastValue = this.value;
		this.value = value;
		if(value != lastValue) {
			var _g = 0;
			var _g1 = this.listener;
			while(_g < _g1.length) {
				var l = _g1[_g];
				++_g;
				l(lastValue,value);
			}
		}
	}
	,register: function(l) {
		this.listener.push(l);
		l(this.value,this.value);
	}
	,unregister: function(l) {
		HxOverrides.remove(this.listener,l);
	}
	,terminate: function() {
		this.listener = null;
	}
	,__class__: model_core_ObservableValue
};
var model_core_ObservableFloat = function(value) {
	model_core_ObservableValue.call(this,value);
};
model_core_ObservableFloat.__name__ = true;
model_core_ObservableFloat.__super__ = model_core_ObservableValue;
model_core_ObservableFloat.prototype = $extend(model_core_ObservableValue.prototype,{
	addValue: function(value) {
		this.setValue(this.value + value);
	}
	,__class__: model_core_ObservableFloat
});
var model_core_HitPoint = function(value) {
	this._isRigid = false;
	model_core_ObservableFloat.call(this,value);
	if(value == null) this._isRigid = true;
};
model_core_HitPoint.__name__ = true;
model_core_HitPoint.__super__ = model_core_ObservableFloat;
model_core_HitPoint.prototype = $extend(model_core_ObservableFloat.prototype,{
	isRigid: function() {
		return this._isRigid;
	}
	,isDead: function() {
		return !this._isRigid && this.value <= 0;
	}
	,__class__: model_core_HitPoint
});
var model_core_Position = $hx_exports.model.core.Position = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.y = 0;
	this.x = 0;
	this.x = x;
	this.y = y;
};
model_core_Position.__name__ = true;
model_core_Position.zero = function() {
	return new model_core_Position();
};
model_core_Position.prototype = {
	distanceTo: function(other) {
		return Math.sqrt(Math.pow(this.x - other.x,2) + Math.pow(this.y - other.y,2));
	}
	,__class__: model_core_Position
};
var model_core_LinearMovablePosition = $hx_exports.model.core.LinearMovablePosition = function(x,y,step) {
	model_core_Position.call(this,x,y);
	this._step = step;
};
model_core_LinearMovablePosition.__name__ = true;
model_core_LinearMovablePosition.__interfaces__ = [model_core_Step];
model_core_LinearMovablePosition.linear = function(defaultPosition,diff) {
	return new model_core_LinearMovablePosition(defaultPosition.x,defaultPosition.y,function(pos) {
		pos.x = pos.x + diff.x;
		pos.y = pos.y + diff.y;
	});
};
model_core_LinearMovablePosition.__super__ = model_core_Position;
model_core_LinearMovablePosition.prototype = $extend(model_core_Position.prototype,{
	step: function() {
		this._step(this);
	}
	,__class__: model_core_LinearMovablePosition
});
var model_core_LinearMoveCollision = function(params,pos) {
	model_core_Collision.call(this,params,pos);
	this.movablePos = pos;
};
model_core_LinearMoveCollision.__name__ = true;
model_core_LinearMoveCollision.__super__ = model_core_Collision;
model_core_LinearMoveCollision.prototype = $extend(model_core_Collision.prototype,{
	step: function() {
		this.movablePos.step();
	}
	,__class__: model_core_LinearMoveCollision
});
var model_core_Player = $hx_exports.model.core.Player = function(params,pos) {
	this.speed = 1;
	model_core_Collision.call(this,params,pos);
};
model_core_Player.__name__ = true;
model_core_Player.__super__ = model_core_Collision;
model_core_Player.prototype = $extend(model_core_Collision.prototype,{
	step: function() {
	}
	,up: function() {
		this.pos.y = this.pos.y - this.speed;
	}
	,down: function() {
		this.pos.y = this.pos.y + this.speed;
	}
	,right: function() {
		this.pos.x = this.pos.x + this.speed;
	}
	,left: function() {
		this.pos.x = this.pos.x - this.speed;
	}
	,shot: function() {
		var pos = model_core_Position.zero();
		pos.y = -3;
		var shotPos = model_core_LinearMovablePosition.linear(this.pos,new model_core_Position(0,-3));
		var shot = new model_core_LinearMoveCollision(model_core_CollisionParams.circle({ r : 2, hp : 1, ap : 10, tag : model_domain_TagName.shot}),shotPos);
		Main.collisions.shots.push(shot);
	}
	,__class__: model_core_Player
});
var model_core_shape_Shape = function() { };
model_core_shape_Shape.__name__ = true;
var model_core_shape_Circle = $hx_exports.model.core.shape.Circle = function(r) {
	this.radius = r;
};
model_core_shape_Circle.__name__ = true;
model_core_shape_Circle.__interfaces__ = [model_core_shape_Shape];
model_core_shape_Circle.prototype = {
	get_pos: function() {
		return this.pos;
	}
	,__class__: model_core_shape_Circle
};
var model_domain_TagName = $hx_exports.model.domain.TagName = function() { };
model_domain_TagName.__name__ = true;
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
Main.collisions = new model_domain_SimpleCollisions();
js_Boot.__toStr = {}.toString;
model_core_CollisionIdentifier.idCount = 0;
model_domain_TagName.player = "player";
model_domain_TagName.shot = "shot";
model_domain_TagName.item = "item";
model_domain_TagName.enemy = "enemy";
model_domain_TagName.enemyshot = "enemyshot";
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
