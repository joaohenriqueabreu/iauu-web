import Vue from 'vue'
import Product from '@/models/product'

export const state = () => ({
  products: {}
})

export const mutations = {
  set_products(state, productsData) {
    state.products = {}
    productsData.forEach((productData) => {
      Vue.set(state.products, productData.id, new Product(productData))
    })
  },
  set_product(state, productData) {
    Vue.set(state.products, productData.id, new Product(productData))
  },
  remove_product(state, id) {
    Vue.delete(state.products, id)
  }
}

export const actions = {
  async loadProducts({ commit }) {
    const { data } = await this.$http.get('products')
    commit('set_products', data)
  },
  async saveProduct({ commit }, product) {
    const { data } = await this.$http.post('products', product)
    commit('set_product', data)
  },
  async removeProduct({ commit }, id) {
    await this.$http.delete(`products/${id}`)
    commit('remove_product', id)
  }
}

export const getters = {}
