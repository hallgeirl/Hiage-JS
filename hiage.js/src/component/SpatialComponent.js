define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function SpatialComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
        }

        SpatialComponent.prototype = new Component();

        SpatialComponent.prototype.configure = function (config) {
            Component.prototype.configure.call(this, config);
            this.position = createVector();
            this.position[0] = config.position[0];
            this.position[1] = config.position[1];
            this.velocity = createVector();
            if (config.velocity) {
                this.velocity[0] = config.velocity[0];
                this.velocity[1] = config.velocity[1];
            }
            this.acceleration = createVector();
            this.acceleration[0] = 0;
            this.acceleration[1] = 0;
        }

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

        SpatialComponent.prototype.cleanup = function () {
            releaseVector(this.position);
            releaseVector(this.acceleration);
            releaseVector(this.velocity);
            Component.prototype.cleanup.call(this);
        }

        SpatialComponent.getName = function () { return "spatial"; }

        return SpatialComponent;
    });