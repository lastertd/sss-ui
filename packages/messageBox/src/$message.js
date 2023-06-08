import Vue from "vue";
import messageBox from "../index";
import {messageManager} from "../../../src/utils/dom/MsgManager";

const $message = function ({
                               text = 'default text',
                               offset = 10,
                               type,
                               timeout = 4000
                           } = {}) {

    //创建元素
    const MsgBox = Vue.extend(messageBox);
    const vm = new MsgBox({
        propsData: {
            showHeader: false,
            showFooter: false,
            content: text,
            transition: "sss-transition-msg-fadeDown",
            type: type

        },
    });
    const div = document.createElement('div');
    document.body.appendChild(div);


    //挂载元素
    vm.$nextTick(() => {
        vm.$mount(div);
        vm.show();
        vm.$nextTick(() => {
            vm.$refs.inner.classList.add('sss-msg-box__content-center')
            messageManager.push(vm, offset);
        })
        setTimeout(() => {
            vm.hide();
        }, timeout)
    })

    //指定回调
    vm.$on("close", () => {
        messageManager.delete(vm);
        setTimeout(() => {
            vm.$destroy();
            document.body.removeChild(vm.$el);
        }, 250)

    })


}

export default $message