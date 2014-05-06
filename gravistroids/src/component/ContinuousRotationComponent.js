define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function ContinuousRotationComponent() {
        }

        ContinuousRotationComponent.prototype = new Component();
        ContinuousRotationComponent.prototype.constructor = ContinuousRotationComponent;

        ContinuousRotationComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.direction = config.direction;
            if (!this.direction)
                this.direction = 1;
        }

        ContinuousRotationComponent.prototype.update = function (frameTime) {
            if (this.direction > 0)
                this.sendMessage(Message.pnew('rotate-right', { button: 'right' }, this));
            else
                this.sendMessage(Message.pnew('rotate-left', { button: 'left' }, this));
        }

        ContinuousRotationComponent.getName = function () { return "continuousrotation"; }

        ContinuousRotationComponent.setupPool(10);

        return ContinuousRotationComponent;
    });