import sssPopper from "./src/sss-popper";

const install = function (Vue){
    Vue.component(sssPopper.name, sssPopper);
}

export default sssPopper;