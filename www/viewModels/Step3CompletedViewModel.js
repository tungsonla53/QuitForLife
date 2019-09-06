function Step3CompletedViewModel(appViewModel) {
    var self = this;
    self.quitReasons = appViewModel.quitReasons;
    self.numberOfReasons = ko.dependentObservable(function () {
        return self.quitReasons().length;
    });

    self.nextCommand = function () {
        AppViewModel.setupDate(dateFormat(new Date(), "shortDate"));
        localStorage.setItem('setupdate', AppViewModel.setupDate());
        localStorage.setItem('completedstep', '4');
        //
        // Schedule Notification
        //
        ResetStartTipIndex(appViewModel);
        ScheduleNotifications(appViewModel);   
        //
        $.mobile.changePage("#congratulationsView");
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
