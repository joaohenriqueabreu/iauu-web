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
          <presentation-product :presentation="presentation"></presentation-product>
        </div>
      </template>
      <template v-if="!readOnly" v-slot:footer>
        <div class="horizontal center middle full-height">
          <div class="mr-5">
            <form-button @action="confirm">
              Confirmar Realização
            </form-button>
          </div>
          <div>
            <h5 v-if="!hasPresentationStarted" @click="cancel">Cancelar</h5>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import BasePresentation from './base'

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
    openModal() {
      this.$refs.modal.open()
    },
    closeModal() {
      this.$refs.modal.close()
    },
    confirm() {
      this.$emit('confirm', this.presentation.id)
    },
    cancel() {
      this.$emit('cancel', this.presentation.id)
    },
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
