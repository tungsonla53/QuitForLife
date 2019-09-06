/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2006-2011 Worklight, Ltd. 
 */


/**
 * Constructor
 */
var Analytics = function () {};

/**
 * Track a page view on Google Analytics
 * @param key				The name of the tracked item (can be a url or some logical name).
 * 							The key name will be presented in Google Analytics report.  
 * @param successCallback	The success callback
 * @param failureCallback	The error callback 
 */
Analytics.prototype.trackPageView = function(key, successCallback, failureCallback) {
	console.log('trackPageView: ' + key);	
	return cordova.exec(
				successCallback,			
				failureCallback,		
				'AnalyticsTracker',
				'trackPageView',		
				[key]);					
};

/**
 * Track an event on Google Analytics
 * @param category			The name that you supply as a way to group objects that you want to track
 * @param action			The name the type of event or interaction you want to track for a particular web object
 * @param label				Provides additional information for events that you want to track (optional)
 * @param value				Assign a numerical value to a tracked page object (optional)

 * @param successCallback	The success callback
 * @param failureCallback	The error callback 
 */

Analytics.prototype.trackEvent = function(category, action, label, value, successCallback, failureCallback){
	return cordova.exec(
				successCallback,			
				failureCallback,		
				'AnalyticsTracker',
				'trackEvent',		
				[
				    category, 
				    action, 
				    typeof label === "undefined" ? "" : label, 
				    (isNaN(parseInt(value,10))) ? 0 : parseInt(value, 10)
				]);					
};

Analytics.prototype.trackViewsByNames = function(viewNames) {
	viewNames.forEach(function(item) {
        $('#' + item).on('pageshow', function () {
        	window.plugins.analytics.trackPageView('/' + item);
        });
	});
};

Analytics.prototype.getPageNames = function(document) {
	var pageNames = new Array();
	var list = document.getElementsByTagName('div');
	for (var i = 0; i < list.length; ++i) {
		if (list[i].getAttribute('data-role') == 'page') {
			pageNames.push(list[i].id);
		}
	}
	return pageNames;
};

Analytics.prototype.trackViews = function(document) {
	Analytics.prototype.trackViewsByNames(Analytics.prototype.getPageNames(document));
};

/**
 * Load Analytics
 */

if(!window.plugins) {
    window.plugins = {};
}

if (!window.plugins.analytics) {
    window.plugins.analytics = new Analytics();
}
