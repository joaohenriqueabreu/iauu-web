<template>
  <div>
    <header>
      <nuxt-link to="/">
        <logo :height="50" :width="50"></logo>
        <h6>iauu</h6>
      </nuxt-link>
    </header>
    <main>
      <nuxt-link
        :to="`/${userType}/schedule`"
        :class="{ routed: routed('schedule') }"
      >
        <font-awesome icon="calendar-alt"></font-awesome>
        <span>Agenda</span>
      </nuxt-link>
      <nuxt-link
        :to="`/${userType}/presentations`"
        :class="{ routed: routed('presentations') }"
      >
        <font-awesome icon="music"></font-awesome>
        <span>Apresentações</span>
      </nuxt-link>
      <nuxt-link
        :to="`/${userType}/proposals`"
        :class="{ routed: routed('proposals') }"
      >
        <font-awesome icon="search-dollar"></font-awesome>
        <span>Propostas</span>
      </nuxt-link>
      <nuxt-link
        :to="`/${userType}/account`"
        :class="{ routed: routed('account') }"
      >
        <font-awesome icon="piggy-bank"></font-awesome>
        <span>Conta</span>
      </nuxt-link>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/components/layout/logo'
export default {
  components: {
    logo: Logo
  },
  computed: {
    ...mapGetters('auth', ['isArtist']),
    scheduleLink() {
      return this.isArtist ? '/artist' : '/contractor'
    },
    userType() {
      return this.isArtist ? 'artist' : 'contractor'
    }
  },
  methods: {
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
