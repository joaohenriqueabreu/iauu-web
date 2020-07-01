<template>
  <div>
    <header class="horizontal center middle">
      <nuxt-link v-show="!minimized" to="/">
        <logo :height="50" :width="50"></logo>
      </nuxt-link>
      <div>
        <font-awesome
          class="minimize"
          :icon="minimized ? 'angle-double-right' : 'angle-double-left'"
          @click="minimize"
        >
        </font-awesome>
      </div>
    </header>
    <main>
      <nuxt-link :to="`/${role}/schedule`" :class="{ routed: routed('schedule') }">
        <font-awesome icon="calendar-alt"></font-awesome>
        <span v-show="!minimized">Agenda</span>
      </nuxt-link>
      <nuxt-link :to="`/${role}/presentations`" :class="{ routed: routed('presentations') }">
        <font-awesome icon="music"></font-awesome>
        <span v-show="!minimized">Apresentações</span>
      </nuxt-link>
      <nuxt-link :to="`/${role}/proposals`" :class="{ routed: routed('proposals') }">
        <font-awesome icon="search-dollar"></font-awesome>
        <span v-show="!minimized">Propostas</span>
      </nuxt-link>
      <nuxt-link :to="`/${role}/account`" :class="{ routed: routed('account') }">
        <font-awesome icon="piggy-bank"></font-awesome>
        <span v-show="!minimized">Conta</span>
      </nuxt-link>
    </main>
  </div>
</template>

<script>
import Logo from '@/components/layout/logo'
export default {
  components: {
    logo: Logo
  },
  data() {
    return {
      minimized: false
    }
  },
  computed: {
    scheduleLink() {
      return this.$auth.hasScope('artist') ? '/artist' : '/contractor'
    },
    role() {
      return this.$auth.hasScope('artist') ? 'artist' : 'contractor'
    }
  },
  methods: {
    minimize() {
      this.$emit('minimize', this.minimized)
      this.minimized = !this.minimized
    },
    routed(option) {
      return this.$route.path.split('/').includes(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  margin-left: 0;
  margin-right: 2 * $space;
}

.minimize {
  color: $layer5;
  cursor: pointer;
}

[data-icon] {
  font-size: $huge;
}

main {
  background: none !important; // override main.scss
  box-shadow: none !important; // override main.scss
}

@include desktop {
  div {
    display: flex;
    flex-direction: column;
  }
  header {
    padding-top: 20px;
    height: 20vh;
  }

  main {
    height: 70vh;
    a {
      padding: 5 * $space 2 * $space 4 * $space 3 * $space;
    }
  }

  footer {
    height: 10vh;
  }

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2 * $space;
    transition: $transition;
    color: $brand;
    padding: 0 4 * $space;
    width: 100%;
    // border-top-right-radius: $rounded;
    // border-bottom-right-radius: $rounded;

    &.previous {
      border-bottom-right-radius: $rounded;
    }

    &.later {
      border-top-right-radius: $rounded;
    }

    &.routed {
      background: $layer2;
    }

    &:hover {
      transition: $transition;
      color: $layer4;
    }
  }
}

@include mobile {
  aside {
    width: 100vw;
    div {
      width: 100%;
    }
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  a {
    margin-right: 4 * $space;
  }

  header,
  footer,
  span,
  hr {
    display: none;
  }
}
</style>
