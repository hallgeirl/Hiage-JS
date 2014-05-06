define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function LifetimeComponent() {
        }

        LifetimeComponent.prototype = new Component();
        LifetimeComponent.prototype.constructor = LifetimeComponent;

        LifetimeComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.lifetime = config.lifetime;
        }

        LifetimeComponent.prototype.initialize = function () {
            this.sendMessage(Message.pnew("lifetime", this.lifetime, this));
        }

        LifetimeComponent.prototype.update = function (frameTime) {
            this.lifetime -= frameTime;
            if (this.lifetime <= 0) {
                this.sendMessage(Message.pnew('kill', null, this));
            }
        }

        LifetimeComponent.getName = function () { return "lifetime"; }

        LifetimeComponent.setupPool(500);

        return LifetimeComponent;
    });