define([],
    function () {
        function ComponentFactory() {
        }

        ComponentFactory.createComponent = function (type, config, messageDispatcher) {
            if (!ComponentFactory.components[type])
                throw "Resource loader for resource type " + type + " is not registered."

            return new ComponentFactory.components[type](config, messageDispatcher);
        }

        ComponentFactory.registerComponent = function (type, definition) {
            console.log("Registered component " + type);
            ComponentFactory.components[type] = definition;
        }

        ComponentFactory.components = {};

        return ComponentFactory;
    });