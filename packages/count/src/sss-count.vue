<!--目前小数加减法没做，能用但是难免会精度丢失-->

<template>
    <div
        class="sss-count"
        :class="[
            {
                'is-disabled':disabled
            }
        ]"
    >
        <sss-input
            ref="ipt"
            :disabled="disabled"
            :value="value"
            :readonly="readonly"
            @blur="handleBlur($event)"
        >
            <span
                class="iconfont sss-count-minus sss-minus"
                slot="prefix"
                @click="handleMinus()"
                :data-disabled="this.value-this.step<this.min"

            ></span>
            <span
                class="iconfont sss-count-plus sss-plus"
                slot="suffix"
                @click="handlePlus()"
                :data-disabled="this.value+this.step>this.max"
            ></span>
        </sss-input>
    </div>
</template>

<script>
import sssInput from "../../input/src/sss-input";


export default {
    name: "sss-count",
    components: {sssInput},
    props: {
        value: Number,
        disabled: Boolean,
        step:{type:Number,default:1},
        min:Number,
        max:Number,
        readonly:Boolean,
    },
    methods: {
        handleBlur(evt){
            const num = Number.parseInt(evt.target.value);
            if (this.min!==undefined && num < this.min ){
                this.$refs.ipt.showLabel(`输入值不能小于${this.min}`);
                return
            }
            if (this.max!==undefined && num > this.max ){
                this.$refs.ipt.showLabel(`输入值不能大于${this.max}`);
                return
            }
            this.$emit('input',num);
        },
        handleMinus() {
            if (!Number.isFinite(this.value)){
                throw new Error('prop value  is not a number');
            }
            if (!this.min || this.value - this.step >= this.min){
                this.$emit('input', this.value - this.step)
            }

            this.$refs.ipt.hiddenLabel();
        },
        handlePlus() {
            if (!Number.isFinite(this.value)){
                throw new Error('prop value  is not a number');
            }
            if (!this.max || this.value + this.step <= this.max){
                this.$emit('input', this.value + this.step)
            }

            this.$refs.ipt.hiddenLabel();

        },

    },
    mounted() {
        //尝试将value转化为数值型
        // this.$emit('input', Number.parseInt(this.value))
    }
}
</script>

<style lang="less">
@import "../../../src/style/variable.less";

.sss-count {
    max-width: 300px;
    &.is-disabled {
        pointer-events: none;
        cursor: auto;
    }
}

.sss-count-minus, .sss-count-plus {
    padding: 0 15px;
    display: flex;
    align-items: center;

    &:hover {
        color: @color-black2;
    }
    &[data-disabled]{
        pointer-events: none;
        color: @color-gray;
    }
}


</style>