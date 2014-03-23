define([],
    function (ResourceLoaderFactory) {
        function AudioLoader() {
        }

        AudioLoader.prototype.loadResource = function (path, name) {
            var resource = { url: path };

            return resource;
        }

        return AudioLoader;
    });