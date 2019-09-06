var DateUtil = {
    showDate: function (parmDate, callbackSuccess, callbackError) {
        return cordova.exec(callbackSuccess, callbackError, "DateUtil", "date", [{ date: parmDate}]);
    },
    showTime: function (parmTime, callbackSuccess, callbackError) {
        return cordova.exec(callbackSuccess, callbackError, "DateUtil", "time", [{ time: parmTime}]);
    }
};

function TranslateIosDate(iosDate)
{
    var stringDate = iosDate;
    var stringArray = stringDate.split('-');
    var workDate = stringArray[1] + '/' + stringArray[2] + '/' + stringArray[0];
    return new Date(workDate);
}


function IsFutureDate(qday)
{
        var today = new Date();
        // Convert both dates to milliseconds
        var qday_ms = qday.getTime();
        var today_ms = today.getTime();
        if (qday_ms > today_ms)
        {
        	return true;
        }
        else
        {
        	return false;
        }
}

function GetDaysLeft(parmDate) {
    var today = new Date(dateFormat(new Date(), "shortDate"));
    var msPerDay = 24 * 60 * 60 * 1000;
    var timeLeft = (parmDate.getTime() - today.getTime());
    var e_daysLeft = timeLeft / msPerDay;
    var daysLeft = Math.round(e_daysLeft);
    return daysLeft;
}

function CalculateLifeAdded(appViewModel, quitDays)
{
	return  ((appViewModel.cigarettesPerDay() * 20 * (quitDays + 1)) / 1440).toFixed(1);
}

function GetLifeAdded(appViewModel)
{
	var days = - GetDaysLeft(new Date(appViewModel.quitDate()));
	return  ((appViewModel.cigarettesPerDay() * 20 * (days + 1)) / 1440).toFixed(1);
}

function GetDaysHoursMinutesSecondsOver(appViewModel)
{
		var calculatedObject = {};
		var qday = new Date(appViewModel.quitDate());
        if (appViewModel.quitTime().length > 0)
        {
	        var qtimes = appViewModel.quitTime().split(':');
	        if (qtimes.length > 1)
	        {
		        qday.setHours(qtimes[0]);
		        qday.setMinutes(qtimes[1]);
	        }
        }
        
        var today = new Date();
        // Convert both dates to milliseconds
        var date1_ms = qday.getTime();
        var date2_ms = today.getTime();
		
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        // 
        if (difference_ms < 0)
        {
        	difference_ms = 0;
        }
        //take out milliseconds
        difference_ms = difference_ms / 1000;
        calculatedObject.seconds = Math.floor(difference_ms % 60);
        difference_ms = difference_ms / 60;
        calculatedObject.minutes = Math.floor(difference_ms % 60);
        difference_ms = difference_ms / 60;
        calculatedObject.hours = Math.floor(difference_ms % 24);
        calculatedObject.days = Math.floor(difference_ms / 24);
        //
        return calculatedObject;
}

function MenuItemViewModel(description, url, image, processing) {
    var self = this;
    self.description = description;
    self.url = url;
    self.image = image;
    self.processing = processing
};

function LinkToQ4lFacebook()
{
	var facebookRef = window.open('https://www.facebook.com/quitforlife', '_blank', 'location=yes');
}

function LinkToYoutubeVideoList()
{
	var youtubeRef = window.open('https://www.youtube.com/playlist?feature=edit_ok&list=PLg4Yjju7YAxWm_fIkDXb9v44QLGVp-N9y', '_blank', 'location=yes');
}

function startContactsActivity() {
  if (AppViewModel.isAndroid())
    {
        window.plugins.webintent.startActivity({
                                               action: WebIntent.ACTION_VIEW,
                                               url: 'content://contacts/people'},
                                               function() {},
                                               function() {alert('Failed to open URL via Android Intent')}
                                               );
    }
    else
    {
        cordova.exec(null, null, "contactView", "showContact", []);
    }
}

