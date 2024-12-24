<template>
    <v-dialog v-if="loadTypePayment" v-model="dialog" persistent width="500px" content-class="elevation-0">
        <v-card height="auto" style="padding: 15px 20px; border-radius: 16px;">
            <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <v-btn icon color="#166BF9">
                        <v-icon @click="dialog = !dialog" > mdi-close </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col align="center" cols="12">
                    <div style="font-size: 16px; color: #333333;" class="font-weight-bold">การชำระเงิน</div>
                </v-col>
                <v-col>
                    <div style="font-size: 16px; color: #333333;" class="font-weight-bold">เลือกการชำระเงิน</div>
                </v-col>
            </v-row>
            <v-row v-if="(checkRegisterSuccess && checkRegisterSuccess.length === 0) && dataMember.type !== 'member' && dataMember.type !== 'temp'" class="display-one-type">
                <v-col cols="6">
                    <v-card @click="selectPayment('register')" :class="isActiveOne === true ? 'card-select' : ''"
                        style="padding: 10px 10px; border-radius: 16px; height: 100%;" >
                        <v-row no-gutters>
                            <v-spacer></v-spacer>
                            <v-col cols="auto">
                                <v-icon style="color: #FFFFFF;" small> mdi-check-circle </v-icon>
                            </v-col>
                        </v-row>
                        <v-row no-gutters style="margin-top: -10px;">
                            <v-col cols="12" align="center">
                                <div style="font-size: 14px;">{{ typePaymentAll[0].type_name_th }}</div>
                            </v-col>
                            <v-col cols="12" align="center">
                                <div style="font-size: 16px;" class="font-weight-bold mt-5">฿ {{ typePaymentAll[0].amount.toLocaleString() }}</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col v-if="!endDateTrain" cols="6">
                    <v-card @click="selectPayment('registerTrain')" :class="isActiveTwo === true ? 'card-select' : ''"
                    style="padding: 10px 10px; border-radius: 16px; height: 100%;">
                        <v-row no-gutters>
                            <v-spacer></v-spacer>
                            <v-col cols="auto">
                                <v-icon style="color: #FFFFFF;" small> mdi-check-circle </v-icon>
                            </v-col>
                        </v-row>
                        <v-row no-gutters style="margin-top: -10px;">
                            <v-col cols="12" align="center">
                                <div style="font-size: 14px;">{{ typePaymentAll[2].type_name_th }}</div>
                                <br/>
                            </v-col>
                            <v-col cols="12" align="center">
                                <div style="font-size: 16px;" class="font-weight-bold">฿ {{ typePaymentAll[2].amount.toLocaleString() }}</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-else justify="center">
                <v-col cols="6">
                    <v-card  @click="selectPayment('train')" :class="isActiveTwo === true ? 'card-select' : ''"
                    style="padding: 10px 10px; border-radius: 16px; height: 100%;">
                        <v-row no-gutters>
                            <v-spacer></v-spacer>
                            <v-col cols="auto">
                                <v-icon style="color: #FFFFFF;" small> mdi-check-circle </v-icon>
                            </v-col>
                        </v-row>
                        <v-row no-gutters style="margin-top: -10px;">
                            <v-col cols="12" align="center">
                                <div style="font-size: 14px;">{{ typePaymentAll[1].type_name_th }}</div>
                            </v-col>
                            <v-col cols="12" align="center">
                                <div style="font-size: 16px;" class="font-weight-bold mt-5">฿ {{ typePaymentAll[1].amount.toLocaleString() }}</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn :disabled="!typePayment" @click="createForm" block height="40" color="#166BF9"
                        style="border-radius: 16px; color: #FFFFFF; font-size: 15px;">ยืนยัน
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <QRCodePage v-if="qrcodepage" ref="qr_payment"/>
    </v-dialog>
