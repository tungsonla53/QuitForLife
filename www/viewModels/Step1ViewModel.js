var DateUtil = {
    showDate: function (parmDate, callbackSuccess, callbackError) {
        return cordova.exec(callbackSuccess, callbackError, "DateUtil", "date", [{ date: parmDate}]);
    },
    showTime: function (parmTime, callbackSuccess, callbackError) {
        return cordova.exec(callbackSuccess, callbackError, "DateUtil", "time", [{ time: parmTime}]);
    }
};

var setDateSuccess = function (data) {
    var newDate = new Date(data.year, data.month, data.day);
    AppViewModel.quitDate(dateFormat(newDate, "shortDate"));
    localStorage.setItem('quitdate', AppViewModel.quitDate());
    $.mobile.changePage("#step1CompletedView");
};

var setDateError = function (data) {
}

function Step1ViewModel(appViewModel) {
    var self = this;
    self.quitDate = appViewModel.quitDate;
    self.setQuitDateCommand = function () {

        if (AppViewModel.quitStatus() == '1') {
            $.mobile.changePage("#pickDateTimeView", { transition: "slide" });
        }
        else {
            $.mobile.changePage("#pickDateView", { transition: "slide" });
        }

    }
}

