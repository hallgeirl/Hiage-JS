define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function SpatialComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.position = [config.position[0], config.position[1]];
            this.velocity = [0, 0];
            if (config.velocity)
                this.velocity = [config.velocity[0], config.velocity[1]];
            this.acceleration = [0, 0];
        }

        SpatialComponent.prototype = new Component();

        SpatialComponent.prototype.initialize = function () {
            this.sendMessage(new Message('position', this.position, this));
            this.sendMessage(new Message('velocity', this.velocity, this));
            this.sendMessage(new Message('acceleration', this.acceleration, this));
        }

        SpatialComponent.prototype.update = function (frameTime) {
            this.position[0] += this.velocity[0] * frameTime;
            this.position[1] += this.velocity[1] * frameTime;

            this.velocity[0] += this.acceleration[0] * frameTime;
            this.velocity[1] += this.acceleration[1] * frameTime;

            this.acceleration[0] = this.acceleration[1] = 0;
        }

        SpatialComponent.prototype.receiveMessage = function (message) {
        }

        SpatialComponent.getName = function () { return "spatial"; }

        return SpatialComponent;
    });