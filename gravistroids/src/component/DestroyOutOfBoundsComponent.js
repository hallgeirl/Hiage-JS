define(["hiage.js/core/Message", "hiage.js/component/Component", "Stage"],
    function (Message, Component, Stage) {
        function DestroyOutOfBoundsComponent() {
        }

        DestroyOutOfBoundsComponent.prototype = new Component();
        DestroyOutOfBoundsComponent.prototype.constructor = DestroyOutOfBoundsComponent;

        DestroyOutOfBoundsComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.registerMessage('position');
        }

        DestroyOutOfBoundsComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'position') {
                this.position = message.data;
            }
        }

        DestroyOutOfBoundsComponent.prototype.update = function (frameTime) {
            if (this.position[0] < -200 || this.position[0] > Stage.stageWidth + 200 ||
                this.position[1] < -200 || this.position[1] > Stage.stageHeight + 200) {
                this.sendMessage(Message.pnew('kill', { mode: 'final' }, this));
            }

        }

        DestroyOutOfBoundsComponent.prototype.cleanup = function () {
            this.position = null;
            Component.prototype.cleanup.call(this);
        }

        DestroyOutOfBoundsComponent.getName = function () { return "destroyoutofbounds"; }

        DestroyOutOfBoundsComponent.setupPool(500);

        return DestroyOutOfBoundsComponent;
    });