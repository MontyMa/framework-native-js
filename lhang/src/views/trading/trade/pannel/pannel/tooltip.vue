<template>
  <div class="v-tooltip" :class="computedClasses">
    <slot></slot>
    <div class="tooltip-title">{{title}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: true,
      },
      title: String,
      position: {
        type: String,
        default: 'top',
      },
    },
    computed: {
      computedClasses() {
        const classes = {};
        if (this.show) {
          classes[`at-${this.position}`] = true;
        } else {
          classes.hide = true;
        }

        return classes;
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .v-tooltip {
    position: relative;

    .tooltip-title {
      background-color: #fefedc;
      box-shadow: 0 0 1px #ccc;
      color: #767676;
      display: none;
      font-size: 12px;
      filter: drop-shadow(0 1px 2px #d8d8d8);
      line-height: 20px;
      padding: 4px 10px;
      position: absolute;
      width: 200px;

      &:after {
        border-style: solid;
        color: #fffff0;
        content: '';
        position: absolute;
      }
    }

    &:hover {
      .tooltip-title {
        display: block;
      }
    }

    &.hide:hover {
      .tooltip-title {
        display: none;
      }
    }

    &.at-top {
      .tooltip-title {
        bottom: 100%;
        left: 50%;
        margin-left: -100px;

        &:after {
          border-left-color: transparent;
          border-right-color: transparent;
          border-width: 5px 4px 0;
          left: 50%;
          margin-left: -4px;
          top: 100%;
        }
      }
    }
  }
</style>
