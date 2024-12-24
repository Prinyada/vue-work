<template>
    <v-container fluid>
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
            <v-row no-gutters>
                <v-col align="center" cols="12" class="mt-5">
                    <v-img src="@/assets/trva/register/payment-success.png" alt="QR Code" contain
                        max-width="150"></v-img>
                </v-col>
                <v-col align="center" cols="12" class="mt-5">
                    <span style="font-size: 16px; color: #52C41A;" class="font-weight-bold">ชำระเงินสำเร็จ</span>
                </v-col>
                <v-col align="center" cols="12" class="mt-2">
                    <span style="font-size: 14px; color: #989898;">กรุณารอเจ้าหน้าที่ตรวจสอบข้อมูล</span>
                </v-col>
                <v-col style="padding: 0px 40px;" cols="12">
                    <v-card flat class="justify-center align-center card-payment">
                        <v-row no-gutters style="padding: 12px 10px;" justify="center" align="center">
                            <v-col align="start" cols="5">
                                <span style="font-size: 14px;">ประเภทชำระเงิน</span>
                            </v-col>
                            <v-col align="center" cols="1">
                                <span style="font-size: 14px;">:</span>
                            </v-col>
                            <v-col align="start" cols="5">
                                <span style="font-weight: 600; font-size: 14px;">ค่าสมัครสมาชิก</span>
                            </v-col>
                            <v-col align="start" cols="5">
                                <span style="font-size: 14px;">ยอดชำระเงิน</span>
                            </v-col>
                            <v-col align="center" cols="1">
                                <span style="font-size: 14px;">:</span>
                            </v-col>
                            <v-col align="start" cols="5">
                                <span style="font-weight: 600; font-size: 14px;">{{ formattedAmount }} บาท</span>
                            </v-col>
                            <v-col align="start" cols="5">
                                <span style="font-size: 14px;">วันที่ชำระเงิน</span>
                            </v-col>
                            <v-col align="center" cols="1">
                                <span style="font-size: 14px;">:</span>
                            </v-col>
                            <v-col align="start" cols="5">
                                <span style="font-weight: 600; font-size: 14px;">{{ getThaiDate }}</span>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col align="center" cols="12" style="padding: 20px 50px;">
                    <v-btn outlined block height="50"
                        style="border-radius: 16px; color: #166BF9; font-size: 15px; max-width: 320px;"
                        @click="back">กลับสู่หน้าหลัก
                    </v-btn>
                </v-col>
            </v-row>

        </v-card>
    </v-container>
</template>
<script>
export default {
  data () {
    return {
      amount: 0,
      data_payment: []
    }
  },
  created () {
    this.data_payment = this.$store.state.payment_success
    this.amount = this.data_payment.amount
  },
  computed: {
    formattedAmount () {
      return this.amount.toLocaleString() // แปลงจำนวนเงินให้มีคอมม่า
    },
    getThaiDate () {
      const payday = new Date(this.data_payment.date_payment)
      const day = String(payday.getDate()).padStart(2, '0')
      const month = String(payday.getMonth() + 1).padStart(2, '0')
      const year = payday.getFullYear() + 543

      return `${day}/${month}/${year}`
    }
  },
  methods: {
    back () {
      this.$router.push({ path: '/profile/homepage' })
    }
  }
}
</script>
<style scoped>
.card-style {
    border-radius: 16px !important;
    width: 100%;
}
.card-payment {
    background-color: #FAFAFA;
    border-radius: 16px;
    padding: 0px 10px;
    max-width: 320px;
    margin: auto;
}
</style>
