<template>
    <div id="app">
        <sss-button
            type="main"
            @click="() => {
                this.$refs.test.show();
            }"
        >
            click me
        </sss-button>

        <sss-message-box
            ref="test"
            show-mark
            forbidden-scroll
            :before-close="(next) => {
                next();
            }"
        >

        </sss-message-box>
    </div>
</template>


<script>


export default {
    name: 'App',
    data() {
        return {
            str: 0
        }
    },
    methods: {
        handleCancel() {
            this.$notify({
                title: '删除失败',
                content: '用户取消了删除',
                type: 'error'
            })
        },
        handleConfirm() {
            this.$notify({
                title: '删除成功',
                content: '用户确认了删除',
                type: 'success'
            })

        }
    },


}
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 60px;
    font-size: 15px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    top: 60px;
    //background-color: darkolivegreen;;

}
</style>
