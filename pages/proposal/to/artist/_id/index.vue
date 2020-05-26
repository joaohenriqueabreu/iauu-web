<template>
  <div>
    <form @submit.prevent="submit">
      <main>
        <fade-transition mode="out-in">
          <component
            :is="stepComponent"
            class="step"
            :completed="completed"
            @complete="completeStep"
          ></component>
        </fade-transition>
      </main>
    </form>
    <footer class="row">
      <div class="col-4">
        <!-- Including any content so that col- will be displayed eventhough the arrow btn is hidden -->
        &nbsp;
        <font-awesome v-show="canPrevious" icon="arrow-left" @click="previousStep"></font-awesome>
      </div>
      <div class="col-4 horizontal center middle">
        &nbsp;
        <steps-counter :steps="stepComponents.length" :completed="completedSteps"></steps-counter>
      </div>
      <div class="col-4 d-flex justify-content-end">
        &nbsp;
        <font-awesome v-show="canNext" icon="arrow-right" @click="nextStep"></font-awesome>
      </div>
    </footer>
  </div>
</template>

<script>
import StepsCounter from '@/components/proposal/steps/counter'
import DateStep from '@/components/proposal/steps/dateStep'
import DocsStep from '@/components/proposal/steps/docsStep'
import DetailsStep from '@/components/proposal/steps/detailsStep'
import ConfirmStep from '@/components/proposal/steps/confirmStep'
export default {
  layout: 'guest',
  components: {
    'steps-counter': StepsCounter
  },
  // Load artist schedule, required for dateStep
  async asyncData({ store, query }) {
    await store.dispatch('schedule/loadSchedule', {
      id: query.id, // artist id
      year: new Date().getFullYear()
    })
  },
  data() {
    return {
      currentStep: 0,
      completedSteps: [],
      stepComponents: [DateStep, DocsStep, DetailsStep, ConfirmStep]
    }
  },
  computed: {
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
      this.nextStep()
    },
    nextStep() {
      this.currentStep++
    },
    previousStep() {
      this.currentStep--
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  // @extend .vertical, .center, .middle;
  padding: 4 * $space;
  .step {
    height: 70vh;
    width: 100%;
    background: $layer3 !important; // overwrite main.scss
    border-radius: $edges;
    box-shadow: $shadow;
    padding: 4 * $space;
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
