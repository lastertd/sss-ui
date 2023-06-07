<template>
    <div class="sss-input"
         :class="[
             {
                 'is-disabled':disabled
             }
         ]"

    >

        <div v-if="this.$slots.prefix" class="sss-input-prefix">
            <slot name="prefix"></slot>
        </div>

        <span v-if="prefixIcon" class="iconfont sss-input-left-icon" :class="prefixIcon" @mousedown.prevent></span>

        <input class="sss-input-inner"
               ref="inputInner"
               v-bind="$attrs"
               @input="handleInput($event.target.value)"
               @focus="handleFocus($event)"
               @change="$emit('change', $event)"
               @blur="handleBlur($event)"
               @click="$emit('click',$event)"

               :readonly="readonly"
               :maxlength="maxlength"
               :minlength="minlength"
               :placeholder="placeholder"
               :disabled="disabled"
               :autofocus="autofocus"
               :type="type"
               :id="id"
               :value="value"
        >

        <div
            class="sss-input-right-icon-box"
            @mousedown.prevent

        >
            <!--            清空-->
            <span v-if="showClearIcon" class="iconfont sss-cricle-close" @click="clear()"></span>

            <!--            字数限制-->
            <span v-if="showLimitIcon" class="sss-input-limit">
                <i v-if="this.value.length > this.maxlength" class="iconfont sss-warn"></i>
                    {{ this.value?.length || 0 }}/{{ this.maxlength }}
            </span>
            <!--            密码显示-->
            <span v-if="showPasswordIcon"
                  class="iconfont sss-eye sss-input-icon-password"
                  @click="toggleValue()"></span>
            <!--            尾部icon-->
            <span v-if="suffixIcon" ref="suffixIcon" class="iconfont" :class="suffixIcon"></span>


        </div>

        <div v-if="this.$slots.suffix" class="sss-input-suffix">
            <slot name="suffix"></slot>
        </div>

        <transition name="sssInputFade">
            <label v-if="labelFlag" class="sss-input-ext" :for="id" ref="sss-input-ext">
                <span class="iconfont" :class="labelIcon"></span>
                {{ this.labelText }}
            </label>
        </transition>

    </div>
</template>

<script>
import debounce from "../../../src/utils/debounce";

export default {
    name: "sss-input",
    inheritAttrs: false,

    props: {
        checkFunc: Function,            //check function of input values
        value: [String, Number],
        clearAble: Boolean,
        showPassword: Boolean,
        showWordLimit: Boolean,
        suffixIcon: String,
        prefixIcon: String,
        readonly: Boolean,
        id: [String, Number],
        maxlength: [String, Number],
        minlength: [String, Number],
        placeholder: [String, Number],
        disabled: Boolean,
        autofocus: Boolean,
        type: {default: 'text'},
    },
    data() {
        return {
            labelFlag: false,
            labelText: "",
            labelIcon: "",
            focusing: false,
        }
    },
    computed: {
        showClearIcon() {
            return this.clearAble
                && this.value
                && !this.disabled && !this.readonly
                && this.focusing;
        },
        showPasswordIcon() {
            return this.showPassword && this.value && this.value
                && !this.disabled && !this.readonly
                && this.focusing;
        },
        showLimitIcon() {
            return this.showWordLimit && this.type === 'text' && this.value
                && !this.disabled && (typeof this.value === 'string')
        }
    },
    methods: {
        __SuffixToggleClass() {
            this.$refs.suffixIcon.classList.toggle("reverse");
        },
        __SuffixRemoveClass() {
            this.$refs.suffixIcon.classList.remove('reverse');

        },
        clear() {
            this.$emit('input', "");
            this.$emit('clear');
        },
        toggleValue() {
            if (this.$refs.inputInner.type === 'password') {
                this.$refs.inputInner.type = 'text';
            } else {
                this.$refs.inputInner.type = 'password';
            }
            setTimeout(() => {
                const input = this.$refs.inputInner;
                input.setSelectionRange(input.value.length, input.value.length);
            })


        },
        handleFocus(event) {
            this.focusing = true;
            this.$emit('focus', event);
            this.hiddenLabel();
        },
        handleBlur(event) {
            this.focusing = false;
            this.$emit('blur', event)

        },
        handleInput(val){
            this.$emit('input',val);
        },
        check() {
            if (this.checkFunc) {
                return this.checkFunc(this.value);
            }
            return true;
        },
        /**
         * 展示label
         * @param text {string}
         * @param icon {string}
         */
        showLabel(text = '输入不符合格式', icon = 'sss-cricle-close') {
            this.labelText = text;
            this.labelIcon = icon;
            this.labelFlag = true;
        },
        /**
         * 隐藏label
         */
        hiddenLabel() {
            this.labelFlag = false;
        },


        focus() {
            const input = this.$refs.inputInner;
            input.setSelectionRange(input.value.length, input.value.length);

        },
        blur() {
            this.$refs.inputInner.blur();
        },
        select() {
            this.$refs.inputInner.select();
        },


    },
    mounted() {
        this.handleInput = debounce(this.handleInput, this, 200);
    }


}
</script>

