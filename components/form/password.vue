<script>
import Input from '@/components/form/input'
export default {
  extends: Input,
  computed: {
    type() {
      return 'password'
    },
    icon() {
      return 'lock'
    }
  }
}
</script>

<style></style>
