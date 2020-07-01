<template>
  <table class="table table-dark">
    <thead>
      <tr>
        <th>
          <div class="clickable horizontal middle" @click="openProductForm">
            <span class="mr-2">Adicione Produtos aos seus formatos</span>
            <font-awesome icon="plus"></font-awesome>
          </div>
        </th>
        <th v-for="(product, prodIndex1) in products" :key="prodIndex1">
          <div class="clickable horizontal center middle" @click="openProductForm(product)">
            <font-awesome icon="edit" class="mb-2 ml-2"></font-awesome>
            <h5 class="mb-2 cap">{{ product.name }}</h5>
          </div>
          <h6 class="horizontal center middle">
            {{ product.price | currency }}
            <span class="mr-4"></span>
            <font-awesome icon="clock" class="mr-1"></font-awesome> {{ product.duration }}
          </h6>
        </th>
      </tr>
    </thead>
    <tbody v-if="products.length > 0">
      <div v-if="$utils.empty(productItems)">
        <tr v-for="(sample, sampleIndex) in sampleItems" :key="sampleIndex"></tr>
      </div>

      <tr v-for="(item, itemIndex) in productItems" :key="itemIndex">
        <td class="vertical" @click="openItemForm(item)">
          <h6>{{ item.name }}</h6>
          <span class="small">{{ item.description }}</span>
        </td>
        <td v-for="(product, prodIndex2) in products" :key="prodIndex2" class="text-center">
          <font-awesome
            :class="hasItem(product, item) ? 'active' : 'inactive'"
            icon="check"
            class="select"
            @click="pushItem(item, product)"
          ></font-awesome>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import ProductItemRow from '@/components/artist/product/row'
export default {
  // components: {
  //   'product-item-row': ProductItemRow
  // },
  data() {
    return {
      products: {}
    }
  }
}
</script>

<style></style>
