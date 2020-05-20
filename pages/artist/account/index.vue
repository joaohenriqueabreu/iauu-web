<template>
  <div>
    <div class="d-flex justify-content-between mb-5">
      <h6>Minha conta</h6>
      <submit-button @submit="openWithdrawModal">Solicitar saque</submit-button>
    </div>
    <h6 class="mb-3">Pagamentos</h6>
    <div class="d-flex align-content-space-between full-width mb-5">
      <div v-for="(stat, statName) in stats" :key="statName" class="stat">
        <h5>{{ $dictionary.payment.label[statName] }}</h5>
        <hr />
        <h2 class="text-right">{{ stat | currency }}</h2>
      </div>
    </div>
    <table class="payments-container">
      <!-- <thead
          class="horizontal full-width middle d-flex justify-content-between mb-3"
        > -->
      <tr>
        <th>Status</th>
        <th>Apresentação</th>
        <th>Valor (R$)</th>
        <th>Data</th>
      </tr>
      <!-- </thead> -->
      <!-- <tbody> -->
      <tr v-for="(payment, index) in payments" :key="index" class="payment">
        <td class="status" :class="payment.status">
          {{ $dictionary.payment.label[payment.status] }}
        </td>
        <td @click="openPresentation">{{ payment.presentation_id }}</td>
        <td>{{ payment.amount | currency }}</td>
        <td>{{ payment.created_at | date }}</td>
      </tr>
      <!-- </tbody> -->
    </table>

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
  &.light {
    border-top: 2px solid $brand;
    opacity: 0.05;
  }
}
.stat {
  transition: $transition;
  width: 100%;
  background: $layer3;
  box-shadow: $shadow;
  margin-right: 2 * $space;
  padding: 2 * $space;
}

.payments-container {
  @extend .full-width;
  height: 40vh;
  tr {
    // @extend .horizontal, .middle;
    padding: 2 * $space;
    transition: $transition;
    border-bottom: 2px solid $layer3;

    .status {
      border-radius: $rounded;
      padding: $space;
      font-weight: $bold;
      &.closed {
        background: $layer1;
        color: $layer2;
      }

      &.pending {
        background: $layer4;
        color: red;
      }
    }

    &:hover {
      transition: $transition;
      background: $layer3;
    }
  }
}
</style>
