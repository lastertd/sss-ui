<template>
    <button class="sss-button" ref="button"
            :class="[
                type? `sss-button-${type}`:'',
                size? `sss-button-${size}`:'',
                {
                    'is-disabled':disabled,
                    'is-loading':loading,
                    'is-round':round,
                    'is-cricle':cricle,
                    'is-empty':empty
                }
            ]"
            :type="nativeType"
            :autofocus="autofocus"

            @click="handleClick($event)"
            @focus="handleFocus($event)"
            @blur="handleBlur($event)"

    >
        <i class="sss-button-loading iconfont sss-loading" v-if="loading"></i>
        <i class="iconfont" :class="leftIcon" v-if="leftIcon && !loading"></i>
        <span><slot></slot></span>
        <i class="iconfont" :class="rightIcon" v-if="rightIcon && !loading"></i>


    </button>
</template>

<script>
export default {
    name: "sss-button",
    props: {
        type: {
            type: String,
            default: "default",
        },
        size: String,
        round: Boolean,
        cricle: Boolean,
        disabled: Boolean,
        empty: Boolean,
        loading: Boolean,
        autofocus: Boolean,
        leftIcon: String,
        rightIcon: String,
        nativeType: {
            type: String,
            default: "button"
        }
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt);

        },
        handleFocus(evt) {
            this.$emit('focus', evt);
        },
        handleBlur(evt) {
            this.$emit('blur', evt);
        }
    },

}
</script>

<style lang="less">
@import "../../../src/style/variable.less";
.sss-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: center;

    margin: 0 5px;
    box-sizing: border-box;
    padding: 8px 20px;
    border-radius: 3px;
    border: solid 1px @color-gray;
    background: @color-white3;
    font-size: inherit;

    transition: all .15s;
    position: relative;

    & * {
        font-size: inherit;
        box-sizing: inherit;
    }

    & > *:not(.sss-button-loading) {
        padding: 0 5px;
    }

    //设置动画
    &:focus:after {
        content: "";
        display: block;
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid @color-info;
        border-radius: inherit;
    }

    //禁用
    &.is-disabled,
    &.is-loading{
        pointer-events: none;
        user-select: none;
        opacity: 0.3;
        animation: none !important;
        -webkit-animation: none !important;
        transition: none !important;
    }

    //圆角
    &.is-round {
        border-radius: 50px;

        &:focus:after {
            border-radius: 50px;
        }

    }

    //圆
    &.is-cricle {
        padding: 10px;
        border-radius: 50%;

        &:focus:after {
            border-radius: inherit;
        }

        & >* {
            padding: 0 !important;
        }
    }

    //size
    &.sss-button-s {
        font-size: @font-size-s;
    }
    &.sss-button-m {
        font-size: @font-size-m;
    }
    &.sss-button-l {
        font-size: @font-size-l;
    }

}

//类型
.sss-button-default {

    &:hover {
        background: darken(@color-white3, 5%);

        &:active {
            background: darken(@color-white3, 10%);
        }
    }


}

.sss-button-main {
    background: @color-main;
    color: @color-white2;

    //重写动画
    &:hover {
        background: darken(@color-main, -5%);

        &:active {
            background: darken(@color-main, 10%);
        }
    }

    &:focus:after {
        border-color: @color-main;
    }

    //empty
    &.is-empty {
        background: fadeout(@color-main, 80%);
        color: @color-main;

        &:hover {
            background: darken(@color-main, -5%);
            color: @color-white2;

            &:active {
                background: darken(@color-main, 5%);
            }
        }
    }


}

.sss-button-info {
    background: @color-info;
    color: @color-white2;
    //重写动画
    &:hover {
        background: darken(@color-info, -5%);

        &:active {
            background: darken(@color-info, 5%);
        }
    }

    &:focus:after {
        border-color: @color-info;
    }

    //empty
    &.is-empty {
        background: fadeout(@color-info, 80%);
        color: @color-info;

        &:hover {
            background: darken(@color-info, -5%);
            color: @color-white2;

            &:active {
                background: darken(@color-info, 5%);
            }
        }
    }


}

.sss-button-warn {
    background: @color-warn;
    color: @color-white2;
    //重写动画
    &:hover {
        background: darken(@color-warn, -5%);

        &:active {
            background: darken(@color-warn, 5%);
        }
    }

    &:focus:after {
        border-color: @color-warn;
    }

    &.is-empty {
        background: fadeout(@color-warn, 80%);
        color: @color-warn;

        &:hover {
            background: darken(@color-warn, -5%);
            color: @color-white2;

            &:active {
                background: darken(@color-warn, 10%);
            }
        }
    }
}

.sss-button-error {
    background: @color-error;
    color: @color-white2;
    //重写动画
    &:hover {
        background: darken(@color-error, -5%);

        &:active {
            background: darken(@color-error, 5%);
        }
    }

    &:focus:after {
        border-color: @color-error;
    }

    &.is-empty {
        background: fadeout(@color-error, 80%);
        color: @color-error;

        &:hover {
            background: darken(@color-error, -5%);
            color: @color-white2;

            &:active {
                background: darken(@color-error, 5%);
            }
        }
    }
}

.sss-button-loading{
    animation: sss-rotate 2s linear infinite;

}


</style>