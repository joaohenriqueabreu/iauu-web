<template>
  <div>
    <div class="vertical">
      <h6 class="mb-4">Propostas Enviadas</h6>
      <div v-for="(presentation, index) in presentations" :key="index" @click="open(presentation.id)">
        <presentation-info :presentation="presentation"></presentation-info>
      </div>
    </div>
    <div v-if="presentations.length === 0" class="mb-4">
      Nenhuma proposta enviada <nuxt-link to="search">Encontre um artista para seu evento e envie uma proposta</nuxt-link>
    </div>
    <!-- Data loaded from state -->
    <proposal-details v-if="!$empty(presentationState)" ref="proposal" @cancelled="cancelledProposal" :read-only="false">
    </proposal-details>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PresentationInfo from '@/components/presentation/info'
import ProposalDetails from '@/components/presentation/contractor/proposal'
export default {
  components: {
    ProposalDetails,
    PresentationInfo
  },
  async asyncData({ store, app }) {
    store.dispatch('presentation/resetPresentation')
    await store.dispatch('presentation/loadProposals')
  },
  computed: {
    ...mapState({ presentations: (state) => state.presentation.presentations }),
    ...mapState({ presentationState: (state) => state.presentation.presentation })
  },
  methods: {
    ...mapActions('presentation', ['loadPresentation', 'resetPresentation', 'loadProposals']),
    async open(id) {
      await this.loadPresentation(id)
      this.$refs.proposal.openModal()
    },
    async cancelledProposal() {
      this.resetPresentation()
      await this.loadProposals()
    }
  }
}
</script>

<style lang="scss" scoped></style>
