define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        var asteroids = ["asteroid_small", "asteroid_medium", "asteroid_large"];
        function AsteroidSizeComponent() {
        }

        AsteroidSizeComponent.prototype = new Component();
        AsteroidSizeComponent.prototype.constructor = AsteroidSizeComponent;

        AsteroidSizeComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.size = config.size;
            this.health = this.size * 400;
            this.registerMessage('kill');
            this.registerMessage('position');
            this.registerMessage('collide');
        }

        AsteroidSizeComponent.prototype.initialize = function () {
        }

        AsteroidSizeComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'kill') {
                if ((message.data == null || message.data.mode != 'final') && this.size > 1) {
                    var velocity = createVector();
                    for (var i = 0; i < 2; i++) {
                        getDirectionFromAngle(Math.random() * 2 * Math.PI, velocity);
                        vectorScale(velocity, 200, velocity);
                        var size = this.size - 1 - 1;
                        
                        this.messageDispatcher.sendMessage(Message.pnew('spawn', { type: asteroids[size], config: { position: this.position, velocity: velocity } }, this));
                    }
                    releaseVector(velocity)
                }
            } else if (message.subject == 'position') {
                this.position = message.data;
            } else if (message.subject == 'collide') {
                if (message.data.other.type == 'bullet')
                    this.health -= 100;
            }
        }

        AsteroidSizeComponent.prototype.update = function (frameTime) {
            if (this.health <= 0) {
                this.sendMessage(Message.pnew('kill', null, this));
            }
        }

        AsteroidSizeComponent.prototype.cleanup = function () {
            this.position = null;
            Component.prototype.cleanup.call(this);
        }

        AsteroidSizeComponent.getName = function () { return "asteroidsize"; }

        AsteroidSizeComponent.setupPool(10);

        return AsteroidSizeComponent;
    });