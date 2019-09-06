
function successCallback(data)
{
	//alert(data);
	// var versionName = data;
}

function failureCallback()
{
  //alert('error');
}

function SendFeedbackViewModel() {
    var self = this;
    this.feedbackText = ko.observable('');
    self.deviceInformation = ko.dependentObservable(function () {
        return '\r\n -------------------------------------------------------------- \r\n ' + 
                ' Sent from my ' + device.platform + 
                ', Model: ' + device.model + 
                ', Version: ' + device.version ;
    });
    this.sendFeedbackCommand = function () {
        if (this.feedbackText().length > 0)
        {
        	var feedbackMsg = this.feedbackText() + self.deviceInformation();
        	if (AppViewModel.isAndroid())
        	{
        		cordova.exec(null, null, "SendMail", "sendEmail", [feedbackMsg]);
        		//var args = {};
                //args.subject = 'Quit For Life Feedback';
                //args.body = feedbackMsg;
            	//args.toRecipients = ['mobilesupport@alere.com'];
            	//args.ccRecipients  = ['dan.morrison@alere.com'];
            	//args.bccRecipients  = ['Tung-Son.La@alere.com'];
            	//args.attachments  = [];
            	//args.bIsHTML = true;
            	//cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);	
        	}
        	else
        	{
        	   	var emailOptions = {
            		subject: 'Feedback about Quit For Life Mobile',
            		body: feedbackMsg,
            		toRecipients: 'mobilesupport@alere.com',
            		ccRecipients: 'Tung-Son.La@alere.com,dan.morrison@alere.com'
            	};
            	cordova.exec(null, null, "EmailComposer", "showEmailComposer", [emailOptions]);
        	}
        }
    }
    
    cordova.exec(successCallback, failureCallback, 'Version', 'GetVersionName', []);
}
