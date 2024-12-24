<template>
  <v-container>
    <v-text-field v-model="sharedToken" label="token" />
    <v-btn @click="setToPage('/login-member')"> เข้าสู่ระบบ </v-btn>
  </v-container>
</template>
<script>
export default {
  layout: 'blank',
  data () {
    return {
      sharedToken: ''
    }
  },
  created () {
    localStorage.removeItem('accessTokenTrva')
    localStorage.removeItem('accountId')
  },
  methods: {
    setToPage (to) {
      if (to) {
        this.$router.push(`/redirect/?topage=${to}&sharedToken=${this.sharedToken}`)
      } else {
        this.$router.push(`/redirect/?sharedToken=${this.sharedToken}`)
      }
    }
  }
}
</script>
