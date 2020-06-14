<template>
  <div class="container">
    <modal ref="modal">
      <template v-slot:header>
        <div class="horizontal d-flex justify-content-between">
          <div class="horizontal middle">
            <avatar
              :src="proposal.contractor.photo.url"
              :username="proposal.contractor.name"
            ></avatar>
            <h5>{{ proposal.contractor.name }}</h5>
          </div>
          <div class="d-flex align-items-end">
            <span class="identifier">Proposta</span>
          </div>
        </div>
      </template>
      <template v-slot:main>
        <event-details :event="proposal"></event-details>
      </template>
      <template v-slot:footer>
        <div class="horizontal center middle full-height">
          <div class="mr-5">
            <form-button @callback="accept">Aceitar</form-button>
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
import EventDetails from '@/components/artist/eventDetails'

export default {
  components: {
    'event-details': EventDetails
  },
  props: {
    proposal: { type: Object, default: () => {} }
  },
  methods: {
    openModal() {
      return this.$refs.modal.open()
    },
    closeModal() {
      return this.$refs.modal.close()
    },
    accept() {
      this.$emit('accept', this.proposal.id)
    },
    reject() {
      this.$emit('reject', this.proposal.id)
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
    color: $layer3;
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
