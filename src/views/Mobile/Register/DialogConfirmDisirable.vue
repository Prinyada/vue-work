<template>
  <!-- ไม่ใช้แล้ว -->
    <v-dialog width="380" content-class="elevation-0" v-model="dialog">
            <v-card flat style="border-radius: 16px;">
                <v-container fluid fill-height>
                    <v-row>
                        <v-col cols="12" align="center">
                            <span class="font-weight-bold" style="font-size: 18px;">สมัครเข้าใช้งานระบบ</span>
                        </v-col>
                        <v-col cols="12" align="center" v-if="this.$vuetify.breakpoint.width >= 417">
                            <span style="font-weight: 400;" class="px-5">กรณีสมัครเข้าใช้งานแบบไม่ประสงค์เป็นสมาชิก</span><br>
                            <span style="font-weight: 400;" class="px-5">ผู้เข้าใช้งานจะสามารถเข้าใช้งานระบบได้</span><br>
                            <span style="font-weight: 400;" class="px-5">ถึงวันที่ <span style="font-weight: 400; color: #FA9316;">{{ formatDate }}</span></span>
                        </v-col>
                        <v-col cols="12" align="center" v-else>
                          <span style="font-weight: 400;">กรณีสมัครเข้าใช้งานแบบไม่ประสงค์เป็นสมาชิก ผู้เข้าใช้งานจะสามารถเข้าใช้งานระบบได้ ถึงวันที่ </span>
                          <span style="font-weight: 400; color: #FA9316;">31/11/2567</span>
                      </v-col>

                    </v-row>
                    <v-row align="center">
                      <v-col cols="6" class="mb-4 mx-0">
                        <v-btn block outlined width="115" large style="border-radius: 16px;" color="#166BF9" @click="dialog=false">ยกเลิก</v-btn>
                      </v-col>
                      <v-col cols="6"  class="mb-4 mx-0">
                        <v-btn block width="115" large style="border-radius: 16px; color: white;" color="#166BF9" @click="registerUndesirable"><v-icon left>mdi-file-document-outline</v-icon>
                          สมัครสมาชิก</v-btn>
                      </v-col>
                    </v-row>
                </v-container>

              </v-card>
    </v-dialog>
  </template>

<script>
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      dialog: false,
      round: []
    }
  },
  async created () {
    await this.getRound()
  },
  computed: {
    formatDate () {
      if (!this.round.length || !this.round[0]?.end_round) return ''
      return this.formatToThaiDate(this.round[0].end_round)
    }
  },
  methods: {
    actionDialog (val) {
      this.dialog = val
    },
    registerUndesirable () {
      this.dialog = false
      this.$router.push('/register-undesirable')
    },
    formatToThaiDate (date) {
      const newDate = new Date(date)
      const day = String(newDate.getDate()).padStart(2, '0')
      const month = String(newDate.getMonth() + 1).padStart(2, '0')
      const year = newDate.getFullYear() + 543
      return `${day}/${month}/${year}`
    },
    async getRound () {
      const res = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/member/getRound`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.status === 200) {
        this.round = res.data?.data
        this.$store.dispatch('actionSetRound', this.round)
      } else {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาติดต่อเจ้าหน้าที่',
          icon: 'error'
        })
      }
    }
  }
}
</script>

  <style scoped>
  .headline {
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
  </style>
