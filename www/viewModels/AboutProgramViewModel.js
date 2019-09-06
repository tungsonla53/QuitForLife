function AboutProgramViewModel() {
    var self = this;
    self.title = "About the Quit For Life&#174 Program";
    self.description = "We've been helping smokers quit for more than 25 years.<br/> When you join our program, our Quit Coaches will help you create an easy-to-follow Quitting Plan to show you how to get ready, take action, and then live the rest of your life as a non-smoker.<br/> Call us to find out if you're eligible for this FREE program.";
    
    self.callCommand = function () {
       if (AppViewModel.isAndroid() == true)
       {
       		document.location.href = 'tel:+1-866-784-8454';	
       }
       else
       {
       		document.location.href = 'tel:+1-866-784-8454';	
       		//window.plugins.phoneDialer.dial('1-866-784-8454');
       }
    }
}
