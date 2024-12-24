<template>
    <RegisterAndUpdate ref="registerAndUpdatePageRef"/>
</template>

<script>
import RegisterAndUpdate from '../SeedWorks/RegisterAndUpdatePage.vue'
export default {
  components: {
    RegisterAndUpdate
  },
  mounted () {
    this.$refs.registerAndUpdatePageRef.sendData({ type: 'update', data: { profile: { name: 'อาทิตย์', surname: 'เมืองศิริ' } } })
  },
  data () {
    return {
    }
  }
}
</script>
