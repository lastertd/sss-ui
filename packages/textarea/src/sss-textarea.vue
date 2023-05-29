<template>
    <div class="sss-textarea" :class="[
        {
            'is-disabled':disabled
        }
    ]">


        <textarea
            class="sss-textarea-inner"
            ref="textareaInner"
            v-bind="$attrs"
            @input="$emit('input',$event.target.value)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
            @change="$emit('change', $event)"


            :maxlength="maxlength"
            :minlength="minlength"
            :placeholder="placeholder"
            :disabled="disabled"
            :rows="rows"
            :autofocus="autofocus"
            :id="id"
            :value="value"
            :readonly="readonly"
        ></textarea>

        <span
            v-if="showWordLimit && maxlength && !disabled"

            class="sss-textarea-limit"

        >
            <i v-if="this.value.length > this.maxlength" class="iconfont sss-warn"></i>
            {{ this.value?.length || 0 }}/{{ this.maxlength }}
        </span>


    </div>
</template>

<script>
export default {
    name: "sss-textarea",
    inheritAttrs:false,
    props: {
        value: [String, Number],
        showWordLimit: Boolean,
        maxlength: [String, Number],
        minlength: [String, Number],
        placeholder: [String, Number],
        disabled: Boolean,
        autofocus: Boolean,
        readonly:Boolean,
        rows: {
            type: [String, Number],
            default: 3
        },
        id: String,
    },
    methods: {
        getValue() {
            return this.$attrs.value
        },
        focus() {
            this.$refs.textareaInner.focus();
        },
        blur() {
            this.$refs.textareaInner.blur();
        },
        select() {
            this.$refs.textareaInner.select();
        },

    },
}
</script>

<style lang="less">
@import "../../../src/style/variable.less";


.sss-textarea {
    width: 100%;
    box-sizing: border-box;
    border: solid 1px @color-gray;
    border-radius: 5px;
    user-select: none;
    position: relative;
    font-size: inherit;
    line-height: 25px;
    transition: all .3s;

    & * {
        color:inherit;
        font-size: inherit;
        line-height: inherit;
    }


    &:hover {
        border: solid 1px darken(@color-gray, 10%);
    }

    &:focus-within {
        border: solid 1px @color-main;
        box-shadow: 0 0 5px 0 darken(@color-main, -30%);


    }

    &.is-disabled {
        background: @color-white3;

    }


}

.sss-textarea-inner {
    box-sizing: border-box;
    border: none;
    padding: 0 10px;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    display: block;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: @color-gray;
    }

    &:disabled {
        color: @color-gray;
    }

}

.sss-textarea-limit{
    position: absolute;
    bottom: 0;
    right: 10px;
    font-size: 10px;
    color: @color-black1;
    &>i{
        color: red;
    }
}


.sssTextareaFade-enter-active {
    animation: sssFadeDownIn .3s;
}

.sssTextareaFade-leave-active {
    animation: sssFadeIn .3s reverse;
}


</style>