
function ConfirmQuitDateViewModel(appViewModel) {
    var self = this;

    self.isAndroid = appViewModel.isAndroid;
    self.isIos = appViewModel.isIos;    

    self.quitTime = appViewModel.quitTime;
    self.quitDate = ko.dependentObservable(function () { return appViewModel.quitDate() });
	self.quitDateIos = ko.dependentObservable(function () { return dateFormat(new Date(AppViewModel.quitDate()), "isoDate"); });
	
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
        DateUtil.showDate(stringDate, self.confDateTimeSuccess, self.confDateTimeError);
        e.preventDefault();
    }

    self.setQuitTimeCommand = function (e) {
        var stringTime = "00:00";
    	if (self.quitTime().length > 0)
    	{
 			stringTime = self.quitTime();
    	}
        DateUtil.showTime(stringTime, self.confTimeSuccess, self.confTimeError);
        e.preventDefault();
    }

    self.cancelCommand = function () {
		AppViewModel.quitDate(localStorage.getItem('quitdate'));
    	if (localStorage.getItem('quittime'))
    	{
    		AppViewModel.quitTime(localStorage.getItem('quittime'));
    	}
    	//
    	AppViewModel.costPerDay(JSON.parse(localStorage.getItem('costperday')));
        AppViewModel.pricePerPack(JSON.parse(localStorage.getItem('priceperpack')));
        AppViewModel.cigarettesPerDay(JSON.parse(localStorage.getItem('cigarettesperday')));
        //
        $.mobile.changePage("#mainQuitDashBoardView");

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
            navigator.notification.confirm('Your Quit Date needs to be in the past!',
			self.onConfirm,
			'Quit Date',
			"OK"
			);
			e.preventDefault();
        }
        else {
        
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
            // Update Cost
            var cost = parseFloat(self.cigarettesPerDay()) * parseFloat(self.pricePerPack()) / 20;
        	self.costPerDay(cost);
        	localStorage.setItem("costperday", JSON.stringify(self.costPerDay()));
        	localStorage.setItem("priceperpack", JSON.stringify(self.pricePerPack()));
        	localStorage.setItem("cigarettesperday", JSON.stringify(self.cigarettesPerDay()));
        	AppViewModel.savedCost('1');
        	AppViewModel.costPerDay(cost);
        	AppViewModel.pricePerPack(self.pricePerPack());
            //
            ResetStartTipIndex(appViewModel);
            //
            // Confirm quit
            if ((appViewModel.setupDate().length > 0) && (appViewModel.quitStatus() == '0')) {
                appViewModel.quitStatus('1');
                localStorage.setItem('quitstatus', appViewModel.quitStatus());
                // Re-schedule notifications
                ResetStartTipIndex(appViewModel);
                ScheduleNotifications(appViewModel);
                //
                appViewModel.currentReturnViewUrl("#congratulationsView");
                $.mobile.changePage("#congratulationsView");
                e.preventDefault();
            }
            else {
                if (appViewModel.currentReturnViewUrl().length > 0) {
                    $.mobile.changePage(appViewModel.currentReturnViewUrl());
                }
                else {
                    $.mobile.changePage("#step1PostquitCompletedView");
                }
            }
        }
    };


    self.confDateTimeSuccess = function (data) {
        var newDate = new Date(data.year, data.month, data.day);
        AppViewModel.quitDate(dateFormat(newDate, "shortDate"));
    };

    self.confDateTimeError = function (data) {
    };

    self.confTimeSuccess = function (data) {
        var qtime = data.hour + ':' + data.minute;
        AppViewModel.quitTime(qtime);
    };

    self.confTimeError = function (data) {
    };

    self.costPerDay = ko.observable('0');
    self.pricePerPack = ko.observable('0');
    self.cigarettesPerDay = ko.observable('1');

    self.initialize = function () {
        self.costPerDay(AppViewModel.costPerDay());
        self.pricePerPack(AppViewModel.pricePerPack());
        self.cigarettesPerDay(AppViewModel.cigarettesPerDay());
    };

}

