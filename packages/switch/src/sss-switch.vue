<template>
    <div class="sss-switch"
         :class="[
             {
                 'is-checked':this.value
             }
         ]"
    >
        <span v-if="leftText" ref="leftText" style="margin-right: 10px">{{ this.leftText }}</span>

        <span class="sss-switch-inner" ref="outer"
              @click="click()"
        >
        </span>

        <span v-if="rightText" ref="rigthText" style="margin-left: 10px">{{ this.rightText }}</span>
    </div>

</template>

<script>
export default {
    name: "sss-switch",
    props: {
        length: {
            type: String,
            default: "40px"
        },
        value: Boolean,
        leftColor: {
            type: String,
            default: "#db5b6c"
        },
        rightColor: {
            type: String,
            default: "#ced6e0"
        },
        leftText: String,
        rightText: String,
    },
    computed: {
        computedClass() {
            return {
                'is-checked': this.value
            }
        }
    },
    methods: {
        click() {
            this.$emit("input", !this.value);
        },
        renderStyle() {
            if (!this.value) {
                this.$refs.outer.style.backgroundColor = this.rightColor;
                if (this.leftText) {
                    this.$refs.leftText.style.color = "#db5b6c";

                }
                if (this.rightText) {
                    this.$refs.rigthText.style.color = "#747d8c";

                }
            } else {
                this.$refs.outer.style.backgroundColor = this.leftColor;
                if (this.rightText) {
                    this.$refs.rigthText.style.color = "#db5b6c";

                }
                if (this.leftText) {
                    this.$refs.leftText.style.color = "#747d8c";

                }
            }
        }
    },
    watch: {
        value() {
            this.$emit('change', this.value);
            this.renderStyle();
        }
    },
    mounted() {
        this.$refs.outer.style.width = this.length;
        this.renderStyle();
    },


}
</script>

<style lang="less">
@import "../../../src/style/variable.less";


.sss-switch {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &.is-checked{
        &>.sss-switch-inner:after{

            left: 100%;
            transform: translateX(-100% - 10px);
        }
    }
}

.sss-switch-inner {

    height: 20px;
    border-radius: 50px;
    overflow: hidden;
    position: relative;
    user-focus: none;
    user-select: none;

    &:after {
        content: "";
        position: absolute;
        transition: all .3s;
        height: 16px;
        width: 16px;
        background: white;
        border-radius: 50%;
        overflow: hidden;
        top: 1.5px;
        left: 1.5px;
    }

}


</style>