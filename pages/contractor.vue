<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'app',
  middleware: ['auth', 'contractor']
}
</script>

<style></style>
