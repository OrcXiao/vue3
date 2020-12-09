import { createApp } from 'vue';
import Message from './Message.vue';
var createMessage = function (message, type, timeout) {
    if (timeout === void 0) { timeout = 2000; }
    var messageInstance = createApp(Message, {
        message: message,
        type: type
    });
    var mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
    messageInstance.mount(mountNode);
    setTimeout(function () {
        messageInstance.unmount(mountNode);
        document.body.removeChild(mountNode);
    }, timeout);
};
export default createMessage;
//# sourceMappingURL=createMessage.js.map