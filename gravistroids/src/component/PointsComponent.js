define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function PointsComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
        }

        PointsComponent.prototype = new Component();

        PointsComponent.prototype.configure = function (config) {
            Component.prototype.configure.call(this, config);
            this.points = config.points;
            this.registerMessage('kill');
        }

        PointsComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'kill' && (!message.data || message.data.mode == null || message.data.mode != 'final'))
                this.sendMessage(new Message('score', this.points, this));
        }

        PointsComponent.getName = function () { return "points"; }

        return PointsComponent;
    });