<style lang="less">
@import "../../../src/style/variable.less";

.reverse {
    transform: rotate(-180deg);
}

.sss-input {
    box-sizing: border-box;
    width: 100%;
    min-height: 40px;
    border: solid 1px @color-gray;
    border-radius: 5px;
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    user-select: none;
    position: relative;
    font-size: inherit;
    transition: all .3s;
    background-color: white;

    & * { //继承
        color: @color-black1;
        font-size: inherit;
        box-sizing: border-box;
        background-color: inherit;
        line-height: inherit;
    }


    &:hover { //覆盖时 边界变化
        border: solid 1px darken(@color-gray, 10%);

    }

    &:focus-within { //内部元素聚焦时，边界变化
        border: solid 1px @color-main;
        box-shadow: 0 0 5px 0 darken(@color-main, -30%);
    }

    &.is-disabled {
        background: @color-white3;

        & * {
            color: @color-gray;
        }


    }

}

.sss-input-inner {
    border: none;
    padding: 10px;
    width: 100%;
    display: inline-block;
    border-radius: inherit;


    &:focus {
        outline: none;
    }

    &::placeholder {
        color: @color-gray;
    }

    &[type="password"]::-ms-reveal {
        display: none !important;

    }
}


//左图标
.sss-input-left-icon {
    padding-left: 10px;
    color: @color-black1;

}

//右图标盒子
.sss-input-right-icon-box {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @color-gray;
    overflow: hidden;
    height: 100%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;


    & * { //内部元素默认边距
        padding: 0 6px;
        color: inherit;
        transition: all .3s;
        tab-index: 0;

        &:hover {
            color: @color-black1;
        }
    }


}
.sss-input-limit{
    font-size: 10px;
    color: @color-black2;
    &>i{
        color: red;
        font-size: 10px;
        padding-right: 0;
    }

}

.sss-input-suffix {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    min-height: inherit;
    height: inherit;
    border-left: solid 1px @color-gray;
    background: #f1f2f6;
    border-radius: 0 5px 5px 0;
    overflow: hidden;

    & > * {
        min-height: inherit;
        height: inherit;
        border: none !important;
        border-radius: 0 !important;
    }
}

.sss-input-prefix {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    min-height: inherit;
    height: inherit;
    background: #f1f2f6;
    overflow: hidden;
    border-right: solid 1px @color-gray;
    border-radius: 5px 0 0 5px;

    & > * {
        min-height: inherit;
        height: inherit;
        border: none !important;
        border-radius: 0 !important;
    }
}

.sss-input-ext {
    position: absolute;
    bottom: -22px;
    left: 1px;
    color: red;
    font-size: 10px;

    & * {

        color: red !important;
        padding-right: 5px;

        &:before {
            font-size: 15px;
        }
    }

    display: flex;
    justify-content: center;
    align-items: center;

}

.sssInputFade-enter-active {
    animation: sss-fadeDownIn .3s;
}

.sssInputFade-leave-active {
    animation: sss-fadeIn .3s reverse;
}


</style>


