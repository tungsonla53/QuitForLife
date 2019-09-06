var pickDateTimeSuccess = function (data) {
    	var newDate = new Date(data.year, data.month, data.day);
    	AppViewModel.quitDate(dateFormat(newDate, "shortDate"));
};
    
var pickDateTimeError = function (data) {
};

var pickTimeSuccess = function (data) {
	var qtime = data.hour + ':' + data.minute;
	AppViewModel.quitTime(qtime);
};

var pickTimeError = function (data) {
};

function PickDateTimeViewModel(appViewModel) {
    var self = this;
    self.isAndroid = appViewModel.isAndroid;
    self.isIos = appViewModel.isIos;
    self.canCancel = ko.dependentObservable(function () { 
    	if (AppViewModel.setupDate().length > 0) {
    		return true;
    	}
    	else
    	{
    		return false;
    	} 	
    });
    self.quitTime = appViewModel.quitTime;
    self.quitDate = ko.dependentObservable(function () { return appViewModel.quitDate(); });
    self.quitDateIos = ko.observable('');
        
    self.quitTimeText = ko.dependentObservable(function () {
		var tDate = new Date(self.quitDate());
	    if (self.quitTime().length > 0)
        {
	        var times = self.quitTime().split(':');
	        if (times.length > 1)
	        {
        		tDate.setHours(times[0]);
        		tDate.setMinutes(times[1]);
        	}
        }
        return dateFormat(tDate, "shortTime");
    });
    
    self.quitDateText = ko.dependentObservable(function () {
        var qDate = new Date(self.quitDate());
        return dateFormat(qDate, "fullDate");
    });
    
    self.daysLeft = ko.dependentObservable(function () {
           if (self.isAndroid() == true)
           {
	          var qday = new Date(self.quitDate());
	          return GetDaysLeft(qday);
           }
           else
           {
               if (self.quitDateIos())
               {
	          		var qday = TranslateIosDate(self.quitDateIos());
	          		return GetDaysLeft(qday);
               }
               else
               {
                    return null;
               }
           }
    });

    self.setQuitDateCommand = function (e) {
    	var stringDate = dateFormat(new Date(appViewModel.quitDate()), "mm/dd/yyyy");
		DateUtil.showDate(stringDate, pickDateTimeSuccess, pickDateTimeError);
		e.preventDefault();
    }
     
    self.setQuitTimeCommand = function (e) {
    	var stringTime = "00:00";
    	if (self.quitTime().length > 0)
    	{
 			stringTime = self.quitTime();
    	}
		DateUtil.showTime(stringTime, pickTimeSuccess, pickTimeError );
		e.preventDefault();
    }
    
    self.onConfirm =  function (button) {
    }
    
    self.cancelCommand = function () {
    	// Restore date & time
    	AppViewModel.quitDate(localStorage.getItem('quitdate'));
    	if (localStorage.getItem('quittime'))
    	{
    		AppViewModel.quitTime(localStorage.getItem('quittime'));
    	}
        if (appViewModel.currentReturnViewUrl().length > 0)
		{
			$.mobile.changePage("#editQuitDateTimeView");
		}
		else
		{
        	$.mobile.changePage("#step2View");
        }
    };
    
    self.saveCommand = function (e) {
    	//
    	var daysLeft = self.daysLeft();
    	if (isNaN(daysLeft))
    	{
    			navigator.notification.confirm( 'Invalid Quit Date!',         
				self.onConfirm,         
				'Quit Date',                   
				"OK"         
				);	
				e.preventDefault();
				return;
    	}
    	//
    	var checkDate;
    	if (self.isAndroid() == true)
        {
            checkDate = new Date(self.quitDate());
        }
        else
        {
            var stringCheckDate = self.quitDateIos();
            var stringCheckArray = stringCheckDate.split('-');
            var workCheckDate = stringCheckArray[1] + '/' + stringCheckArray[2] + '/' + stringCheckArray[0];
            var checkDate = new Date(workCheckDate);
        }
        //
    	var qtimes = self.quitTime().split(':');
        if (qtimes.length > 1)
        {
	        checkDate.setHours(qtimes[0]);
	        checkDate.setMinutes(qtimes[1]);
        }
        
    	if (IsFutureDate(checkDate))
    	{
	    	navigator.notification.confirm( 'Your Quit Date needs to be in the past!',         
			self.onConfirm,         
			'Quit Date',                   
			"OK"         
			);	
			e.preventDefault();
		}
		else
		{
	        if (self.isAndroid() == true)
            {
                var saveDate = new Date(self.quitDate());
                appViewModel.quitDate(dateFormat(saveDate, "shortDate"));
            }
            else
            {
                var stringDate = self.quitDateIos();
                var stringArray = stringDate.split('-');
                var workDate = stringArray[1] + '/' + stringArray[2] + '/' + stringArray[0];
                var saveDate = new Date(workDate);
                appViewModel.quitDate(dateFormat(saveDate, "shortDate"));
            }
            appViewModel.quitTime(self.quitTime());
	        localStorage.setItem('quitdate', appViewModel.quitDate());
	        localStorage.setItem('quittime', appViewModel.quitTime());
	        //
	        ResetStartTipIndex(appViewModel);
	        //
	        if (appViewModel.setupDate().length > 0) 
	        {
	        	// Re-schedule notifications
	        	ScheduleNotifications(appViewModel);
	       		//
	        	window.location = 'postquit.html';
	        	//
	        	e.preventDefault();
	        }
	        //
			if (appViewModel.currentReturnViewUrl().length > 0)
			{
				$.mobile.changePage("#editQuitDateTimeView");
			}
			else
			{
				localStorage.setItem('completedstep', '1');
	        	$.mobile.changePage("#step1PostquitCompletedView");
	        	
	        }
        }
    };
    
    self.quitDateIos(dateFormat(new Date(AppViewModel.quitDate()), "isoDate"));
    
}

