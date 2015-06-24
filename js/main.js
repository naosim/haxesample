(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HelloWorld = function() { };
HelloWorld.__name__ = true;
HelloWorld.main = function() {
	var gameCore = new GameStepCore();
	var player = model_core_Collision.circle({ r : 10, hp : 100, ap : 1, pos : model_core_Position.zero()});
	gameCore.addFriend(player);
	var shot = model_core_Collision.circle({ r : 1, hp : 1, ap : 5, pos : model_core_Position.zero()});
	gameCore.addItem(shot);
	var enemy = model_core_Collision.circle({ r : 10, hp : 20, ap : 1, pos : model_core_Position.zero()});
	gameCore.addEnemy(enemy);
	haxe_Log.trace("shot",{ fileName : "HelloWorld.hx", lineNumber : 17, className : "HelloWorld", methodName : "main", customParams : [shot.isDead(),shot.status.hitPoint.value]});
	haxe_Log.trace("enemy",{ fileName : "HelloWorld.hx", lineNumber : 18, className : "HelloWorld", methodName : "main", customParams : [enemy.isDead(),enemy.status.hitPoint.value]});
	enemy.pos.x = 10;
	enemy.pos.x = 10;
	enemy.eachAttacked(shot);
	haxe_Log.trace("shot",{ fileName : "HelloWorld.hx", lineNumber : 24, className : "HelloWorld", methodName : "main", customParams : [shot.isDead(),shot.status.hitPoint.value]});
	haxe_Log.trace("enemy",{ fileName : "HelloWorld.hx", lineNumber : 25, className : "HelloWorld", methodName : "main", customParams : [enemy.isDead(),enemy.status.hitPoint.value]});
	haxe_Log.trace(model_core_CollisionHitTest.hitTest(shot,enemy),{ fileName : "HelloWorld.hx", lineNumber : 27, className : "HelloWorld", methodName : "main"});
	gameCore.step();
};
var model_core_Step = function() { };
model_core_Step.__name__ = true;
model_core_Step.prototype = {
	__class__: model_core_Step
};
var model_core_Collision = function(shape,status,pos) {
	if(pos != null) this.pos = pos; else this.pos = model_core_Position.zero();
	this.shape = shape;
	this.status = status;
};
model_core_Collision.__name__ = true;
model_core_Collision.__interfaces__ = [model_core_Step];
model_core_Collision.circle = function(params) {
	return new model_core_Collision(new model_core_shape_Circle(params.r),new model_core_CollisionStatus(new model_core_HitPoint(params.hp),params.ap),params.pos);
};
model_core_Collision.prototype = {
	eachAttacked: function(other) {
		this.status.eachAttacked(other.status);
	}
	,step: function() {
	}
	,isDead: function() {
		return this.status.isDead();
	}
	,__class__: model_core_Collision
};
var Player = function(shape,status,pos) {
	this.score = 0;
	this.life = 5;
	model_core_Collision.call(this,shape,status,pos);
};
Player.__name__ = true;
Player.__super__ = model_core_Collision;
Player.prototype = $extend(model_core_Collision.prototype,{
	__class__: Player
});
var GameStepCore = function() {
	this.enemies = [];
	this.items = [];
	this.friends = [];
};
GameStepCore.__name__ = true;
GameStepCore.__interfaces__ = [model_core_Step];
GameStepCore.prototype = {
	step: function() {
		var _g = 0;
		var _g1 = [this.friends,this.items,this.enemies];
		while(_g < _g1.length) {
			var list = _g1[_g];
			++_g;
			this.everyStep(list);
		}
		this.everyCollision(this.friends,this.items);
		this.everyCollision(this.friends,this.enemies);
		var _g2 = 0;
		var _g11 = [this.friends,this.items,this.enemies];
		while(_g2 < _g11.length) {
			var list1 = _g11[_g2];
			++_g2;
			this.removeDead(list1);
		}
	}
	,everyStep: function(ary) {
		var _g = 0;
		while(_g < ary.length) {
			var c = ary[_g];
			++_g;
			c.step();
		}
	}
	,everyCollision: function(ary1,ary2) {
		var _g = 0;
		while(_g < ary1.length) {
			var c1 = ary1[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < ary2.length) {
				var c2 = ary2[_g1];
				++_g1;
				c1.eachAttacked(c2);
			}
		}
	}
	,removeDead: function(ary) {
		var deads = [];
		var _g = 0;
		while(_g < ary.length) {
			var c = ary[_g];
			++_g;
			if(c.isDead()) deads.push(c);
		}
		var _g1 = 0;
		while(_g1 < deads.length) {
			var c1 = deads[_g1];
			++_g1;
			HxOverrides.remove(ary,c1);
		}
	}
	,addFriend: function(c) {
		this.friends.push(c);
	}
	,addItem: function(c) {
		this.items.push(c);
	}
	,addEnemy: function(c) {
		this.enemies.push(c);
	}
	,__class__: GameStepCore
};
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
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
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
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
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
var model_core_CollisionHitTest = function(left,right) {
	this.left = left;
	this.right = right;
};
model_core_CollisionHitTest.__name__ = true;
model_core_CollisionHitTest.hitTest = function(left,right) {
	if(js_Boot.__instanceof(left.shape,model_core_shape_Circle) && js_Boot.__instanceof(right.shape,model_core_shape_Circle)) {
		haxe_Log.trace(left.pos.distanceTo(right.pos),{ fileName : "CollisionHitTest.hx", lineNumber : 14, className : "model.core.CollisionHitTest", methodName : "hitTest", customParams : [(js_Boot.__cast(left.shape , model_core_shape_Circle)).radius + (js_Boot.__cast(right.shape , model_core_shape_Circle)).radius]});
		return left.pos.distanceTo(right.pos) < (js_Boot.__cast(left.shape , model_core_shape_Circle)).radius + (js_Boot.__cast(right.shape , model_core_shape_Circle)).radius;
	}
	return false;
};
model_core_CollisionHitTest.prototype = {
	__class__: model_core_CollisionHitTest
};
var model_core_CollisionStatus = function(hitPoint,attackPoint) {
	this.hitPoint = hitPoint;
	this.attackPoint = attackPoint;
};
model_core_CollisionStatus.__name__ = true;
model_core_CollisionStatus.prototype = {
	attackedFrom: function(other) {
		this.hitPoint.value = this.hitPoint.value - other.attackPoint;
	}
	,eachAttacked: function(other) {
		this.attackedFrom(other);
		other.attackedFrom(this);
	}
	,isDead: function() {
		return this.hitPoint.isDead();
	}
	,__class__: model_core_CollisionStatus
};
var model_core_HitPoint = function(value) {
	this.value = value;
};
model_core_HitPoint.__name__ = true;
model_core_HitPoint.prototype = {
	isRigid: function() {
		return this.value == null;
	}
	,isDead: function() {
		return !this.isRigid() && this.value <= 0;
	}
	,__class__: model_core_HitPoint
};
var model_core_Position = function() {
	this.y = 0;
	this.x = 0;
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
var model_core_shape_Shape = function() { };
model_core_shape_Shape.__name__ = true;
var model_core_shape_Circle = function(r) {
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
js_Boot.__toStr = {}.toString;
HelloWorld.main();
})(typeof console != "undefined" ? console : {log:function(){}});
