define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function SpriteComponent() {
            if (!this.spriteState) {
                this.spriteState = {
                    name: "",
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
            }
            this.spriteState.position = [0, 0];
            this.spriteState.color = [1, 1, 1, 1];
        }

        SpriteComponent.prototype = new Component();
        SpriteComponent.prototype.constructor = SpriteComponent;

        SpriteComponent.prototype.configure = function (config, messageDispatcher, resourceManager) {
            Component.prototype.configure.call(this, config, messageDispatcher, resourceManager)

            this.resourceManager = resourceManager;

            this.spriteState.name = config.sprite
            this.spriteState.animation = ""
            this.spriteState.frameTimer = 0
            this.spriteState.frame = 0
            this.spriteState.rotation.value = 0
            this.spriteState.position[0] = this.spriteState.position[1] = 0
            this.spriteState.scale = 1
            this.spriteState.color[0] = this.spriteState.color[1] = this.spriteState.color[2] = this.spriteState.color[3] = 1
            this.spriteState.layer = 0
            this.spriteState.sprite = null
            this.spriteState.alive = true
            this.spriteState.rotationOffset = 0

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
            this.sendMessage(Message.pnew("register-sprite", this.spriteState), null);
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

        SpriteComponent.setupPool(500);

        return SpriteComponent;
    });