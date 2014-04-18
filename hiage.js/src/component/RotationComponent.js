define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function RotationComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
        }

        RotationComponent.prototype = new Component();

        RotationComponent.prototype.configure = function (config) {
            Component.prototype.configure.call(this, config);
            this.angle = { value: 0 };
            if (config.initial)
                this.angle.value = config.initial
            this.angleDiff = 0;
            this.rotationSpeed = config.speed;
            this.position = [0, 0];
            this.registerMessage('control');
            this.registerMessage('position');
            this.registerMessage('rotate-left');
            this.registerMessage('rotate-right');
        }

        RotationComponent.prototype.initialize = function () {
            this.sendMessage(new Message('rotation', this.angle, this));
        }

        RotationComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'control') {
                switch (message.data.button) {
                    case 'mouseright':
                    case 'mouseleft':
                        var diff = vectorDifference(message.data.position, this.position);
                        var direction = vectorNormalize(diff)
                        
                        var angle = getAngleFromDirection(direction);
                        this.angleDiff = angle - this.angle.value;
                        break;
                }
            } else if (message.subject == 'position') {
                this.position = message.data;
            }
            else if (message.subject = 'rotate-left') {
                this.angleDiff = this.rotationSpeed;
            } else if (message.subject = 'rotate-right') {
                this.angleDiff = -this.rotationSpeed;
            }
        }

        RotationComponent.prototype.update = function (frameTime) {
            if (this.angleDiff == 0)
                return;

            this.angle.value += this.angleDiff;

            while (this.angle.value < 0)
                this.angle.value += 2 * Math.PI;

            while (this.angle.value > 2 * Math.PI)
                this.angle.value -= 2 * Math.PI;

            this.angleDiff = 0;
        }

        RotationComponent.prototype.cleanup = function () {
            this.position = null;
            Component.prototype.cleanup.call(this);
        }

        RotationComponent.getName = function () { return "rotation"; }

        return RotationComponent;
    });