<template>
  <div class="event">
    <h4>{{ eventDate(event) }}</h4>
    <div class="info">
      <div class="mb-3">
        <h5 class="mb-0">{{ event.title }}</h5>
        <small>{{ getOtherParty(event) }}</small>
      </div>
      <div class="horizontal">
        <h6 class="mr-5">
          <font-awesome icon="clock" class="mr-2"></font-awesome>
          {{ eventTime(event) }}
        </h6>
        <span class="">
          <font-awesome icon="map-marker-alt" class="mr-2"></font-awesome>
          {{ event.location.address }}, {{ event.location.city }},
          {{ event.location.state }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: { type: Object, default: () => {} }
  },
  computed: {},
  methods: {
    eventDate(event) {
      return this.moment(event.start_dt).format(this.$config.dateFormat)
    },
    eventTime(event) {
      return (
        this.moment(event.start_dt).format(this.$config.timeFormat) +
        ' - ' +
        this.moment(event.end_dt).format(this.$config.timeFormat)
      )
    },
    getOtherParty(event) {
      if (this.$auth.hasScope('artist')) {
        return event.contractor.name
      }

      return event.artist.name
    }
  }
}
</script>

<style lang="scss" scoped>
.event {
  @extend .full-width, .horizontal, .middle, .clickable;
  margin-bottom: 3 * $space;
  padding: 2 * $space;
  background: $layer3;
  box-shadow: $shadow;
  border-radius: $edges;
  transition: $transition;

  h4 {
    margin-right: 4 * $space;
  }

  .info {
    border-left: 5px solid $layer2;
    padding-left: 4 * $space;
  }

  &:hover {
    transition: $transition;
    background: $layer4;
  }
}
</style>
