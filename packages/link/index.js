import sssLink from "./src/sss-link";

const install = function (Vue) {
    Vue.component(sssLink.name, sssLink);
}

export default sssLink;