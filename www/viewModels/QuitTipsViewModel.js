function QuitTipsViewModel(appViewModel) {
    var self = this;
    self.allTips = ko.dependentObservable(function () { 
    	
    	if (appViewModel.quitStatus() == '0')
    	{
    		return getPrequitTips(appViewModel); 
    	}
    	else
    	{
    		return getPostquitTips(appViewModel); 
    	}
    });
    
    self.quitDateText = ko.dependentObservable(function () {
        var qDate = new Date(appViewModel.quitDate());
        return " --- You quit on " + dateFormat(qDate, "fullDate") + " ---";
    });
    
    self.smokeAgainDateText = ko.dependentObservable(function () {
    	if (appViewModel.quitStatus() == '1')
	 	{
	 		return self.quitDateText();
	 	}
	 	else
	 	{
			if (localStorage.getItem('smokeagaindate')) {
	            var smokeDate = new Date(localStorage.getItem('smokeagaindate'));
	        	return "- You started smoking again " + dateFormat(smokeDate, "fullDate") + " -";
	        }
	        else
	        {
	        	return "";
	        }
        }
    });
    
    self.previousTips = ko.dependentObservable(function () {
        var arrayTips = [];
        if (appViewModel.quitStatus() == '1')
	 	{
	 		if (localStorage.getItem('previousPrequitTipIDs')) {
                        var previousTips = JSON.parse(localStorage.getItem('previousPrequitTipIDs'));
                        listOfTipsQDMinus.forEach(
		          			function setValues(tip) {
		                   		previousTips.forEach(
                                               function setValues(value) {
                                                   if (value == tip.tipid) {
                                                       tip.isNew(false);
                                                       arrayTips.push(tip);
                                                   }
                                               });
	            		});
	            		
	            		listOfRelapseTips.forEach(
		          			function setValues(tip) {
		                   		previousTips.forEach(
                                               function setValues(value) {
                                                   if (value == tip.tipid) {
                                                       tip.isNew(false);
                                                       arrayTips.push(tip);
                                                   }
                                               });
	            		});
	            		
	            		listOfTipsQDMinus[0].isNew(false);
		            	arrayTips.push(listOfTipsQDMinus[0]);
            }
            
        }
        
        if (appViewModel.quitStatus() == '0' )
	 	{
	 		if (localStorage.getItem('previousPostquitTipIDs')) {
                        var previousTips = JSON.parse(localStorage.getItem('previousPostquitTipIDs'));
                        listOfTipsQDPlus.forEach(
		          			function setValues(tip) {
		                   		previousTips.forEach(
                                               function setValues(value) {
                                                   if (value == tip.tipid) {
                                                       tip.isNew(false);
                                                       arrayTips.push(tip);
                                                   }
                                               });
	            		});
	            		listOfTipsQD.forEach(
		          			function setValues(tip) {
		                   		previousTips.forEach(
                                               function setValues(value) {
                                                   if (value == tip.tipid) {
                                                       tip.isNew(false);
                                                       arrayTips.push(tip);
                                                   }
                                               });
	            		});
	            		//
		            	if (localStorage.getItem('smokeagaindate')) {
		            		CongratulationPostquitTip.isNew(false);
		            		arrayTips.push(CongratulationPostquitTip);
		            	}  		
            }
        }
        
        return arrayTips;
    });
    
    self.gobackCommand = function (e) {
    	if (appViewModel.currentReturnViewUrl().length > 0)
    	{
        	$.mobile.changePage(appViewModel.currentReturnViewUrl()); 
        }
        else
        {
        	$.mobile.changePage("#congratulationView"); 
        }     
    }
    
    self.viewTip = function() 
	{     
	    if (this.isNew() == true)
		{ 
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
}