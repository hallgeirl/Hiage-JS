define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function GravityComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.gravity = config.magnitude;
            this.registerMessage('acceleration');
            this.acceleration = [0, 0];
        }

        GravityComponent.prototype = new Component();
        GravityComponent.prototype.update = function (frameTime) {
            this.acceleration[1] -= this.gravity;
        }

        GravityComponent.prototype.receiveMessage = function (message) {
            this.acceleration = message.data;
        }

        GravityComponent.prototype.cleanup = function () {
            this.acceleration = null;
            Component.prototype.cleanup.call(this);
        }

        GravityComponent.getName = function () { return "gravity"; }

        return GravityComponent;
    });