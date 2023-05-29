<template>
    <div id="app">


        <sss-input v-model="str"></sss-input>
        <sss-count v-model="str" readonly></sss-count>





        <div style="height: 2000px"></div>

    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            str:0
        }
    },
    methods:{
        print(va){
            console.log("print: ",va);
        },
        notify(title, content, type){
            this.$message({
                text:title,
            });
        }
    }



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
