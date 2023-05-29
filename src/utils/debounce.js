/**
 * 为函数添加防抖
 * @param cb {function} - 回调函数
 * @param ctx {content} - 上下文
 * @param timeout {number} - 延时
 * @return {(function(...[*]): void)|*}
 * @private
 */
function debounce(cb, ctx, timeout) {
    let timer;
    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            cb.call(ctx, ...args);
        }, timeout)
    }
}

export default debounce;