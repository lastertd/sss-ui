/**
 * 判断vnode是否是组件节点
 * @param VNode {VNode}
 * @return {boolean}
 */
function isComponentNode(VNode){
    if (!VNode.tag) return false;
    return VNode.tag.startsWith('vue-component');
}

/**
 * 判断变量的类型
 * @param variable
 * @return {string}
 */
function whatIs(variable) {
    return Object.prototype.toString.call(variable).match(/\[object (\w+)]/)[1].toLowerCase();
}


export {isComponentNode, whatIs}