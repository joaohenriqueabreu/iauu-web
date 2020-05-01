<template>
  <nav :class="theme">
    <logo :height="50" :width="50"></logo>
  </nav>
</template>

<script>
import logo from '@/components/Logo'
export default {
  components: {
    logo
  },
  data() {
    return {
      theme: ''
    }
  },
  methods: {
    onScroll(event, position) {
      alert(position)
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  transition: $transition;
  background: $darkBG;

  .transparent {
    transition: $transition;
    background: transparent;
  }
}
</style>
