<template>
  <div>
    <div class="sub-wrapper">
      <slot name="default"></slot>
    </div>
    <div class="overlay" :class="{ rounded }">
      <slot name="hover"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rounded: Boolean
  }
}
</script>

<style lang="scss" scoped>
div {
  position: relative;
  cursor: pointer;
  .sub-wrapper {
    &:hover {
      opacity: 0.3;
    }
  }

  .overlay {
    &:hover {
      opacity: 0.9;
    }
  }
}

.overlay {
  @extend .vertical, .middle, .center;
  transition: $transition;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  background: $layer2;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
  &.rounded {
    border-radius: $rounded !important;
  }
}
</style>
