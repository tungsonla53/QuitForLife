function Step1PostquitCompletedViewModel(appViewModel) {
    var self = this;

    self.quitStatus = appViewModel.quitStatus;
    self.quitTime = appViewModel.quitTime;
    self.quitDate = ko.dependentObservable(function () { return appViewModel.quitDate() });

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
        return dateFormat(qDate, "fullDate") + " at " + self.quitTimeText();
    });

    self.daysQuitted = ko.observable('');

    self.quitMonthText = ko.dependentObservable(function () {
        var qDate = new Date(self.quitDate());
        return dateFormat(qDate, "mmmm");
    });

    self.quitDayText = ko.dependentObservable(function () {
        var qDate = new Date(self.quitDate());
        return dateFormat(qDate, "dd");
    });

    self.daysQuit = ko.dependentObservable(function () {
    	var calculatedObject = GetDaysHoursMinutesSecondsOver(appViewModel);
        self.daysQuitted(calculatedObject.days);

        return '<span class="c6_10">' + calculatedObject.days + '</span>' + ' Days, '
	  + '<span class="c6_10">' + calculatedObject.hours + '</span>' + ' Hours, '
	  + '<span class="c6_10">' + calculatedObject.minutes + '</span>' + ' Mins.';

    });

    self.lifeAdded = ko.dependentObservable(function () {
        var days = GetLifeAdded(appViewModel);
        return '<span class="c6_10">' + days + '</span>' + ' Days ';
    });

    self.infoCommand = function () {
        navigator.notification.confirm("For every cigarette you don't smoke per day, you add on average, up to 20 minutes to your life.",
		self.onConfirm,
		'Life Added',
		"Done"
		);
    }
    
    self.gobackCommand = function (e) {
    	if (appViewModel.currentReturnViewUrl().length > 0)
    	{
        	$.mobile.changePage(appViewModel.currentReturnViewUrl()); 
        }
        else
        {
        	$.mobile.changePage("#mainQuitDashBoardView"); 
        }     
    }
}
