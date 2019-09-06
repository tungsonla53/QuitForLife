/*
 * javascript to allow launching a music application through a phonegap plugin
 * 
 * example:
 * 		window.plugins.musicPlayerLauncher.start();
 */
if (typeof PhoneGap !== "undefined") {

	/**
	 * Empty constructor
	 */
	var MusicPlayerLauncher = function() {
	};
	
	MusicPlayerLauncher.prototype.failure = function (msg) {
		  console.log("Javascript Callback Error: " + msg)
		}
	
	/**
	 * Start the music player
	 * 
	 * @param successCB
	 */
	MusicPlayerLauncher.prototype.start = function(callback) {
		  console.log("launching music player");
		  ret = cordova.exec(
				  callback, // called when signature capture is successful
				  this.failure, // called when signature capture encounters an error
				  "MusicPlayerLauncher", // Tell cordova that we want to run "MusicPlayerLauncher"
				  "execute", [""]); // Tell the plugin the action we want to perform
				  return ret;
	};
	
	/**
	 * Register this plugin with phonegap
	 */
	cordova.addConstructor(function() {
		if (!window.plugins) {
			window.plugins = {};
		}
		window.plugins.musicPlayerLauncher = new MusicPlayerLauncher();
	});
}