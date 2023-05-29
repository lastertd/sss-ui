<template>
    <div
        class="sss-img"
        :class="[
            `sss-img-transition-${transition}`,
            {
                'is-circle':circle
            }
        ]"
    >
        <img
            class="sss-img-inner"
            ref="img"
            :src="src"
            :alt="alt"
        >
    </div>
</template>

<script>
export default {
    name: "sss-image",
    props: {
        src: String,
        alt:String,
        circle: Boolean,
        fit: {type: String, default: 'cover'},
        transition:String,
    },
    mounted() {
        this.$refs.img.style.objectFit = this.fit
    }
}
</script>

<style lang="less">
@import "../../../src/style/variable.less";

.sss-img {
    line-height: 0;
    border: 1px solid @color-gray;
    overflow: hidden;
    &.is-circle{
        border-radius: 50%;
    }


    &.sss-img-transition-scale{
        &>.sss-img-inner:hover{
            transform: scale(1.03);
        }
    }
}

.sss-img-inner {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    object-position: center center;

}

</style>