function ResetStartTipIndex(appViewModel)
{
	var daysLeft = GetDaysLeft(new Date(appViewModel.quitDate()));
	if (appViewModel.quitStatus() == '0')
	{
		var startIndex = 0;
	    if (daysLeft > 30)
	    {
	        startIndex = 1;
	    }
	    else
	    {
	       	startIndex = 31 - daysLeft;
	    }
	    localStorage.setItem('starttipindex', startIndex);
    }
    else
    {
     	var startIndex = 0;
        if (daysLeft < -15) {
            startIndex = 15;
        }
        else {
            startIndex = -daysLeft;
        }
        localStorage.setItem('starttipindex', startIndex);
    }
}

function ScheduleNotifications(appViewModel)
{
		if (appViewModel.isNotificationsEnabled() == 'off')
		{
			if (appViewModel.isAndroid())
			{
				plugins.localNotification.cancelAll();
			}
			else
			{
				cordova.exec(null, null,"LocalNotification", "cancelAllNotifications", []);
			}
			return;
		}
		//
		var scheduledHour = 8;
		if (appViewModel.bestNotificationTimeID().length > 0)
		{
			if (appViewModel.bestNotificationTimeID() == '1')
			{
				scheduledHour = 8;
			}
			if (appViewModel.bestNotificationTimeID() == '2')
			{
				scheduledHour = 13;
			}
			if (appViewModel.bestNotificationTimeID() == '3')
			{
				scheduledHour = 19;
			}
		}
		//
	    // Schedule Notification (Prequit Status)
	    //
	    if (appViewModel.quitStatus() == '0')
	    {
	        if (appViewModel.isAndroid())
			{
				plugins.localNotification.cancelAll();
			}
			else
			{
				cordova.exec(null, null,"LocalNotification", "cancelAllNotifications", []);
			}
	        var quitDate = new Date(appViewModel.quitDate());
	        var daysLeft = GetDaysLeft(quitDate);
	        //
	        var scheduleDate = new Date();
	        var notificationId = 0;
	        // ************************
	        // Schedule up to quit date 
	        // ************************
	        var daysAway = daysLeft;
	        var messagePrefix = 'View your Tip of the Day.\r\n';
	        var messageType1 = '';
	        if (appViewModel.quitReasons().length > 0)
	        {
	        	var reasons = appViewModel.quitReasons();
	         	messageType1 = 'Remember you are quitting ' + reasons[0].notification;
	        }
	        
	        var messageType2 = 'If you had quit a month ago, you would have saved $' + (appViewModel.costPerDay()* 30).toFixed(0) + ' by now.';
	        var messageType3 = 'Your Quit Date is ' + daysAway + ' days away.';
	        var notificationMessage = '';
	        //
			for (var scheduleIndex=1; scheduleIndex < daysLeft; scheduleIndex++)
			{
				daysAway--;
				notificationId++
			 	scheduleDate.setDate(scheduleDate.getDate() + 1);
			 	scheduleDate.setHours(scheduledHour);
				scheduleDate.setMinutes(0);
				var modulo = notificationId % 3;
				
				notificationMessage = messagePrefix + 'Your Quit Date is ' + daysAway + ' days away.';
				if (modulo == 1)
				{
					notificationMessage = messagePrefix + messageType1;
				}
				if (modulo == 2)
				{
					notificationMessage = messagePrefix + messageType2;
				}
				
			 	if (appViewModel.isAndroid())
			 	{
			 		plugins.localNotification.add({ date: scheduleDate, message: notificationMessage, id: notificationId });
			 	}
			 	else
			 	{
			 		var options = { days: notificationId, at: scheduledHour, message: notificationMessage, badge: 1};
                    cordova.exec(null, null, "LocalNotification", "addNotification", [notificationId, options]);
			 	}
			}
			// *******************************************
			// Schedule on the quit date Today & Yesterday
			// *******************************************
			notificationId++
			scheduleDate.setDate(scheduleDate.getDate() + 1);
			scheduleDate.setHours(8);
			scheduleDate.setMinutes(0);
			notificationMessage = 'Your Quit Date is Today. Did you quit?';
			if (appViewModel.isAndroid())
			{
				plugins.localNotification.add({ date: scheduleDate, message: notificationMessage, id: notificationId });
			}
			else
			{
				var options = { days: notificationId, at: scheduledHour, message: notificationMessage, badge: 1};
                cordova.exec(null, null, "LocalNotification", "addNotification", [notificationId, options]);
			}
			notificationId++
			scheduleDate.setDate(scheduleDate.getDate() + 1);
			scheduleDate.setHours(scheduledHour);
			scheduleDate.setMinutes(0);
			notificationMessage = 'Your Quit Date was Yesterday. Did you quit?';
			if (appViewModel.isAndroid())
			{
				plugins.localNotification.add({ date: scheduleDate, message: notificationMessage, id: notificationId });
			}
			else
			{
				var options = { days: notificationId, at: scheduledHour, message: notificationMessage, badge: 1};
                cordova.exec(null, null, "LocalNotification", "addNotification", [notificationId, options]);
			}
			// ***************************************
			// Schedule extra 2-7 days after quit date
			// ***************************************
			for (var extraIndex = 2; extraIndex < 8; extraIndex++)
			{
				notificationId++
				scheduleDate.setDate(scheduleDate.getDate() + 1);
			 	scheduleDate.setHours(scheduledHour);
				scheduleDate.setMinutes(0);
			 	notificationMessage = 'Your Quit Date was ' + extraIndex + ' days ago. Did you quit?';
			 	
			 	if (appViewModel.isAndroid())
			 	{
			 		plugins.localNotification.add({ date: scheduleDate, message: notificationMessage, id: notificationId });
			 	}
			 	else
			 	{
			 		var options = { days: notificationId, at: scheduledHour, message: notificationMessage, badge: 1};
                    cordova.exec(null, null, "LocalNotification", "addNotification", [notificationId, options]);
			 	}
			}
		}
		
		//
	    // Schedule Notification (Postquit Status)
	    //
		if (appViewModel.quitStatus() == '1')
		{
			if (appViewModel.isAndroid())
			{
				plugins.localNotification.cancelAll();
			}
			else
			{
				cordova.exec(null, null,"LocalNotification", "cancelAllNotifications", []);
			}
	        var quitDate = new Date(appViewModel.quitDate());
	        var daysOver = - GetDaysLeft(quitDate);
	        //
	        var scheduleDate = new Date();
	        var notificationId = 0;
	        var notificationMessage = '';
	        var messagePrefix = 'View your Tip of the Day.\r\n';
	        // **************************************
	        // Schedule up to 45 days after quit date
	        // **************************************
	        for (var i = daysOver + 1; i < 46; i++)
	        {
	        	notificationId++
			 	scheduleDate.setDate(scheduleDate.getDate() + 1);
			 	scheduleDate.setHours(scheduledHour);
				scheduleDate.setMinutes(0);
				var modulo = notificationId % 4;
				notificationMessage = 'You have been quit for ' + i + ' days!';
				if (modulo == 0)
				{
				}
				if (modulo == 1)
				{
					// Random reason
					if (appViewModel.quitReasons().length > 0)
	        		{	
	        			var max = appViewModel.quitReasons().length-1;
	        			var min = 0;
	        			var randomIndex = min + Math.floor(Math.random() * (max - min + 1));
	        			var messageType1 = '';
	        			var reasons = appViewModel.quitReasons();
	         			messageType1 = 'Remember you are quitting ' + reasons[randomIndex].notification;
	         			notificationMessage = messageType1;
	        		}
				}
				if (modulo == 2)
				{
					var lifeAdded = CalculateLifeAdded(appViewModel, i);
					if (lifeAdded > 0)
					{
						notificationMessage = 'You have added ' + lifeAdded + ' days to your life!';
					}
				}
				if (modulo == 3)
				{
					var costSaving = '$' + (i * appViewModel.costPerDay()).toFixed(0);
					notificationMessage = 'You have saved ' + costSaving  + '!';
				}
				//
				// Add prefix to the first 15 days
				//
				if (i < 16)
				{
					notificationMessage  = messagePrefix + notificationMessage;
				}
	
			 	if (appViewModel.isAndroid())
			 	{
			 		plugins.localNotification.add({ date: scheduleDate, message: notificationMessage, id: notificationId });
			 	}
			 	else
			 	{
			 		var options = { days: notificationId, at: scheduledHour, message: notificationMessage, badge: 1};
                    cordova.exec(null, null, "LocalNotification", "addNotification", [notificationId, options]);
			 	}
	        }
		}
}


