<template>
    <RegisterAndUpdate ref="registerAndUpdatePageRef"/>
</template>

<script>
import RegisterAndUpdate from '../SeedWorks/RegisterAndUpdatePage.vue'
export default {
  components: {
    RegisterAndUpdate
  },
  created () {
  },
  mounted () {
    this.$refs.registerAndUpdatePageRef.sendData({ type: 'register-new-member', data: { profile: { name: 'อาทิตย์', surname: 'เมืองศิริ' } } })
  },
  data () {
    return {
      type: ''
    }
  }
}
</script>
