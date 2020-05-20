<template>
  <nav class="navbar d-flex justify-content-end">
    <div>
      <menu-manager></menu-manager>
    </div>
  </nav>
</template>

<script>
import MenuManager from '@/components/menu/menuManager'
export default {
  components: {
    'menu-manager': MenuManager
  }
}
</script>

<style></style>
