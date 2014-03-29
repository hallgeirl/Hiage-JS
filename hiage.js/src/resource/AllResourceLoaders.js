define(["hiage.js/resource/ResourceLoaderFactory", "hiage.js/resource/AudioLoader", "hiage.js/resource/ObjectLoader"],
    function (ResourceLoaderFactory, AudioLoader, ObjectLoader) {
        ResourceLoaderFactory.registerResourceLoader("audio", AudioLoader);
        ResourceLoaderFactory.registerResourceLoader("object", ObjectLoader);
    });