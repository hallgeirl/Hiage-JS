define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function LifetimeComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
        }

        LifetimeComponent.prototype = new Component();

        LifetimeComponent.prototype.configure = function (config) {
            Component.prototype.configure.call(this, config);
            this.lifetime = config.lifetime;
        }

        LifetimeComponent.prototype.initialize = function () {
            this.sendMessage(new Message("lifetime", this.lifetime, this));
        }

        LifetimeComponent.prototype.update = function (frameTime) {
            this.lifetime -= frameTime;
            if (this.lifetime <= 0) {
                this.sendMessage(new Message('kill', null, this));
            }
        }

        LifetimeComponent.getName = function () { return "lifetime"; }

        return LifetimeComponent;
    });