function onBackKeyDown() {
	/* just disabling the back button for now
    var onBack = function (button) {
        if (button == 1) { // if yes exit the app
            navigator.app.exitApp();
        }
    }
    navigator.notification.confirm('Exit the application?', onBack, 'Exit?', "Yes,No");
    */
}

function onMenuKeyDown() {
	// TODO:
}

function verifyQuitDate()
{
	if (AppViewModel.quitStatus() == '0')
	{ 
		var qDate = new Date(AppViewModel.quitDate());
	    if (GetDaysLeft(qDate) == 0) {
	        var onConfirm = function (button) {
	            if (button == 1) {
	                $.mobile.changePage("#confirmQuitDateView");
	            }
	        };
	
	        navigator.notification.confirm('',
				onConfirm,
				'Today is your Quit Date. Did you Quit?',
				"Yes,No"
				);
	    }
	    
	    if (GetDaysLeft(qDate) < 0) {
	        var onConfirm = function (button) {
	            if (button == 1) {
	                $.mobile.changePage("#confirmQuitDateView");
	            }
	        };
	
	        navigator.notification.confirm('',
				onConfirm,
				'Your Quit Date was on ' + AppViewModel.quitDate() + '. Did you Quit?',
				"Yes,No"
				);
	    }
    }
}

