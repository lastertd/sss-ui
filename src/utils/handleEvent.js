export default {
    on(element, event, handler) {
        if (element && event && handler) {
            document.addEventListener ? element.addEventListener(event, handler, false) : element.attachEvent('on' + event, handler);
        }
    },

    off(element, event, handler) {
        if (element && event) {
            document.removeEventListener ? element.removeEventListener(event, handler, false) : element.detachEvent('on' + event, handler)
        }
    }
}