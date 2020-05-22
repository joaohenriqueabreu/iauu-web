<template>
  <div>
    <label :for="name">{{ label }}</label>
    <div class="form-input">
      <input
        :value="value"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="$emit('enter', value)"
      />
      <font-awesome v-if="icon" :icon="icon"></font-awesome>
    </div>
  </div>
</template>

<script>
import VueFilters from 'vue2-filters'
export default {
  filters: {
    getFilter(value, type) {
      if (type === 'numeric') {
        return VueFilters.Number(value)
      }

      return value
    }
  },
  props: {
    value: { type: [String, Number, Boolean], default: null },
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    iconHelper: { type: String, default: null }
  },
  computed: {
    type() {
      return 'text'
    },
    icon() {
      return !this.$utils.isEmpty(this.iconHelper) ? this.iconHelper : 'search'
    }
  }
}
</script>

<style lang="scss">
.form-input {
  position: relative;

  [data-icon] {
    position: absolute;
    opacity: 0.5;
    bottom: 35%;
    right: 0;
  }

  label {
    font-weight: $bold;
    margin-bottom: 2 * $space;
    margin-right: 2 * $space;
    color: $brand;
    text-transform: capitalize;
  }

  input,
  textarea,
  select {
    transition: $transition;
    width: 100%;
    border: none;
    border-radius: 10px;
    outline-color: transparent;
    font-size: $regular;
    resize: none;
    background-color: $layer1;
    color: $white;
    font-weight: $bold;
    box-shadow: $lightShadow;
    margin-bottom: 2 * $space;
    padding: 2 * $space 5 * $space 2 * $space 2 * $space;
    cursor: pointer;

    &:focus {
      outline-color: transparent;
    }

    &:focus {
      transition: $transition;
      background: $layer5;
      color: $brand;
    }
    &:hover {
      background-color: $layer5;
    }
  }

  // [data-icon] {
  //   opacity: 0.5;
  //   position: absolute;
  //   right: 20px;
  //   top: 40%;
  // }

  div.error {
    position: absolute;
    bottom: -30px;
  }
}
</style>
