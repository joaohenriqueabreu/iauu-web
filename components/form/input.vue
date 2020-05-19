<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      v-if="!rows && !isMasked"
      :value="value"
      type="text"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    />
    <input
      v-if="isMasked"
      v-mask="getMask"
      :value="value"
      type="text"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      v-if="rows && !isMasked"
      :value="value"
      :rows="rows"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <font-awesome v-if="icon" icon="icon"></font-awesome>
  </div>
</template>

<script>
import VueFilters from 'vue2-filters'
export default {
  filters: {
    getFilter(value, type) {
      // const convertToNumber = (value, precision) => {
      //   return value.toString().replace(/\D/g, '')
      // }

      if (type === 'numeric') {
        return VueFilters.Number(value)
      }

      return value
    }
  },
  props: {
    rows: { type: Number, default: 0 },
    value: { type: [String, Number, Boolean], default: null },
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    icon: { type: String, default: null },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    isMasked() {
      return ['phone', 'document'].includes(this.type)
    },
    getMask() {
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  font-weight: $bold;
  margin-bottom: 2 * $space;
  margin-right: 2 * $space;
  color: $brand;
  text-transform: capitalize;
}

input,
textarea {
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
  padding: 2 * $space 1.5 * $space;
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

[data-icon] {
  opacity: 0.5;
  position: absolute;
  right: 20px;
  top: 40%;
}

div.error {
  position: absolute;
  bottom: -30px;
}
</style>
