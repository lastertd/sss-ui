<!--统一管理所有定位元素 例如tooltip, confirm, dialog, select, -->
<!--这些具有位于文档中的触发器的组件-->
<template>
    <Popper
        ref="outer"
        :trigger="trigger"
        :options="{
            placement: placement,
            modifiers:{
                offset: {
                    offset:`0,${offset}`,
                },
              computeStyle: {
                gpuAcceleration: gpuAcceleration
              }
            },

        }"
        @hide="handleHide()"
        @show="handleShow()"

        :force-show="forceShow"
        :visible-arrow="showArrow"
        :disabled="disabled"

        :delay-on-mouse-out="delayOnMouseOut"
        :delay-on-mouse-over="delayOnMouseIn"

        :append-to-body="appendToBody"
        root-class="sss-popper-root"
        transition="sss-tra-temp"
        enter-active-class="sss-transition-temp-enter-active"
        leave-active-class="sss-transition-temp-leave-active"
    >
        <!--        固定-->
        <slot slot="reference" name="reference"></slot>
        <!--        弹窗-->
        <transition :name="`sss-transition-${transition}`">
            <div class="sss-popper" ref="popper"
                 :class="[
                     {
                         'is-dark':dark
                     }
                 ]"
                 v-show="displayStatus">
                <slot name="popper"></slot>
            </div>
        </transition>

    </Popper>

</template>


<script>
import Popper from "../../../src/utils/vue-popper";
import {popupManager} from "../../../src/index"

export default {
    name: "sss-popper",
    components: {Popper},
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
            default: 100,
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


    },
    data() {
        return {
            displayStatus: false,
            isFirstRender: true,
            forceShow:false,
        }
    },
    methods: {

        handleShow() {
            this.displayStatus = true;
            this.$refs.popper.style.zIndex = popupManager.nextZindex();
            if (this.isFirstRender) {
                this.$refs.popper.style.maxWidth = this.maxwidth;
                this.$refs.popper.style.minWidth = this.minwidth;
                this.isFirstRender = false;
            }
            this.$emit("show");

        },

        handleHide() {
            this.displayStatus = false;
            this.$emit("hide");
        },


        hide(){
            this.$refs.outer.doClose();
        },
        show(){
          this.$refs.outer.doShow();
        },
        toggle(){
            this.$refs.outer.doToggle();
        }




    },
}
</script>


<style lang="less">
@import "../../../src/style/variable.less";



.sss-popper {

    width: auto;
    color: #212121;
    text-align: center;
    display: inline-block;
    position: absolute;
    background: white;
    border: solid 1px @color-gray;
    -moz-box-shadow: 0 0 2px 1px @color-gray;
    -webkit-box-shadow: 0 0 2px 1px @color-gray;
    box-shadow: 0 0 2px 1px @color-gray;
    padding: 7px 14px;
    border-radius: 3px;

    &.is-dark {
        background: @color-black2;
        color: white;
    }

}



.sss-popper .popper__arrow {
    background: inherit;

    width: 10px;
    height: 10px;
    border: solid 2px @color-gray;
    border-left: none;
    border-top: none;
    user-select: none;
    position: absolute;
    clip-path: polygon(100% 0, 0 100%, 100% 100%);

}


.sss-popper[x-placement^="top"] {
    transform-origin: center bottom !important;

    & .popper__arrow {
        transform-origin: center;
        transform: rotate(45deg);
        bottom: -5px;
        left: 50%;
    }
}

.sss-popper[x-placement^="bottom"] {
    transform-origin: center top;

    & .popper__arrow {
        transform: rotate(-135deg);
        top: -5px;
        left: 50%;

    }
}

.sss-popper[x-placement^="right"] {
    transform-origin: left center;

    & .popper__arrow {
        transform: rotate(135deg);
        left: -5px;
        top: calc(50%);
    }
}

.sss-popper[x-placement^="left"] {
    transform-origin: right center;

    & .popper__arrow {
        transform: rotate(-45deg);

        right: -5px;
        top: calc(50%);
    }
}


</style>