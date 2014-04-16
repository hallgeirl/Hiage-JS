define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function AccelleratorComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.accel = [0,0]
            this.magnitude = config.magnitude;

            this.registerMessage('acceleration');
            this.registerMessage('control');
        }

        AccelleratorComponent.prototype = new Component();

        AccelleratorComponent.prototype.initialize = function () {
        }

        AccelleratorComponent.prototype.update = function (frameTime) {
            if (this.accel[0] == 0 && this.accel[1] == 0)
                return;
        }

        AccelleratorComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'control') {
                switch (message.data.button) {
                    case 'up':
                        this.accel[1] = this.magnitude;
                        break;
                    case 'down':
                        this.accel[1] = -this.magnitude;
                        break;
                    case 'left':
                        this.accel[0] = -this.magnitude;
                        break;
                    case 'right':
                        this.accel[0] = this.magnitude;
                        break;
                }
            } else if (message.subject == 'acceleration')
                this.accel = message.data;

        }

        AccelleratorComponent.prototype.cleanup = function () {
            this.accel = null;
            Component.prototype.cleanup.call(this);
        }

        AccelleratorComponent.getName = function () { return "accellerator"; }

        return AccelleratorComponent;
    });