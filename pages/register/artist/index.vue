<template>
  <div>
    <register user-type="artist"></register>
  </div>
</template>

<script>
import RegistrationForm from '@/components/auth/register'
export default {
  components: {
    register: RegistrationForm
  }
}
</script>
