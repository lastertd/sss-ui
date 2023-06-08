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
            :before-close="func"
        >
            <span slot="content">消息体</span>
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
        handleClose() {
            this.$confirm({
                title: '触发了close事件',
                type: 'info'
            }).then(res => {
                console.log(res)
            })
        },
        handleCancel() {
            this.$notify({
                title: '触发了cancel事件',
                type: 'success'

            })
        },
        handleConfirm() {
            this.$notify({
                title: '触发了confirm事件',
                type: 'success'

            })
        },
        func(next) {
            this.$confirm({
                title: '确定不是误触么？',
                type: 'info'
            }).then(() => next()).catch(() => {})
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
