import Vue from 'vue'
import Product from '@/models/product'

export const state = () => ({
  products: {}
})

export const mutations = {
  set_products(state, productsData) {
    state.products = {}
    productsData.forEach((productData) => {
      state.products[productData.id] = new Product(productData)
    })
  },
  add_product(state, productData) {},
  remove_product(state, id) {
    Vue.delete(state.products, id)
  }
}

export const actions = {
  async loadProducts({ commit }) {
    const { data } = await this.$http.get('products')
    commit('set_products', data)
  },
  async removeProduct({ commit }, id) {
    await this.$http.delete(`products/${id}`)
    commit('remove_product', id)
  }
}

export const getters = {}
