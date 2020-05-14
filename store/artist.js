import Product from '@/models/product'

export const state = () => ({
  products: []
})

export const mutations = {
  set_products(state, productsData) {
    state.products = []
    productsData.forEach((productData) => {
      state.products.push(new Product(productData))
    })
  },
  add_product(state, productData) {},
  remove_product(state, productData) {}
}

export const actions = {
  async loadProducts({ commit }) {
    const { data } = await this.$http.get('products')
    commit('set_products', data)
  }
}

export const getters = {}
