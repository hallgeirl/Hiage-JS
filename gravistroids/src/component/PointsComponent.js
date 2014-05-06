define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function PointsComponent() {
        }

        PointsComponent.prototype = new Component();
        PointsComponent.prototype.constructor = PointsComponent;

        PointsComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.points = config.points;
            this.registerMessage('kill');
        }

        PointsComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'kill' && (!message.data || message.data.mode == null || message.data.mode != 'final'))
                this.sendMessage(Message.pnew('score', this.points, this));
        }

        PointsComponent.getName = function () { return "points"; }

        PointsComponent.setupPool(10);

        return PointsComponent;
    });