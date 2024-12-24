<template>
  <div />
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'RedirectPage',
  layout: 'blank',
  data () {
    return {}
  },
  async created () {
    const token = this.$route.params.token
    const page = this.$route.params.page
    try {
      if (token) {
        const res = await this.axios({
          method: 'post',
          url: `${process.env.VUE_APP_API_URL}/api/auth/login_one`,
          data: { share_token: token }
        }).then((response) => {
          return response
        }).catch((err) => {
          return err.response
        })
        localStorage.setItem('accessTokenTrva', res.data.result.access_token)
        localStorage.setItem('accountId', res.data.result.account_id)
        const accessTokenTrva = localStorage.getItem('accessTokenTrva')
        const accountId = localStorage.getItem('accountId')
        if (accountId && accessTokenTrva) {
          this.$router.push({ path: `/${page}` })
        } else {
          Swal.fire({
            title: 'ระบบขัดข้อง',
            text: 'ไม่สามารถเข้าสู่ระบบได้',
            icon: 'error'
          })
        }
      } else {
        Swal.fire({
          title: 'ระบบขัดข้อง',
          text: 'ไม่สามารถเข้าสู่ระบบได้',
          icon: 'error'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'ระบบขัดข้อง',
        text: 'ไม่สามารถเข้าสู่ระบบได้',
        icon: 'error'
      })
    }
  },
  methods: {}
}
</script>
