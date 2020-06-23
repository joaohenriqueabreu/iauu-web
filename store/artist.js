import Vue from 'vue'
import Product from '@/models/product'

export const state = () => ({
  products: [],
  artist: {}
})

export const mutations = {
  set_artist(state, artistData) {
    state.artist = { ...artistData }
  },
  set_products(state, productsData) {
    state.products = []
    productsData.forEach((productData) => {
      state.products.push(new Product(productData))
    })
  },
  set_product(state, productData) {
    state.products.unshift(new Product(productData))
  },
  remove_product(state, id) {
    Vue.delete(
      state.products,
      this.$array.findIndex(state.products, (product) => product.id === id)
    )
  }
}

export const actions = {
  async loadArtist({ commit }) {
    const { data } = await this.$axios.get('artists/profile')
    commit('set_artist', data)
  },
  async loadProducts({ commit }, id) {
    const { data } = await this.$axios.get(`products/${id}`)
    commit('set_products', data)
  },
  async saveProduct({ commit }, product) {
    const { data } = await this.$axios.post('products', product)

    // Reactivity only watches for push operations and does not recognize assignment
    if (!this.$utils.empty(product.id)) {
      commit('remove_product', data.id)
    }

    // This will also allows for new products / edits to move to the top of the array
    commit('set_product', data)
  },
  async removeProduct({ commit }, id) {
    await this.$axios.delete(`products/${id}`)
    commit('remove_product', id)
  }
}

export const getters = {}
