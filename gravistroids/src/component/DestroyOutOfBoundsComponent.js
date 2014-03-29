define(["hiage.js/core/Message", "hiage.js/component/Component", "Stage"],
    function (Message, Component, Stage) {
        function DestroyOutOfBoundsComponent(config, messageDispatcher) {
            Component.call(this, config, messageDispatcher);
            this.position = { x: 0, y: 0 };
            this.registerMessage('move');
        }

        DestroyOutOfBoundsComponent.prototype = new Component();
        DestroyOutOfBoundsComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'move') {
                this.position = message.data;
            }
        }

        DestroyOutOfBoundsComponent.prototype.update = function (frameTime) {
            if (this.position.x < -200 || this.position.x > Stage.stageWidth + 200 ||
                this.position.y < -200 || this.position.y > Stage.stageHeight + 200) {
                this.sendMessage(new Message('kill', { mode: 'final' }, this));
            }

        }

        DestroyOutOfBoundsComponent.getName = function () { return "destroyoutofbounds"; }

        return DestroyOutOfBoundsComponent;
    });