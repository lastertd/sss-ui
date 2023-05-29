/**
 * 为函数添加节流
 * @param cb {function}
 * @param ctx {content}
 * @param timeout {number}
 * @return {(function(...[*]): void)|*}
 * @private
 */
function throttle(cb, ctx, timeout) {
    let staTime = 0;
    return function (...args) {
        const now = new Date();
        if (now - staTime > timeout) {
            staTime = now;
            cb.call(ctx, ...args)
        }
    }

}

export default throttle;