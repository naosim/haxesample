(function (console, $hx_exports) { "use strict";
$hx_exports.model = $hx_exports.model || {};
$hx_exports.model.domain = $hx_exports.model.domain || {};
;$hx_exports.model.core = $hx_exports.model.core || {};
$hx_exports.model.core.shape = $hx_exports.model.core.shape || {};
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
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
Math.__name__ = ["Math"];
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
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
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
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
var model_core_CollisionLifeCycle = function() { };
model_core_CollisionLifeCycle.__name__ = ["model","core","CollisionLifeCycle"];
model_core_CollisionLifeCycle.prototype = {
	__class__: model_core_CollisionLifeCycle
};
var model_core_Terminatable = function() { };
model_core_Terminatable.__name__ = ["model","core","Terminatable"];
model_core_Terminatable.prototype = {
	__class__: model_core_Terminatable
};
var model_core_Step = function() { };
model_core_Step.__name__ = ["model","core","Step"];
model_core_Step.prototype = {
	__class__: model_core_Step
};
var model_core_Collision = function(params,pos) {
	this.isFirstStep = true;
	this.deadObserver = [];
	var _g = this;
	if(pos != null) this.pos = pos; else this.pos = model_core_Position.zero();
	this.shape = params.shape;
	this.status = params.status;
	if(params.identifier != null) this.identifier = params.identifier; else this.identifier = new model_core_CollisionIdentifier();
	this.status.registerDead(function(_,after) {
		if(after) {
			var _g1 = 0;
			var _g2 = _g.deadObserver;
			while(_g1 < _g2.length) {
				var o = _g2[_g1];
				++_g1;
				o();
			}
		}
	});
	this.registerDead($bind(this,this.onDead));
};
model_core_Collision.__name__ = ["model","core","Collision"];
model_core_Collision.__interfaces__ = [model_core_CollisionLifeCycle,model_core_Terminatable,model_core_Step];
model_core_Collision.prototype = {
	eachAttacked: function(other) {
		this.status.eachAttacked(other.status);
	}
	,step: function() {
		if(this.isFirstStep) {
			this.onCreate();
			this.isFirstStep = false;
		}
		this.onStep();
	}
	,isDead: function() {
		return this.status.isDead();
	}
	,hasTag: function(tag) {
		return this.identifier.hasTag(tag);
	}
	,registerHitPoint: function(l) {
		this.status.registerHitPoint(l);
	}
	,unregisterHitPoint: function(l) {
		this.status.unregisterHitPoint(l);
	}
	,registerDead: function(o) {
		this.deadObserver.push(o);
	}
	,unregisterDead: function(o) {
		HxOverrides.remove(this.deadObserver,o);
	}
	,terminate: function() {
		this.onTerminate();
		this.status.terminate();
		this.deadObserver = [];
	}
	,onCreate: function() {
	}
	,onDead: function() {
	}
	,onStep: function() {
	}
	,onTerminate: function() {
	}
	,__class__: model_core_Collision
};
var model_core_CollisionHitTest = function(left,right) {
	this.left = left;
	this.right = right;
};
model_core_CollisionHitTest.__name__ = ["model","core","CollisionHitTest"];
model_core_CollisionHitTest.hitTest = function(left,right) {
	if(js_Boot.__instanceof(left.shape,model_core_shape_Circle) && js_Boot.__instanceof(right.shape,model_core_shape_Circle)) return left.pos.distanceTo(right.pos) < (js_Boot.__cast(left.shape , model_core_shape_Circle)).radius + (js_Boot.__cast(right.shape , model_core_shape_Circle)).radius;
	return false;
};
model_core_CollisionHitTest.prototype = {
	__class__: model_core_CollisionHitTest
};
var model_core_CollisionIdentifier = function(tag) {
	this.id = model_core_CollisionIdentifier.createId();
	if(tag != null) this.tag = tag; else this.tag = new model_core_Tag();
};
model_core_CollisionIdentifier.__name__ = ["model","core","CollisionIdentifier"];
model_core_CollisionIdentifier.createId = function() {
	model_core_CollisionIdentifier.idCount++;
	return "" + model_core_CollisionIdentifier.idCount;
};
model_core_CollisionIdentifier.withTag = function(tag,tags) {
	return new model_core_CollisionIdentifier(new model_core_Tag(tag,tags));
};
model_core_CollisionIdentifier.prototype = {
	hasTag: function(tagName) {
		return this.tag.has(tagName);
	}
	,__class__: model_core_CollisionIdentifier
};
var model_core_CollisionParams = function(shape,status,identifier) {
	this.shape = shape;
	this.status = status;
	this.identifier = identifier;
};
model_core_CollisionParams.__name__ = ["model","core","CollisionParams"];
model_core_CollisionParams.circle = function(params) {
	var c = new model_core_shape_Circle(params.r);
	var status = new model_core_CollisionStatus(new model_core_HitPoint(params.hp),params.ap);
	var identifier;
	if(params.tag != null) identifier = new model_core_CollisionIdentifier(params.tag); else identifier = model_core_CollisionIdentifier.withTag(params.tagName,params.tagNames);
	return new model_core_CollisionParams(c,status,identifier);
};
model_core_CollisionParams.prototype = {
	__class__: model_core_CollisionParams
};
var model_core_CollisionStatus = function(hitPoint,attackPoint) {
	this.isDeadObservable = new model_core_lib_ObservableValue(false);
	this.terminated = false;
	var _g = this;
	this.hitPoint = hitPoint;
	this.attackPoint = attackPoint;
	this.registerHitPoint(function(_,after) {
		if(after <= 0) _g.isDeadObservable.setValue(true);
	});
};
model_core_CollisionStatus.__name__ = ["model","core","CollisionStatus"];
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
		this.isDeadObservable.terminate();
	}
	,registerHitPoint: function(l) {
		this.hitPoint.register(l);
	}
	,unregisterHitPoint: function(l) {
		this.hitPoint.unregister(l);
	}
	,registerDead: function(l) {
		this.isDeadObservable.register(l);
	}
	,unregisterDead: function(l) {
		this.isDeadObservable.unregister(l);
	}
	,__class__: model_core_CollisionStatus
};
var model_core_EachHitCollision = function() { };
model_core_EachHitCollision.__name__ = ["model","core","EachHitCollision"];
model_core_EachHitCollision.prototype = {
	__class__: model_core_EachHitCollision
};
var model_core_GravityPositionStep = function(speed,gravity) {
	this.speed = speed;
	this.gravity = gravity;
};
model_core_GravityPositionStep.__name__ = ["model","core","GravityPositionStep"];
model_core_GravityPositionStep.create = function(speed,gravity,gravityDirection) {
	if(gravity == null) {
		if(gravityDirection == null) gravityDirection = model_core_GravityPositionStep.DOWN;
		if(gravityDirection == model_core_GravityPositionStep.DOWN) gravity = new model_core_Position(0,0.3); else if(gravityDirection == model_core_GravityPositionStep.UP) gravity = new model_core_Position(0,-0.3); else if(gravityDirection == model_core_GravityPositionStep.RIGHT) gravity = new model_core_Position(0.3,0); else if(gravityDirection == model_core_GravityPositionStep.LEFT) gravity = new model_core_Position(-0.3,0);
	}
	return new model_core_GravityPositionStep(speed,gravity);
};
model_core_GravityPositionStep.createPosition = function(orgPosition,speed,gravity,gravityDirection) {
	return new model_core_SteppablePosition(orgPosition.x,orgPosition.y,($_=model_core_GravityPositionStep.create(speed,gravity,gravityDirection),$bind($_,$_.step)));
};
model_core_GravityPositionStep.prototype = {
	step: function(pos) {
		this.speed.x += this.gravity.x;
		this.speed.y += this.gravity.y;
		pos.x += this.speed.x;
		pos.y += this.speed.y;
	}
	,__class__: model_core_GravityPositionStep
};
var model_core_lib_ObservableValue = function(value) {
	this.listener = [];
	this.value = value;
};
model_core_lib_ObservableValue.__name__ = ["model","core","lib","ObservableValue"];
model_core_lib_ObservableValue.__interfaces__ = [model_core_Terminatable];
model_core_lib_ObservableValue.prototype = {
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
	,__class__: model_core_lib_ObservableValue
};
var model_core_lib_ObservableFloat = function(value) {
	model_core_lib_ObservableValue.call(this,value);
};
model_core_lib_ObservableFloat.__name__ = ["model","core","lib","ObservableFloat"];
model_core_lib_ObservableFloat.__super__ = model_core_lib_ObservableValue;
model_core_lib_ObservableFloat.prototype = $extend(model_core_lib_ObservableValue.prototype,{
	addValue: function(value) {
		this.setValue(this.value + value);
	}
	,__class__: model_core_lib_ObservableFloat
});
var model_core_HitPoint = function(value) {
	this._isRigid = false;
	model_core_lib_ObservableFloat.call(this,value);
	if(value == null) this._isRigid = true;
};
model_core_HitPoint.__name__ = ["model","core","HitPoint"];
model_core_HitPoint.__super__ = model_core_lib_ObservableFloat;
model_core_HitPoint.prototype = $extend(model_core_lib_ObservableFloat.prototype,{
	isRigid: function() {
		return this._isRigid;
	}
	,isDead: function() {
		return !this._isRigid && this.value <= 0;
	}
	,__class__: model_core_HitPoint
});
var model_core_Position = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.y = 0;
	this.x = 0;
	this.x = x;
	this.y = y;
};
model_core_Position.__name__ = ["model","core","Position"];
model_core_Position.zero = function() {
	return new model_core_Position();
};
model_core_Position.prototype = {
	distanceTo: function(other) {
		return Math.sqrt(Math.pow(this.x - other.x,2) + Math.pow(this.y - other.y,2));
	}
	,vectorTo: function(other) {
		return new model_core_Position(other.x - this.x,other.y - this.y);
	}
	,multipl: function(v) {
		return new model_core_Position(this.x * v,this.y * v);
	}
	,divide: function(v) {
		return new model_core_Position(this.x / v,this.y / v);
	}
	,directionTo: function(other) {
		return this.vectorTo(other).divide(this.distanceTo(other));
	}
	,__class__: model_core_Position
};
var model_core_StageEndConditionResult = function(result,couse) {
	this.result = result;
	this.couse = couse;
};
model_core_StageEndConditionResult.__name__ = ["model","core","StageEndConditionResult"];
model_core_StageEndConditionResult.prototype = {
	__class__: model_core_StageEndConditionResult
};
var model_core_StageLifeCycle = function() { };
model_core_StageLifeCycle.__name__ = ["model","core","StageLifeCycle"];
model_core_StageLifeCycle.prototype = {
	__class__: model_core_StageLifeCycle
};
var model_core_StageStepCore = function(eachCollision,size,stageEndCondision,stageLifeCycle) {
	this.isCalledOnEnd = false;
	this.isFirstStep = true;
	this.eachCollision = eachCollision;
	this.size = size;
	this.stageEndCondision = stageEndCondision;
	this.stageLifeCycle = stageLifeCycle;
};
model_core_StageStepCore.__name__ = ["model","core","StageStepCore"];
model_core_StageStepCore.__interfaces__ = [model_core_Terminatable,model_core_Step];
model_core_StageStepCore.prototype = {
	step: function() {
		var _g = this;
		if(this.isFirstStep) {
			this.stageLifeCycle.onStart();
			this.isFirstStep = false;
		}
		this.stageLifeCycle.onStep();
		this.eachCollision.eachCollision(function(c) {
			c.step();
		});
		this.eachCollision.eachHitCollisionPair(function(c1,c2) {
			if(model_core_CollisionHitTest.hitTest(c1,c2)) c1.eachAttacked(c2);
		});
		this.eachCollision.eachCollision(function(c3) {
			if(_g.isOutOfWorld(c3)) c3.status.terminated = true;
		});
		var deads = [];
		this.eachCollision.eachCollision(function(c4) {
			if(c4.isDead()) deads.push(c4);
		});
		this.eachCollision.remove(deads);
		var _g1 = 0;
		while(_g1 < deads.length) {
			var c5 = deads[_g1];
			++_g1;
			c5.terminate();
		}
		var result = this.stageEndCondision();
		if(!this.isCalledOnEnd && result.result) {
			this.stageLifeCycle.onEnd(result.couse);
			this.isCalledOnEnd = true;
		}
	}
	,isOutOfWorld: function(c) {
		if(c.pos.x < -this.size.width || c.pos.x > this.size.width * 2) return true;
		if(c.pos.y < -this.size.height || c.pos.y > this.size.height * 2) return true;
		return false;
	}
	,terminate: function() {
		this.eachCollision.eachCollision(function(c) {
			c.terminate();
		});
	}
	,__class__: model_core_StageStepCore
};
var model_core_SteppablePosition = function(x,y,step) {
	model_core_Position.call(this,x,y);
	this._step = step;
};
model_core_SteppablePosition.__name__ = ["model","core","SteppablePosition"];
model_core_SteppablePosition.__interfaces__ = [model_core_Step];
model_core_SteppablePosition.linear = function(defaultPosition,diff) {
	return new model_core_SteppablePosition(defaultPosition.x,defaultPosition.y,function(pos) {
		pos.x = pos.x + diff.x;
		pos.y = pos.y + diff.y;
	});
};
model_core_SteppablePosition.__super__ = model_core_Position;
model_core_SteppablePosition.prototype = $extend(model_core_Position.prototype,{
	step: function() {
		this._step(this);
	}
	,__class__: model_core_SteppablePosition
});
var model_core_SteppablePositionCollision = function(params,pos) {
	model_core_Collision.call(this,params,pos);
	this.movablePos = pos;
};
model_core_SteppablePositionCollision.__name__ = ["model","core","SteppablePositionCollision"];
model_core_SteppablePositionCollision.__super__ = model_core_Collision;
model_core_SteppablePositionCollision.prototype = $extend(model_core_Collision.prototype,{
	onStep: function() {
		this.movablePos.step();
	}
	,__class__: model_core_SteppablePositionCollision
});
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
model_core_Tag.__name__ = ["model","core","Tag"];
model_core_Tag.prototype = {
	has: function(tag) {
		return this.tags.exists(tag);
	}
	,__class__: model_core_Tag
};
var model_core_TimelineEvent = function(eventFrameFromLastEvent,eventTask) {
	this.eventFrameFromLastEvent = eventFrameFromLastEvent;
	this.eventTask = eventTask;
};
model_core_TimelineEvent.__name__ = ["model","core","TimelineEvent"];
model_core_TimelineEvent.prototype = {
	__class__: model_core_TimelineEvent
};
var model_core_TimelineStage = function(timeline) {
	this.frameFromLastEvent = 0;
	this.timeline = timeline;
	this.nextEvent = timeline.shift();
};
model_core_TimelineStage.__name__ = ["model","core","TimelineStage"];
model_core_TimelineStage.__interfaces__ = [model_core_Step];
model_core_TimelineStage.prototype = {
	step: function() {
		if(this.nextEvent != null && this.frameFromLastEvent >= this.nextEvent.eventFrameFromLastEvent) {
			this.nextEvent.eventTask();
			this.nextEvent = this.timeline.shift();
			this.frameFromLastEvent = 0;
		}
		this.frameFromLastEvent++;
	}
	,__class__: model_core_TimelineStage
};
var model_core_lib_ArrayObserver = function(ary) {
	this.ary = ary;
};
model_core_lib_ArrayObserver.__name__ = ["model","core","lib","ArrayObserver"];
model_core_lib_ArrayObserver.prototype = {
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
	,pushAll: function(os) {
		var _g = 0;
		while(_g < os.length) {
			var o = os[_g];
			++_g;
			this.push(o);
		}
	}
	,remove: function(o) {
		if(HxOverrides.remove(this.ary,o)) this.onDestoryListener(o);
	}
	,length: function() {
		return this.ary.length;
	}
	,iterator: function() {
		return HxOverrides.iter(this.ary);
	}
	,get: function(index) {
		return this.ary[index];
	}
	,__class__: model_core_lib_ArrayObserver
};
var model_core_shape_Shape = function() { };
model_core_shape_Shape.__name__ = ["model","core","shape","Shape"];
var model_core_shape_Circle = $hx_exports.model.core.shape.Circle = function(r) {
	this.radius = r;
};
model_core_shape_Circle.__name__ = ["model","core","shape","Circle"];
model_core_shape_Circle.__interfaces__ = [model_core_shape_Shape];
model_core_shape_Circle.prototype = {
	get_pos: function() {
		return this.pos;
	}
	,__class__: model_core_shape_Circle
};
var model_domain_Player = $hx_exports.model.domain.Player = function(collisions,pos) {
	this.createShots = model_domain_shot_WeekShot.create;
	this.speed = 3;
	var params = model_core_CollisionParams.circle({ r : 8, hp : model_domain_Player.MAX_LIFE, ap : 20, tagName : model_domain_TagName.player});
	model_core_Collision.call(this,params,pos);
	this.collisions = collisions;
	this.registerHitPoint(function(before,afterFloat) {
	});
};
model_domain_Player.__name__ = ["model","domain","Player"];
model_domain_Player.__super__ = model_core_Collision;
model_domain_Player.prototype = $extend(model_core_Collision.prototype,{
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
		var shots = this.createShots(this.collisions,new model_core_Position(this.pos.x,this.pos.y - 8));
		if(shots != null) this.collisions.shots.pushAll(shots);
	}
	,lifeUp: function(value) {
		value = Math.min(this.status.hitPoint.getValue() + value,model_domain_Player.MAX_LIFE);
		this.status.hitPoint.setValue(value);
	}
	,getPlayerDirectionFrom: function(org) {
		if(this.collisions.players.length() == 0) return new model_core_Position(0,1);
		return org.directionTo(this.pos);
	}
	,__class__: model_domain_Player
});
var model_domain_SimpleCollisions = function() {
	this.enemyShots = model_domain_SimpleCollisions.collisionArray();
	this.enemies = model_domain_SimpleCollisions.collisionArray();
	this.shots = model_domain_SimpleCollisions.collisionArray();
	this.items = model_domain_SimpleCollisions.collisionArray();
	this.players = model_domain_SimpleCollisions.collisionArray();
	this.all = [this.players,this.items,this.shots,this.enemies,this.enemyShots];
};
model_domain_SimpleCollisions.__name__ = ["model","domain","SimpleCollisions"];
model_domain_SimpleCollisions.__interfaces__ = [model_core_EachHitCollision];
model_domain_SimpleCollisions.collisionArray = function() {
	return new model_core_lib_ArrayObserver([]);
};
model_domain_SimpleCollisions.prototype = {
	player: function() {
		var c = this.players.get(0);
		if(c != null) return js_Boot.__cast(this.players.get(0) , model_domain_Player); else return null;
	}
	,setObserver: function(onCreateListener,onDestoryListener) {
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
var model_domain_WorldStatus = function() { };
model_domain_WorldStatus.__name__ = ["model","domain","WorldStatus"];
var model_domain_Stage = function(collisions) {
	this.bossDead = false;
	this.timelineEvent = [new model_core_TimelineEvent(3 * model_domain_Stage.FPS,this.straighatAndShot(model_domain_WorldStatus.WIDTH)),new model_core_TimelineEvent(3 * model_domain_Stage.FPS,$bind(this,this.boss))];
	this.collisions = collisions;
};
model_domain_Stage.__name__ = ["model","domain","Stage"];
model_domain_Stage.__interfaces__ = [model_core_Step];
model_domain_Stage.prototype = {
	step: function() {
	}
	,push: function(enemies) {
		var _g = 0;
		while(_g < enemies.length) {
			var e = enemies[_g];
			++_g;
			this.collisions.enemies.push(e);
		}
	}
	,dashOneself: function(orgx) {
		var _g1 = this;
		return function() {
			var result = [];
			var _g = 0;
			while(_g < 5) {
				var i = _g++;
				result.push(new model_domain_enemy_DashToPlayerEnemy(_g1.collisions,new model_core_Position(orgx,-20 * i - 8),new model_core_Tag(model_domain_TagName.enemy),{ }));
			}
			_g1.push(result);
		};
	}
	,straighatAndShot: function(orgx) {
		var _g1 = this;
		return function() {
			var result = [];
			var d;
			if(orgx < model_domain_WorldStatus.WIDTH / 2) d = -1; else d = 1;
			var _g = 0;
			while(_g < 5) {
				var i = _g++;
				var collision = new model_domain_enemy_StraightAndShotEnemy(_g1.collisions,new model_core_Position(orgx + 15 * i * d,-i * 5));
				_g1.createItemWhenEnemyDead(collision);
				result.push(collision);
			}
			_g1.push(result);
		};
	}
	,boss: function() {
		var _g = this;
		var collision = new model_domain_enemy_FirstStageBoss(this.collisions);
		collision.registerDead(function() {
			_g.bossDead = true;
		});
		this.push([collision]);
	}
	,createItemWhenEnemyDead: function(collision) {
		var _g = this;
		collision.registerDead(function() {
			_g.collisions.items.push(_g.createItem(collision.pos));
		});
	}
	,createItem: function(orgPos) {
		return new model_domain_item_ItemFactory(this.collisions).create(orgPos,model_domain_item_ItemType.doubleshot);
	}
	,__class__: model_domain_Stage
};
var model_domain_StageModel = $hx_exports.model.domain.StageModel = function() {
	this.collisions = new model_domain_SimpleCollisions();
};
model_domain_StageModel.__name__ = ["model","domain","StageModel"];
model_domain_StageModel.__interfaces__ = [model_core_StageLifeCycle];
model_domain_StageModel.main = function() {
};
model_domain_StageModel.createStage1Model = function(size,onCreateListener,onDestoryListener) {
	var result = new model_domain_StageModel();
	result.setup(size,new model_domain_Stage(result.collisions),onCreateListener,onDestoryListener);
	return result;
};
model_domain_StageModel.prototype = {
	setup: function(size,stage,onCreateListener,onDestoryListener) {
		this.stage = stage;
		this.timelineStage = new model_core_TimelineStage(stage.timelineEvent);
		this.stageStepCore = new model_core_StageStepCore(this.collisions,size,$bind(this,this.getStageEndConditionResult),this);
		this.collisions.setObserver(onCreateListener,onDestoryListener);
		this.addNewPlayer();
	}
	,addNewPlayer: function() {
		var player = new model_domain_Player(this.collisions,new model_core_Position(model_domain_WorldStatus.WIDTH / 2,240));
		this.collisions.players.push(player);
		player.registerDead($bind(this,this.addNewPlayer));
	}
	,getStageEndConditionResult: function() {
		if(this.stage.bossDead) return new model_core_StageEndConditionResult(true,"bossdead");
		return new model_core_StageEndConditionResult(false);
	}
	,onStart: function() {
	}
	,onStep: function() {
		this.timelineStage.step();
	}
	,onEnd: function(couse) {
		console.log(couse);
	}
	,__class__: model_domain_StageModel
};
var model_domain_item_ItemType = { __ename__ : true, __constructs__ : ["doubleshot","lifeup"] };
model_domain_item_ItemType.doubleshot = ["doubleshot",0];
model_domain_item_ItemType.doubleshot.toString = $estr;
model_domain_item_ItemType.doubleshot.__enum__ = model_domain_item_ItemType;
model_domain_item_ItemType.lifeup = ["lifeup",1];
model_domain_item_ItemType.lifeup.toString = $estr;
model_domain_item_ItemType.lifeup.__enum__ = model_domain_item_ItemType;
var model_domain_TagName = $hx_exports.model.domain.TagName = function() { };
model_domain_TagName.__name__ = ["model","domain","TagName"];
var model_domain_enemy_DashToPlayerEnemy = function(collisions,orgPosition,tag,options) {
	var speed;
	if(options.speed != null) speed = options.speed; else speed = 3;
	var radius;
	if(options.radius != null) radius = options.radius; else radius = 8;
	var ap;
	if(options.ap != null) ap = options.ap; else ap = 10;
	var direction = collisions.player().getPlayerDirectionFrom(orgPosition).multipl(speed);
	var movePos = model_core_SteppablePosition.linear(orgPosition,direction);
	model_core_SteppablePositionCollision.call(this,model_core_CollisionParams.circle({ r : radius, hp : 1, ap : ap, tag : tag}),movePos);
};
model_domain_enemy_DashToPlayerEnemy.__name__ = ["model","domain","enemy","DashToPlayerEnemy"];
model_domain_enemy_DashToPlayerEnemy.__super__ = model_core_SteppablePositionCollision;
model_domain_enemy_DashToPlayerEnemy.prototype = $extend(model_core_SteppablePositionCollision.prototype,{
	__class__: model_domain_enemy_DashToPlayerEnemy
});
var model_domain_enemy_FirstStageBoss = function(collisions) {
	this.children = [];
	this.frame = 0;
	this.directionChangeInterval = 70;
	this.moveStatus = 0;
	model_core_Collision.call(this,model_core_CollisionParams.circle({ r : 8, hp : 300, ap : 10, tagNames : [model_domain_TagName.enemy,model_domain_TagName.boss]}),new model_core_Position(40,40));
	this.collisions = collisions;
};
model_domain_enemy_FirstStageBoss.__name__ = ["model","domain","enemy","FirstStageBoss"];
model_domain_enemy_FirstStageBoss.__super__ = model_core_Collision;
model_domain_enemy_FirstStageBoss.prototype = $extend(model_core_Collision.prototype,{
	onCreate: function() {
		var _g = 0;
		while(_g < 12) {
			var i = _g++;
			var degree = i * 30;
			var c = new model_core_Collision(model_core_CollisionParams.circle({ r : 8, hp : 30, ap : 10, tagNames : [model_domain_TagName.enemy,model_domain_TagName.bosschild]}),new model_core_Position(0,0));
			this.children.push(c);
			this.collisions.enemies.push(c);
		}
	}
	,onDead: function() {
	}
	,onStep: function() {
		var moveStatus = Math.floor(this.frame / this.directionChangeInterval) % 4;
		var _g = Math.floor(this.frame / this.directionChangeInterval) % 4;
		switch(_g) {
		case 0:
			this.pos.x += model_domain_enemy_FirstStageBoss.SPEED;
			break;
		case 1:
			this.pos.y += model_domain_enemy_FirstStageBoss.SPEED;
			break;
		case 2:
			this.pos.x -= model_domain_enemy_FirstStageBoss.SPEED;
			break;
		case 3:
			this.pos.y -= model_domain_enemy_FirstStageBoss.SPEED;
			break;
		default:
			throw new js__$Boot_HaxeError("バグってる");
		}
		var radius = 40;
		var _g1 = 0;
		while(_g1 < 12) {
			var i = _g1++;
			var degree = i * 30 + this.frame;
			var c = this.children[i];
			var th = degree * Math.PI / 180;
			c.pos.x = radius * Math.cos(th) + this.pos.x;
			c.pos.y = radius * Math.sin(th) + this.pos.y;
		}
		if(this.frame % model_domain_enemy_FirstStageBoss.SHOT_INTERVAL == model_domain_enemy_FirstStageBoss.SHOT_INTERVAL - 1) this.collisions.enemyShots.push(new model_domain_enemy_DashToPlayerEnemy(this.collisions,this.pos,new model_core_Tag(model_domain_TagName.enemyshot),{ radius : 2}));
		this.frame++;
	}
	,onTerminate: function() {
	}
	,__class__: model_domain_enemy_FirstStageBoss
});
var model_domain_enemy_StraightAndShotEnemy = function(collisions,orgPosition,speed) {
	if(speed == null) speed = 3;
	this.frame = 0;
	var x;
	if(orgPosition.x < model_domain_WorldStatus.WIDTH / 2) x = 1; else x = -1;
	var direction = new model_core_Position(x,0.5).multipl(speed);
	var movePos = model_core_SteppablePosition.linear(orgPosition,direction);
	model_core_SteppablePositionCollision.call(this,model_core_CollisionParams.circle({ r : 8, hp : 1, ap : 10, tagNames : [model_domain_TagName.enemy,Type.getClassName(js_Boot.getClass(this))]}),movePos);
	this.collisions = collisions;
};
model_domain_enemy_StraightAndShotEnemy.__name__ = ["model","domain","enemy","StraightAndShotEnemy"];
model_domain_enemy_StraightAndShotEnemy.__super__ = model_core_SteppablePositionCollision;
model_domain_enemy_StraightAndShotEnemy.prototype = $extend(model_core_SteppablePositionCollision.prototype,{
	onStep: function() {
		model_core_SteppablePositionCollision.prototype.onStep.call(this);
		if(this.frame == 100) this.collisions.enemyShots.push(new model_domain_enemy_DashToPlayerEnemy(this.collisions,this.pos,new model_core_Tag(model_domain_TagName.enemyshot),{ radius : 2}));
		this.frame++;
	}
	,__class__: model_domain_enemy_StraightAndShotEnemy
});
var model_domain_item_ItemFactory = function(collisions) {
	this.collisions = collisions;
};
model_domain_item_ItemFactory.__name__ = ["model","domain","item","ItemFactory"];
model_domain_item_ItemFactory.prototype = {
	create: function(orgPos,itemType) {
		var apply;
		switch(itemType[1]) {
		case 0:
			apply = $bind(this,this.applyDoubleShotItem);
			break;
		case 1:
			apply = $bind(this,this.applyLifeUpItem);
			break;
		}
		return this.createItem(orgPos,Std.string(itemType),apply);
	}
	,createItem: function(orgPos,tag,onDeadItem) {
		var params = model_core_CollisionParams.circle({ r : 8, hp : 1, ap : 0, tagNames : [model_domain_TagName.item,tag]});
		var speed = new model_core_Position(0,-5);
		var pos = model_core_GravityPositionStep.createPosition(orgPos,speed);
		var c = new model_core_SteppablePositionCollision(params,pos);
		c.registerDead(onDeadItem);
		return c;
	}
	,applyDoubleShotItem: function() {
		this.player().createShots = model_domain_shot_WeekShot.createDoubleShots;
	}
	,applyLifeUpItem: function() {
		this.player().lifeUp(10);
	}
	,player: function() {
		return this.collisions.player();
	}
	,__class__: model_domain_item_ItemFactory
};
var model_domain_shot_WeekShot = function(playerPos) {
	var shotPos = model_core_SteppablePosition.linear(playerPos,new model_core_Position(0,-model_domain_shot_WeekShot.SPEED));
	model_core_SteppablePositionCollision.call(this,model_core_CollisionParams.circle({ r : model_domain_shot_WeekShot.RADIUS, hp : model_domain_shot_WeekShot.HP, ap : model_domain_shot_WeekShot.AP, tagName : model_domain_TagName.shot}),shotPos);
};
model_domain_shot_WeekShot.__name__ = ["model","domain","shot","WeekShot"];
model_domain_shot_WeekShot.create = function(collisions,playerPos) {
	if(collisions.shots.length() >= 10) return null;
	return [new model_domain_shot_WeekShot(playerPos)];
};
model_domain_shot_WeekShot.createDoubleShots = function(collisions,playerPos) {
	if(collisions.shots.length() >= 10) return null;
	var left = new model_core_Position(playerPos.x - 4,playerPos.y);
	var right = new model_core_Position(playerPos.x + 4,playerPos.y);
	return [new model_domain_shot_WeekShot(left),new model_domain_shot_WeekShot(right)];
};
model_domain_shot_WeekShot.__super__ = model_core_SteppablePositionCollision;
model_domain_shot_WeekShot.prototype = $extend(model_core_SteppablePositionCollision.prototype,{
	step: function() {
		model_core_SteppablePositionCollision.prototype.step.call(this);
		if(this.pos.y < -10) this.status.terminated = true;
	}
	,__class__: model_domain_shot_WeekShot
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
js_Boot.__toStr = {}.toString;
model_core_CollisionIdentifier.idCount = 0;
model_core_GravityPositionStep.DOWN = 0;
model_core_GravityPositionStep.UP = 1;
model_core_GravityPositionStep.RIGHT = 2;
model_core_GravityPositionStep.LEFT = 3;
model_domain_Player.MAX_LIFE = 50;
model_domain_WorldStatus.FPS = 30;
model_domain_WorldStatus.WIDTH = 320;
model_domain_WorldStatus.HEIGHT = 320;
model_domain_Stage.FPS = model_domain_WorldStatus.FPS;
model_domain_TagName.player = "player";
model_domain_TagName.shot = "shot";
model_domain_TagName.item = "item";
model_domain_TagName.enemy = "enemy";
model_domain_TagName.enemyshot = "enemyshot";
model_domain_TagName.doubleshot = Std.string(model_domain_item_ItemType.doubleshot);
model_domain_TagName.lifeup = Std.string(model_domain_item_ItemType.lifeup);
model_domain_TagName.boss = "boss";
model_domain_TagName.bosschild = "bosschild";
model_domain_enemy_FirstStageBoss.SPEED = 3;
model_domain_enemy_FirstStageBoss.SHOT_INTERVAL = 30;
model_domain_shot_WeekShot.SPEED = 5;
model_domain_shot_WeekShot.RADIUS = 2;
model_domain_shot_WeekShot.HP = 1;
model_domain_shot_WeekShot.AP = 10;
model_domain_StageModel.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=main.js.map