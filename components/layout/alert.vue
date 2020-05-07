<template>
  <div></div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState({ alert: (state) => state.app.alert }),
    ...mapGetters('app', ['hasMessage'])
  },
  watch: {
    alert: {
      deep: true,
      handler(state) {
        if (state.message !== null) {
          this.$swal({
            icon: this.alert.type,
            text: this.alert.message,
            timer: this.$config.alertTimer,
            showConfirmButton: false
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'sweetalert2/dist/sweetalert2.min.css';
</style>

<style lang="scss" scoped></style>
