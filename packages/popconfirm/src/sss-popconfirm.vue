<!--气泡确认框 由title button组成
    用于用户操作的确认
    提供cancel、confirm两个回调
-->

<template>

    <sss-popper
        ref="outer"
        :placement="placement"
        :offset="offset"
        :trigger="trigger"
        :delay-on-mouse-out="delayOnMouseOut"
        :delay-on-mouse-in="delayOnMouseIn"
        :show-arrow="showArrow"
        :transition="transition"
        :disabled="disabled"
        :dark="dark"
        :maxwidth="maxwidth"
        :minwidth="minwidth"
        :append-to-body="appendToBody"
        :gpu-acceleration="gpuAcceleration"

        @show="$emit('show')"
        @hide="$emit('hide')"

    >
        <slot slot="reference"></slot>

        <div class="class-popconfirm-popper" slot="popper">
            <!--            标题-->
            <h3 class="sss-popconfirm-title">
                <i class="iconfont" ref="icon"></i>
                {{ title }}
            </h3>

            <!--            按钮-->
            <div class="sss-popconfirm-btn-list">
                <sss-button class="sss-confirm-cancel-btn" style="font-size:10px"
                            :type="canclBtnType"
                            @click.stop="handleCancel()"
                >{{ cancelBtnText }}
                </sss-button>
                <sss-button class="sss-confirm-confirm-btn" style="font-size: 10px"
                            :type="confirmBtnType"
                            @click.stop="handleConfirm()"

                >{{ confirmBtnText }}
                </sss-button>
            </div>

        </div>


    </sss-popper>

</template>

<script>
import sssPopper from "../../popper/src/sss-popper";
import sssButton from "../../button/src/sss-button";

export default {
    name: "sss-popconfirm",
    components: {sssPopper,sssButton},
    props: {
        placement: {
            type: String,
            default: "bottom"
        },
        offset: {
            type: Number,
            default: 13
        },
        trigger: {
            type: String,
            default: "clickToOpen"
        },
        delayOnMouseOut: {
            type: Number,
            default: 300,
        },
        delayOnMouseIn: {
            type: Number,
            default: 10,
        },
        showArrow: {
            type: Boolean,
            default: true
        },
        transition: {
            type: String,
            default: 'fade',
        },
        disabled: Boolean,
        dark: Boolean,
        maxwidth: {
            type: String,
            default: "2000px"
        },
        minwidth: {
            type: String,
            default: "0"
        },
        appendToBody: {
            type: Boolean,
            default: true
        },
        gpuAcceleration: Boolean,
        type: {
            type: String,
            default: "info",
            validator(value) {
                return ['success', 'error', 'warn', 'info'].indexOf(value) !== -1;
            }
        },
        title: String,
        canclBtnType: {
            type: String,
            default: "text"
        },
        cancelBtnText: {
            type: String,
            default: "取消"
        },
        confirmBtnType: {
            type: String,
            default: "main",
        },
        confirmBtnText: {
            type: String,
            default: "确认"
        },


    },
    data() {
        return {
            vis: false
        }
    },
    methods: {
        __addIcon() {
            if (this.type === 'success') {
                this.$refs.icon.classList.add('sss-success');
                this.$refs.icon.style.color = '#db5b6c';

            } else if (this.type === 'error') {
                this.$refs.icon.classList.add('sss-error');
                this.$refs.icon.style.color = '#e1122a';

            } else if (this.type === 'warn') {
                this.$refs.icon.classList.add('sss-warn');
                this.$refs.icon.style.color = '#E6A23C';

            } else if (this.type === 'info') {
                this.$refs.icon.classList.add('sss-info');
                this.$refs.icon.style.color = '#1ba784';

            }
        },
        handleCancel() {
            this.hide();
            this.$emit("cancel");
        },
        handleConfirm() {
            this.hide();
            this.$emit("confirm")
        },

        hide() {
            this.$refs.outer.hide();
        },
        show() {
            this.$refs.outer.show();
        },
        toggle() {
            this.$refs.outer.toggle();
        }

    },
    mounted() {
        this.__addIcon();
    }
}
</script>

<style lang="less">
@import "../../../src/style/variable.less";

.class-popconfirm-popper {
    color: @color-black1;
    display: flex;
    flex-flow: column nowrap;
    align-items: start;
    font-size: 13px;

    & > .sss-popconfirm-title {
        margin-top: 10px;
        margin-bottom: 20px;

        & > .iconfont {
            background: white;
            border-radius: 50%;
            overflow: hidden;
        }
    }

}
    .sss-popconfirm-btn-list {
        font-size: inherit;
        display: flex;
        width: 100%;
        justify-content: end;
        & > button {
            padding: 4px 10px;
            margin-left: 3px;
            margin-right: 0;
            &:after{
                content: none!important;
            }
        }

    }

</style>