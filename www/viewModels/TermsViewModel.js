function TermsViewModel() {
    var self = this;
    self.title = "Terms of Use";
    self.description = "Before using this mobile application, please read the Terms of Use set forth below.";
	self.alerePolicyCommand = function () {
		var alereRef = window.open('http://www.alerewellbeing.com/policies/privacy-policy/', '_blank', 'location=yes');
	};
	self.applePolicyCommand = function () {
		var appleRef = window.open('http://www.apple.com/legal/internet-services/itunes/us/terms.html#APPS', '_blank', 'location=yes');
	};
}
