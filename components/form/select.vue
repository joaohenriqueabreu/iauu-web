<template>
  <div>
    <label :for="name"></label>
    <select :name="name">
      <option v-for="(option, index) in options" :key="index">{{
        option
      }}</option>
    </select>
    <font-awesome v-if="icon" icon="icon"></font-awesome>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, default: () => [] },
    name: { type: String, default: '' },
    icon: { type: String, default: 'arrow-down' }
  }
}
</script>

<style lang="scss" scoped>
label {
  font-weight: $bold;
  margin-bottom: 5px;
  color: $brand;
}

select {
  width: 100%;
  border: none;
  border-radius: 10px;
  outline-color: transparent;
  font-size: $regular;
  resize: none;
  background-color: $darkBG;
  cursor: pointer;
  color: $white;
  font-weight: $bold;
  box-shadow: $lightShadow;

  padding: 5px;
  margin-bottom: $space;
  &:focus {
    outline-color: $darkBG;
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
