define(["hiage.js/resource/ResourceLoaderMapping"],
    function (ResourceLoaderMapping) {
        function ResourceLoaderFactory() {
        }

        ResourceLoaderFactory.getResourceLoader = function (resourceType) {
            if (!ResourceLoaderFactory.loaders[resourceType])
                throw "Resource loader for resource type " + resourceType + " is not registered."

            return new ResourceLoaderFactory.loaders[resourceType];
        }

        ResourceLoaderFactory.registerResourceLoader = function (resourceType, loader) {
            if (!loader.prototype["loadResource"])
                throw "Invalid resource loader for resource type " + resourceType + ": Does not contain a loadResource function.";
            ResourceLoaderFactory.loaders[resourceType] = loader;
        }

        ResourceLoaderFactory.loaders = {};

        for (var i = 0; i < ResourceLoaderMapping.length; i++) {
            ResourceLoaderFactory.registerResourceLoader(ResourceLoaderMapping[i].type, ResourceLoaderMapping[i].loader);
        }

        return ResourceLoaderFactory;
    });