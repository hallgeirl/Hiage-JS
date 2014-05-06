define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function CollisionComponent() {
        }

        CollisionComponent.prototype = new Component();
        CollisionComponent.prototype.constructor = CollisionComponent;

        CollisionComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.registerMessage('position');
            this.registerMessage('kill');
            this.collisionBox = {
                position: [0, 0],
                radius: config.radius
            }
        }

        CollisionComponent.prototype.initialize = function () {
            this.messageDispatcher.sendMessage(Message.pnew('register-collision-target', { collisionBox: this.collisionBox, object: this.owner }));
        }

        CollisionComponent.prototype.receiveMessage = function (message) {
            if (message.subject == "position")
                this.collisionBox.position = message.data;
            else if (message.subject == 'kill')
                this.messageDispatcher.sendMessage(Message.pnew('unregister-collision-target', this.owner));
        }

        CollisionComponent.prototype.cleanup = function () {
            this.collisionBox.position = null;
            Component.prototype.cleanup.call(this);
        }

        CollisionComponent.getName = function () { return "collision"; }

        CollisionComponent.setupPool(500);

        return CollisionComponent;
    });