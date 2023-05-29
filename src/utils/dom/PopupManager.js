

class PopupManager {
    constructor(deauflt = 2000) {
        this.zIndex = deauflt;
    }
    nextZindex(){
        const res = this.zIndex;
        this.zIndex += 1;
        return res;
    }
}

export default PopupManager;