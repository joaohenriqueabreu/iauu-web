<script>
import Input from '@/components/form/input'
export default {
  extends: Input,
  computed: {
    type() {
      return 'email'
    },
    icon() {
      return 'envelope'
    }
  }
}
</script>

<style></style>
