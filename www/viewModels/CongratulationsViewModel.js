
function CongratulationsViewModel() {
    var self = this;
    self.title = ko.dependentObservable(function () {
        if (AppViewModel.quitStatus() == '1') {
            return "Congratulations on making it to your Quit Date!";
        }
        else {
            return "Congratulations, you have completed your Quitting Plan.";
        }
    });

    self.description = ko.dependentObservable(function () {
        if (AppViewModel.quitStatus() == '1') {
            return "The first 5 days are often the hardest. Don't go near tobacco - make sure you've gotten rid of all your cigarettes and avoid other smokers. Your hands and mouth will feel strange without a cigarette, so make sure to keep them busy. Chew gum, a straw, or even a pen.  Don't worry - it will get easier!";
        }
        else {
            return "While quitting can be difficult, you have many resources to help you.<br/>Our quit tips, delivered to you each day, should help you prepare to quit and stay quit.<br/>You should also consider seeking support from friends, family, or others in your community. Social support really works!";
        }
    });

    self.image = ko.dependentObservable(function () {
        if (AppViewModel.quitStatus() == '1') {
            return "images/Tips/Tips_00_Post_Quit_Congratulations.jpg";
        }
        else {
            return "images/Setup/Step_4_Artwork_1.png";
        }
    });

	self.viewTipsCommand = function () {
        if (AppViewModel.currentReturnViewUrl().length > 0) {
        	AppViewModel.currentReturnViewUrl("#congratulationsView");
        	$.mobile.changePage("#altTipsView");
        }
        else
        {
        	$.mobile.changePage("#quitTipsView");
        }
    }

    self.nextCommand = function () {
        if (AppViewModel.quitStatus() == '1') {
            window.location = 'postquit.html';
        }
        else {
            window.location = 'prequit.html';
        }
    }
}

