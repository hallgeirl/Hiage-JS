define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function ParticleColorComponent() {
        }

        ParticleColorComponent.prototype = new Component();
        ParticleColorComponent.prototype.constructor = ParticleColorComponent;

        ParticleColorComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.level = 1;
            this.experience = 0;
            this.registerMessage('lifetime');
            this.initial = config.initialColor;
            this.target = config.targetColor;
            this.step = [0, 0, 0, 0];
            this.lifetime = 1;
            this.color = [0, 0, 0, 0];
        }

        ParticleColorComponent.prototype.receiveMessage = function(message) { 
            for (var i = 0; i < 4; i++)
                this.step[i] = (this.target[i] - this.initial[i]) / message.data;

            this.sendMessage(Message.pnew("set-color", this.initial));
        }

        ParticleColorComponent.prototype.update = function (frameTime) {
            for (var i = 0; i < 4; i++)
                this.initial[i] += this.step[i]*frameTime
        }

        ParticleColorComponent.getName = function () { return "particlecolor"; }

        ParticleColorComponent.setupPool(500);

        return ParticleColorComponent;
    });