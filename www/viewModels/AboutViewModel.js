function AboutViewModel() {
    var self = this;
    self.menu = ko.observableArray([
                    new MenuItemViewModel("About the Quit For Life&#174 Program", "#aboutProgramView", "", 0),
                    new MenuItemViewModel("Send Us Feedback About this App", "#sendFeedbackView", "", 1),
                    new MenuItemViewModel("Terms of Use", "#termsView", "", 2)
                ]);
                
   	self.selectMenu = function() 
	{     
	    if (this.processing == 0)
		{ 
			$.mobile.changePage(this.url); 
        }
        
        if (this.processing == 2)
		{ 
			$.mobile.changePage(this.url); 
        }
       
        if (this.processing == 1)
		{ 
		    if (AppViewModel.isAndroid())
		    {
				$.mobile.changePage(this.url); 
			}
			else
			{
				var body = ' \r\n---------------------\r\n ' + 
                ' Sent from my ' + device.platform + 
                ', Model: ' + device.model + 
                ', Version: ' + device.version ;
                
				var emailOptions = {
            		subject: 'Feedback about Quit For Life Mobile',
            		body: body,
            		toRecipients: 'mobilesupport@alere.com',
            		ccRecipients: 'Tung-Son.La@alere.com,dan.morrison@alere.com'
            	};
            	cordova.exec(null, null, "EmailComposer", "showEmailComposer", [emailOptions]);	
			}
        }
       
	}             
}
