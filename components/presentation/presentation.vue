<template>
  <div>
    <modal ref="modal">
      <template v-slot:header>
        <div class="horizontal d-flex justify-content-between">
          <div v-if="!$empty(presentation.contractor)" class="horizontal middle">
            <avatar
              class="mr-4"
              :src="presentation.contractor.photo"
              :username="presentation.contractor.name"
            ></avatar>
            <h5>{{ presentation.contractor.name }}</h5>
          </div>
          <div class="d-flex align-items-end">
            <span class="identifier">Apresentação</span>
          </div>
        </div>
      </template>
      <template v-slot:main>
        <div class="my-4 countdown horizontal middle center">
          <countdown v-if="!isPresentationPast" :time="timeUntilPresentation">
            <template slot-scope="props">
              <h5>
                Faltam {{ props.days }} dias : {{ props.hours }} horas : {{ props.minutes }} minutos
              </h5>
            </template>
          </countdown>
          <div v-else>
            <p>
              Conta pra gente como foi a apresentação!
              <a href="#" @click.prevent="confirm">Confirme a Realização</a> para podermos finalizar
              o processo de pagamento.
            </p>
            <p>
              Caso a apresentação não seja confirmada por ambas as partes em até
              <b>{{ $config.closePresentationDeadline }} dias</b> ela será automaticamente
              encerrada.
            </p>
          </div>
        </div>
        <event-details :event="presentation"></event-details>
      </template>
      <template v-if="!readOnly" v-slot:footer>
        <div class="horizontal center middle full-height">
          <div class="mr-5">
            <form-button @action="confirm">
              Confirmar Realização
            </form-button>
          </div>
          <div>
            <h5 v-if="!isPresentationPast" @click="cancel">Cancelar</h5>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown'
import EventDetails from '@/components/presentation/details'

export default {
  components: {
    countdown: VueCountdown,
    eventDetails: EventDetails
  },
  props: {
    readOnly: { type: Boolean, default: true },
    presentation: { type: Object, default: () => {} }
  },
  computed: {
    timeUntilPresentation() {
      return this.moment
        .duration(this.moment().diff(this.moment(this.presentation.start_dt)))
        .as('milliseconds')
    },
    isPresentationPast() {
      // const endDate = this.moment(this.presentation.end_dt)
      // const now = this.moment()
      // TODO usar moment#isAfter
      return false
    }
  },
  methods: {
    openModal() {
      this.$refs.modal.open()
    },
    closeModal() {
      this.$refs.modal.close()
    },
    confirm() {
      this.$emit('confirm', this.presentation.id)
      // try {
      //   await this.confirmPresentation(this.presentation.id)
      // } catch (error) {
      // } finally {
      //   this.$emit('update')
      // }
    },
    cancel() {
      this.$emit('cancel', this.presentation.id)
      // try {
      //   await this.cancelPresentation(this.presentation.id)
      // } catch (error) {
      // } finally {
      //   this.$emit('update')
      // }
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
