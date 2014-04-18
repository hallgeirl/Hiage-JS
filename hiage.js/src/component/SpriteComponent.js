define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function SpriteComponent(config, messageDispatcher, resourceManager) {
            Component.call(this, config, messageDispatcher);

            this.resourceManager = resourceManager;
        }

        SpriteComponent.prototype = new Component();

        SpriteComponent.prototype.configure = function (config) {
            Component.prototype.configure.call(this, config)

            this.spriteState = {
                name: config.sprite,
                animation: "",
                frameTimer: 0,
                frame: 0,
                rotation: { value: 0 },
                position: [0, 0],
                scale: 1,
                color: [1, 1, 1, 1],
                layer: 0,
                sprite: null,
                alive: true,
                rotationOffset: 0
            }

            if (config.layer)
                this.spriteState.layer = config.layer

            if (config.scale)
                this.spriteState.scale = config.scale;

            if (config.color)
                this.spriteState.color = config.color;

            if (config.rotation)
                this.spriteState.rotationOffset = config.rotation;

            this.registerMessage('position');
            this.registerMessage('rotation');
            this.registerMessage('set-color');
        }

        SpriteComponent.prototype.initialize = function () {
            this.spriteState.sprite = this.resourceManager.getResource("sprite", this.spriteState.name)
            this.spriteState.animation = this.spriteState.sprite.defaults.animation
            this.sendMessage(new Message("register-sprite", this.spriteState), null);
        }

        SpriteComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'position')
                this.spriteState.position = message.data;
            else if (message.subject == 'rotation')
                this.spriteState.rotation = message.data;
            else if (message.subject == "set-color")
                this.spriteState.color = message.data;
            else if (message.subject == 'kill')
                this.spriteState.alive = false;
        }

        SpriteComponent.prototype.update = function (frametime) {
        }

        SpriteComponent.prototype.cleanup = function () {
            this.spriteState.alive = false;
            this.spriteState.position = null;
            this.spriteState.color = null;
            Component.prototype.cleanup.call(this);
        }

        SpriteComponent.getName = function () { return "sprite"; }

        return SpriteComponent;
    });