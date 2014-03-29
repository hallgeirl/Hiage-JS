define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function AccelleratorComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.accel = { x: 0, y: 0 };
            this.position = { x: 0, y: 0 };
            this.magnitude = config.magnitude;
            this.rotation = 0;

            this.registerMessage('control');
            this.registerMessage('move');
            this.registerMessage('rotate');
            this.registerMessage('mousemove', null);
        }

        AccelleratorComponent.prototype = new Component();
        AccelleratorComponent.prototype.update = function (frameTime) {
            if (this.accel.x == 0 && this.accel.y == 0)
                return;

            this.sendMessage(new Message('accel', { x: this.accel.x * frameTime, y: this.accel.y * frameTime, trigger: 'control' }));
            this.accel.x = this.accel.y = 0;
        }

        AccelleratorComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'control') {
                var dirX = Math.cos(this.rotation);
                var dirY = -Math.sin(this.rotation);
                switch (message.data.button) {
                    case 'up':
                        this.accel.y = -this.magnitude;
                        break;
                    case 'down':
                        this.accel.y = this.magnitude;
                        break;
                    case 'left':
                        this.accel.x = -this.magnitude;
                        break;
                    case 'right':
                        this.accel.x = this.magnitude;
                        break;
                }
            } else if (message.subject == 'move') {
                this.position.x = message.data.x;
                this.position.y = message.data.y;
            } else if (message.subject == 'rotate') {
                this.rotation = message.data;
            } else if (message.subject == 'mousemove') {

            }
        }

        AccelleratorComponent.getName = function () { return "accellerator"; }

        return AccelleratorComponent;
    });