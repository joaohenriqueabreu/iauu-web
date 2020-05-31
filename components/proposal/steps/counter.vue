<template>
  <div>
    <div v-if="!$utils.empty(steps)">
      <font-awesome
        v-for="(data, step) in steps"
        :key="step"
        :icon="icons[step]"
        :class="{ completed: isStepCompleted(step), current: isCurrentStep(step) }"
        @click="goToStep(step)"
      ></font-awesome>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steps: { type: Number, default: 0 },
    completed: { type: Array, default: () => {} },
    current: { type: Number, default: 0 }
  },
  data() {
    return {
      icons: ['calendar-alt', 'shopping-cart', 'coffee', 'guitar']
    }
  },
  methods: {
    isStepCompleted(step) {
      return this.completed.includes(step)
    },
    isCurrentStep(step) {
      return step === this.current
    },
    goToStep(step) {
      this.$emit('goto', step)
    }
  }
}
</script>

<style lang="scss" scoped>
[data-icon] {
  @include desktop {
    margin-right: 4 * $space;
  }

  @include mobile {
    // margin-right: $space;
  }

  height: 100%;
  transition: $transition;
  color: $layer5;
  font-size: $huge;
  cursor: pointer;
  padding-bottom: $space;

  &.completed {
    transition: $transition;
    color: $brand;
  }

  &.current {
    transition: $transition;
    border-bottom: solid 4px $brand;
  }
}
</style>
