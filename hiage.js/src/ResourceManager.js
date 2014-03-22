function ResourceManager() {
    this.resources = {}

}

ResourceManager.prototype.loadResources = function(path) {
    $.ajax({
        url: path,
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data)
        }
}