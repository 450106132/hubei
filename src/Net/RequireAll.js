var window = window || {};
var module = module || {};
module.exports = {};

var console = cc;
console.error = cc.log;

//  var setTimeout = function(fn, interval) {
// 	var instance = cc.Director.getInstance();
// 	var scene = instance.getRunningScene();

// 	instance.getScheduler().
// 		scheduleCallbackForTarget(scene, fn, interval, 1, 0, false);
// 	return scene;
//  }

//  var clearTimeout = function(target) {
// 	var instance = cc.Director.getInstance();
// 	instance.getScheduler().unscheduleAllCallbacksForTarget(target);
//  }

//window.setTimeout = setTimeout;
//window.clearTimeout = clearTimeout;

// require('src/Net/NetSender.js');

// if(Emitter) window.EventEmitter = Emitter;

// require('src/Net/NetControl.js');

// require('src/Net/NetBuffer.js');

// require('src/Net/NetClient.js');
