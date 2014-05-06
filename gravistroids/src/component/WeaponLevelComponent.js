define(["hiage.js/core/Message", "hiage.js/component/Component"],
    function (Message, Component) {
        function WeaponLevelComponent() {
        }

        WeaponLevelComponent.prototype = new Component();
        WeaponLevelComponent.prototype.constructor = WeaponLevelComponent;

        WeaponLevelComponent.prototype.configure = function (config, messageDispatcher) {
            Component.prototype.configure.call(this, config, messageDispatcher);
            this.level = 1;
            this.experience = 0;
            this.registerMessage('score', null);
            this.updateExperienceAndLevel();
        }

        WeaponLevelComponent.prototype.receiveMessage = function (message) {
            if (message.subject == 'score') {
                this.experience += message.data;
                this.updateExperienceAndLevel();
            }
        }

        WeaponLevelComponent.prototype.updateExperienceAndLevel = function () {
            if (this.experience >= this.targetExperience) {
                this.experience -= this.targetExperience;
                this.level++;
                this.sendMessage(Message.pnew('set-weapon-level', this.level));
            }
            this.targetExperience = 1000 * Math.pow(2, this.level - 1);
            this.sendMessage(Message.pnew('experience', { currentXP: this.experience, targetXP: this.targetExperience }));
        }

        WeaponLevelComponent.getName = function () { return "weaponlevel"; }

        WeaponLevelComponent.setupPool(10);

        return WeaponLevelComponent;
    });