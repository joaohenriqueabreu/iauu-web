<template>
  <div>
    <v-modal
      :name="name"
      :adaptive="true"
      :click-to-close="true"
      height="auto"
      @before-open="disableBodyScroll"
      @before-close="enableBodyScroll"
    >
      <div :class="height">
        <header>
          <div class="close" @click="close">
            <font-awesome icon="times"></font-awesome>
          </div>
          <slot name="header"></slot>
        </header>
        <main>
          <perfect-scrollbar>
            <slot name="main"></slot>
          </perfect-scrollbar>
        </main>
        <footer>
          <slot name="footer"></slot>
        </footer>
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
    },
    disableBodyScroll() {
      document.getElementsByTagName('body')[0].classList.add('disable-scroll')
    },
    enableBodyScroll() {
      document
        .getElementsByTagName('body')[0]
        .classList.remove('disable-scroll')
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
  background: $layer2;
}
</style>

<style lang="scss" scoped>
// main {
//   overflow: hidden;
//   position: relative;
//   background: $layer2;
// }

.tiny {
  min-height: 30vh;
}
.small {
  min-height: 50vh;
}
.regular {
  min-height: 75vh;
}

header {
  @extend .vertical, .middle, .center;
  width: 100%;
  min-height: 5vh;
  position: relative;
  .close {
    text-align: center;
    position: absolute;
    cursor: pointer;
    top: -10px;
    right: -10px;
    padding: 5px;
    border-radius: $rounded;
    background: $layer4;
    box-shadow: $shadow;
    width: 30px;
    height: 30px;
    opacity: 1; // overwrite from some other style
    padding-left: 9px;
    z-index: $moveToTop;
  }
}

main {
  position: relative;
  min-height: 20vh;
  div {
    .ps {
      height: 100%;
    }
  }
}

footer {
  position: absolute;
  width: 100%;
  bottom: 10px;
  height: 5vh;
}

[data-icon] {
  transition: $transition;
  color: $brand;
  font-size: $huge;
  cursor: pointer;
  z-index: $moveToTop;
  &:hover {
    transition: $transition;
    color: $layer3;
  }
}
</style>
