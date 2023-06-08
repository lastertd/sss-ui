import "./style/animation.css"
import "./style/icon/iconfont.css"

import PopupManager from "./utils/dom/PopupManager";
import $notify from "../packages/messageBox/src/$notify";
import $message from "../packages/messageBox/src/$message";
import $confirm from "../packages/messageBox/src/$confirm";


import button from "../packages/button/index.js";
import input from "../packages/input";
import textarea from "../packages/textarea";
import tag from "../packages/tag";
import switch_ from "../packages/switch";
import divider from "../packages/divider";
import radio from "../packages/radio";
import link from "../packages/link";
import image from "../packages/image";
import count from "../packages/count";
import toolTip from "../packages/tool-tip";
import popconfirm from "../packages/popconfirm";
import row from "../packages/row"
import popper from "../packages/popper";
import messageBox from "../packages/messageBox";



const components = [
    button,
    input,
    textarea,
    tag,
    switch_,
    divider,
    radio,
    link,
    image,
    count,
    toolTip,
    popconfirm,
    row,
    popper,
    messageBox,

]

let popupManager;

const install = function (Vue, options = {}){

    components.forEach(component => {
        Vue.component(component.name, component);
    })


    const {zindex} = options
    console.log(zindex)
    if (zindex) popupManager = new  PopupManager(zindex);

    Vue.prototype.$notify = $notify;
    Vue.prototype.$message = $message;
    Vue.prototype.$confirm = $confirm;

}

if (!popupManager) popupManager = new PopupManager();


/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
    popupManager,

    button,
    input,
    textarea,
    tag,
    switch_,
    divider,
    radio,
    link,
    image,
    count,
    toolTip,
    popconfirm,
    row,
    popper,
    messageBox,
}

export default {
    install,
}
