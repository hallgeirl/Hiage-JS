define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function CollisionComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.position = { x: 0, y: 0 };
            this.shape = null;
            this.registerMessage('shape');
            this.registerMessage('kill');
        }

        CollisionComponent.prototype = new Component();

        CollisionComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'shape') {
                this.shape = message.data;
                this.messageDispatcher.sendMessage(new Message('unregister-collision-target', this.owner));
                this.messageDispatcher.sendMessage(new Message('register-collision-target', { shape: this.shape, object: this.owner }));
            } else if (message.subject == 'kill') {
                this.messageDispatcher.sendMessage(new Message('unregister-collision-target', this.owner));
            }
        }

        CollisionComponent.getName = function () { return "collision"; }

        return CollisionComponent;
    });