function ToolsViewModel() {
    var self = this;
    self.clearStorage = function () {
        localStorage.clear();
        AppViewModel.initialize();
    }
}