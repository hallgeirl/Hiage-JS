define(["hiage.js/Util"],
    function () {
        function Message(subject, data, sender) {
            this.subject = subject;
            this.data = data;
            this.sender = sender;
        }

        Message.setupPool(500);
        return Message;
    });