function getPrequitTips(appViewModel)
{
		var daysLeft = GetDaysLeft(new Date(appViewModel.quitDate()));
		//
		var newTips = [];
		var newTipIDs = [];
		var previousTipIDs = [];
        //
        // Pre-quit
        if (daysLeft > 0) {
            // Relapse Tips
            if (localStorage.getItem('smokeagaindate')) {
                var smokeagainDate = localStorage.getItem('smokeagaindate');
                var relapseDays = -GetDaysLeft(new Date(smokeagainDate));
                if (relapseDays > listOfRelapseTips.length)
                {
                	relapseDays =  listOfRelapseTips.length;
                }
                for (var i = relapseDays; i > -1; i--) {
                    var tip = listOfRelapseTips[i];
                    newTips.push(tip);
                    newTipIDs.push(tip.tipid);
                }
                 	// Pre-quit Tips
		            var currentIndex = 31 - daysLeft;
		            var endIndex = appViewModel.startTipIndex();
		            for (var i = prequitBottomPath[currentIndex]; i >= prequitTopPath[endIndex]; i--) {
		                var tip = listOfTipsQDMinus[i];
		                newTips.push(tip);
		                newTipIDs.push(tip.tipid);
		            }
            }
            else
            {
		            // Pre-quit Tips
		            var currentIndex = 31 - daysLeft;
		            var endIndex = appViewModel.startTipIndex();
		            for (var i = prequitBottomPath[currentIndex]; i >= prequitTopPath[endIndex]; i--) {
		                var tip = listOfTipsQDMinus[i];
		                newTips.push(tip);
		                newTipIDs.push(tip.tipid);
		            }
		            newTips.push(listOfTipsQDMinus[0]);
            }
        }
		else
		{
		    if (localStorage.getItem('previousPrequitTipIDs'))
        	{
        		var previousTipIDs = JSON.parse(localStorage.getItem('previousPrequitTipIDs'));
				for (var i= listOfTipsQDMinus.length - 1; i > 0; i--)
				{
					var tip = listOfTipsQDMinus[i];
					previousTipIDs.forEach(
	                       function setValues(value) {
	                           if (value == tip.tipid) {
	                               newTips.push(tip);
	                               newTipIDs.push(tip.tipid);
	                           }
	                       });           
				}
				newTips.push(listOfTipsQDMinus[0]);
			}
		}
    //
    if (localStorage.getItem('viewedTipIDs')) {
            var viewedTips = JSON.parse(localStorage.getItem('viewedTipIDs'));
            for (var i = 0; i < newTips.length; i++) {
                var tip = newTips[i];
                viewedTips.forEach(
                                   function setValues(value) {
                                       if (value == tip.tipid) {
                                           tip.isNew(false);
                                       }
                                   });
            }
    }
    //    
	localStorage.setItem("previousPrequitTipIDs", JSON.stringify(newTipIDs));
	appViewModel.quitTips(newTips);
	return newTips;
}


