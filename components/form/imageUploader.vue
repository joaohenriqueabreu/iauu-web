<template>
  <div>
    <overlay></overlay>
    <div @click.prevent="upload">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import * as filestack from 'filestack-js'

export default {
  data() {
    return {
      uploadClient: { type: Object, default: () => {} }
    }
  },
  created() {
    this.client = filestack.init(process.env.fileStackApiKey)
  },
  methods: {
    upload() {
      const options = {
        lang: 'pt',
        fromSources: ['local_file_system', 'url', 'instagram', 'webcam'],
        accept: ['image/*'],
        onUploadDone: this.uploaded
      }
      this.client.picker(options).open()
    },
    uploaded({ filesUploaded }) {
      this.$emit('uploaded', filesUploaded[0])
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  cursor: pointer;
  position: relative;
  &:hover {
    opacity: 0.5;
    &:before {
      content: 'upload';
    }
  }
}
</style>
