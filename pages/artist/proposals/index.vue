<template>
  <div>
    <div class="vertical">
      <h6 class="mb-4">Últimas propostas recebidas</h6>
      <div v-for="(proposal, index) in proposals" :key="index" @click="open(proposal.id)">
        <event-info :event="proposal"></event-info>
      </div>
    </div>
    <modal ref="proposalModal">
      <template v-slot:main>
        <proposal></proposal>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventInfo from '@/components/artist/eventInfo'
import Proposal from '@/components/artist/proposal'
export default {
  components: {
    proposal: Proposal,
    'event-info': EventInfo
  },
  async asyncData({ store, app }) {
    await store.dispatch('schedule/loadSchedule', {
      id: app.$auth.user.id,
      year: new Date().getFullYear()
    })
  },
  computed: {
    ...mapGetters('schedule', ['proposals'])
  },
  methods: {
    ...mapActions('presentation', ['loadProposal']),
    async open(id) {
      await this.loadProposal(id)
      this.$refs.proposalModal.open()
    }
  }
}
</script>

<style lang="scss" scoped></style>
