<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    value: { type: Object, default: () => {} },
    steps: { type: Array, default: () => {} },
    completedSteps: { type: Array, default: () => {} }
  },
  computed: {
    ...mapState({ proposal: (state) => state.event.proposal }),
    proposalDate() {
      if (!this.$utils.isEmpty(this.proposal)) {
        return this.moment(this.proposal.timeslot.start_dt).format(this.$config.dateFormat)
      }

      return 'Data ainda não definida'
    }
  },
  methods: {
    ...mapActions('event', ['editProposal'])
  }
}
</script>

<style lang="scss" scoped></style>
