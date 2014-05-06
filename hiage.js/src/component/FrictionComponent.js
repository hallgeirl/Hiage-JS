define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function FrictionComponent() {
        }

        FrictionComponent.prototype = new Component();
        FrictionComponent.prototype.constructor = FrictionComponent;

        FrictionComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.magnitude = config.friction;
            this.velocity = [0, 0];
            this.acceleration = [0, 0];
            this.registerMessage('velocity');
            this.registerMessage('acceleration');
        }

        FrictionComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'velocity')
                this.velocity = message.data;
            else if (message.subject == 'acceleration')
                this.acceleration = message.data;
        }

        FrictionComponent.prototype.update = function (frameTime) {
            var x, y;

            if (this.velocity[0] == 0 && this.velocity[1] == 0)
                return;

            var direction = vectorInvert(vectorNormalize(this.velocity));
            if (this.velocity[0] > 0)
                x = Math.max(direction[0] * this.magnitude, -this.velocity[0]);
            else
                x = Math.min(direction[0] * this.magnitude, -this.velocity[0]);

            if (this.velocity[1] > 0)
                y = Math.max(direction[1] * this.magnitude, -this.velocity[1]);
            else
                y = Math.min(direction[1] * this.magnitude, -this.velocity[1]);

            this.acceleration[0] += x;
            this.acceleration[1] += y;
        }

        FrictionComponent.prototype.cleanup = function () {
            this.velocity = null;
            this.position = null;
            Component.prototype.cleanup.call(this);
        }

        FrictionComponent.getName = function () { return "friction"; }

        FrictionComponent.setupPool(500);

        return FrictionComponent;
    });