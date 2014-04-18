define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function GunComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
        }

        GunComponent.prototype = new Component();

        GunComponent.prototype.configure = function (config) {
            Component.prototype.configure.call(this, config);
            this.rotation = { value: 0 };
            this.fire = false;
            this.cooldownTimer = 0;
            this.sound = config.sound;
            this.registerMessage('position');
            this.registerMessage('rotation');
            this.registerMessage('control');
            this.registerMessage('set-weapon-level');
            this.levels = config.levels;
            this.setWeaponLevel(0);
        }

        GunComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'position') {
                this.position = message.data;
            } else if (message.subject == 'rotation') {
                this.rotation = message.data;
            } else if (message.subject == 'control' && (message.data.button == 'ctrl' || message.data.button == 'mouseleft')) {
                this.fire = true;
            } else if (message.subject == 'set-weapon-level') {
                this.setWeaponLevel(message.data - 1);
            }
        }

        GunComponent.prototype.setWeaponLevel = function (level) {
            if (level >= this.levels.length)
                level = this.levels.length - 1;

            this.cooldown = this.levels[level].cooldown;
            this.spread = this.levels[level].spread;
            this.barrels = this.levels[level].barrels;
        }

        GunComponent.prototype.update = function (frameTime) {
            this.cooldownTimer -= frameTime;

            if (this.fire && this.cooldownTimer <= 0) {
                var velocity = createVector();
                for (var i = 0; i < this.barrels; i++) {
                    var finalAngle = this.rotation.value + this.spread * Math.random() - this.spread / 2;
                    getDirectionFromAngle(finalAngle, velocity)
                    vectorScale(velocity, 800, velocity)
                    this.messageDispatcher.sendMessage(new Message('spawn', { type: 'bullet', config: { position: this.position, velocity: velocity, initial: finalAngle } }, this));
                }
                releaseVector(velocity);
                if (this.sound)
                    this.messageDispatcher.sendMessage(new Message('play-sound', this.sound));
                this.cooldownTimer = this.cooldown;
            }

            this.fire = false;
        }

        GunComponent.prototype.cleanup = function () {
            this.position = null;
            Component.prototype.cleanup.call(this);
        }

        GunComponent.getName = function () { return "gun"; }

        return GunComponent;
    });