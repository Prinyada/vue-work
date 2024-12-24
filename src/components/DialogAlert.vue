<template>
  <v-dialog v-model="dialog" persistent width="500px">
    <v-card height="auto" style="padding: 20px 20px; border-radius: 16px;">
      <v-row no-gutters>
        <v-col align="center" cols="12">
          <v-img v-if="imgIcon !== null" contain max-width="170" :src="require(`@/assets/trva/${imgIcon}`)"></v-img>
          <div class="mt-3 pb-3" style="font-size: 18px; font-weight: 500;">
            {{ title }}
            <br>
            <span v-if="showDate && text === ''" style="font-size: 14px; font-weight: 500;">รอบที่ {{ formatDateStart }} - {{ dateEnd }}</span>
            <span v-else style="font-size: 16px; font-weight: 500;">{{ text }}</span>
          </div>
        </v-col>
        <v-col align="center" cols="12">
          <v-btn @click="close" height="40" width="150" color="#166BF9"
            style="border-radius: 16px; color: #FFFFFF; font-size: 15px;">ปิด
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import Swal from 'sweetalert2'
export default {
  props: {
    typeDialog: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      title: '',
      text: '',
      round: null,
      imgIcon: null,
      showDate: false,
      dateEnd: ''
    }
  },
  watch: {},
  computed: {
    formatDateStart () {
      if (!this.round || !this.round[0]?.start_round) return ''
      return this.formatToThaiDate(this.round[0]?.start_round)
    },
    formatDateEnd () {
      if (!this.round || !this.round[0]?.end_round) return ''
      return this.formatToThaiDate(this.round[0]?.end_round)
    },
    formatDateEndTrain () {
      if (!this.round || !this.round[0]?.end_train) return ''
      return this.formatToThaiDate(this.round[0]?.end_train)
    }
  },
  methods: {
    async open (title) {
      this.title = title
      if (this.typeDialog === 'rejectEndTemp') {
        this.imgIcon = 'time-out.png'
        this.showDate = true
        await this.getRound()
        this.dateEnd = this.formatDateEnd
      } else if (this.typeDialog === 'rejectEndTrain') {
        this.imgIcon = 'time-out.png'
        this.showDate = true
        await this.getRound()
        this.dateEnd = this.formatDateEndTrain
      } else if (this.typeDialog === 'rejectTrain') {
        this.imgIcon = 'register/waiting-approve.png'
        this.text = 'เพื่อเข้าอบรม'
        this.showDate = false
      } else if (this.typeDialog === 'waitingPayment') {
        this.imgIcon = 'register/waiting-approve.png'
        this.text = 'กรุณาชำระเงิน'
        this.showDate = false
      } else if (this.typeDialog === 'rejectAdminApprove') {
        this.imgIcon = 'register/waiting-approve.png'
        this.text = 'กรุณารอเจ้าหน้าที่ตรวจสอบข้อมูล'
        this.showDate = false
      }
      this.dialog = true
    },
    close () {
      this.dialog = false
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
    },
    formatToThaiDate (date) {
      const newDate = new Date(date)
      const day = String(newDate.getDate()).padStart(2, '0')
      const month = String(newDate.getMonth() + 1).padStart(2, '0')
      const year = newDate.getFullYear() + 543
      return `${day}/${month}/${year}`
    }
  }
}
</script>
<style scoped>
.font-14 {
  font-size: 14px;
}
</style>
