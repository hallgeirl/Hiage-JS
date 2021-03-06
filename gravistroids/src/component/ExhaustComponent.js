﻿define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function ExhaustComponent() {
        }

        ExhaustComponent.prototype = new Component();
        ExhaustComponent.prototype.constructor = ExhaustComponent;

        ExhaustComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.nparticles = config.pipes;
            this.rotation = { value: 0 };
            this.timer = new Date().getTime();
            this.registerMessage('control');
            this.registerMessage('rotation');
            this.registerMessage('position');
            this.registerMessage('acceleration');
            this.acceleration = [0, 0];
        }

        ExhaustComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'rotation') {
                this.rotation = message.data;
            } else if (message.subject == 'position') {
                this.position = message.data;
            } else if (message.subject == 'control' && (message.data.button == 'up' || message.data.button == 'down' || message.data.button == 'left' || message.data.button == 'right')) {
                var direction = vectorInvert(vectorNormalize(this.acceleration));
                var angle = getAngleFromDirection(direction);
                var exhaustPosition = createVector()
                getDirectionFromAngle(this.rotation.value, exhaustPosition);
                vectorScale(exhaustPosition, -20, exhaustPosition)
                vectorAdd(this.position, exhaustPosition, exhaustPosition)
                if (new Date().getTime() - this.timer >= 10 / this.nparticles) {
                    for (var i = 0; i < this.nparticles; i++) {
                        this.timer = new Date().getTime();
                        var red = Math.random();
                        this.sendMessage(Message.pnew('create-particle', {
                            type: "exhaust-particle",
                            position: exhaustPosition,
                            angle: angle,
                            speed: 200,
                            scale: Math.random() * 0.5,
                            ownerVelocity: [0, 0],
                            lifetime: 0.5,
                            randomizeAngle: Math.PI / 4
                        }));
                    }
                }
                releaseVector(exhaustPosition);
            } else if (message.subject == 'acceleration') {
                this.acceleration = message.data;
            }

        }

        ExhaustComponent.prototype.cleanup = function () {
            this.position = null;
            this.acceleration = null;
            Component.prototype.cleanup.call(this);
        }


        ExhaustComponent.getName = function () { return "exhaust"; }

        ExhaustComponent.setupPool(10);

        return ExhaustComponent;
    });