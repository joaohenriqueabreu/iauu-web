<template>
  <div>
    <div class="horizontal middle d-flex justify-content-end m-4">
      <h4 class="mr-4">Status do sistema:</h4>
      <div class="stat-status" :class="status"></div>
    </div>
    <div class="row mb-4">
      <div class="col-sm-4">
        <div class="stat-box">
          <h6 class="mb-4">Usuários</h6>
          <div class="d-flex justify-content-end">
            <h4>{{ user.all[0].count }}</h4>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="stat-box">
          <h6 class="mb-4">Artistas</h6>
          <div class="d-flex justify-content-end">
            <h4>{{ user.artists[0].count }}</h4>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="stat-box">
          <h6 class="mb-4">Contratantes</h6>
          <div class="d-flex justify-content-end">
            <h4>{{ user.contractors[0].count }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <line-chart></line-chart>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async asyncData({ store }) {
    await store.dispatch('admin/loadStats')
    
    let status = 'active'
    try {
      await store.dispatch('admin/status')
    } catch (error) {
      console.log(error)
      status = 'error'
    }

    return {
      status
    }
  },
  mounted() {
    // new Chart
  },
  computed: {
    ...mapState({ user: (state) => state.admin.stats.users[0] })
  }
}
</script>

<style lang="scss" scoped>
  .stat-status {
    &.active {
      background: $green;
    }

    &.error {
      background: $error;
    }

    width: 20px;
    height: 20px;
    border-radius: $rounded;
    box-shadow: $shadow;
  }

  .stat-box {
    background: $layer4;
    box-shadow: $shadow;
    padding: 2 * $space;
  }

  canvas {
    height: 20vh;
  }
</style>