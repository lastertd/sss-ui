<template>
    <a class="sss-link-outer"
       :class="[
           `sss-link-${this.type}`,
           {
               'is-disabled':disabled,
               'has-underline':underline
           }
       ]"
       :href="href"
    >
        <i class="iconfont" :class="icon"></i>
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: "sss-link",
    props: {
        type: String,
        icon: String,
        disabled: Boolean,
        href: {type: String, default: "#"},
        underline:Boolean,

    },

}
</script>

<style  lang="less">
@import "../../../src/style/variable.less";

.sss-link-outer {
    font-size: inherit;
    color: @color-blue;
    position: relative;
    text-decoration: none;
    display: flex;


    & * {
        font-size: inherit;
        line-height: inherit;
        padding-right: 3px;
    }


    &.is-disabled{
        user-select: none;
        user-focus: none;
        pointer-events: none;
        opacity: .4;
    }

    &:hover.has-underline:after{
        content: "";
        height: 2px;
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: @color-blue;
    }

}

//类型

.sss-link-main {
    color: @color-main;
    &:hover.has-underline:after{
        background-color: @color-main;
    }

}

.sss-link-error {
    color: @color-error;
        &:hover.has-underline:after{
        background-color: @color-error;
    }

}

.sss-link-warn {
    color: @color-warn;
        &:hover.has-underline:after{
        background-color: @color-warn;
    }

}

.sss-link-info {
    color: @color-info;
        &:hover.has-underline:after{
        background-color: @color-info;
    }
}
.sss-link-anchor{
    color: @color-black2;
    position: relative;
    &:hover{
        color: @color-main;
        &:before{
        content: "⚓";
        font-size: 130%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 100%;

    }
    }
}


</style>