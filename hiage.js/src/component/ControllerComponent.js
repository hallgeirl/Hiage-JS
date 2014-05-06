define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function ControllerComponent() {
            var that = this;
            if (!this.initialized) {
                window.addEventListener('keydown', function (evt) {
                    that.pressed[evt.keyCode] = true;
                });
                window.addEventListener('keyup', function (evt) {
                    that.pressed[evt.keyCode] = false;
                });
                window.addEventListener('mousedown', function (evt) {
                    if (evt.button == 0)
                        that.mouse.left = true;
                    else if (evt.button == 2)
                        that.mouse.right = true;
                });
                window.addEventListener('mouseup', function (evt) {
                    if (evt.button == 0)
                        that.mouse.left = false;
                    else if (evt.button == 2)
                        that.mouse.right = false;
                });
                window.addEventListener('touchstart', function (evt) {
                    that.mouse.left = true;
                });
                window.addEventListener('touchend', function (evt) {
                    that.mouse.left = false;
                });
                this.pressed = {};
                this.mouse = { left: false, right: false, position: [0, 0] };
                this.initialized = true;
            }
        }

        ControllerComponent.prototype = new Component();
        ControllerComponent.prototype.constructor = ControllerComponent;

        ControllerComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.registerMessage('mousemove', null);
        }

        ControllerComponent.prototype.update = function (frameTime) {
            if (this.mouse.left) {
                this.sendMessage(Message.pnew('control', { button: 'mouseleft', position: this.mouse.position }));
            }
            if (this.mouse.right) {
                this.sendMessage(Message.pnew('control', { button: 'mouseright', position: this.mouse.position }));
            }
            if (this.pressed[38]) {
                this.sendMessage(Message.pnew('control', { button: 'up' }, this));
            }
            if (this.pressed[40]) {
                this.sendMessage(Message.pnew('control', { button: 'down' }, this));
            }
            if (this.pressed[37]) {
                this.sendMessage(Message.pnew('control', { button: 'left' }, this));
            }
            if (this.pressed[39]) {
                this.sendMessage(Message.pnew('control', { button: 'right' }, this));
            }
            if (this.pressed[17]) {
                this.sendMessage(Message.pnew('control', { button: 'ctrl' }, this));
            }
        }
        ControllerComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'mousemove') {
                this.mouse.position = message.data;
            }
        }

        ControllerComponent.getName = function () { return "controller"; }

        ControllerComponent.setupPool(1);

        return ControllerComponent;
    });