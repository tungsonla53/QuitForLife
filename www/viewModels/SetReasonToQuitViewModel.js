
function SetReasonToQuitViewModel(appViewModel) {
    var self = this;
    
    self.canCancel = ko.dependentObservable(function () { 
    	if (AppViewModel.setupDate().length > 0) {
    		return true;
    	}
    	else
    	{
    	return false;
    	} 	
    });
    
    self.quitReasons = ko.observable(listOfReasons);
    self.selectedReasons = ko.observableArray([]);

    self.saveCommand = function () {
        AppViewModel.quitReasons([]);
        var checkedReasons = [];
        ko.utils.arrayForEach(self.selectedReasons(), function (id) {
            ko.utils.arrayForEach(self.quitReasons(), function (reason) {
                if (reason.reasonid == id) {
                    AppViewModel.quitReasons.push(reason);
                    checkedReasons.push(id);
                }
            });
        });
        localStorage.setItem("quitReasonIDs", JSON.stringify(checkedReasons));
        AppViewModel.selectedReasonIDs(checkedReasons);
        if (appViewModel.currentReturnViewUrl().length > 0) {
            $.mobile.changePage("#editReasonsView");
        }
        else {
            $.mobile.changePage("#step3CompletedView");
            localStorage.setItem('completedstep', '3');
        }
    }

    self.cancelCommand = function () {
        self.selectedReasons([]);
        self.initialize();
        ko.utils.arrayForEach(self.quitReasons(), function (reason) {
            reason.isChecked(false);
            reason.isUnChecked(true);
            ko.utils.arrayForEach(self.selectedReasons(), function (id) {	
                if (reason.reasonid == id) {
                    reason.isChecked(true);
            		reason.isUnChecked(false);
                }
            });
        });
        if (appViewModel.currentReturnViewUrl().length > 0) {
            $.mobile.changePage("#editReasonsView");
        }
        else {
            $.mobile.changePage("#step3View");
        }
    }

    self.clickReason = function () {
        if (this.isChecked() == true) {
            this.isChecked(false);
            this.isUnChecked(true);
            var updatedReasons = [];
            var deletedid = this.reasonid;
            ko.utils.arrayForEach(self.selectedReasons(), function (id) {
                if (id != deletedid) {
                    updatedReasons.push(id);
                }
            });
            self.selectedReasons(updatedReasons);
        }
        else {
            this.isChecked(true);
            this.isUnChecked(false);
            self.selectedReasons.push(this.reasonid);
        }
    }

    self.initialize = function () {
        ko.utils.arrayForEach(AppViewModel.selectedReasonIDs(), function (id) {
            self.selectedReasons.push(id);
        });
    }
}

