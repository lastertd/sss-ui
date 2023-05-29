<template>
    <div class="sss-divider" :data-position="position">
        <span class="sss-divider-inner" ref="inner">
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name: "sss-divider",
    props: {
        offset: {
            type: String,
            default: '80%'
        },
        position: {
            type: String,
            default: 'horizontal'
        }
    },
    methods: {
        renderInner() {
            if (this.position === 'horizontal') {
                if (this.offset === 'start') {
                    this.$refs.inner.style.left = '20px'
                } else if (this.offset === 'center') {
                    this.$refs.inner.style.left = '50%';
                    this.$refs.inner.style.transform = 'translate(-50%,-50%)';
                } else if (this.offset === 'end') {
                    this.$refs.inner.style.right = '20px'
                } else {
                    this.$refs.inner.style.left = this.offset;
                }
            } else if (this.position === 'vertical') {
                if (this.offset === 'start') {
                    this.$refs.inner.style.top = '20px'
                } else if (this.offset === 'center') {
                    this.$refs.inner.style.top = '50%';
                    this.$refs.inner.style.transform = 'translate(-50%,-50%)';
                } else if (this.offset === 'end') {
                    this.$refs.inner.style.right = '20px'
                } else {
                    this.$refs.inner.style.top = this.offset;
                }
            }
        }
    },
    mounted() {
        this.renderInner();
    }
}
</script>

<style lang="less">
@import "../../../src/style/variable.less";

.sss-divider {
    font-size: inherit;
    background: @color-gray;
    position: relative;

    & * {
        font-size: inherit;
    }

    &[data-position="horizontal"] {
        height: 1.5px;
        width: 95%;
        margin: 20px 0;


        & > .sss-divider-inner {
            position: absolute;
            top: 100%;
            transform: translateY(-50%);
            padding: 0 15px;
            background: white;
            border-radius: 50px;
        }
    }

    &[data-position="vertical"] {
        height: 90%;
        width: 1.5px;
        margin: 0 20px;


        & > .sss-divider-inner {
            position: absolute;
            left: 100%;
            transform: translateX(-50%);
            padding: 15px 0;
            background: white;
            border-radius: 50px;


        }
    }


}


</style>