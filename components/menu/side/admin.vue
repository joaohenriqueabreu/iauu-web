<template>
  <div>
    <div class="side-menu-items">
      <nuxt-link to="/admin/dashboard" :class="{ routed: routed('schedule') }">
        <font-awesome icon="chart-line"></font-awesome>
        <span v-show="!minimized">Agenda</span>
      </nuxt-link>
      <nuxt-link to="/admin/users" :class="{ routed: routed('presentations') }">
        <font-awesome icon="user-friends"></font-awesome>
        <span v-show="!minimized">Usuários</span>
      </nuxt-link>
      <nuxt-link to="`/admin/presentations" :class="{ routed: routed('proposals') }">
        <font-awesome icon="music"></font-awesome>
        <span v-show="!minimized">Apresentações</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import UserMenu from './user'
export default {
  extends: UserMenu,
}
</script>
