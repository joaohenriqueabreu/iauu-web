<template>
  <div>
    <div class="vertical center middle">
      <h6 class="mb-4">Qual tipo de apresentação sua empresa realiza?</h6>
    </div>
    <fade-transition mode="out-in">
      <div v-show="!selectedCategory" class="horizontal center middle">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="img-box"
          @click="getSubcategories(category)"
        >
          <h6>
            {{ category.name }}
          </h6>
          <overlay :selected="isCategorySelected(category.id)">
            <avatar :src="categoryImg(category.name)" :size="70" />
          </overlay>
        </div>
      </div>
    </fade-transition>
    <fade-transition mode="out-in">
      <div v-show="selectedCategory" class="vertical center middle mb-4">
        <overlay :rounded="true">
          <avatar :src="categoryImg(selectedCategory)" :size="70" />
        </overlay>
        <div class="mb-2"></div>
        <div class="horizontal center middle">
          <h6 class="mr-2">{{ selectedCategory }}</h6>
          <small @click="changeCategory">Trocar</small>
        </div>
      </div>
    </fade-transition>
    <div
      v-show="selectedCategory !== null && selectedCategory.length > 0"
      class="subcategory-select"
    >
      <h6></h6>
      <form-select
        :options="subCategoryOptions"
        :auto-open="true"
        :hide-selected="false"
        label="Selecione os estilos de apresentação"
        @selected="addSubcategory"
      ></form-select>
    </div>
    <div class="mb-4"></div>
    <div class="subcategory-tags">
      <span
        v-for="(subcategory, index) in selectedSubcategories"
        :key="index"
        @click="removeSubcategory(subcategory)"
      >
        <h6>{{ subcategory }}</h6>
        <font-awesome icon="times"></font-awesome>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: { type: Array, default: () => {} }
  },
  data() {
    return {
      selectedCategory: 0,
      selectedSubcategories: [],
      subCategories: { type: Object, default: () => {} }
    }
  },
  computed: {
    hasSelectedCategory() {
      return this.selectedCategory.length > 0
    },
    subCategoryOptions() {
      return this.$collection.map(
        this.subCategories,
        (subcategory) => subcategory.name
      )
    }
  },
  methods: {
    async getSubcategories(category) {
      this.selectedCategory = category.name
      const { data } = await this.$http.get(
        `categories/${encodeURI(this.selectedCategory)}/subcategories`
      )

      this.subCategories = data
    },
    categoryImg(item) {
      try {
        return require(`@/assets/imgs/categories/${item}.jpg`)
      } catch {
        return require('@/assets/imgs/concert.png')
      }
    },
    isCategorySelected(selectedCategory) {
      return selectedCategory === this.selectedCategory
    },
    addSubcategory(subcategory) {
      if (!this.$collection.includes(this.selectedSubcategories, subcategory)) {
        this.selectedSubcategories.push(subcategory)
      }
    },
    changeCategory() {
      this.selectedCategory = null
      this.selectedSubcategories = []
    },
    removeSubcategory(subcategory) {
      const index = this.$array.indexOf(this.selectedSubcategories, subcategory)
      this.$delete(this.selectedSubcategories, index)
    }
  }
}
</script>

<style lang="scss" scoped>
small {
  cursor: pointer;
  transition: $transition;
  &:hover {
    transition: $transition;
    color: $layer5;
  }
}
.img-box {
  @extend .horizontal, .middle, .center;
  // max-height: 50px;
  // max-width: 50px;
  overflow: hidden;
  cursor: pointer;
  margin-right: 4 * $space;
  margin-bottom: 4 * $space;
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: cover;
  box-shadow: $shadow;
  position: relative;
  border-radius: $rounded;
  h6 {
    position: absolute;
    // left: 25%;
    top: 45%;
    z-index: $above;
  }
}

.subcategory-select {
  @extend .half-width;
  transition: $transition;
}

.subcategory-tags {
  @extend .horizontal, .center, .middle;
  width: 100%;
  span {
    @extend .horizontal, .center, .middle;
    border-radius: $rounded;
    background: $layer3;
    padding: 2 * $space;
    min-width: 5vw;
    margin-right: 2 * $space;
    cursor: pointer;
    transition: $transition;

    h6 {
      margin-bottom: 0;
      margin-right: 3 * $space;
    }

    &:hover {
      transition: $transition;
      background: $layer1;
      opacity: 0.6;
    }
  }
}
</style>
