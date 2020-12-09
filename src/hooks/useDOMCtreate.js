import { onUnmounted } from 'vue';
function useDOMCreate(nodeId) {
    var node = document.createElement('div');
    node.id = nodeId;
    document.body.appendChild(node);
    onUnmounted(function () {
        document.body.removeChild(node);
    });
}
export default useDOMCreate;
//# sourceMappingURL=useDOMCtreate.js.map