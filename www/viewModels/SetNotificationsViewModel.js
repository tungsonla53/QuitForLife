
function showNotificationErrorMessage(msg)
{
	navigator.notification.confirm(msg,
			null,
			'Notification settings',
			"OK"
			);
}

function SetNotificationsViewModel(appViewModel) {
    var self = this;

    // TODO: this is a hack to get the slider synced up, for some reason it is not correctly binding initially
    var slider = $(notificationsToggle);
    slider.val(appViewModel.isNotificationsEnabled());
    slider.slider('refresh');
   
    self.isNotificationsEnabled = ko.observable(appViewModel.isNotificationsEnabled());
    self.bestNotificationTimeID = ko.observable(appViewModel.bestNotificationTimeID());
    
    self.notificationTimes = ko.observable(listOfNotificationTime);
    
    self.cancelCommand = function () {
    	var slider = $(notificationsToggle);
    	self.isNotificationsEnabled(appViewModel.isNotificationsEnabled());
    	slider.val(appViewModel.isNotificationsEnabled());
    	slider.slider('refresh');
    	self.bestNotificationTimeID(appViewModel.bestNotificationTimeID());
    	self.initialize();
    	$.mobile.changePage("#menuView");
    };
    
    self.saveCommand = function (e) {
    	if (self.isNotificationsEnabled() == 'on')
    	{
    		if (self.bestNotificationTimeID().length == 0)
    		{
    			showNotificationErrorMessage('Please select Time of day');
        		e.preventDefault();
            	return;
    		}
    	}
    	AppViewModel.isNotificationsEnabled(self.isNotificationsEnabled());
    	localStorage.setItem('isNotificationsEnabled', AppViewModel.isNotificationsEnabled());
    	AppViewModel.bestNotificationTimeID(self.bestNotificationTimeID());
    	localStorage.setItem('bestNotificationTimeID', AppViewModel.bestNotificationTimeID());
    	// Reset notifications
    	ScheduleNotifications(appViewModel);
    	// register the device for push notifications
    	SendNotificationPreferences();
        $.mobile.changePage("#menuView");
    };
    
    self.clickOption = function() 
	{    
	   if (this.isChecked()== true)
	   {
	   		this.isChecked(false);
	   		this.isUnChecked(true);	
	   		self.bestNotificationTimeID('');
	   }
	   else
	   {
	   		 ko.utils.arrayForEach(self.notificationTimes(), function (option) {
                            		option.isChecked(false);
	   								option.isUnChecked(true);
                        });
	   		this.isChecked(true);
	   		this.isUnChecked(false);
	   		self.bestNotificationTimeID(this.timeid);
	   } 
	}
	
	self.initialize = function() 
	{    
			ko.utils.arrayForEach(self.notificationTimes(), function (option) {
								if (option.timeid == self.bestNotificationTimeID())
								{
                            		option.isChecked(true);
	   								option.isUnChecked(false);
	   								}
	   							else
	   							{
	   								option.isChecked(false);
	   								option.isUnChecked(true);
	   							}	
                        });
    }
}