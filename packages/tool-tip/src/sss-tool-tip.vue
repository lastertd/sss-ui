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

        <span ref="popper" slot="popper">{{ title }}</span>
        <slot slot="reference"></slot>
    </sss-popper>


</template>

<script>
import sssPopper from "../../popper/src/sss-popper";


export default {
    name: "sss-tool-tip",
    components: {sssPopper},
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
            default: "hover"
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
        title: String,

    },
    methods: {

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


}
</script>
