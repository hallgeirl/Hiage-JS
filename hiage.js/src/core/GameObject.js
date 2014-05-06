define([],
    function () {
        var objectCounter = 1;

        //game objects
        function GameObject() {
            if (!this.components) {
                this.id = objectCounter;
                objectCounter++;

                this.components = [];
            }
            //console.log("constr obj " + objectCounter)
        }

        GameObject.prototype.addComponent = function (component) {
            while (this.components.length <= this.componentCount)
                this.components.push(null)

            this.components[this.componentCount++] = component;
            component.owner = this;
        }

        GameObject.prototype.receiveMessage = function (message, sender) {
            if (message.subject == 'kill')
                this.alive = false;
        }


        GameObject.prototype.update = function (frameTime) {
            for (var i = 0; i < this.componentCount; i++) {
                this.components[i].update(frameTime);
            }
        }

        GameObject.prototype.configure = function (messageDispatcher) {
            this.messageDispatcher = messageDispatcher;
            this.alive = true;
            this.componentCount = 0;
            this.messageDispatcher.registerHandler('kill', this, this.id);
        }

        GameObject.prototype.initialize = function (messageDispatcher) {
            for (var i = 0; i < this.componentCount; i++) {
                this.components[i].initialize(this.messageDispatcher);
            }
        }

        GameObject.prototype.cleanup = function () {
            for (var i = 0; i < this.componentCount; i++) {
                if (this.components[i]) {
                    this.components[i].cleanup();
                    if (this.components[i].pdispose) {
                        this.components[i].pdispose();
                    }
                }

                this.components[i] = null;
            }
            this.messageDispatcher.deregisterHandler('kill', this, this.id);
        }

        GameObject.setupPool(500);

        return GameObject;
    });