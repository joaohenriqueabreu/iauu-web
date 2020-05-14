<template>
  <div>
    <label v-if="label" :for="name">{{ label }}</label>
    <v-selectize :name="name" :settings="settings">
      <option
        v-for="(option, index) in selectizeOptions"
        :key="index"
        :value="option.value"
        >{{ option.display }}
      </option>
    </v-selectize>
    <!-- <font-awesome v-if="icon" icon="icon"></font-awesome> -->
  </div>
</template>

<script>
import VueSelectize from 'vue2-selectize'
export default {
  components: {
    'v-selectize': VueSelectize
  },
  props: {
    options: { type: Array, default: () => [] },
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: 'Digite para procurar' },
    autoOpen: { type: Boolean, default: false },
    hideSelected: { type: Boolean, default: false }
  },
  computed: {
    settings() {
      const self = this
      return {
        openOnFocus: self.autoOpen,
        hideSelected: self.hideSelected,
        placeholder: self.placeholder,
        onChange(value) {
          if (value !== undefined && value !== null && value.length > 0) {
            self.$emit('selected', value)
          }
        }
      }
    },
    selectizeOptions() {
      return this.$collection.map(this.options, (option) => {
        return { value: option, display: option }
      })
    }
  },
  methods: {}
}
</script>

<style lang="scss">
// Selectize overwrites
.selectize-control {
  .selectize-input {
    background: $layer1;
    border: none;
    border-radius: $edges;
    box-shadow: $shadow;
    transition: $transition;
    &.items.not-full.has-options::after {
      display: none;
    }

    &:hover {
      background: $layer3;
    }

    &.focus.input-active {
      transition: $transition;
      background: $layer3;
      input {
        color: $brand;
        font-weight: $bold;
      }
    }
    input {
      width: 100%;
    }
  }
  .selectize-dropdown {
    transition: $transition;
    background: $layer1;
    color: $brand;

    .option.active {
      color: $brand;
      background: $layer2;
    }
  }
}
</style>

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
  background-color: $layer1;
  cursor: pointer;
  color: $white;
  font-weight: $bold;
  box-shadow: $lightShadow;

  padding: 5px;
  margin-bottom: $space;
  &:focus {
    outline-color: $layer1;
  }
  &:hover {
    background-color: $layer1;
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
