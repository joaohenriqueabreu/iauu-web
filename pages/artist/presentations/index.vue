<template>
  <div>
    <div class="vertical">
      <h6 class="mb-4">Próximas apresentações</h6>
      <div
        v-for="(presentation, index) in presentations"
        :key="index"
        @click="open(presentation.id)"
      >
        <event-info :event="presentation"></event-info>
      </div>
    </div>
    <modal ref="presentationModal">
      <template v-slot:main>
        <presentation></presentation>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventInfo from '@/components/artist/eventInfo'
import Presentation from '@/components/artist/presentation'
export default {
  components: {
    presentation: Presentation,
    'event-info': EventInfo
  },
  async asyncData({ store, app }) {
    await store.dispatch('schedule/loadSchedule', {
      id: app.$auth.user.id,
      year: new Date().getFullYear()
    })
  },
  computed: {
    ...mapGetters('schedule', ['presentations'])
  },
  methods: {
    ...mapActions('event', ['loadPresentation']),
    async open(id) {
      await this.loadPresentation(id)
      this.$refs.presentationModal.open()
    }
  }
}
</script>

<style lang="scss" scoped></style>
