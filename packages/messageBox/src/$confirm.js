import Vue from "vue";
import messageBox from "../index";


/**
 * 删除一个vm实例
 * @param vm {Vue}
 */
function mv(vm) {
    setTimeout(() => {
        vm.$destroy();
        document.body.removeChild(vm.$el);
    }, 250)
}


const $confirm = function ({
                               title = 'default text',
                               offset = '20vh',
                               type = 'info'
                           } = {}) {

    //创建元素
    const MsgBox = Vue.extend(messageBox);
    const vm = new MsgBox({
        propsData: {
            title,
            transition: "sss-transition-msg-fadeDown",
            type: type,
            showMark: true,
            forbiddenscroll: true,
            top: offset,


        },
    });
    const div = document.createElement('div');
    document.body.appendChild(div);

    //挂载元素
    vm.$nextTick(() => {
        vm.$mount(div);
        vm.show();
        vm.$nextTick(() => {
            vm.$refs.inner.classList.add('sss-msg-box__confirm')
        })
    })

    return new Promise((resolve,reject) => {
        //指定回调
        vm.$on("close", () => {
            mv(vm);
            reject('close')
        })

        vm.$on("cancel", () => {
            mv(vm);
            reject('cancel')
        })

        vm.$on("confirm", () => {
            mv(vm);
            resolve('confirm')
        })

    })


}

export default $confirm