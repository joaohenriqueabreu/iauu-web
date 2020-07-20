<template>
  <div>
    <modal ref="modal">
      <template v-slot:header>
        <div class="horizontal d-flex justify-content-between">
          <div v-if="!$empty(presentation.contractor)" class="horizontal middle">
            <avatar
              class="mr-4"
              :src="presentation.contractor.user.photo"
              :username="presentation.contractor.user.name"
            ></avatar>
            <h5>{{ presentation.contractor.user.name }}</h5>
          </div>
          <div class="d-flex align-items-end">
            <span class="identifier">Apresentação</span>
          </div>
        </div>
      </template>
      <template v-slot:main>
        <div class="boxed mb-4">
          <presentation-date :presentation="presentation"></presentation-date>
        </div>
        <div class="mx-4 mb-4 vertical center middle">
          <h3 class="mb-4">{{ presentation.proposal.title }}</h3>
          <span>{{ presentation.proposal.description }}</span>
        </div>
        <div class="boxed mb-4">
          <presentation-address :presentation="presentation"></presentation-address>
        </div>
        <div class="mb-2 horizontal center middle">
          <h6>Apresentação contratada</h6>
        </div>
        <div class="boxed mb-4">
          <presentation-price :presentation="presentation" class="horizontal center middle"></presentation-price>
        </div>
        <div>
          <presentation-product :presentation="presentation" hide-price></presentation-product>
        </div>
      </template>
      <template v-if="!readOnly" v-slot:footer>
        <div class="horizontal center middle mb-3">
          <div class="mr-5">
            <form-button @action="confirm" v-if="hasPresentationStarted">
              Confirmar Realização
            </form-button>
          </div>
          <div>
            <h5 v-if="!hasPresentationStarted" @click="openConfirmCancelModal">Cancelar</h5>
          </div>
        </div>
        <div v-if="hasPresentationStarted">
          <small>Apresentação realizada em {{ presentation.timeslot.start_dt | date }}, caso houve algum problema com a apresentação entrar em contato conosco imediatamente.</small>
        </div>
      </template>
    </modal>
    <modal ref="cancel" height="tiny">
      <template v-slot:main>
        <div class="horizontal middle center full-height">
          <h6 v-if="!hasPresentationStarted">Tem certeza que quer cancelar a apresentação? </h6>
          <h6 v-else>Não é possível cancelar a apresentação após sua data de realização</h6>
        </div>
      </template>
      <template v-slot:footer>
        <div class="horizontal center middle">
          <h6 class="clickable mr-4" @click="cancel">Sim, quero cancelar</h6>
          <form-button @action="closeCancelModal">Não, retornar para agenda</form-button>
        </div>
      </template>
    </modal>
    <presentation-feedback ref="feedback" @feedback="handleFeedback" :presentation="presentation"></presentation-feedback>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BasePresentation from '../base'

export default {
  extends: BasePresentation,
  props: {
    readOnly: { type: Boolean, default: true },
  },
  computed: {
    hasPresentationStarted() {
      return this.moment(this.presentation.timeslot.start_dt).isBefore(this.moment())
    }
  },
  methods: {
    ...mapActions('presentation', ['confirmPresentation', 'cancelPresentation']),
    openModal() {
      this.$refs.modal.open()
    },
    closeModal() {
      this.$refs.modal.close()
    },
    openConfirmCancelModal() {
      this.$refs.cancel.open()
    },
    closeCancelModal() {
      this.$refs.cancel.close()
    },
    async confirm() {
      await this.confirmPresentation(this.presentation.id)
      this.$toast.success("Obrigado por confirmar a realização da apresentação. Iniciaremos agora o procedimento de pagamento e você deverá receber em alguns dias.")
      this.$emit('completed')
      this.$refs.feedback.openModal()
    },
    async cancel() {
      try {
        await this.cancelPresentation(this.presentation.id)
        this.$toast.info("Apresentação cancelada")
        this.$emit('cancelled', this.presentation.id)
        this.closeCancelModal()
      } catch (error) {
        console.log(error)
        this.$toast.error(error)
      }
    },
    handleFeedback() {
      this.closeModal()
    }
  }
}
</script>

<style lang="scss" scoped>
.identifier {
  text-transform: uppercase;
  letter-spacing: $space / 2;
  color: $layer5;
  padding-right: 10 * $space;
  font-weight: $bold;
  border-bottom: 5px solid $layer3;
  border-radius: rounded;
}

.countdown {
  width: 100%;
  background: $layer3;
  box-shadow: $shadow;
  padding: 2 * $space;
  border-radius: $edges;
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
</style>
