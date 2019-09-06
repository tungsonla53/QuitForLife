function PostQuitDashBoardViewModel(appViewModel) {
    var self = this;
    self.costSaving = ko.observable('');
    self.quitDate = ko.dependentObservable(function () { return appViewModel.quitDate() });
    self.quitDateText = ko.dependentObservable(function () {
        var qDate = new Date(self.quitDate());
        return dateFormat(qDate, "fullDate");
    });

    self.daysQuitted = ko.observable('');

    self.daysLeft = ko.observable('');

    self.savedQuitDate = appViewModel.savedQuitDate;
    self.savedCost = appViewModel.savedCost;
    self.costPerDay = appViewModel.costPerDay;

    self.costPerMonth = ko.dependentObservable(function () {
        return '$' + (self.costPerDay() * 30);
    });

    self.costPer6Months = ko.dependentObservable(function () {
        return '$' + (self.costPerDay() * 180);
    });

    self.costPerYear = ko.dependentObservable(function () {
        return '$' + (self.costPerDay() * 365);
    });

    self.lifeAdded = ko.dependentObservable(function () {
        var days = GetLifeAdded(appViewModel);
        return '<span style="color: orange;font-weight:bold;font-size:14px; ">' + days + '</span>' + ' Days';
    });

    self.quitReasons = appViewModel.quitReasons;
    self.quitTips = ko.dependentObservable(function () { return getPostquitTips(appViewModel); });

    self.viewTip = function () {
        if (this.isNew() == true) {
            this.isNew(false);
            var viewedTips = AppViewModel.viewedTipIDs();
            viewedTips.push(this.tipid);
            AppViewModel.viewedTipIDs(viewedTips);
            localStorage.setItem("viewedTipIDs", JSON.stringify(viewedTips));
        }
		
		if (this.tipid == 'S03')
        {
        	$.mobile.changePage("#smokingAgainView"); 
        }
        else
        {  
        	if ((this.tipid == 'S01') || (this.tipid == 'S02' ))
        	{
        		ko.applyBindings(new DetailTipViewModel(this), $('#urgesView')[0]); 
        		$.mobile.changePage("#urgesView"); 
        	}
        	else
        	{
		    	ko.applyBindings(new DetailTipViewModel(this), $('#quitTipDetailView')[0]); 
	        	$.mobile.changePage("#quitTipDetailView"); 
	        }
        }  
    }

	self.menuCommand = function (e) {
        appViewModel.currentReturnViewUrl("#menuView");  
        $.mobile.changePage("#menuView", {transition: "slide", reverse: true }); 
        return false;    
    }
    
    self.viewAllTips = function () {
        $.mobile.changePage("#quitTipsView");
    }

    self.tick = function () {
        
        var calculatedObject = GetDaysHoursMinutesSecondsOver(appViewModel);
        
        self.daysQuitted(calculatedObject.days);
        self.costSaving('$' + (calculatedObject.days * appViewModel.costPerDay() + calculatedObject.hours * appViewModel.costPerDay() / 24 + calculatedObject.minutes * appViewModel.costPerDay() / 1440).toFixed(0));

        var daysText = '<span style="color: orange;font-weight:bold;font-size:14px; ">' + calculatedObject.days + '</span>' + ' Days, '
	  + '<span style="color: orange;font-weight:bold;font-size:14px; ">' + calculatedObject.hours + '</span>' + ' Hours, '
	  + '<span style="color: orange;font-weight:bold;font-size:14px; ">' + calculatedObject.minutes + '</span>' + ' Mins.';

        self.daysLeft(daysText);
        
        var resumeDate = dateFormat(new Date(), "shortDate");
		if (AppViewModel.initialProcessDate() != resumeDate)
		{
        	window.location = 'postquit.html';
        }
    }

    self.tick();
    setInterval(self.tick, 6000);
}

