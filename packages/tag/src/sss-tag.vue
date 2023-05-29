<template>
    <span class="sss-tag" ref="sssTagOuter"
          :class="[
              `sss-tag-${type}`,
              {
                  'is-dark':dark
              }
          ]"
          @click="$emit('click',$event)"
    >

        <slot name="default"></slot>
        <span v-if="deleteAble"
              class="iconfont sss-close sss-tag-delete-btn"
              @click.stop="__delete($event)"
        ></span>

    </span>


</template>

<script>
export default {
    name: "sss-tag",
    props: {
        type: {
            type: String,
            default: "normal"
        },
        deleteAble: Boolean,
        dark: Boolean,

    },
    methods: {
        __delete(event) {
            this.$emit('delete', event);
        }
    },

}
</script>

<style lang="less">
@import "../../../src/style/variable.less";

.sss-tag {
    display: inline-flex;
    align-items: center;
    font-size: inherit;
    border: solid 1px #e8dede;
    border-radius: 3px;
    padding: 7px 14px;

    & > * {
        box-sizing: border-box;
        font-size: inherit;
    }

    color: @color-blue;
    background: fadeout(@color-blue, 85%);

    &.is-dark {
        background: @color-blue;
        color: @color-white3;
    }

}

//type
.sss-tag-main {
    color: @color-main;
    background: fadeout(@color-main, 85%);

    &.is-dark {
        background: @color-main;
        color: @color-white3;
    }
}

.sss-tag-info {
    color: @color-info;
    background: fadeout(@color-info, 85%);

    &.is-dark {
        background: @color-info;
        color: @color-white3;
    }
}

.sss-tag-error {
    color: @color-error;
    background: fadeout(@color-error, 85%);

    &.is-dark {
        background: @color-error;
        color: @color-white3;
    }
}

.sss-tag-warn {
    color: @color-warn;
    background: fadeout(@color-warn, 85%);

    &.is-dark {
        background: @color-warn;
        color: @color-white3;
    }
}


.sss-tag-delete-btn {
    user-select: none;
    margin-left: 5px;
    padding: 2px;
    cursor: pointer;
}


</style>