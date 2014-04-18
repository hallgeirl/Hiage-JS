define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function DieOnAsteroidCollisionComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
        }

        DieOnAsteroidCollisionComponent.prototype = new Component();

        DieOnAsteroidCollisionComponent.prototype.configure = function (config) {
            Component.prototype.configure.call(this, config);
            this.registerMessage('collide');
        }

        DieOnAsteroidCollisionComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'collide' && isAsteroidCollision(message.data.other.type)) {
                this.sendMessage(new Message('kill', null, this));
            }
        }

        DieOnAsteroidCollisionComponent.getName = function () { return "dieonasteroidcollision"; }

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