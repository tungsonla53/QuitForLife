
function DetailTipViewModel(tipModel) {
    var self = this;
    self.title = ko.observable(tipModel.title);
    self.description = ko.observable(tipModel.description);
    self.image = ko.observable(tipModel.imageT());
    self.titleT = ko.observable(tipModel.titleT());
    self.titleS = ko.observable(tipModel.titleS());
    self.gobackCommand = function (e) {
    	//if (AppViewModel.currentReturnViewUrl().length > 0)
    	//{
        //	$.mobile.changePage(AppViewModel.currentReturnViewUrl()); 
        //}
        //else
        //{
        	$.mobile.changePage("#quitTipsView"); 
        //}     
    }
}