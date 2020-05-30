<template>
  <div>
    <form @submit.prevent="submit">
      <main>
        <fade-transition mode="out-in">
          <!-- Timeslots is only required for dateSteps -->
          <component
            :is="stepComponent"
            :timeslots="timeslots"
            :proposal="proposal"
            :products="products"
            class="step"
            :steps="stepComponents"
            :completed-steps="completedSteps"
            @complete="completeStep"
            @incomplete="revertStep"
            @next="nextStep"
          ></component>
        </fade-transition>
      </main>
    </form>
    <footer class="row">
      <div class="col-2 d-flex justify-content-start">
        <!-- Including any content so that col- will be displayed eventhough the arrow btn is hidden -->
        &nbsp;
        <font-awesome v-show="canPrevious" icon="arrow-left" @click="previousStep"></font-awesome>
      </div>
      <div class="col-8 horizontal center middle">
        &nbsp;
        <steps-counter
          :steps="stepComponents.length"
          :completed="completedSteps"
          :current="currentStep"
          @goto="goToStep"
        ></steps-counter>
      </div>
      <div class="col-2 d-flex justify-content-end pr-3">
        &nbsp;
        <font-awesome v-show="canNext" icon="arrow-right" @click="nextStep"></font-awesome>
      </div>
    </footer>
  </div>
</template>

<script>
// import Proposal from '@/models/proposal'
import StepsCounter from '@/components/proposal/steps/counter'
import DateStep from '@/components/proposal/steps/dateStep'
import ProductStep from '@/components/proposal/steps/productStep'
import DocsStep from '@/components/proposal/steps/docsStep'
import DetailsStep from '@/components/proposal/steps/detailsStep'
import ConfirmStep from '@/components/proposal/steps/confirmStep'
export default {
  layout: 'guest',
  components: {
    'steps-counter': StepsCounter
  },
  // Load all required data for components (they get re-rendered everytime we switch components)
  // Variables are passed by reference so it's ok.
  async asyncData({ app, store, query }) {
    // Required for all components
    store.dispatch('event/resetProposal')

    await Promise.all([
      // Required for dateStep
      store.dispatch('schedule/loadSchedule', { id: query.id, year: app.$moment().year }),

      // Required for productsStep
      store.dispatch('artist/loadProducts', query.id)
    ])

    return {
      proposal: store.state.event.proposal,
      products: store.state.artist.products,
      timeslots: store.state.schedule.timeslots
    }
  },
  data() {
    return {
      currentStep: 0,
      completedSteps: [],
      stepComponents: [DateStep, ProductStep, DocsStep, DetailsStep, ConfirmStep]
    }
  },
  computed: {
    // ...mapState({ timeslots: (state) => state.schedule.timeslots }),
    stepComponent() {
      return this.stepComponents[this.currentStep]
    },
    canPrevious() {
      return this.currentStep > 0
    },
    canNext() {
      return this.currentStep < this.stepComponents.length - 1
    }
  },
  methods: {
    submit() {
      // do nothing for now
    },
    completeStep() {
      this.completedSteps.push(this.currentStep)
    },
    revertStep() {
      this.$delete(this.completedSteps, this.currentStep)
    },
    nextStep() {
      this.currentStep++
    },
    previousStep() {
      this.currentStep--
    },
    goToStep(step) {
      this.currentStep = step
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  // @extend .vertical, .center, .middle;
  padding: 4 * $space;
  .step {
    min-height: 75vh;
    width: 100%;
    background: $layer3 !important; // overwrite main.scss
    border-radius: $edges;
    box-shadow: $shadow;
    padding: 4 * $space;
    margin-bottom: 20vh;
  }
}

footer {
  @extend .horizontal, .middle;
  position: fixed;
  bottom: 0;
  background: $layer1;
  height: 10vh;
  width: 100vw;
  margin: 0;
  z-index: $moveToTop;

  [data-icon] {
    cursor: pointer;
    padding: 2 * $space;
    margin: 0 2 * $space;
    background: $layer5;
    width: 50px;
    height: 50px;
    border-radius: $rounded;
    box-shadow: $shadow;
    transition: $transition;

    &:hover {
      transition: $transition;
      background: $brandLayer;
    }
  }
}
</style>