function getPostquitTips(appViewModel)
{
	var daysOver = - GetDaysLeft(new Date(appViewModel.quitDate()));
	//
	var newTips = [];
	var newTipIDs = [];
	var previousTipIDs = [];
	// Postquit tips
	//
	// If today is the quit date
    if (daysOver == 0) {
    	for (var i = 0; i < listOfTipsQD.length; i++) {
            var tip = listOfTipsQD[i];
            newTips.push(tip);
            newTipIDs.push(tip.tipid);
        }
         for (var i = 0; i < listOfSpecialTips.length; i++) {
	            var tip = listOfSpecialTips[i];
	            newTips.push(tip);
	            newTipIDs.push(tip.tipid);
	        }
    }
    else
    {
    	if (daysOver < 16)
    	{
	        var currentIndex = daysOver;
	        var endIndex = appViewModel.startTipIndex() - 1;
	        if (currentIndex > 15) {
	            currentIndex = 15;
	        }
	        for (var i = currentIndex; i > endIndex; i--) {
	            var tip = listOfTipsQDPlus[i];
	            newTips.push(tip);
	            newTipIDs.push(tip.tipid);
	        }
	
	        for (var i = 0; i < listOfSpecialTips.length; i++) {
	            var tip = listOfSpecialTips[i];
	            newTips.push(tip);
	            newTipIDs.push(tip.tipid);
	        }
        }
        else
        {
        	for (var i = 0; i < listOfSpecialTips.length; i++) {
	            var tip = listOfSpecialTips[i];
	            newTips.push(tip);
	            newTipIDs.push(tip.tipid);
	        }
	        
	        if (localStorage.getItem('previousPostquitTipIDs'))
	        {
	        		var previousTipIDs = JSON.parse(localStorage.getItem('previousPostquitTipIDs'));
					for (var i= listOfTipsQDPlus.length -1; i > 0; i--)
					{
						var tip = listOfTipsQDPlus[i];
						previousTipIDs.forEach(
		                       function setValues(value) {
		                           if (value == tip.tipid) {
		                               newTips.push(tip);
		                               newTipIDs.push(tip.tipid);
		                           }
		                       });           
					}
			}
		}    
    }
    
    newTips.push(CongratulationPostquitTip);
    
    if (localStorage.getItem('viewedTipIDs')) {
            var viewedTips = JSON.parse(localStorage.getItem('viewedTipIDs'));
            for (var i = 0; i < newTips.length; i++) {
                var tip = newTips[i];
                viewedTips.forEach(
                                   function setValues(value) {
                                       if (value == tip.tipid) {
                                           tip.isNew(false);
                                       }
                                   });
            }
      }
    //    
	localStorage.setItem("previousPostquitTipIDs", JSON.stringify(newTipIDs));
	appViewModel.quitTips(newTips);
	return newTips;
}

function onResume() {
	//var resumeDate = dateFormat(new Date(), "shortDate");
	//if (AppViewModel.initialProcessDate() != resumeDate)
	//{
	//	AppViewModel.initialize();
	//	AppViewModel.initialProcessDate(resumeDate);
	//	verifyQuitDate();
	//}
}

