function VerifyOptionNotification() {
    navigator.notification.confirm('Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.',
			function(button){
				if (button == 1) {
	            	AppViewModel.isNotificationsEnabled('off');
	            	localStorage.setItem('isNotificationsEnabled', AppViewModel.isNotificationsEnabled()); 
	            	AppViewModel.bestNotificationTimeID('1');
	            	localStorage.setItem('bestNotificationTimeID', AppViewModel.bestNotificationTimeID());
	            	return;
	        	}
	        	if (button == 2) {
	            	AppViewModel.isNotificationsEnabled('on');
	            	localStorage.setItem('isNotificationsEnabled', AppViewModel.isNotificationsEnabled());
	            	AppViewModel.isNotificationsEnabled('on');
	            	AppViewModel.bestNotificationTimeID('1');
	            	localStorage.setItem('bestNotificationTimeID', AppViewModel.bestNotificationTimeID());
	            	return;
	        	}
	        	VerifyOptionNotification();
			},
			'"Quit For Life®" Would Like to Send You Notifications',
			["Don't Allow", "OK"]
			);
	}	

function IntroViewModel(appViewModel) {
    var self = this;
    self.startCommand = function () {
        navigator.notification.confirm('Are you a smoker?',
		self.onConfirm,
		'Confirm Status',
		["Yes, I smoke", "No, I quit"]
		);
    }

    self.onConfirm = function (button) {
        if (button == 1) {
            appViewModel.quitStatus('0');
            localStorage.setItem('quitstatus', '0');
            var quitDate = new Date();
            quitDate.setDate(quitDate.getDate() + 30);
            AppViewModel.quitDate(dateFormat(quitDate, "shortDate"));
            $.mobile.changePage("#step1View", { transition: "slide" });
            return;
        }
        if (button == 2) {
            appViewModel.quitStatus('1');
            localStorage.setItem('quitstatus', '1');
            //
            //Set default quit date and time
            //
            var currentDate = new Date();
            var currentTime = currentDate.getHours() + ':' + currentDate.getMinutes(); 
            AppViewModel.quitDate(dateFormat(currentDate, "shortDate"));
            AppViewModel.quitTime(currentTime);
            $.mobile.changePage("#step1PostquitView", { transition: "slide" });
            return;
        }
        self.startCommand();
    }
    
    // register the device for push notifications
    if (AppViewModel.completedStep().length == 0)
    {
		SendNotificationPreferences();
		VerifyOptionNotification();
	}
    
}

