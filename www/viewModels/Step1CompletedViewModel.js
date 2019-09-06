function Step1CompletedViewModel(appViewModel) {
    var self = this;

    self.quitStatus = appViewModel.quitStatus;

    self.quitDate = ko.dependentObservable(function () { return appViewModel.quitDate() });

    self.quitDateText = ko.dependentObservable(function () {
        var qDate = new Date(self.quitDate());
        return dateFormat(qDate, "fullDate");
    });

    self.quitMonthText = ko.dependentObservable(function () {
        var qDate = new Date(self.quitDate());
        return dateFormat(qDate, "mmmm");
    });

    self.quitDayText = ko.dependentObservable(function () {
        var qDate = new Date(self.quitDate());
        return dateFormat(qDate, "dd");
    });

    self.daysLeft = ko.dependentObservable(function () {
	    var daysLeft = GetDaysLeft(new Date(self.quitDate()));
        if (daysLeft == 0) {
            return "Today!";
        }
        if (daysLeft > 0) {
        	if (daysLeft == 1)
        	{
        		return "1 Day Left";
        	}
        	else
        	{
            	return daysLeft + " Days Left";
            }
        }
        else {
            return "Missed";
        }
    });
    
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
