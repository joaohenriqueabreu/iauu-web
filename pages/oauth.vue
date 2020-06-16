<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'default',
  middleware: ['guest']
}
</script>

<style></style>
