<template>
  <div>
    <fade-transition :duration="300" mode="out-in">
      <div
        v-if="!submitted"
        key="submitting"
        class="button"
        :class="{ disabled }"
        @click="$refs.submit.click()"
      >
        <input ref="submit" type="submit" :disabled="disabled" @click.prevent="submit" />
        <slot></slot>
      </div>
      <div v-else key="submitted" class="button">
        <font-awesome icon="check"></font-awesome>
      </div>
    </fade-transition>
  </div>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      submitted: false,
      submitting: false
    }
  },
  methods: {
    async submit() {
      await this.delay()
      this.submitted = true
      await this.delay()
      this.$emit('callback')
    },
    delay() {
      return setTimeout(() => {}, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  display: none;
}

.button {
  @extend .horizontal, .middle, .center;
  transition: $transition;
  cursor: pointer;
  border-radius: $rounded;
  padding: 10px;
  width: 100%;
  height: 100%;
  box-shadow: $shadow;
  background-color: $white;
  color: black;
  font-weight: $bold;
  border: none;
  outline: none;
  min-width: 150px;

  &.disabled {
    background: $layer3;
    cursor: default;
    box-shadow: none;
  }

  &:focus,
  &:active {
    outline: none;
  }

  &:hover:not(.disabled) {
    transition: $transition;
    background: transparentize($brandLayer, 0.1);
    box-shadow: $higherShadow;
  }
  [data-icon] {
    color: black;
  }
}
</style>
