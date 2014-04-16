define(["hiage.js/core/Message", "hiage.js/component/Component", "Stage"],
    function (Message, Component, Stage) {
        function DestroyOutOfBoundsComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.position = [0,0]
            this.registerMessage('position');
        }

        DestroyOutOfBoundsComponent.prototype = new Component();
        DestroyOutOfBoundsComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'position') {
                this.position = message.data;
            }
        }

        DestroyOutOfBoundsComponent.prototype.update = function (frameTime) {
            if (this.position[0] < -200 || this.position[0] > Stage.stageWidth + 200 ||
                this.position[1] < -200 || this.position[1] > Stage.stageHeight + 200) {
                this.sendMessage(new Message('kill', { mode: 'final' }, this));
            }

        }

        DestroyOutOfBoundsComponent.prototype.cleanup = function () {
            this.position = null;
            Component.prototype.cleanup.call(this);
        }

        DestroyOutOfBoundsComponent.getName = function () { return "destroyoutofbounds"; }

        return DestroyOutOfBoundsComponent;
    });