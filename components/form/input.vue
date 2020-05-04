<template>
  <div>
    <label :for="name"></label>
    <input
      :value="value"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [String, Number], default: '' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' }
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
  border: 2px solid $white;
  border-radius: 10px;
  outline-color: transparent;
  font-size: $regular;
  resize: none;
  background-color: transparent;
  color: $white;
  font-weight: $bold;

  padding: 5px;
  margin-bottom: $space;
  &:focus {
    outline-color: transparent;
  }
  &:hover {
    background-color: transparent;
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
