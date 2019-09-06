function ContactsViewModel() {
    
    var self = this;
    self.contactsList = ko.observableArray([]);
    
    function onSuccess(contacts) {
        for (var i=0; i<contacts.length; i++)
        {
        	self.contactsList.push(contacts[i]);    
        }
   	} 
   	
   	function onError(contactError) {
   		alert('error');
   	} 
   	
    self.initialize = function () {
        var options = new ContactFindOptions(); 
        options.filter=''; 
        options.multiple=true;
        var fields = ['*'];  //"*" will return all contact fields
        navigator.contacts.find(fields,  onSuccess, onError, options );
    };
}
