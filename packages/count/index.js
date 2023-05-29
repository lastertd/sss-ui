import sssCount from "./src/sss-count";

const  install = function (Vue) {
    Vue.component(sssCount.name, sssCount);
}

export default sssCount;