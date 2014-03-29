define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function ShapeComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.shape = ShapeComponent.createShape(config.shape, config.shapemap, config);
            this.rotationOffset = config.rotation;
            if (!this.rotationOffset)
                this.rotationOffset = 0;

            this.registerMessage('move');
            this.registerMessage('rotate');
            this.registerMessage('size');
        }

        ShapeComponent.createShape = function (shapeConfig, shapeMap, config) {
            if (config.position)
                shapeConfig.position = config.position;
            return new shapeMap[shapeConfig.type](shapeConfig);
        }

        ShapeComponent.prototype = new Component();
        ShapeComponent.prototype.initialize = function () {
            this.sendMessage(new Message('shape', this.shape, this));
        }

        ShapeComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'move')
                this.shape.setPosition(message.data.x, message.data.y);
            else if (message.subject == 'rotate')
                this.shape.setRotation(-message.data - this.rotationOffset);
            else if (message.subject == 'size')
                this.shape.setRadius(message.data);
        }

        ShapeComponent.prototype.update = function (frametime) {
            this.sendMessage(new Message('render', this.shape), null);
        }

        ShapeComponent.getName = function () { return "shape"; }

        return ShapeComponent;
    });