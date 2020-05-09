<template>
  <form>
    <image-uploader @uploaded="setBackground">
      <header
        ref="background"
        :style="{ 'background-image': `url(${backgroundUrl})` }"
      >
        <input type="hidden" name="backgroundUrl" :value="backgroundUrl" />
      </header>
    </image-uploader>
    <main>
      <div class="logo">
        <avatar :src="avatarUrl" :user-name="a" :size="100"></avatar>
        <image-uploader @uploaded="setAvatar">Logo</image-uploader>
      </div>
    </main>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      backgroundUrl: { type: String, default: '' },
      avatarUrl: { type: String, default: '' }
    }
  },
  created() {
    this.backgroundUrl = this.$config.defaultBGImgUrl
    this.avatarUrl = this.$config.defaultAvatarImgUrl
  },
  methods: {
    ...mapActions('app', ['showMessage']),
    setBackground({ url }) {
      this.showMessage(url)
      this.backgroundUrl = url
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

    button {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  main {
    height: 100vh;
    position: relative;
    .logo {
      position: absolute;
      top: -20px;
      left: 45%;
    }

    .vue-avatar--wrapper {
      box-shadow: $shadow;
      cursor: pointer;
      transition: $transition;
      &:before {
        transition: $transition;
        display: none;
      }
      &:hover {
        transition: $transition;
        opacity: 0.5;
        &:before {
          transition: $transition;
          display: block;
          content: 'Upload';
          font-size: $large;
          opacity: 1;
        }
      }
    }
  }
}
</style>
