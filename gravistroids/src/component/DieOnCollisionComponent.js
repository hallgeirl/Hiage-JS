define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function DieOnCollisionComponent() {
        }

        DieOnCollisionComponent.prototype = new Component();
        DieOnCollisionComponent.prototype.constructor = DieOnCollisionComponent;

        DieOnCollisionComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.registerMessage('collide');
        }

        DieOnCollisionComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'collide' && this.owner.type != message.data.other.type && this.owner.type == 'bullet') {
                this.sendMessage(Message.pnew('kill', null, this));
            }
        }

        DieOnCollisionComponent.getName = function () { return "dieoncollision"; }

        DieOnCollisionComponent.setupPool(100);

        return DieOnCollisionComponent;
    });