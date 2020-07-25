<template>
  <main>
    <div class="horizontal">
      <div class="mr-4">
        <image-uploader ref="avatarUploader" :rounded="true" @uploaded="setAvatar">
          <avatar :src="avatarImg" :size="150" @click="uploadAvatar"></avatar>
        </image-uploader>
      </div>
      <div>
        <form-input v-model="name"></form-input>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  async asyncData({ app, store, error, $sentry }) {
    try {
      await store.dispatch('contractor/loadContractor')
    } catch (e) {
      $sentry.captureException(e)
      error({ statusCode: 404, message: 'Perfil não encontrado' })
    }
  },
  data() {
    return {
      data: ''
    }
  },
  computed: {
    ...mapState({ artist: (state) => state.artist.artist }),
    avatarImg() {
      return !this.$utils.empty(this.contractor.user.photo)
        ? this.contractor.user.photo
        : this.$config.defaultAvatarImgUrl
    }
  },
methods: {
    ...mapActions('contractor', ['saveProfile']),
    ...mapMutations('contractor', { updateProfile: 'update_profile' }),
    uploadAvatar() {
      this.$refs.avatarUploader.upload()
    },
    async setAvatar({ url }) {
      this.updateProfile({ prop: 'user.photo', data: url })
      await this.saveProfile()
    }
  }
}
</script>

<style>

</style>