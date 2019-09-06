function MenuViewModel() {
    var self = this;
    self.newTipsText = ko.dependentObservable(function () {
        var count = 0;
        ko.utils.arrayForEach(AppViewModel.quitTips(), function (tip) {
            if (tip.isNew()) {
                count = count + 1;
            }
        });
        if (count > 0) {
            return count + " New";
        }
        else {
            return "";
        }
    });
    
    self.menu0Command = function (e) {
    	AppViewModel.currentReturnViewUrl('#mainQuitDashBoardView');
    	//$.mobile.changePage("#mainQuitDashBoardView"); 
    	$.mobile.changePage("#mainQuitDashBoardView", {transition: "slide", reverse: false });   
    }
    self.menu1Command = function (e) {
    	AppViewModel.currentReturnViewUrl("#menuView");  
    	$.mobile.changePage("#quitTipsView");  
    }
    self.menu2Command = function (e) {
    	if (AppViewModel.quitStatus() == '1') {
    		$.mobile.changePage("#editQuitDateTimeView"); 
    	}
    	else
    	{
    		$.mobile.changePage("#editQuitDateView"); 
    	} 
    }
    self.menu3Command = function (e) {
    	AppViewModel.currentReturnViewUrl("#menuView");  
    	$.mobile.changePage("#editCostView");  
    }
    self.menu4Command = function (e) {
    	AppViewModel.currentReturnViewUrl("#menuView");  
    	$.mobile.changePage("#editReasonsView");  
    }
    self.menu5Command = function (e) {
    	AppViewModel.currentReturnViewUrl("#menuView");  
    	$.mobile.changePage("#setNotificationsView");  
    }
    self.menu6Command = function (e) {
    	AppViewModel.currentReturnViewUrl("#menuView");  
    	$.mobile.changePage("#aboutView");  
    }
}
