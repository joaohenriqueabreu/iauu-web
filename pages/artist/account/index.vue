<template>
  <div>
    <div class="d-flex justify-content-between mb-5">
      <h6>Minha conta</h6>
      <submit-button @submit="openWithdrawModal">Solicitar saque</submit-button>
    </div>
    <h6 class="mb-3">Pagamentos</h6>
    <div class="d-flex align-content-space-between full-width">
      <div v-for="(stat, statName) in stats" :key="statName" class="stat">
        <h5>{{ $dictionary.payment.label[statName] }}</h5>
        <hr />
        <h2 class="text-right">{{ stat | currency }}</h2>
      </div>
    </div>
    <withdraw-request ref="withdrawRequest"></withdraw-request>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WidthdrawRequest from '@/components/payment/withdrawRequest'
export default {
  components: {
    'withdraw-request': WidthdrawRequest
  },
  async asyncData({ store }) {
    await store.dispatch('payment/loadPayments')
  },
  computed: {
    ...mapState({ payments: (state) => state.payment.payments }),
    ...mapState({ stats: (state) => state.payment.stats })
  },
  methods: {
    openWithdrawModal() {
      this.$refs.withdrawRequest.openModal()
    }
  }
}
</script>

<style lang="scss" scoped>
hr {
  border-top: 5px solid $layer1;
}
.stat {
  transition: $transition;
  width: 100%;
  background: $layer3;
  box-shadow: $shadow;
  margin-right: 2 * $space;
  padding: 2 * $space;
}
</style>
