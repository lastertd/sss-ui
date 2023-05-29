class ScrollManager {
    constructor() {
        this.count = 0;
    }

    /**
     * 依据count来确定是否要禁用页面滚动
     */
    solve() {
        if (this.count === 0) {
            document.body.style.overflowY = "auto"
        } else {
            document.body.style.overflowY = "hidden"
        }
    }

    decrease() {
        this.count = this.count === 0 ? 0 : this.count - 1;
        this.solve();
    }

    increase() {
        this.count++;
        this.solve();

    }

    clear() {
        this.count = 0;
        this.solve();
    }

}


export default new ScrollManager();