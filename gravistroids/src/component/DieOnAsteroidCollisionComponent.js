define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function DieOnAsteroidCollisionComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.registerMessage('collide');
        }

        DieOnAsteroidCollisionComponent.prototype = new Component();

        DieOnAsteroidCollisionComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'collide' && message.data.other.type == 'asteroid') {
                this.sendMessage(new Message('kill', null, this));
            }
        }

        DieOnAsteroidCollisionComponent.getName = function () { return "dieonasteroidcollision"; }

        return DieOnAsteroidCollisionComponent;
    });