define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function SpriteComponent(config, messageDispatcher, resourceManager) {
            Component.call(this, config, messageDispatcher);

            this.spriteState = {
                name: config.sprite,
                animation: "",
                frameTimer: 0,
                frame: 0,
                rotation: { value: 0 },
                position: [0, 0],
                scale: 1,
                color: [1, 1, 1, 1],
                layer: 0
            }

            if (config.layer)
                this.spriteState.layer = config.layer

            if (config.scale)
                this.spriteState.scale = config.scale;

            if (config.color)
                this.spriteState.color = config.color;

            this.resourceManager = resourceManager;

            this.rotationOffset = config.rotation;
            if (!this.rotationOffset)
                this.rotationOffset = 0;

            this.registerMessage('position');
            this.registerMessage('rotation');
            this.registerMessage('set-color');
        }

        SpriteComponent.prototype = new Component();
        SpriteComponent.prototype.initialize = function () {
            this.sprite = this.resourceManager.getResource("sprite", this.spriteState.name)
            this.spriteState.animation = this.sprite.defaults.animation
        }

        SpriteComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'position')
                this.spriteState.position = message.data;
            else if (message.subject == 'rotation')
                this.spriteState.rotation = message.data;
            else if (message.subject == "set-color")
                this.spriteState.color = message.data;
        }

        SpriteComponent.prototype.update = function (frametime) {
            var messagedata = {
                name: this.spriteState.name,
                position: this.spriteState.position,
                rotation: -this.spriteState.rotation.value + this.rotationOffset,
                scale: this.spriteState.scale,
                frame: this.spriteState.frame,
                animation: this.spriteState.animation,
                sprite: this.sprite,
                color: this.spriteState.color,
                layer: this.spriteState.layer
            }

            this.sendMessage(new Message('render-sprite', messagedata), null);
        }

        SpriteComponent.prototype.cleanup = function () {
            this.spriteState.position = null;
            this.spriteState.color = null;
            Component.prototype.cleanup.call(this);
        }

        SpriteComponent.getName = function () { return "sprite"; }

        return SpriteComponent;
    });