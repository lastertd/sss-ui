import sssMessageBox from "./src/sss-message-box";

const install = function (Vue) {
    Vue.component(sssMessageBox.name, sssMessageBox);
}

export default sssMessageBox;