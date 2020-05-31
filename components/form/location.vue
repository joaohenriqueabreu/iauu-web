<template>
  <div>
    <label :for="name">{{ label }}</label>
    <div class="form-input">
      <input ref="placesElement" :placeholder="placeholder" type="text" @input="locationInput" />
      <font-awesome icon="map-marker-alt"></font-awesome>
    </div>

    <input ref="formElement" name="location" type="hidden" />
  </div>
</template>

<script>
import FormInput from '@/components/form/input'
const MIN_PLACES_TRIGGER_LENGTH = 3
const PLACES_OPTIONS = {
  types: ['(cities)'],
  fields: ['address_component', 'geometry'],
  componentRestrictions: { country: 'br' }
}
export default {
  extends: FormInput,
  data() {
    return {
      autocomplete: {},
      autocompleteStatus: true,
      selectedPlace: String,
      google: Object
    }
  },
  watch: {
    selectedPlace(place) {
      this.$refs.formElement.value = place
    }
  },
  mounted() {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      this.$refs.placesElement,
      PLACES_OPTIONS
    )
  },
  methods: {
    locationInput(event) {
      if (
        this.$refs.placesElement.value.length > MIN_PLACES_TRIGGER_LENGTH &&
        this.autocompleteStatus
      ) {
        this.disableAutocomplete()
        this.autocomplete.addListener('place_changed', this.placeChanged)
      }
    },
    placeChanged() {
      this.selectedPlace = JSON.stringify(this.autocomplete.getPlace())
      this.$emit('selected', this.selectedPlace)
    },
    resetPlace() {
      this.selectedPlace = null
    },
    disableAutocomplete() {
      this.autocompleteStatus = false
    }
  }
}
</script>

<style lang="scss">
// Overwrite places-autocomplete style
.pac-container {
  background: $layer1;
  color: $brand;
  border-top: none;
  padding: $space;
  font-family: Gotham;
  .pac-item {
    // background: $layer2;
    cursor: pointer;
    border-top: none;
  }
  .pac-item-query {
    color: $brandLayer;
  }
  .pac-logo {
    color: $layer2;
  }
}
</style>
