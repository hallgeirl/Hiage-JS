define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function DieOnAsteroidCollisionComponent() {
        }

        DieOnAsteroidCollisionComponent.prototype = new Component();
        DieOnAsteroidCollisionComponent.prototype.constructor = DieOnAsteroidCollisionComponent;

        DieOnAsteroidCollisionComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.registerMessage('collide');
        }

        DieOnAsteroidCollisionComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'collide' && isAsteroidCollision(message.data.other.type)) {
                this.sendMessage(Message.pnew('kill', null, this));
            }
        }

        DieOnAsteroidCollisionComponent.getName = function () { return "dieonasteroidcollision"; }

        DieOnAsteroidCollisionComponent.setupPool(100);

        function isAsteroidCollision(otherType) {
            var asteroids = ['asteroid_small', 'asteroid_medium', 'asteroid_large']

            for (var i = 0; i < asteroids.length; i++)
            {
                if (asteroids[i] == otherType)
                    return true;
            }

            return false;
        }

        return DieOnAsteroidCollisionComponent;
    });