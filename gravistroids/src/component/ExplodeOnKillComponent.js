define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function ExplodeOnKillComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
        }

        ExplodeOnKillComponent.prototype = new Component();

        ExplodeOnKillComponent.prototype.configure = function (config) {
            Component.prototype.configure.call(this, config);
            this.particleSize = config.particlesize;
            this.particleCount = config.particlecount;
            this.particleLifetime = config.particleLifetime;
            if (!this.particleLifetime)
                this.particleLifetime = 1;

            this.particleSpeed = 500;
            if (config.particleSpeed)
                this.particleSpeed = config.particleSpeed;
            this.sound = config.sound;
            this.registerMessage('kill');
            this.registerMessage('position');
        }

        ExplodeOnKillComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'kill' && (message.data == null || message.data.mode != 'final')) {
                for (var i = 0; i < this.particleCount; i++) {
                    this.messageDispatcher.sendMessage(new Message('create-particle', {
                        type: "ricochet-particle",
                        position: this.position,
                        angle: 0,
                        speed: this.particleSpeed * (Math.random() + 0.5),
                        scale: Math.random() * this.particleSize,
                        lifetime: this.particleLifetime,
                        randomizeAngle: Math.PI * 2
                    }));
                }
                if (this.sound)
                    this.messageDispatcher.sendMessage(new Message('play-sound', this.sound));
            } else if (message.subject == 'position') {
                this.position = message.data;
            }
        }

        ExplodeOnKillComponent.prototype.cleanup = function () {
            this.position = null;
            Component.prototype.cleanup.call(this);
        }

        ExplodeOnKillComponent.getName = function () { return "explodeonkill"; }

        return ExplodeOnKillComponent;
    });