<template>
  <div>
    <div v-if="short">
      <div v-if="rating > 0">
        <font-awesome class="icon mr-1" icon="star"></font-awesome>
        <small class="bold">{{ rating }}</small>
      </div>
    </div>
    <div v-else class="horizontal center middle">
      <div v-if="filledStars > 0">
        <font-awesome v-for="star in filledStars" :key="star" class="icon" icon="star">
        </font-awesome>
      </div>
      <div v-if="halfStar">
        <font-awesome-icon class="icon" icon="star-half-alt"></font-awesome-icon>
      </div>
      <div v-if="noStar > 0">
        <font-awesome v-for="star in noStar" :key="`-${star}`" class="icon" :icon="['far', 'star']">
        </font-awesome>
      </div>
      <div v-if="amount > 0">
        <small>({{ amount }})</small>
      </div>
    </div>
  </div>
</template>

<script>
const MAX_RATE = 5
export default {
  props: {
    rating: { type: Number, default: 1 },
    amount: { type: Number, default: 0 },
    short: { type: Boolean, default: false }
  },
  computed: {
    filledStars() {
      return Math.floor(this.rating)
    },
    halfStar() {
      return Math.round(this.rating) > this.filledStars
    },
    noStar() {
      return MAX_RATE - (this.filledStars + this.halfStar)
    }
  }
}
</script>

<style></style>
