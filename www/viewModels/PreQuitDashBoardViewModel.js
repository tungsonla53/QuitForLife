
function PreQuitDashBoardViewModel(appViewModel) {
    var self = this;

	self.quitTips = ko.dependentObservable(function () { return getPrequitTips(appViewModel); });
	
    self.quitDate = ko.dependentObservable(function () { return appViewModel.quitDate() });
    self.quitDateText = ko.dependentObservable(function () {
        var qDate = new Date(self.quitDate());
        return dateFormat(qDate, "fullDate");
    });

	self.missedText = ko.observable('');
	
    self.daysLeft = ko.dependentObservable(function () {
        var qday = new Date(self.quitDate());
        var daysLeft = GetDaysLeft(qday);
        if (daysLeft == 0) {
        	self.missedText('');
            return "Today!";
        }
        if (daysLeft > 0) {
        	if (daysLeft == 1)
        	{
        		self.missedText('');
	            return daysLeft + " Day"
        	}
        	else
        	{
	        	self.missedText('');
	            return daysLeft + " Days";
            }
        }
        else {
            self.missedText('Missed');
            return "Missed";
        }
    });

    self.savedQuitDate = appViewModel.savedQuitDate;
    self.savedCost = appViewModel.savedCost;
    self.costPerDay = appViewModel.costPerDay;
    self.costPerMonth = ko.dependentObservable(function () {
        return '$' + (self.costPerDay() * 30).toFixed(0);
    });

    self.costPer6Months = ko.dependentObservable(function () {
        return '$' + (self.costPerDay() * 180).toFixed(0);
    });

    self.costPerYear = ko.dependentObservable(function () {
        return '$' + (self.costPerDay() * 365).toFixed(0);
    });


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

    self.viewAllTips = function () {
        $.mobile.changePage("#quitTipsView");
    }

	self.menuCommand = function (e) {
        appViewModel.currentReturnViewUrl("#menuView");  
        $.mobile.changePage("#menuView", {transition: "slide", reverse: true }); 
        return false;    
    }
    
    self.quitReasons = appViewModel.quitReasons;
	
	self.tick = function () {
        var resumeDate = dateFormat(new Date(), "shortDate");
		if (AppViewModel.initialProcessDate() != resumeDate)
		{
        	window.location = 'prequit.html';
        }
    }
    
    setInterval(self.tick, 60000);		
}
