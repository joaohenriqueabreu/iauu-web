<template>
  <div>
    <fade-transition group :duration="1000">
      <div
        v-if="!submitted"
        key="submitting"
        class="button"
        @click="$refs.submit.click()"
      >
        <input ref="submit" type="submit" @click.prevent="submit" />
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
    submitCallback: { type: Function, default: () => {} }
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
      this.submitCallback()
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

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    transition: $transition;
    background: transparentize($brand2, 0.1);
    box-shadow: $higherShadow;
  }
  [data-icon] {
    color: black;
  }
}
</style>
