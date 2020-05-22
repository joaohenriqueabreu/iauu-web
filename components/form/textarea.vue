<template>
  <div>
    <label :for="name">{{ label }}</label>
    <textarea
      v-if="isTextArea"
      :value="value"
      :rows="rows"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('enter', value)"
    ></textarea>
  </div>
</template>

<script>
import Input from '@/components/form/input'
export default {
  extends: Input,
  props: {
    rows: { type: Number, default: 3 }
  }
}
</script>

<style></style>
