<template>
    <div
        ref="outer"
        class="sss-radio" :class="[
            {
                'is-checked': this.label === this.value,
                'is-disabled': this.disabled,
                'has-border': this.border,
                'is-dark': this.dark
            }
        ]"
        @click="handleClick($event)">
        <span class="sss-radio-inner" ref="inner"></span>
        <label><slot></slot></label>
    </div>
</template>

<script>
export default {
    name: "sss-radio",
    props: {
        label: [String, Number, Boolean],
        value: [String, Number, Boolean],
        checked: Boolean,
        disabled: Boolean,
        border: Boolean,
        dark: Boolean,

    },
    methods: {
        handleClick(e) {
            this.$emit('input', this.label)
            this.$emit('click',e)
        }
    },
    mounted() {
        if (this.checked) {
            this.handleClick(undefined);
        }
    }

}
</script>

<style lang="less">
@import "../../../src/style/variable.less";


.sss-radio {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: inherit;
    padding: 10px;
    border-radius: 5px;
    user-select: none;

    &:hover {
        color: @color-main;
    }

    &.is-checked {
        color: @color-main;

        & > :nth-child(1) {
            background-color: @color-main;
            position: relative;

            &:before {
                content: "";
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: @color-white3;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);

            }
        }

        &.has-border {
            border-color: inherit;
        }
    }

    &.is-disabled {
        pointer-events: none;
        position: relative;
        opacity: .4;

    }

    &.has-border {
        border: solid 1px @color-gray;
    }

    &.is-dark {
        border: solid 1px @color-gray;
        transition: background-color .2s linear;

        & > :nth-child(1) {
            display: none;
        }

        &.is-checked {
            background-color: @color-main;
            color: @color-white2;
        }
    }
}

.sss-radio-inner {
    width: 15px;
    height: 15px;
    border: 1px solid #d5b6b6;
    border-radius: 50%;
    margin-right: 5px;
    user-select: none;
    transition: background-color .1s linear;

}

</style>