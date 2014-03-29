define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function SpatialComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.position = config.position;
            this.velocity = config.velocity;
            this.registerMessage("accel", this.messageTag);
        }

        SpatialComponent.prototype = new Component();
        SpatialComponent.prototype.update = function (frameTime) {
            this.position.x += this.velocity.x * frameTime;
            this.position.y += this.velocity.y * frameTime;

            this.sendMessage(new Message('move', { x: this.position.x, y: this.position.y }, this));
            this.sendMessage(new Message('speed', { x: this.velocity.x, y: this.velocity.y }, this));
        }

        SpatialComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'accel') {
                this.velocity.x += message.data.x;
                this.velocity.y += message.data.y;
            }
        }

        SpatialComponent.getName = function () { return "spatial"; }

        return SpatialComponent;
    });