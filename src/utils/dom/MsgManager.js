/**
 * 用于管理$message, $notify
 */
class MsgManager {
    constructor(position) {
        this.elList = [];
        this.offset = 10;
        this.base = 7;
        this.position = position;
    }

    /**
     * 新增元素(vm实例) 需要等元素show之后才能调用，因为他要改变内部样式
     * @param el {Vue}
     * @param offset {number}
     */
    push(el, offset) {
        this.elList.push(el);
        this.offset = offset
        if (this.position === 'top') {
            el.$refs.inner.style.top = this.calc(this.elList.length - 1);

        } else if (this.position === 'bottom') {
            el.$refs.inner.style.top = null;
            el.$refs.inner.style.bottom = this.calc(this.elList.length - 1);

        }
    }

    /**
     * 删除元素(vm实例)
     * @param el {Vue}
     */
    delete(el) {
        const index = this.elList.indexOf(el);
        this.elList.splice(index, 1);
        for (let i = index; i < this.elList.length; i++) {
            if (this.position === 'top') {
                this.elList[i].$refs.inner.style.top = this.calc(i);

            } else if (this.position === 'bottom') {
                this.elList[i].$refs.inner.style.bottom = this.calc(i);

            }
        }
    }

    /**
     * 计算前n个元素top
     * @param n {number}
     * @return {string}
     */
    calc(n) {
        let res = 0;
        for (let i = 0; i < n; i++) {
            res += this.elList[i].$refs.inner.offsetHeight;
        }

        return `${this.offset + res + this.base * n}px`
    }

}

const topNotifyManager = new MsgManager('top');
const bottomNotifyManager = new MsgManager('bottom');
const messageManager = new MsgManager('top');

export {topNotifyManager, bottomNotifyManager,messageManager }