<template>
  <div class="container">
    <header>
      <div class="horizontal middle">
        <avatar
          :src="proposal.contractor.photo"
          :username="proposal.contractor.name"
        ></avatar>
        <h5>{{ proposal.contractor.name }}</h5>
      </div>
      <span class="identifier">Proposta</span>
    </header>
    <div></div>
    <main>
      <perfect-scrollbar>
        <event-info :event="proposal"></event-info>
      </perfect-scrollbar>
    </main>
    <footer>
      <div class="mr-5">
        <submit-button @submit="accept">Aceitar</submit-button>
      </div>
      <div>
        <h5 @click="reject">Recusar</h5>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EventInfo from '@/components/artist/eventInfo'

export default {
  components: {
    eventInfo: EventInfo
  },
  computed: {
    ...mapState({ proposal: (state) => state.event.proposal })
  },
  methods: {
    ...mapActions('event', ['acceptProposal', 'rejectProposal']),
    async accept() {
      try {
        await this.acceptProposal(this.proposal.id)
      } catch (error) {
      } finally {
        this.$emit('update')
      }
    },
    async reject() {
      try {
        await this.rejectProposal(this.proposal.id)
      } catch (error) {
      } finally {
        this.$emit('update')
      }
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
