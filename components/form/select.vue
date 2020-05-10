<template>
  <div>
    <label :for="name"></label>
    <v-selectize
      v-model="something"
      :name="name"
      :settings="settings"
      @input="optionSelected"
    >
      <option
        v-for="(option, index) in selectizeOptions"
        :key="index"
        :value="option.display"
        >{{ option.display }}
      </option>
    </v-selectize>
    <font-awesome v-if="icon" icon="icon"></font-awesome>
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
    icon: { type: String, default: 'arrow-down' },
    placeholder: { type: String, default: 'Digite para procurar' }
  },
  data() {
    return {
      selectizeOptions: [],
      something: ''
    }
  },
  computed: {
    settings() {
      const self = this
      return {
        maxOptions: 3,
        placeholder: self.placeholder,
        onChange(value) {
          self.$emit('select', value)
        }
      }
    }
  },
  mounted() {
    // convert into selectize format
    const self = this
    this.$collection.forEach(this.options, function(option) {
      self.selectizeOptions.push({ display: option })
    })
  },
  methods: {
    optionSelected(value) {
      this.$emit('select', value)
    }
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

// Selectize overwrites
.selectize-input.items.not-full {
  input {
    &::after {
      display: none;
    }
  }
}
</style>
