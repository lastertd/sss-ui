import sssTag from "./src/sss-tag";

const install = function (Vue){
    Vue.component(sssTag.name, sssTag);
}

export default sssTag;