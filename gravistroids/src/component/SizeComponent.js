define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function SizeComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.size = config.size;
        }

        SizeComponent.prototype = new Component();
        SizeComponent.prototype.initialize = function () {
            this.sendMessage(new Message('size', this.size, this));
        }

        SizeComponent.getName = function () { return "size"; }

        return SizeComponent;
    });