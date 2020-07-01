import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import Product from '@/models/product'

export const state = () => ({
  products: [],
  artist: {}
})

export const mutations = {
  updateField,
  set_artist(state, artistData) {
    state.artist = { ...artistData }
  },
  update_profile(state, { prop, data }) {
    if (prop === undefined) {
      return
    }

    const props = prop.split('.')
    const field = props.pop()
    let profile = state.artist

    props.forEach((field) => {
      profile = profile[field]
    })

    Vue.set(profile, field, data)
  },
  set_products(state, productsData) {
    state.products = []
    productsData.forEach((productData) => {
      state.products.push(new Product(productData))
    })
  },
  set_product(state, productData) {
    state.products.push(new Product(productData))
  },
  remove_product(state, id) {
    Vue.delete(
      state.products,
      this.$array.findIndex(state.products, (product) => product.id === id)
    )
  },
  add_item_to_product(state, { item, product }) {
    state.products[product.id].item.push(item)
    Vue.set(state.products, product.id, item)
  }
}

export const actions = {
  async loadArtist({ commit }) {
    const { data } = await this.$axios.get('artists/profile')
    commit('set_artist', data)
  },
  async saveProfile({ commit, state }) {
    await this.$axios.put('artists/profile', { profile: state.artist })
    this.$toast.success('Artista atualizado com sucesso')
  },
  async loadProducts({ commit }) {
    const { data } = await this.$axios.get('artist/products')
    commit('set_products', data)
  },
  async saveProduct({ commit }, product) {
    const { data } = await this.$axios.post('artist/products', { product })
    commit('set_products', data)

    // Reactivity only watches for push operations and does not recognize assignment
    // if (!this.$utils.empty(product.id)) {
    //   commit('remove_product', data.id)
    // }

    // This will also allows for new products / edits to move to the top of the array
    // commit('set_product', data)
  },
  async removeProduct({ commit }, id) {
    await this.$axios.delete(`products/${id}`)
    commit('remove_product', id)
  },
  addItemToProduct({ commit }, data) {
    commit('add_item_to_product', data)
  }
}

export const getters = {
  getField
}
