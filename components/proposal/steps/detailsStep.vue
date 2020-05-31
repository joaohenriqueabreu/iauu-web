<template>
  <div class="vertical center">
    <div class="half-width">
      <form-input
        v-model="title"
        class="mb-2"
        icon-helper="child"
        placeholder="Título do seu evento"
      ></form-input>
      <form-location placeholder="Onde será o evento?" @selected="changeLocation"></form-location>
      <form-textarea
        v-model="description"
        class="mb-2"
        :rows="3"
        placeholder="Conte mais sobre o seu evento"
      ></form-textarea>
      <file-uploader ref="fileUploader" @uploaded="documentUploaded"></file-uploader>
      <div class="vertical mb-5">
        <fade-transition group>
          <attachment
            v-for="(document, index) in documents"
            :key="index"
            :file="document"
            removable
            @remove="removeDocument(index)"
          ></attachment>
        </fade-transition>
      </div>
      <fade-transition>
        <submit-button v-show="validForm" @submit="$emit('next')">Avançar</submit-button>
      </fade-transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Step from '@/components/proposal/steps/step'

export default {
  extends: Step,
  data() {
    return {
      title: '',
      location: '',
      description: '',
      documents: []
    }
  },
  computed: {
    validForm() {
      return !this.$utils.empty(this.title) && !this.$utils.empty(this.location)
    }
  },
  watch: {
    title(title) {
      this.editProposal({ prop: 'title', value: title })
    },
    validForm(valid) {
      if (valid) {
        this.$emit('complete')
        return
      }

      this.$emit('incomplete')
    }
  },
  mounted() {
    this.title = this.proposal.title
    this.location = this.proposal.location
    this.description = this.proposal.description
    this.documents = this.proposal.documents
  },
  methods: {
    ...mapActions('contractor', ['editProposal']),
    changeLocation(location) {
      this.location = location
    },
    uploadDocument() {
      this.$refs.fileUploader.upload()
    },
    documentUploaded(document) {
      this.details.documents.push(document)
    }
  }
}
</script>
