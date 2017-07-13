<template>
  <div class="content_common">
    <slot>
    </slot>
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .content_common {
    width: 100%;
    overflow: hidden;
    background: #f0f0f0;
  }

  .homepage {
    .content_common {
      background-color: #ffffff;
    }
  }
</style>
