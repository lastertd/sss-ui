<!--气泡确认框 由title button组成
    用于用户操作的确认
    提供cancel、confirm两个回调
-->

<template>

    <sss-popper
        :disabled="disabled"
        :force-show="vis"
        :trigger="trigger"
        :placement="placement"
        :offset="offset"
        :gpu-acceleration="gpuAcceleration"
        :max-width="maxWidth"
        :minwidth="minWidth"

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
                            @click.stop="__cancel()"
                >{{ cancelBtnText }}
                </sss-button>
                <sss-button class="sss-confirm-confirm-btn" style="font-size: 10px"
                            :type="confirmBtnType"
                            @click.stop="__confirm()"

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
        trigger: {
            type: String,
            default: "clickToOpen",

        },
        offset: {
            type: Number,
            default: 10
        },
        gpuAcceleration: {
            type: Boolean,
            default: true
        },
        disabled: Boolean,
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
            default: "normal"
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
        maxWidth: {
            type: String,
            default: "2000px"
        },
        minWidth: {
            type: String,
            default: '250px'
        }


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
        __cancel() {
            this.vis = true;
            this.$nextTick(() => {
                this.vis = false
            })

            this.$emit("cancel");
        },
        __confirm() {
            this.vis = true;
            this.$nextTick(() => {
                this.vis = false
            })

            this.$emit("confirm")
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

    & > .sss-popconfirm-title {
        margin-top: 0;
        margin-bottom: 20px;

        & > .iconfont {
            background: white;
            border-radius: 50%;
            overflow: hidden;


        }
    }


    .sss-popconfirm-btn-list {
        display: flex;
        width: 100%;
        justify-content: end;

    }
;
}

</style>