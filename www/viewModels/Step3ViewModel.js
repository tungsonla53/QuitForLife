
function Step3ViewModel(appViewModel) {
    var self = this;
    self.setReasonsCommand = function () {
        $.mobile.changePage("#setReasonToQuitView");
        return false;
    }
}

