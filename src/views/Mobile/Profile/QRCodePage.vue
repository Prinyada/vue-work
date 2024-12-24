<template>
    <v-container v-if="openQRCode" fluid>
        <v-app-bar height="70" flat color="transparent">
            <v-row no-gutters>
                <v-col style="position: absolute;" cols="auto" class="d-flex justify-start">
                    <v-icon @click="back" color="#3B76EF">mdi-chevron-left</v-icon>
                </v-col>
                <v-col class="d-flex justify-center">
                    <span style="font-size: 18px;" class="font-weight-bold">การชำระเงิน</span>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-card class="card-style pt-4">
            <v-row>
                <v-col align="center">
                    <span style="font-size: 16px;" class="font-weight-bold">แสกน QR Code เพื่อชำระเงิน</span>
                </v-col>
                <v-col align="center" cols="12">
                    <v-img :src="scanQrCode" alt="QR Code" contain width="300"
                        :class="time_out === true ? 'blurred-image' : ''"></v-img>
                </v-col>
                <v-col v-if="time_out !== true" class="d-flex justify-center align-center pa-0 mt-2">
                    <div class="d-flex align-center">
                        <v-img src="@/assets/trva/register/save.png" alt="QR Code" contain max-width="15"
                            class="mr-2 text-link" @click="saveImage"></v-img>
                        <span style="font-size: 14px;" class="text-link" @click="downLoadQR">บันทึก QR Code</span>
                    </div>
                </v-col>
                <v-col v-else class="d-flex justify-center align-center pt-0 mt-2">
                    <div class="d-flex align-center">
                        <v-img src="@/assets/trva/register/reset.png" alt="QR Code" contain max-width="15"
                            class="mr-2 text-link" @click="resetQR"></v-img>
                        <span style="font-size: 14px;" class="text-link" @click="resetQR">ขอ QR Code ใหม่</span>
                    </div>
                </v-col>
                <v-col v-if="time_out !== true" align="center" cols="12">
                    <span style="font-size: 14px; color: #D1392B;">กรุณาชำระเงินภายใน {{ minutes }}:{{ seconds }}
                        นาที</span>
                </v-col>
                <v-col style="padding: 0px 50px;" cols="12">
                    <v-card flat class="justify-center align-center card-amount">
                        <v-row no-gutters style="padding: 12px 10px;" justify="center" align="center">
                            <v-col align="start" cols="5">
                                <span style="font-size: 15px;">ประเภทชำระเงิน</span>
                            </v-col>
                            <v-col align="center" cols="1">
                                <span style="font-size: 15px;">:</span>
                            </v-col>
                            <v-col align="start" cols="5">
                                <span style="font-weight: 600; font-size: 15px;">{{ typePaymentTH(type_payment) }}</span>
                            </v-col>
                            <v-col align="start" cols="5">
                                <span style="font-size: 15px;">ยอดชำระเงิน</span>
                            </v-col>
                            <v-col align="center" cols="1">
                                <span style="font-size: 15px;">:</span>
                            </v-col>
                            <v-col align="start" cols="5">
                                <span style="font-weight: 600; font-size: 15px;">{{ formattedAmount }} บาท</span>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col align="center" cols="12" style="padding: 20px 50px;">
                    <v-btn block height="50" color="#166BF9" :disabled="time_out"
                        style="border-radius: 16px; color: #FFFFFF; font-size: 15px; max-width: 320px;"
                        @click="paymentSuccess">ยืนยันการชำระเงิน
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-dialog v-model="dialog" persistent width="200px">
            <v-card height="auto" style="padding: 15px 20px; border-radius: 16px;">
                <v-row no-gutters>
                    <v-col align="center" cols="12">
                        <v-img contain max-width="50" src="@/assets/trva/success.png"></v-img>
                        <div class="mt-3" style="font-size: 16px; font-weight: 500;">บันทึกสำเร็จ</div>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      data: null,
      dialog: false,
      amount: 0,
      timeLeft: 300, // เวลานับถอยหลังเป็น 300 วินาที (5 นาที)
      interval: null,
      time_out: false,
      getQrCode: null,
      scanQrCode: null,
      formId: null,
      type_payment: null,
      overlay: true,
      openQRCode: false
    }
  },
  created () {
    this.getQrCode = localStorage.getItem('qrCode')
    this.scanQrCode = `data:image/png;base64, ${this.getQrCode}`
    this.formId = localStorage.getItem('formId')
    this.amount = localStorage.getItem('amount')
    this.type_payment = localStorage.getItem('type_payment')
    this.openQRCode = true
    this.startCountdown()
  },
  computed: {
    formattedAmount () {
      return this.amount.toLocaleString() // แปลงจำนวนเงินให้มีคอมม่า
    },
    minutes () {
      return Math.floor(this.timeLeft / 60)
    },
    seconds () {
      const sec = this.timeLeft % 60
      return sec < 10 ? '0' + sec : sec
    }
  },
  methods: {
    saveImage () {
      // โค้ดสำหรับบันทึกรูปภาพ
      this.dialog = true
      setTimeout(() => {
        this.dialog = false
      }, 2000)
    },
    async paymentSuccess () {
      const checkPayment = await this.axios({
        method: 'post',
        url: `${process.env.VUE_APP_API_URL}/api/payment/checkPaymentSuccess`,
        data: { form_id: this.formId }
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (checkPayment.data.result.status_payment === 'success') {
        const tempSuccess = {
          type_payment: checkPayment.data.result.type_form,
          amount: checkPayment.data.result.amount,
          date_payment: checkPayment.data.result.date_payment
        }
        this.$store.dispatch('actionSetPaymentSuccess', tempSuccess)
        this.$router.push({ path: '/profile/payment-success' })
      } else {
        Swal.fire({
          title: 'กรุณาชำระเงิน',
          icon: 'error'
        })
      }
    },
    async resetQR () {
      const createNewQRcode = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/payment/paymentQRCode?formId=${this.formId}&type_payment=${this.type_payment}`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      localStorage.setItem('type_payment', createNewQRcode.data.dataPayment.type)
      localStorage.setItem('amount', createNewQRcode.data.dataPayment.amount)
      localStorage.setItem('qrCode', createNewQRcode.data.dataPayment.qrCode)
      this.getQrCode = localStorage.getItem('qrCode')
      this.scanQrCode = `data:image/png;base64, ${this.getQrCode}`
      this.time_out = false
      this.timeLeft = 300 // เวลานับถอยหลังเป็น 300 วินาที (5 นาที)
      this.startCountdown()
    },
    startCountdown () {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--
        } else {
          clearInterval(this.interval)
          this.time_out = true
        }
      }, 1000)
    },
    back () {
      this.$router.push({ path: '/profile/homepage' })
    },
    typePaymentTH () {
      if (this.type_payment === 'register') {
        return 'ค่าสมัครสมาชิก'
      } else if (this.type_payment === 'registerTrain') {
        return 'ค่าสมัครสมาชิกและอบรม'
      } else if (this.type_payment === 'train') {
        return 'ค่าสมัครอบรม'
      }
    },
    downLoadQR () {
      window.open(`${process.env.VUE_APP_API_URL}/api/payment/paymentQRCode?formId=${this.formId}&type_payment=${this.type_payment}&download=1`)
    }
  }
}

</script>
<style scoped>
.card-style {
    border-radius: 16px !important;
    width: 100%;
}

.card-amount {
    background-color: #FAFAFA;
    border-radius: 16px;
    padding: 0px 10px;
    max-width: 320px;
    margin: auto;
}

.text-link {
    text-decoration: underline;
    cursor: pointer;
    color: #166BF9;
    font-weight: 500;
}

.blurred-image {
    filter: blur(3px);
    /* ปรับค่า px ตามความต้องการในการเบลอ */
}
</style>
