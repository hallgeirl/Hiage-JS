define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function FrictionComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.magnitude = config.friction;
            this.velocity = { x: 0, y: 0 };
            this.registerMessage('speed');
        }

        FrictionComponent.prototype = new Component();
        FrictionComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'speed') {
                this.velocity.x = message.data.x;
                this.velocity.y = message.data.y;
            }
        }

        FrictionComponent.prototype.update = function (frameTime) {
            var x, y;

            if (this.velocity.x == 0 && this.velocity.y == 0)
                return;

            var direction = vectorInvert(vectorNormalize(this.velocity));
            if (this.velocity.x > 0)
                x = Math.max(direction.x * this.magnitude * frameTime, -this.velocity.x);
            else
                x = Math.min(direction.x * this.magnitude * frameTime, -this.velocity.x);

            if (this.velocity.y > 0)
                y = Math.max(direction.y * this.magnitude * frameTime, -this.velocity.y);
            else
                y = Math.min(direction.y * this.magnitude * frameTime, -this.velocity.y);

            this.sendMessage(new Message('accel', { x: x, y: y }, this));
        }

        FrictionComponent.getName = function () { return "friction"; }

        return FrictionComponent;
    });