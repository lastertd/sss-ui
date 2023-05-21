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
        <i class="sss-button-loading" v-if="loading"></i>
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
        autofocus:Boolean,
        leftIcon: String,
        rightIcon: String,
        nativeType: {
            type: String,
            default: "button"
        }
    },
    methods:{
        handleClick(evt){
            this.$emit('click',evt);

        },
        handleFocus(evt){
            this.$emit('focus',evt);
        },
        handleBlur(evt){
            this.$emit('blur',evt);
        }
    }

}
</script>

<style lang="less">


</style>