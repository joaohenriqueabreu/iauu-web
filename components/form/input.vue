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
        @input="emitInput"
        @keyup.enter.prevent="emitEnter"
      />
      <font-awesome v-if="iconHelper" :icon="iconHelper"></font-awesome>
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
    default: { type: [String, Number, Boolean], default: null },
    model: { type: Object, default: () => {} },
    prop: { type: String, default: '' },
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: null }
  },
  data() {
    return {
      value: { type: [String, Number, Boolean], default: null }
    }
  },
  computed: {
    type() {
      return 'text'
    },
    iconHelper() {
      return !this.$utils.empty(this.icon) ? this.icon : 'search'
    }
  },
  mounted() {
    if (!this.$utils.empty(this.model)) {
      this.value = this.model[this.prop]
      return
    }

    if (!this.$utils.empty(this.default)) {
      this.value = this.default
      return
    }

    this.value = ''
  },
  methods: {
    emitInput(event) {
      this.$emit('input', this.getData())
    },
    emitEnter(event) {
      this.$emit('enter', this.getData())
    },
    getData() {
      return !this.$utils.empty(this.model)
        ? { prop: this.prop, data: event.target.value }
        : event.target.value
    }
  }
}
</script>

<style lang="scss">
.form-input {
  position: relative;
  width: 100%;

  [data-icon] {
    position: absolute;
    opacity: 0.5;
    bottom: 50%;
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
    border-radius: $edges;
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

    &:focus,
    &:active {
      border-top-color: transparent;
      border-bottom-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;

      border: none;
      outline: none;

      transition: $transition;
      background: $layer5;
      color: $brand;
    }
    &:hover {
      background-color: $layer5;
    }
  }

  div.error {
    position: absolute;
    bottom: -30px;
  }
}
</style>
