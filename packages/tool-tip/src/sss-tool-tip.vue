<template>

    <sss-popper
        :disabled="disabled"
        :trigger="trigger"
        :placement="placement"
        :dark="dark"
        :maxwidth="maxwidth"
        :transition="transition"
        :gpu-acceleration="true"
        :offset="offset"
    >

        <span ref="popper" slot="popper">{{ title }}</span>
        <slot slot="reference"></slot>
    </sss-popper>


</template>

<script>
import sssPopper from "../../popper/src/sss-popper";
export default {
    name: "sss-tool-tip",
    components:{sssPopper},
    props: {
        placement: {
            type: String,
            default: "top"
        },
        dark: {
            type: Boolean,
            default: false,
        },
        trigger: {
            type: String,
            default: "hover",
            validator(value) {
                return ['hover', 'clickToOpen'].indexOf(value) !== -1;
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ""
        },
        maxwidth: {
            type: String,
            default: "2000px"
        },
        transition: {
            type: String,
            default: "fade"
        },
        offset: {
            type: Number,
            default: 10
        }

    },


}
</script>