var AppViewModel = {
    quitDate: ko.observable(dateFormat(new Date(), "shortDate")),
    setupDate: ko.observable(''),
    completedStep: ko.observable(''),
    quitStatus: ko.observable(''),
    quitTime: ko.observable('12:00'),
    savedQuitStatus: ko.observable(''),
    savedQuitDate: ko.observable(''),
    smokeAgainDate: ko.observable(''),
    savedCost: ko.observable('0'),
    costPerDay: ko.observable('0'),
    pricePerPack: ko.observable(''),
    cigarettesPerDay: ko.observable(''),
    currentReturnViewUrl: ko.observable(''),
    allReasons: ko.observable(listOfReasons),
    quitReasons: ko.observableArray([]),
    selectedReasonIDs: ko.observableArray([]),
    allTips: ko.observable(listOfTipsQDMinus),
    quitTips: ko.observableArray([]),
    viewedTipIDs: ko.observableArray([]),
    startTipIndex: ko.observable('0'),
    isNotificationsEnabled: ko.observable('on'),
    bestNotificationTimeID: ko.observable(''),
    initialProcessDate: ko.observable(dateFormat(new Date(), "shortDate")),
    previousTipIDs: ko.observableArray([]),
    
    isAndroid : ko.dependentObservable(function () {
        if (navigator.userAgent.indexOf("Android") != -1) {
        	return true;
        }
        else
        {
        	return false;
        }
    }),
	
	isIos : ko.dependentObservable(function () {
        if (navigator.userAgent.indexOf("Android") != -1) {
        	return false;
        }
        else
        {
        	return true;
        }
    }),
    
    initialize: function () {

        // hook up the back button with an exit dialog
        document.addEventListener("backbutton", onBackKeyDown, false);
        document.addEventListener("resume", onResume, false);
        document.addEventListener("menubutton", onMenuKeyDown, false);

        if (localStorage.getItem('setupdate')) {
            this.setupDate(localStorage.getItem('setupdate'));
        }

        if (localStorage.getItem('smokeagaindate')) {
            this.smokeAgainDate(localStorage.getItem('smokeagaindate'));
        }

        if (localStorage.getItem('completedstep')) {
            this.completedStep(localStorage.getItem('completedstep'));
        }

        if (localStorage.getItem('quitstatus')) {
            this.quitStatus(localStorage.getItem('quitstatus'));
        }

        if (localStorage.getItem('quittime')) {
            this.quitTime(localStorage.getItem('quittime'));
        }

        if (localStorage.getItem('quitdate')) {
            this.savedQuitDate('1');
            this.quitDate(localStorage.getItem('quitdate'));
        }

        if (localStorage.getItem('starttipindex')) {
            this.startTipIndex(localStorage.getItem('starttipindex'));
        }

        if (localStorage.getItem('costperday')) {
            this.savedCost('1');
            this.costPerDay(JSON.parse(localStorage.getItem('costperday')));
            this.pricePerPack(JSON.parse(localStorage.getItem('priceperpack')));
            this.cigarettesPerDay(JSON.parse(localStorage.getItem('cigarettesperday')));
        }

        if (localStorage.getItem('quitReasonIDs')) {
            var checkedReasons = JSON.parse(localStorage.getItem('quitReasonIDs'));

            checkedReasons.forEach(
                    function setValues(value) {
                        ko.utils.arrayForEach(AppViewModel.allReasons(), function (reason) {
                            if (value == reason.reasonid) {
                                reason.isChecked(true);
                                reason.isUnChecked(false);
                                AppViewModel.quitReasons.push(reason);
                                AppViewModel.selectedReasonIDs.push(value);
                            }
                        });
                    });
        }

        if (localStorage.getItem('isNotificationsEnabled')) {
            this.isNotificationsEnabled(localStorage.getItem('isNotificationsEnabled'));
        }

		if (localStorage.getItem('bestNotificationTimeID')) {
            this.bestNotificationTimeID(localStorage.getItem('bestNotificationTimeID'));
        }
        
        if (localStorage.getItem('viewedTipIDs')) {
                var viewedTips = JSON.parse(localStorage.getItem('viewedTipIDs'));
                AppViewModel.viewedTipIDs(viewedTips);
        }                 
    }
};


/* common functionality to send push notification preferences */
function onPushNotificationRegistration(error, pushID) {
    if (error) {
    	console.log("Failed to register.");
    } else {
    	console.log("Reg Success: " + pushID);
    }
}

function SendNotificationPreferences() {
	if (AppViewModel.isAndroid())
	{
		var push = window.pushNotification;
	    push.registerEvent('registration', onPushNotificationRegistration);
	    
	    if (AppViewModel.isNotificationsEnabled() == 'on') {
	    	push.enablePush();
	       	window.plugins.analytics.trackEvent('status_change','subscription','subscribe',1);
	    } else {
	        push.disablePush();
	       	window.plugins.analytics.trackEvent('status_change','subscription','unsubscribe',0);
	    }
    }
    else
    {
    	if (AppViewModel.isNotificationsEnabled() == 'on') {
	       	window.plugins.analytics.trackEvent('status_change','subscription','subscribe',1);
	    } else {
	       	window.plugins.analytics.trackEvent('status_change','subscription','unsubscribe',0);
	    }
    }
}