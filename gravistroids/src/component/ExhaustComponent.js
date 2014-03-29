define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function ExhaustComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.position = { x: 0, y: 0 };
            this.velocity = { x: 0, y: 0 };
            this.nparticles = config.pipes;
            this.rotation = 0;
            this.timer = new Date().getTime();
            this.registerMessage('accel');
            this.registerMessage('speed');
            this.registerMessage('rotate');
            this.registerMessage('move');
        }

        ExhaustComponent.prototype = new Component();

        ExhaustComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'speed') {
                this.velocity = message.data;
            } else if (message.subject == 'rotate') {
                this.rotation = message.data;
            } else if (message.subject == 'move') {
                this.position = message.data;
            } else if (message.subject == 'accel' && message.data.trigger == 'control') {
                var direction = vectorInvert(vectorNormalize(message.data));
                var angle = getAngleFromDirection(direction);
                if (new Date().getTime() - this.timer >= 10 / this.nparticles) {
                    this.timer = new Date().getTime();
                    this.messageDispatcher.sendMessage(new Message('create-particle', {
                        position: this.position,
                        angle: angle,
                        speed: vectorLength(this.velocity) + 100,
                        size: Math.random() * 5,
                        ownerVelocity: { x: 0, y: 0 },
                        lifetime: 0.5,
                        randomizeAngle: Math.PI / 4
                    }));
                }
            }
        }

        ExhaustComponent.getName = function () { return "exhaust"; }

        return ExhaustComponent;
    });