function Step2CompletedViewModel(appViewModel) {
    var self = this;
    self.pricePerPack = appViewModel.pricePerPack;
    self.cigarettesPerDay = appViewModel.cigarettesPerDay;
    self.savedCost = appViewModel.savedCost;
    self.costPerDay = appViewModel.costPerDay;

    self.pricePerPackText = ko.dependentObservable(function () {
        return '$' + self.pricePerPack();
    });

    self.costPerMonth = ko.dependentObservable(function () {
        return '$' + (self.costPerDay() * 30).toFixed(0);
    });

    self.costPer6Months = ko.dependentObservable(function () {
        return '$' + (self.costPerDay() * 180).toFixed(0);
    });

    self.costPerYear = ko.dependentObservable(function () {
        return '$' + (self.costPerDay() * 365).toFixed(0);
    });

    self.quitDate = ko.dependentObservable(function () { return appViewModel.quitDate() });

    self.costSaving = ko.dependentObservable(function () {
        if (AppViewModel.quitStatus() == '1') {
        	var calculatedObject = GetDaysHoursMinutesSecondsOver(appViewModel);
            return '$' + (calculatedObject.days * appViewModel.costPerDay() + calculatedObject.hours * appViewModel.costPerDay() / 24 + calculatedObject.minutes * appViewModel.costPerDay() / 1440).toFixed(0);
        }
        else {
            return '$0';
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
