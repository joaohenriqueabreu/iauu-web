<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      :value="value"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    />
    <font-awesome v-if="icon" icon="icon"></font-awesome>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [String, Number, Boolean], default: null },
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    icon: { type: String, default: null },
    disabled: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
label {
  font-weight: $bold;
  margin-bottom: 5px;
  color: $brand;
}

input,
textarea {
  width: 100%;
  // border: 2px solid $white;
  border: none;
  border-radius: 10px;
  outline-color: transparent;
  font-size: $regular;
  resize: none;
  background-color: $darkBG;
  color: $white;
  font-weight: $bold;
  box-shadow: $lightShadow;

  padding: 5px;
  &:focus {
    outline-color: transparent;
  }
  &:hover {
    background-color: $darkBG;
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
