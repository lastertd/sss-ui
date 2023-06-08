import Vue from "vue";
import messageBox from "../index";
import {topNotifyManager,bottomNotifyManager} from "../../../src/utils/dom/MsgManager";

/**
 *
 * @param title {string}
 * @param content {string}
 * @param offset {number}
 * @param type {string}
 * @param position {string}
 * @param timeout {number}
 */
const notify= function({
              title = '',
              content = '',
              offset = 10,
              type,
              position = 'top',
              timeout = 4000
          } = {}) {

    //创建并添加元素
    const MsgBox = Vue.extend(messageBox);
    const vm = new MsgBox({
        propsData: {
            title: title,
            content: content,
            showFooter: false,
            transition: "sss-transition-msg",
            type: type

        },
    });
    const div = document.createElement('div');
    document.body.appendChild(div);


    //挂载元素并交由manager管理
    vm.$nextTick(() => {
        vm.$mount(div);
        vm.show();
        vm.$nextTick(() => {
            vm.$refs.inner.style.borderRadius = '7px';
            vm.$refs.inner.classList.add("sss-msg-box__right");
            if (position === 'top') {
                topNotifyManager.push(vm, offset);
            } else if (position === 'bottom') {
                bottomNotifyManager.push(vm, offset);

            }
        })
        setTimeout(() => {
            vm.hide();
        }, timeout)
    })

    //指定回调函数
    vm.$on("close", () => {
        if (position === 'top') {
            topNotifyManager.delete(vm);
        } else if (position === 'bottom') {
            bottomNotifyManager.delete(vm);
        }
        setTimeout(() => {
            vm.$destroy();
            document.body.removeChild(vm.$el);
        }, 250)

    })


}


export default notify;