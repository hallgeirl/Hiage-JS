define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function ParticleColorComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
        }

        ParticleColorComponent.prototype = new Component();

        ParticleColorComponent.prototype.configure = function (config) {
            Component.prototype.configure.call(this, config);
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

            this.sendMessage(new Message("set-color", this.initial));
        }

        ParticleColorComponent.prototype.update = function (frameTime) {
            for (var i = 0; i < 4; i++)
                this.initial[i] += this.step[i]*frameTime
        }

        ParticleColorComponent.getName = function () { return "particlecolor"; }

        return ParticleColorComponent;
    });