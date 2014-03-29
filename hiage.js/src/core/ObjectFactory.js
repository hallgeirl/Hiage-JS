define(["hiage.js/core/GameObject",
        "hiage.js/component/ComponentFactory",
        "hiage.js/Shapes",
        "hiage.js/core/Message",
        "hiage.js/Util"],
    function (GameObject, ComponentFactory, shapes, Message) {

        function ObjectFactory(resourceManager, messageDispatcher) {
            this.messageDispatcher = messageDispatcher;
            this.resourceManager = resourceManager;
            this.shapeMap = {}
            this.shapeMap['wedge'] = shapes["Wedge"];
            this.shapeMap['regularpolygon'] = shapes["RegularPolygon"];
            this.shapeMap['circle'] = shapes["Circle"];
        }

        ObjectFactory.prototype.createObject = function (type, config) {
            var template = this.resourceManager.getResource("object", type);

            var go = new GameObject(this.messageDispatcher);
            go.type = type;
            config.messageTag = go.id;

            for (var i = 0; i < template.components.length; i++)
                go.addComponent(this.createComponent(template.components[i], config));

            go.initialize();

            return go;
        }

        ObjectFactory.prototype.createComponent = function (template, config) {
            var finalTemplate = ObjectFactory.getFinalComponentConfig(template, config);

            finalTemplate['shapemap'] = this.shapeMap;
            var component = ComponentFactory.createComponent(template.type, finalTemplate, this.messageDispatcher);
            component.type = template.type;

            return component;
        }

        ObjectFactory.getFinalComponentConfig = function (template, config) {
            var finalObject = clone(template);
            for (var prop in config) {
                finalObject[prop] = clone(config[prop]);
            }
            for (var prop in finalObject) {
                if (typeof (finalObject[prop]) == 'string' && finalObject[prop][0] == '$')
                    eval('finalObject[prop] = ' + finalObject[prop].substring(1));
            }

            return finalObject;
        }

        ObjectFactory.prototype.createParticle = function (config) {
            var angle = config.angle;
            var randomizeAngle = config.randomizeAngle;
            var speed = config.speed;
            angle = angle + Math.random() * randomizeAngle - randomizeAngle / 2;
            var velocity = vectorScale(getDirectionFromAngle(angle), speed);
            if (config.ownerVelocity)
                velocity = vectorAdd(velocity, config.ownerVelocity);
            config.velocity = velocity;

            this.messageDispatcher.sendMessage(new Message('spawn', { type: 'particle', config: config }));
        }
        return ObjectFactory;
    });