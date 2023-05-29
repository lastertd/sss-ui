
import sssButton from "./src/sss-button";

sssButton.install = function (Vue){
    Vue.component(sssButton.name, sssButton);
}

export default sssButton;