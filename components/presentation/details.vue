<template>
  <div>
    <div class="horizontal center middle">
      <h1 class="cap">{{ presentation.proposal.title }}</h1>
    </div>
    <div class="boxed">
      <div v-if="presentation.status === 'proposal'" class="vertical center middle mb-4">
        <h6 class="mb-4">Escolha uma opção de horário para a apresentação:</h6>
        <pick-timeslot
          :default="presentation.timeslot"
          :timeslots="presentation.proposal.timeslots"
          @selected="selectedTimeslot"
        >
        </pick-timeslot>
      </div>
      <div v-else>
        <h4>
          <font-awesome icon="calendar-alt"></font-awesome>
          {{ eventDate }}
        </h4>
        <h5>{{ eventTime }}</h5>
      </div>
      <div v-if="!$empty(presentation.address)" class="horizontal middle">
        <font-awesome icon="map-marker-alt"></font-awesome>
        <a :href="encodedMapsLocation" target="_blank">
          <h6>{{ presentation.address.display }}</h6>
        </a>
      </div>
    </div>
    <div>
      <span>{{ presentation.description }}</span>
    </div>
    <div class="boxed vertical position-relative">
      <!-- TODO b-tooltip failing -->
      <!-- <div
            v-b-tooltip.hover
            class="position-absolute"
            title="Este foi selecionado no momento da proposta. Caso tenha mudado ou não existe mais cancele a mesma."
          > -->
      <!-- <font-awesome icon="info"></font-awesome>
          </div> -->
      <div>
        <h5>Produto selecinado <u>{{ selectedProduct }}</u></h5>
      </div>
      <div>
        <h6>
          <font-awesome icon="dollar-sign"></font-awesome>
          {{ presentation.proposal.product.price }}
        </h6>
      </div>
      <div>
        <h6>
          <font-awesome icon="clock"></font-awesome>
          {{ presentation.proposal.product.duration }}
          {{ $utils.pluralize('hora', presentation.proposal.product.duration) }}
        </h6>
      </div>
    </div>
    <div class="attachments">
      <attachment v-for="(file, index) in presentation.files" :key="index" :file="file">
      </attachment>
    </div>
  </div>
</template>

<script>
import PickTimeslot from '@/components/presentation/timeslot'
import Attachment from '@/components/form/attachment'
export default {
  components: {
    attachment: Attachment,
    'pick-timeslot': PickTimeslot
  },
  props: {
    presentation: { type: Object, default: () => {} }
  },
  computed: {
    encodedMapsLocation() {
      if (!this.$empty(this.presentation.address)) {
        return encodeURI(`http://maps.google.com/maps?q=${this.presentation.address.display}`)
      }

      return ''
    },
    eventTime() {
      return (
        this.moment(this.presentation.start_dt).format(this.$config.timeFormat) +
        ' - ' +
        this.moment(this.presentation.end_dt).format(this.$config.timeFormat)
      )
    },
    eventDate() {
      return this.moment(this.presentation.start_dt).format(this.$config.dateFormat)
    },
    isCustomProduct() {
      return this.presentation.proposal.product.custom
    },
    selectedProduct() {
      return this.isCustomProduct ? 'Personalizado' : this.presentation.proposal.product.name
    }
  },
  methods: {
    selectedTimeslot(timeslot) {
      this.$emit('selected-timeslot', timeslot)
    }
  }
}
</script>

<style lang="scss" scoped>
[data-icon] {
  font-size: $large;
  font-weight: $bold;
  color: $brand;
}

div {
  margin-bottom: 3 * $space;
}

.boxed {
  @extend .vertical, .middle;
  text-align: left;
  background: $layer4;
  border-radius: $edges;
  padding: 2 * $space;
  margin-left: 3 * $space;
  margin-right: 3 * $space;

  h6 {
    margin-right: 5 * $space;
  }

  h4 {
    margin-right: 4 * $space;
    padding-right: 4 * $space;
    border-right: 5px solid $layer3;
  }

  .position-absolute {
    @extend .vertical, .middle, .center;
    transition: $transition;
    top: 5px;
    right: 5px;
    padding: 5px;
    width: 30px;
    height: 30px;
    border-radius: $rounded;
    box-shadow: $shadow;
    background: $layer5;
    color: $brand;
    padding-left: 18px;
    cursor: pointer;
    &:hover {
      transition: $transition;
      background: $brand;
      color: $layer5;
    }
  }
}

.attachments {
  @extend .horizontal, .middle;
  flex-wrap: wrap;
}
</style>
