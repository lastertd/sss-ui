<template>
    <div
        class="sss-msg-box"
        ref="outer"
        tabindex="0"
        @keydown.esc="esc()"

    >
        <transition name="sss-transition-fade">
            <div
                class="sss-msg-box-mark"
                ref="mark"
                @click="clickMark()"
                v-if="displayStatus && showMark"
            >

            </div>
        </transition>

        <transition :name="transition">
            <div
                class="sss-msg-box-inner test"

                v-bind="$attrs"
                v-on="$listeners"
                ref="inner"
                @click.stop
                v-if="displayStatus"
                :data-type="type"
            >
                <!--                头部-->
                <slot name="header" v-if="showHeader">
                    <div class="sss-msg-box-inner__header">
                        <div>
                            <span v-if="__checkType()" class="iconfont" :class="__getType()"></span>
                            <h3>{{ title }}</h3>
                        </div>
                        <span class="iconfont sss-close" @click="hide()"></span>
                    </div>
                </slot>

                <!--                内容-->
                <slot name="content">
                    <div class="sss-msg-box-inner__content">
                        {{ content }}
                    </div>

                </slot>


                <!--                尾部-->
                <slot name="footer" v-if="showFooter">
                    <div class="sss-msg-box-inner__footer">
                        <sss-button class="sss-msg-box-cancel-btn" style="font-size: 7px"
                                    :type="canclBtnType"
                                    @click.stop="handleCancel"
                        >{{ cancelBtnText }}
                        </sss-button>
                        <sss-button class="sss-msg-box-confirm-btn" style="font-size: 7px"
                                    :type="confirmBtnType"
                                    @click.stop="handleConfirm"

                        >{{ confirmBtnText }}
                        </sss-button>
                    </div>
                </slot>

            </div>
        </transition>
    </div>

</template>

<script>

import throttle from "../../../src/utils/throttle";
import scrollManager from "../../../src/utils/dom/ScrollManager";
import sssButton from "../../button/src/sss-button";
import {popupManager} from "../../../src/index";


export default {
    name: "sss-message-box",
    components: {sssButton},
    inheritAttrs: false,
    props: {
        showMark: Boolean,
        forbiddenScroll: Boolean,
        showHeader: {
            type: Boolean,
            default: true,
        },
        title: {    //标题
            type: String,
            default: "title"
        },
        content: String,

        showFooter: {
            type: Boolean,
            default: true
        },
        canclBtnType: {     //取消按钮 类型
            type: String,
            default: "default"
        },
        cancelBtnText: {   //取消按钮 文本
            type: String,
            default: "取消"
        },
        confirmBtnType: {   //确认按钮 类型
            type: String,
            default: "main",

        },
        confirmBtnText: {   //确认按钮 文本
            type: String,
            default: "确认"
        },


        top: {
            type: String,
            default: "30vh"
        },
        width: {
            type: String,
            default: '320px'
        },


        beforeClose: Function,
        closeByEsc: {
            type: Boolean,
            default: true
        },
        closeByClickMark: {
            type: Boolean,
            default: true
        },
        transition: {
            type: String,
            default: "sss-transition-msg-fadeDown"
        },
        type: String,
        appendToBody:{type:Boolean, default:true}
    },

    data() {
        return {
            displayStatus: false, //标志 展示
            isFirstRender: true
        }
    },
    methods: {
        /**
         * 检查传入的type属性是否合法，不合法不展示图标
         * @return {boolean}
         * @private
         */
        __checkType() {
            const arr = ['success', 'info', 'warn', 'error'];
            return arr.indexOf(this.type) !== -1;
        },
        /**
         * 用于$message_, 指定图标的类型和颜色
         * @return {string|undefined}
         * @private
         */
        __getType() {
            const arr = ['success', 'info', 'warn', 'error'];
            let res = `sss-msg-box__${this.type}`;
            if (arr.indexOf(this.type) === -1) {
                return undefined;
            } else {
                if (this.type === 'success') {
                    res += ' sss-success'
                } else if (this.type === 'info') {
                    res += ' sss-info';
                } else if (this.type === 'warn') {
                    res += ' sss-warn';
                } else if (this.type === 'error') {
                    res += ' sss-error';
                }
            }
            return res;

        },

        __sroll() {
            if (this.forbiddenScroll) {
                if (this.displayStatus) {
                    scrollManager.increase();
                } else {
                    scrollManager.decrease();
                }
            }
        },

        handleCancel() {      //按下取消按钮时的回调
            this.displayStatus = false;
            this.__sroll();
            this.$emit("cancel");
        },
        handleConfirm() {     //按下确认按钮时的回调
            this.displayStatus = false;
            this.__sroll();

            this.$emit("confirm");

        },
        hide() {
            const self = this;

            function next() {   //真正执行关闭
                self.displayStatus = false;
                self.__sroll();

                self.$emit("close");
            }

            //判断有没有传入beforeClose函数，有传入则执行该函数，并传入next,this
            if (!this.beforeClose) {
                next();
            } else {
                this.beforeClose(next);
            }


        },
        show() {
            this.displayStatus = true;
            this.__sroll();
            this.$refs.outer.style.zIndex = popupManager.nextZindex();
            this.$emit("show")
            this.$nextTick(() => {
                this.$refs.outer.focus();
                this.$refs.inner.style.top = this.top;
                this.$refs.inner.style.width = this.width;
            })
            if (this.appendToBody){
                document.body.appendChild(this.$refs.outer)
            }
        },
        toggle() {
            if (this.displayStatus) {
                this.hide();
            } else {
                this.show();
            }
        },
        esc() {
            if (this.closeByEsc) {
                this.hide()
            }
        },
        clickMark() {
            if (this.closeByClickMark) {
                this.hide();
            }

        }
    },
    mounted() {
        /*为函数添加节流*/
        this.esc = throttle(this.esc, this, 200);
        this.clickMark = throttle(this.clickMark, this, 200);
        this.clickMark = throttle(this.clickMark, this, 200);
        this.handleCancel = throttle(this.handleCancel, this, 200);
        this.handleConfirm = throttle(this.handleConfirm, this, 200);
        this.show = throttle(this.show, this, 200);
    }

}
</script>

