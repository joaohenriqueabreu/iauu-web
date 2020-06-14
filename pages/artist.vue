<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'app',
  // middleware: ['artist']
  middleware: ['auth', 'artist']
}
</script>

<style></style>
