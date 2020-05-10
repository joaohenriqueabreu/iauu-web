<template>
  <div>
    <form>
      <image-uploader ref="bgUploader" @uploaded="setBackground">
        <header
          :style="{ 'background-image': `url(${backgroundUrl})` }"
          @click="uploadBG"
        >
          <input type="hidden" name="backgroundUrl" :value="backgroundUrl" />
        </header>
      </image-uploader>
      <main>
        <div class="logo">
          <image-uploader
            ref="avatarUploader"
            :rounded="true"
            @uploaded="setAvatar"
          >
            <avatar :src="avatarUrl" :size="150" @click="uploadAvatar"></avatar>
          </image-uploader>
        </div>
        <div class="pt-5"></div>
        <div class="pt-5"></div>
        <div class="boxed">
          <h6 class="mb-4">Conecte suas redes sociais</h6>
          <div class="raised horizontal center middle">
            <div class="icon-box">
              <font-awesome
                :class="{ active: hasSpotify }"
                :icon="['fab', 'spotify']"
                @click="linkNetwork('spotify')"
              ></font-awesome>
            </div>
            <div class="icon-box">
              <font-awesome
                :class="{ active: hasFacebook }"
                :icon="['fab', 'facebook']"
                @click="linkNetwork('facebook')"
              ></font-awesome>
            </div>
            <div class="icon-box">
              <font-awesome
                :class="{ active: hasInstagram }"
                :icon="['fab', 'instagram']"
                @click="linkNetwork('instagram')"
              ></font-awesome>
            </div>
            <div class="icon-box">
              <font-awesome
                :class="{ active: hasYoutube }"
                :icon="['fab', 'youtube']"
                @click="linkNetwork('youtube')"
              ></font-awesome>
            </div>
          </div>
          <div class="my-5 box raised vertical center middle">
            <h6 class="mb-4">Qual tipo de apresentação sua empresa realiza?</h6>
            <small class="mb-4">
              <font-awesome icon="exclamation"></font-awesome>
              Não deixe de selecionar as opções para facilitar a busca dos
              clientes
            </small>
            <div class="half-width">
              <form-select
                :options="categories"
                @select="categorySelect"
              ></form-select>
            </div>
          </div>
          <div class="half-width my-5">
            <form-input
              class="mb-3"
              label="Nome fantasia"
              placeholder="Seu nome incrível vem aqui"
            ></form-input>
            <form-input
              class="mb-3"
              label="História"
              :rows="5"
              placeholder="Conta um pouquinho da sua história para seus clientes"
            ></form-input>
            <hr />
            <form-input
              v-model="form.cnpj"
              label="CNPJ"
              class="mb-3  horizontal center middle"
            ></form-input>
            <form-input
              v-model="form.location"
              label="Endereço"
              class="mb-3 horizontal center middle"
            ></form-input>
            <form-input
              v-model="form.phone"
              label="Telefone"
              class="mb-3  horizontal center middle"
            ></form-input>
          </div>
        </div>
      </main>
      <footer>
        <div class="half-width">
          <submit-button>Salvar</submit-button>
        </div>
      </footer>
    </form>
    <modal ref="social" height="tiny">
      <template v-slot:main>
        <div class="full-fill vertical middle center p5">
          <h6>
            <font-awesome icon="exclamation"></font-awesome>
            Lembre-se de deixar suas redes públicas!
          </h6>
          <div class="mb-4"></div>
          <form-input
            v-model="networkUrl"
            class="half-width"
            :label="selectedNetwork"
            placeholder="Cole aqui o endereço de sua conta"
          ></form-input>
        </div>
      </template>
      <template v-slot:footer>
        <div class="half-width">
          <submit-button @submit="saveNetworkUrl">Conectar</submit-button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      backgroundUrl: { type: String, default: '' },
      avatarUrl: { type: String, default: '' },
      selectedNetwork: String,
      networkUrl: String,
      form: {
        socialNetworks: {
          spotify: { type: String, default: '' },
          youtube: { type: String, default: '' },
          facebook: { type: String, default: '' },
          instagram: { type: String, default: '' }
        }
      }
    }
  },
  computed: {
    hasSpotify() {
      return this.form.socialNetworks.spotify.length > 0
    },
    hasFacebook() {
      return this.form.socialNetworks.facebook.length > 0
    },
    hasInstagram() {
      return this.form.socialNetworks.instagram.length > 0
    },
    hasYoutube() {
      return this.form.socialNetworks.youtube.length > 0
    },
    categories() {
      return ['rock', 'pop', 'jazz', 'funk', 'pagode']
    }
  },
  created() {
    this.backgroundUrl = this.$config.defaultBGImgUrl
    this.avatarUrl = this.$config.defaultAvatarImgUrl
  },
  methods: {
    ...mapActions('app', ['showMessage']),
    hasConnectedNetwork(network) {
      return this.$collection.includes(this.form.socialNetworks, network)
    },
    uploadBG() {
      this.$refs.bgUploader.upload()
    },
    uploadAvatar() {
      this.$refs.avatarUploader.upload()
    },
    setBackground({ url }) {
      this.backgroundUrl = url
    },
    setAvatar({ url }) {
      this.avatarUrl = url
    },
    linkNetwork(network) {
      this.selectedNetwork = network
      this.networkUrl = ''
      this.$refs.social.open()
    },
    saveNetworkUrl() {
      this.form.socialNetworks[this.selectedNetwork] = this.networkUrl
      this.$refs.social.close()
    },
    categorySelect(category) {
      alert(category)
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  header {
    height: 30vh;
    background-size: cover;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  main {
    min-height: 70vh;
    position: relative;
    margin-bottom: 5 * $space;
    .logo {
      position: absolute;
      top: -75px;
      left: 40%;
      z-index: $above;
    }

    .boxed {
      @extend .vertical, .center;
      background: $layer3;
      box-shadow: $shadow;
      border-radius: $edges;
      padding: 5 * $space;

      .raised {
        background: $layer4;
        padding: 4 * $space;
        border-radius: $edges;
        box-shadow: $shadow;
        width: 100%;

        .icon-box {
          @extend .horizontal, .middle, .center;
          margin: 0 5 * $space;

          [data-icon] {
            color: $layer5;
            font-size: 55px;
            font-weight: $bold;
            // box-shadow: $shadow;
            filter: drop-shadow($shadow);
            // border-radius: $rounded;
            transition: $transition;
            cursor: pointer;
            &:hover {
              transition: $transition;
              color: $brand;
            }
            &.active {
              transition: $transition;
              color: $brand;
            }
          }
        }
      }
    }

    .vue-avatar--wrapper {
      box-shadow: $shadow;
    }
  }

  footer {
    height: 10vh;
    position: relative;
  }
}
</style>
