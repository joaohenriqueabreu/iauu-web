<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <!-- item name -->
          <th></th>
          <th v-for="(product, prodIndex1) in products" :key="prodIndex1">
            <div class="clickable horizontal center middle" @click="$emit('edit-product', product)">
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
  </div>
</template>

<script>
export default {
  props: {
    products: { type: Array, default: () => {} }
  }
}
</script>

<style lang="scss">
.table {
  td,
  th {
    transition: $transition;
    color: $brand;
    &:hover {
      transition: $transition;
      color: $brandLayer;
    }
  }
}
</style>