</template>
<script>
import QRCodePage from './QRCodePage.vue'
import moment from 'moment'
export default {
  data () {
    return {
      dialog: false,
      isActiveOne: false,
      isActiveTwo: false,
      typePayment: null,
      qrcodepage: false,
      test: true,
      typePaymentAll: [],
      tempTypeTrain: [],
      tempTypeRegisAndTrain: [],
      allformId: [],
      formIdWaiting: [],
      sendFormId: null,
      dataMember: [],
      loadTypePayment: false,
      form_payment: [],
      checkRegisterSuccess: [],
      checkRegisterTrainSuccess: [],
      round: [],
      endDateTrain: false
    }
  },
  async created () {
    this.dataMember = this.$store.state.dataMember
    // this.formIdTrain = localStorage.getItem('formIdTrain')
    await this.getAllTypePayment()
    await this.getForm()
    this.round = this.$store.state.round
    const endDateTrain = this.round[0].end_train
    const dateNow = moment()
    this.endDateTrain = dateNow.isAfter(moment(endDateTrain))
    this.loadTypePayment = true
  },
  components: {
    QRCodePage
  },
  methods: {
    // ดึงรายการที่สามารถสมัครได้ทั้งหมด
    async getAllTypePayment () {
      const tempTypePaymentAll = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/payment/getAllTypePayment`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (tempTypePaymentAll.data.message === 'success') {
        this.typePaymentAll = tempTypePaymentAll.data.data
      }
    },
    async getForm () {
      const tempAllForm = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/formRegister/getAllForm`,
        data: { member_id: this.dataMember.member_id }
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (tempAllForm.data?.status === 200 && tempAllForm.data?.message === 'Form is Empty') {
        this.form_payment = []
      } else if (tempAllForm.data?.status === 200 && tempAllForm.data?.message === 'success' && tempAllForm.data?.data?.length > 0) {
        this.form_payment = tempAllForm.data?.data
      }
      this.checkRegisterSuccess = this.form_payment.filter(item => item.type_form === 'register' && item.status_payment === 'success')
      this.checkRegisterTrainSuccess = this.form_payment.filter(item => item.type_form === 'registerTrain' && item.status_payment === 'success')
    },
    open () {
      this.isActiveOne = false
      this.isActiveTwo = false
      this.typePayment = ''
      this.dialog = true
    },
    selectPayment (type) {
      switch (type) {
        case 'register':
          this.isActiveOne = true
          this.isActiveTwo = false
          this.typePayment = 'register'
          break
        case 'registerTrain':
          this.isActiveOne = false
          this.isActiveTwo = true
          this.typePayment = 'registerTrain'
          break
        case 'train':
          this.isActiveTwo = true
          this.typePayment = 'train'
          break
        default:
          break
      }
    },
    async checkPaymentFormId () {
      const checkPayment = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/payment/checkPaymentSuccess`,
        data: { form_id: this.formId }
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      this.sendFormId = this.formId
      if (checkPayment.status === 200 && checkPayment.data?.result.payment === 'success') {
        this.sendFormId = this.formIdTrain
      }
    },
    async createForm () {
      const create = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/formRegister/createFormRegister`,
        data: { member_id: this.dataMember.member_id, typePayment: this.typePayment }
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (create.status === 200 && create.data.message === 'success') {
        localStorage.setItem('formId', create.data.form_id)
        this.openQRCode()
      }
    },
    async openQRCode () {
      this.dialog = !this.dialog
      this.formId = localStorage.getItem('formId')
      const createQRcode = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/payment/paymentQRCode?formId=${this.formId}&type_payment=${this.typePayment}`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (createQRcode.status === 200 && createQRcode.data?.message === 'success') {
        localStorage.setItem('type_payment', createQRcode.data.dataPayment.type_form)
        localStorage.setItem('amount', createQRcode.data.dataPayment.amount)
        localStorage.setItem('qrCode', createQRcode.data.dataPayment.qrCode)
        this.qrcodepage = !this.qrcodepage
        this.$router.push({ path: '/profile/payment-qpcode' })
      }
    }
  }

}
</script>
<style scoped>
.card-select {
    color: #FFFFFF;
    background: linear-gradient(to bottom, #92BFFF, #62A3FF);
}
.display-one-type {
  display: flex;
  justify-content: center;
}
</style>
