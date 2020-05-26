<template>
  <div>
    <font-awesome icon="calendar-alt" :class="{ completed: isStepCompleted(0) }"></font-awesome>
    <font-awesome icon="coffee" :class="{ completed: isStepCompleted(1) }"></font-awesome>
    <font-awesome icon="child" :class="{ completed: isStepCompleted(2) }"></font-awesome>
    <font-awesome icon="guitar" :class="{ completed: isStepCompleted(3) }"></font-awesome>
  </div>
</template>

<script>
export default {
  props: {
    steps: { type: Number, default: 0 },
    completed: { type: Array, default: () => {} }
  },
  methods: {
    isStepCompleted(step) {
      return this.completed.includes(step)
    }
  }
}
</script>

<style lang="scss" scoped>
[data-icon] {
  margin-right: 4 * $space;
  transition: $transition;
  color: $layer5;
  font-size: $huge;

  &.completed {
    transition: $transition;
    color: $brand;
  }
}
</style>