<style lang="less">
@import "../../../src/style/variable.less";

.sss-msg-box {
    position: fixed;
    width: 0;
    height: 0;

    & > * {
        box-sizing: border-box;
    }


    left: 0;
    top: 0;
}

.sss-msg-box-mark {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    border: none;


}

.sss-msg-box-inner {
    position: fixed;
    background: white;
    padding: 15px 10px 15px 20px;
    border: solid 1px @color-gray;
    border-radius: 3px;
    box-shadow: 0 0 2px 1px @color-gray;
    min-width: 320px;
    overflow: hidden;


    left: 50%;
    transform: translateX(-50%);

    .sss-msg-box-inner__header {
        width: 100%;
        color: @color-black2;
        display: flex;
        font-size: 17px;
        justify-content: space-between;
        margin-bottom: 10px;

        & > div {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;

            & * {
                font-size: 20px;
                margin: 0;
            }

            & > span {
                padding-right: 10px;

            }
        }

        & > .iconfont {
            font-size: inherit;
            user-select: none;
        }

        .sss-msg-box__success {
            color: @color-main;
        }

        .sss-msg-box__info {
            color: @color-info;
        }

        .sss-msg-box__error {
            color: @color-error;
        }

        .sss-msg-box__warn {
            color: @color-warn;
        }
    }

    .sss-msg-box-inner__content {
        color: @color-black1;


    }

    .sss-msg-box-inner__footer {
        display: flex;
        width: 100%;
        justify-content: end;
        margin-top: 20px;
    }

}

.sss-msg-box__right {
    left: 100%;
    transform: translateX(-100% - 5px);
    transition: top .6s ease, bottom .6s ease;

}

.sss-msg-box__content-center {
    border-radius: 50px;
    display: flex;
    justify-content: center;
    padding: 10px 30px;
    transition: top .6s ease, bottom .6s ease;

    &[data-type='success'] {
        background: fadeout(@color-main, 80%);
        border: 1px solid @color-main;
        color: @color-main;

        & * {
            color: inherit;
        }
    }

    &[data-type='info'] {
        background: fadeout(@color-info, 80%);
        border: 1px solid @color-info;
        color: @color-info;

        & * {
            color: inherit;
        }
    }

    &[data-type='error'] {
        background: fadeout(@color-error, 80%);
        border: 1px solid @color-error;
        color: @color-error;

        & * {
            color: inherit;
        }
    }

    &[data-type='warn'] {
        background: fadeout(@color-warn, 80%);
        border: 1px solid @color-warn;
        color: @color-warn;

        & * {
            color: inherit;
        }
    }
}

.sss-msg-box__confirm{
    & .sss-msg-box-inner__header{
        margin-bottom: 40px;
    }
    & .sss-msg-box-inner__footer{
        & > button {

            &:after{
                content: none!important;
            }
        }
    }
}

/*msg类专用 */
.sss-transition-msg-enter-active {
    transition: transform .25s ease-out;
}

.sss-transition-msg-leave-active {
    transition: all .4s ease-out;
}

.sss-transition-msg-enter {
    transform: translateX(30px) scale(0) translateY(0);
}

.sss-transition-msg-leave-to {
    opacity: 0;
    transform: translateY(0);
}

/*msg类专用 淡入 + 下降*/
.sss-transition-msg-fadeDown-enter-active {
    transition: transform .25s ease-out,
    opacity .25s ease-out;

}

.sss-transition-msg-fadeDown-leave-active {
    transition: transform .2s ease-out,
    opacity .2s ease-out;

}

.sss-transition-msg-fadeDown-enter {
    transform: translateY(-25px) translateX(-50%);
    opacity: .1;
}

.sss-transition-msg-fadeDown-leave-to {
    transform: translateY(-25px) translateX(-50%);
    opacity: 0;
}

</style>