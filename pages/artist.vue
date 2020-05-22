<template>
  <div>
    <client-only>
      <nuxt-child />
    </client-only>
  </div>
</template>

<script>
export default {
  layout: 'app',
  middleware: ['auth']
}
</script>

<style></style>
