<template>
  <div>
    <v-modal :name="name" :adaptive="true" :click-to-close="true" height="auto">
      <div class="body">
        <header>
          <font-awesome icon="times" @click="$modal.hide(name)"></font-awesome>
        </header>
        <main :class="height">
          <slot></slot>
        </main>
      </div>
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
  border-radius: 10px;
}
</style>

<style lang="scss" scoped>
header {
  position: absolute;
  top: 10px;
  right: 0;
}

main {
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
  &:hover {
    transition: $transition;
    color: $darkComponent;
  }
}
</style>
