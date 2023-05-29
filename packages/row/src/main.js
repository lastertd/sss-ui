export default {
    name:"sssRow",
    componentName: 'sssRow',
    props:{
        tag:{type:String, default:'div'},
        justify:{type:String,default: 'start'},
        align:{type:String,default:"center"},

    },
    computed:{
        style(){
            return{
                'width':'100%',
                'margin-bottom':'15px',
                'display':'flex',
                'flexFlow': 'row wrap',
                'justifyContent':this.justify,
                'alignItems':this.align
            }
        }
    },
    render(h) {
        const slot = this.$slots.default;

        return h(this.tag, {
            style:this.style
        },slot)
    }
}