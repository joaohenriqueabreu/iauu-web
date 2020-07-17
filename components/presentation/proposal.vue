<template>
  <div class="container">
    <modal ref="modal">
      <template v-slot:header>
        <div class="horizontal d-flex justify-content-between">
          <div class="horizontal middle" v-if="!$empty(presentation.contractor) && !$empty(presentation.contractor.user)">
            <avatar :src="presentation.contractor.user.photo" :username="presentation.contractor.name"></avatar>
            <div class="vertical middle">
              <h5>{{ presentation.contractor.user.name }}</h5>
              <h6>Enviou-lhe uma proposta</h6>
            </div>
          </div>
          <div class="d-flex align-items-end">
            <span class="identifier">Proposta</span>
          </div>
        </div>
      </template>
      <template v-slot:main>
        <div class="mb-4">
          <pick-timeslot :default="presentation.timeslot" :timeslots="presentation.proposal.timeslots" @selected="selectedTimeslot">
          </pick-timeslot>
        </div>
        <div class="mx-4 mb-4 vertical center middle">
          <h3 class="mb-4">{{ presentation.proposal.title }}</h3>
          <span>{{ presentation.proposal.description }}</span>
        </div>
        <div class="boxed mb-4">
          <presentation-address :presentation="presentation"></presentation-address>
        </div>
        <div class="boxed mb-4" v-if="!isCustomProduct">
          <div class="mb-2 horizontal center middle">
            <h6>Apresentação contratada</h6>
          </div>
          <presentation-price :presentation="presentation" class="horizontal center middle"></presentation-price>
        </div>
        <div v-else>
          <counter-offer ref="counter" :presentation="presentation" @send="dispatchCounterOffer"></counter-offer>
        </div>
        <div class="boxed">
          <presentation-product ref="product" :presentation="presentation"></presentation-product>
        </div>
        <div class="attachments">
          <attachment v-for="(file, index) in presentation.files" :key="index" :file="file">
          </attachment>
        </div>
      </template>
      <template v-slot:footer>
        <div v-if="!hasCounterOffer && !hasAcceptedCounterOffer" class="error">
            {{ presentation.contractor.user.name }} solicitou um produto personalizado. Envie um orçamento para depois confirmar a apresentação.
          </div>
        <div class="horizontal center middle full-height">
          <div class="mr-5" v-if="!isCustomProduct || hasAcceptedCounterOffer">
            <form-button @action="accept">Aceitar</form-button>
          </div>
          <div>
            <h5 @click="reject">Recusar</h5>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BasePresentation from './base'

export default {
  extends: BasePresentation,  
  computed: {
    hasCounterOffer() {
      return !this.$empty(this.presentation.proposal.counterOffer) && 
        this.presentation.proposal.counterOffer.status !== 'void'
    },
    hasAcceptedCounterOffer() {
      return this.presentation.proposal.counterOffer.status === 'accepted'
    },
    isCustomProduct() {
      return this.presentation.proposal.product.custom || this.presentation.proposal.product.name === 'custom'
    },
  },
  methods: {
    ...mapActions('presentation', ['selectTimeslot', 'sendCounterOffer']),
    openModal() {
      return this.$refs.modal.open()
    },
    closeModal() {
      return this.$refs.modal.close()
    },
    async selectedTimeslot(timeslot) {
      await this.selectTimeslot({ id: this.presentation.id, timeslot })
      this.$toast.success('Data da apresentação selecionada')
    },
    accept() {
      this.$emit('accept', this.presentation.id)
    },
    reject() {
      this.$emit('reject', this.presentation.id)
    },
    async dispatchCounterOffer(counterOffer) {
      await this.sendCounterOffer(counterOffer)
      this.$toast.success(`Orçamento enviado para ${this.presentation.contractor.user.name}`)
      this.$refs.modal.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @extend .vertical;
  padding: 10px;
  max-height: 100%;
  position: relative;

  .identifier {
    text-transform: uppercase;
    letter-spacing: $space / 2;
    color: $layer5;
    padding-right: 10 * $space;
    font-weight: $bold;
    border-bottom: 5px solid $layer3;
    border-radius: rounded;
  }

  header {
    @extend .horizontal, .middle;
    justify-content: space-between;
    width: 100%;

    .vue-avatar--wrapper {
      margin-right: 2 * $space;
    }
  }

  main {
    @extend .vertical;
    margin-top: 2 * $space;
    margin-bottom: 2 * $space;
    padding: 2 * $space;
    box-shadow: $shadow;
    background: $layer3;
    border-radius: $edges;
    width: 100%;
    max-height: 60vh;
  }

  footer {
    @extend .horizontal, .center, .middle;
    margin-top: $space;

    h5 {
      color: transparentize($brand, 0.2);
      cursor: pointer;
      transition: $transition;

      &:hover {
        transition: $transition;
        color: $brand;
      }
    }
  }

  h4 {
    margin-right: 4 * $space;
    padding-right: 4 * $space;
    border-right: 5px solid $layer3;
  }
}
</style>
