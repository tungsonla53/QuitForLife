function onConfirm(button) {
    }

function showErrorMessage(msg)
{
	navigator.notification.confirm(msg,
			onConfirm,
			'Calculate Savings',
			"OK"
			);
}



function SetCostSavingViewModel(appViewModel) {
    var self = this;
    self.costPerDay = ko.observable('0');
    self.pricePerPack = ko.observable('');
    self.cigarettesPerDay = ko.observable('');
    self.introText = ko.dependentObservable(function () { 
    	 if (AppViewModel.quitStatus() == '1') {
    		return "How much money do you spend on tobacco each day?";
    	}
    	else
    	{
    		return "How much do you spend on smoking each day?";
    	} 	
    });
    
	self.canCancel = ko.dependentObservable(function () { 
    	if (AppViewModel.setupDate().length > 0) {
    		return true;
    	}
    	else
    	{
    	return false;
    	} 	
    });
	
    self.saveCommand = function (e) {
        if ((self.pricePerPack().length == 0) || (self.pricePerPack() == 0)) {
        	showErrorMessage('Please enter Cost Per Pack');
        	e.preventDefault();
            return;
        }
        if ((self.cigarettesPerDay().length == 0) || (self.cigarettesPerDay() == 0)) {
        	showErrorMessage('Please enter Cigarettes Per Day');
        	e.preventDefault();
            return;
        }
        var cost = parseFloat(self.cigarettesPerDay()) * parseFloat(self.pricePerPack()) / 20;
        self.costPerDay(cost);
        localStorage.setItem("costperday", JSON.stringify(self.costPerDay()));
        localStorage.setItem("priceperpack", JSON.stringify(self.pricePerPack()));
        localStorage.setItem("cigarettesperday", JSON.stringify(self.cigarettesPerDay()));
        AppViewModel.savedCost('1');
        AppViewModel.costPerDay(cost);
        AppViewModel.pricePerPack(self.pricePerPack());
        AppViewModel.cigarettesPerDay(self.cigarettesPerDay());
        if (appViewModel.currentReturnViewUrl().length > 0) {
            $.mobile.changePage("#editCostView");
        }
        else {
            $.mobile.changePage("#step2CompletedView");
            localStorage.setItem('completedstep', '2');
        }
    };

    self.cancelCommand = function () {
        self.initialize();
        if (appViewModel.currentReturnViewUrl().length > 0) {
            $.mobile.changePage("#editCostView");
        }
        else {
            $.mobile.changePage("#step2View");
        }
    };

    self.initialize = function () {
        self.costPerDay(AppViewModel.costPerDay());
        self.pricePerPack(AppViewModel.pricePerPack());
        self.cigarettesPerDay(AppViewModel.cigarettesPerDay());
    };
}


