define([],
    function () {
        function Component(config, messageDispatcher) {
            if (!config) {
                return;
            }

            this.messageDispatcher = messageDispatcher;
        }

        Component.prototype.configure = function (config, object) {
            this.messageTag = config.messageTag;
            this.messageHandlers = [];
        }
        Component.prototype.initialize = function () { }

        Component.prototype.receiveMessage = function (message) { }

        Component.prototype.update = function (frameTime) { }

        Component.prototype.registerMessage = function (subject, tag) {
            if (typeof (tag) == 'undefined')
                tag = this.messageTag;

            this.messageDispatcher.registerHandler(subject, this, tag);
            this.messageHandlers.push({ subject: subject, tag: tag });
        }

        Component.prototype.sendMessage = function (message, tag) {
            if (typeof (tag) == 'undefined')
                tag = this.messageTag;

            this.messageDispatcher.sendMessage(message, tag);
        }

        Component.prototype.cleanup = function () {
            for (var i = 0; i < this.messageHandlers.length; i++) {
                this.messageDispatcher.deregisterHandler(this.messageHandlers[i].subject, this, this.messageHandlers[i].tag);
            }
            this.messageDispatcher = null;
            this.owner = null;
        }

        return Component;
    });