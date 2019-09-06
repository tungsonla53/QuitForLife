

function PickDateViewModel(appViewModel) {
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
    
	self.quitDate = ko.dependentObservable(function () { return appViewModel.quitDate() });
	self.quitDateIos = ko.observable('');
	
    self.quitDateText = ko.dependentObservable(function () {
        var qDate = new Date(self.quitDate());
        return dateFormat(qDate, "fullDate");
    });
       
    self.setQuitDateCommand = function (e) {
    	var stringDate = dateFormat(new Date(appViewModel.quitDate()), "mm/dd/yyyy");
		DateUtil.showDate(stringDate, self.pickDateSuccess, self.pickDateError);
		e.preventDefault();
    }
    
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

    
    self.cancelCommand = function () {
    	// Restore date
    	AppViewModel.quitDate(localStorage.getItem('quitdate'));
        if (appViewModel.currentReturnViewUrl().length > 0)
		{
			if (appViewModel.quitStatus() == '1') {
				$.mobile.changePage("#editQuitDateTimeView");
			}
			else
			{
				$.mobile.changePage("#editQuitDateView");
			}
		}
		else
		{
        	$.mobile.changePage("#step2View");
        }
    };
    
    self.saveCommand = function (e) {
    
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
    	
    	if ((daysLeft < 0) || (daysLeft == 0))
    	{
    		if ((appViewModel.setupDate().length > 0) && (appViewModel.quitStatus() == '0'))
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
                var viewModel = new ConfirmQuitDateViewModel(AppViewModel);
                viewModel.initialize();
                ko.applyBindings(viewModel, $('#confirmQuitDateView')[0]);
    			
    			$.mobile.changePage("#confirmQuitDateView");
    		}
    		else
    		{
		    	navigator.notification.confirm( 'Your Quit Date needs to be in the future!',         
				self.onConfirm,         
				'Quit Date',                   
				"OK"         
				);	
				e.preventDefault();
			}
		}
		else
		{
		  if (daysLeft > 30)
    	  {
	    	navigator.notification.confirm( 'Your Quit Date cannot be more than 30 days from now!',         
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
	        // 
	        localStorage.setItem('quitdate', appViewModel.quitDate());
	        // If Smoke again
	        if ((appViewModel.setupDate().length > 0) && (appViewModel.quitStatus() == '1'))
	        {
	        	appViewModel.smokeAgainDate(dateFormat(new Date(), "shortDate"));
	        	localStorage.setItem('smokeagaindate', appViewModel.smokeAgainDate());
	        	appViewModel.quitStatus('0');
	        	localStorage.setItem('quitstatus', appViewModel.quitStatus());
	        	// Re-schedule notifications
	        	ResetStartTipIndex(appViewModel);
	        	ScheduleNotifications(appViewModel);
	        	window.location = 'prequit.html';
	        }
	   		else
	   		{
				if (appViewModel.currentReturnViewUrl().length > 0)
				{
					// Change quit date
					// Re-schedule notification
					ResetStartTipIndex(appViewModel);
					ScheduleNotifications(appViewModel);
					window.location = 'prequit.html';
				}
				else
				{
					ResetStartTipIndex(appViewModel);
					localStorage.setItem('completedstep', '1');
		        	$.mobile.changePage("#step1CompletedView");
		        }
	        }
	        //
	      }
        }
    };
    
    self.onConfirm =  function (button) {
    }
    
    self.daysLeftText = ko.dependentObservable(function () {
    	var daysLeft = self.daysLeft();
    	if (daysLeft)
    	{
	    	if (daysLeft == 0) {
	            return "Today!";
	        }
	        if (daysLeft > 0) {
	           if (daysLeft == 1)
	           {
	           		return "1 Day from now";
	           }
	           else
	           {
	            	return daysLeft + " Days from now";
	            }
	        }
	        else {
	            return -daysLeft + " Days ago";
	        }
	    }
	    else
	    {
	    	return "";
	    }
    });
    
    self.pickDateSuccess = function (data) {
    	var newDate = new Date(data.year, data.month, data.day);
    	AppViewModel.quitDate(dateFormat(newDate, "shortDate"));
	}
    
	self.pickDateError = function (data) {
	}
    
    self.quitDateIos(dateFormat(new Date(AppViewModel.quitDate()), "isoDate"));
}

