<template>
  <div class="vertical center middle">
    <h5 class="mb-4">Produto selecionado <u>{{ selectedProduct }}</u></h5>    
    <div class="vertical middle center">
      <perfect-scrollbar>
        <div v-for="(item, index) in presentation.proposal.product.items" :key="index">
          {{ item }}
          <hr>
        </div>
      </perfect-scrollbar>
    </div>
  </div>  
</template>

<script>
import BasePresentation from './base'
export default {
  extends: BasePresentation,
  props: {
    presentation: { type: Object, default: () => {}}
  },
  methods: {
    isCustomProduct() {
      return this.presentation.proposal.product.custom || this.presentation.proposal.product.name === 'custom'
    },
  },
  computed: {
    selectedProduct() {
      return this.isCustomProduct() ? 'Personalizado' : this.presentation.proposal.product.name
    }
  }
}
</script>

<style lang="scss" scoped>
.ps {
  max-height: 20vh;
}
</style>