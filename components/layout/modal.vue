<template>
  <div>
    <v-modal :name="name" :adaptive="true" :click-to-close="true" height="auto">
      <header>
        <font-awesome icon="times" @click="close"></font-awesome>
      </header>
      <main :class="height">
        <perfect-scrollbar>
          <slot></slot>
        </perfect-scrollbar>
      </main>
    </v-modal>
  </div>
</template>

<script>
import { v4 } from 'uuid'
export default {
  props: {
    height: { type: String, default: 'regular' }
  },
  computed: {
    name: () => v4()
  },
  methods: {
    open() {
      this.$modal.show(this.name)
    },
    close() {
      this.$modal.hide(this.name)
    }
  }
}
</script>

<style lang="scss">
/*Overriding modal css*/
.vm--overlay {
  background: rgba(0, 0, 0, 0.95);
}

.vm--modal {
  border-radius: $edges;
  overflow: inherit;
}
</style>

<style lang="scss" scoped>
header {
  @extend .vertical, .middle, .center;
  text-align: center;
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px;
  border-radius: $rounded;
  background: $layer4;
  box-shadow: $shadow;
  width: 30px;
  height: 20x;
  padding-left: 18px;
  z-index: $moveToTop;
}

main {
  overflow: hidden;
  .small {
    min-height: 50vh;
  }
  .regular {
    min-height: 75vh;
  }
}

[data-icon] {
  transition: $transition;
  color: $brand;
  font-size: $huge;
  cursor: pointer;
  z-index: $moveToTop;
  &:hover {
    transition: $transition;
    color: $darkComponent;
  }
}
</style>
