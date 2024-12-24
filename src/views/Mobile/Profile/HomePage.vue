<template>
  <div>
    <template v-if="isLoad">
      <v-overlay :value="isLoad">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </template>
    <template v-if="!isLoad && dataMember.status">
      <v-container fluid class="container-hompage-member">
        <img src="@/assets/trva/bgLoginHeader.png" class="img-header-homepage"/>
          <v-app-bar flat color="transparent"></v-app-bar>
          <v-row no-gutters>
              <v-col class="d-flex justify-center" cols="12">
                  <v-img contain width="110" height="110" src="@/assets/trva/logo.png"></v-img>
              </v-col>
              <v-col class="d-flex justify-center" cols="12">
                  <div style="font-size: 18px; font-weight: 600;">ระบบสมาชิกสมาคมสัตวแพทย์ <br>
                      ผู้ควบคุมฟาร์มสัตว์เคี้ยวเอื้อง
                  </div>
              </v-col>
              <v-col class="d-flex justify-center mt-2" cols="12">
                  <div style="font-size: 14px; font-weight: 600; color: #464646;">
                      (Thai Ruminant Veterinary Association)
                  </div>
              </v-col>
          </v-row>
          <v-row class="pl-3 pr-3 content-homepage" align="stretch">
              <v-col cols="12">
                  <v-card class="custom-card">
                      <v-card-text align="center">
                          <v-row no-gutters>
                              <v-col cols="12">
                                  <span style="font-size: 17px; color: #166BF9; font-weight: 600;">ยินดีต้อนรับ</span>
                              </v-col>
                              <v-row justify="center" align="center" no-gutters>
                                  <v-col cols="auto" class="mr-1">
                                      <span style="font-size: 17px; color: #464646; font-weight: 500; display: block;">
                                          {{ dataMember.prefix }}
                                      </span>
                                  </v-col>
                                  <v-col cols="auto">
                                      <span style="font-size: 17px; color: #464646; font-weight: 500; display: block;">
                                          {{ dataMember.full_name }}
                                      </span>
                                  </v-col>
                              </v-row>
                              <v-col cols="12">
                                <template v-if="dataMember.type !== 'temp'">
                                  <span v-if="dataMember.member_no === null" style="font-size: 17px; color: #667085; font-weight: 500;">เลขทะเบียนสมาชิก
                                    <span style="color: #333333;">&nbsp;:&nbsp;-</span>
                                  </span>
                                  <span v-else style="font-size: 18px; color: #667085; font-weight: 500;">เลขทะเบียนสมาชิก
                                    <span style="color: #333333;">&nbsp;:&nbsp;{{ dataMember.member_no }}</span>
                                  </span>
                                </template>
                                <template v-else>
                                  <span style="font-size: 14px; color: #667085; font-weight: 500;">ระยะเวลาเป็นสมาชิก</span>
                                  <span style="font-size: 14px; color: #667085; font-weight: 500;">&nbsp;:&nbsp;วันที่ {{ formatDateStart }} - {{ formatDateEnd }}</span>
                                </template>
                              </v-col>
                          </v-row>
                      </v-card-text>
                  </v-card>
              </v-col>
              <v-col class="mt-4" cols="6" style="position: relative;">
                  <v-img class="img-info-member" contain max-width="50" src="@/assets/trva/register/info-member.png"></v-img>
                  <v-card class="card-info" style="height: 100%;" @click="detailInfo">
                      <v-card-text align="center" class="pl-1 pr-1">
                          <v-row no-gutters>
                              <v-col cols="12">
                                  <span style="font-size: 16px; color: #333333; font-weight: 500;">ข้อมูลสมาชิก</span>
                              </v-col>
                              <v-col cols="12">
                                  <div>
                                      <span class="text-status" :class="infoMember.class_info"
                                          style="font-size: 14px; font-weight: 500;">{{ infoMember.text_status }}</span>
                                  </div>
                              </v-col>
                          </v-row>
                      </v-card-text>
                  </v-card>
              </v-col>
              <v-col v-if="!endDateTrain" class="mt-4" cols="6" style="position: relative;">
                  <v-img class="img-info-member" contain max-width="50" src="@/assets/trva/register/alldemics.png"></v-img>
                  <v-card class="card-info" @click="goToTrain">
                      <v-card-text align="center" class="pl-1 pr-1">
                          <v-row no-gutters>
                              <v-col cols="12">
                                  <span style="font-size: 16px; color: #333333; font-weight: 500;">อมรม ALLDEMICS</span>
                              </v-col>
                              <v-col cols="12">
                                  <div>
                                      <span class="text-status waiting-payment" :class="tainMember.class_info"
                                        style="font-size: 14px; font-weight: 500;">{{ tainMember.text_status }}</span>
                                  </div>
                              </v-col>
                          </v-row>
                      </v-card-text>
                  </v-card>
              </v-col>
              <v-col v-else class="mt-4" cols="6" style="position: relative;">
                  <v-img class="img-info-member" contain max-width="50" src="@/assets/trva/register/alldemics.png"></v-img>
                  <v-card class="card-info" @click="goToTrain">
                      <v-card-text align="center" class="pl-1 pr-1">
                          <v-row no-gutters>
                              <v-col cols="12">
                                  <span style="font-size: 16px; color: #333333; font-weight: 500;">อมรม ALLDEMICS</span>
                              </v-col>
                              <v-col cols="12">
                                  <div>
                                      <span class="text-status waiting-payment" :class="tainMember.class_info"
                                        style="font-size: 14px; font-weight: 500;">{{ tainMember.text_status }}</span>
                                  </div>
                              </v-col>
                          </v-row>
                      </v-card-text>
                  </v-card>
              </v-col>
              <v-col v-if="!((train && register) || registerTrain || train)" align="center" class="btn-payment">
                  <v-btn block height="50" color="#166BF9"
                      style="border-radius: 16px; color: #FFFFFF; font-size: 15px;" @click="openDialogPayment">ชำระเงิน
                  </v-btn>
              </v-col>
          </v-row>
        <DialogPayment v-if="clickDialogPayment" ref="dialogPayment" />

        <!-- แจ้งเตือนรอจ่ายเงิน -->
        <DialogAlert ref="dialogWaitingPayment" :type-dialog="'waitingPayment'"/>

        <!-- แจ้งเตือนรอเจ้าหน้าที่ตรวจสอบข้อมูล -->
        <DialogAlert ref="dialogRejectAdminApprove" :type-dialog="'rejectAdminApprove'"/>

        <!-- แจ้งเตือนชำระเงินค่าสมัครอบรม -->
        <DialogAlert ref="dialogRejectTrain" :type-dialog="'rejectTrain'"/>

        <!-- แจ้งเตือนปิดอบรม -->
        <DialogAlert ref="dialogRejectEndTrain" :type-dialog="'rejectEndTrain'"/>
        <img src="@/assets/trva/vector04.png" class="vector-04"/>
        <img src="@/assets/trva/vector05.png" class="vector-05"/>
      </v-container>
    </template>
    <!-- แจ้งเตือนสิ้นสุดการเข้าระบบไม่เป็นสมาชิก -->
    <DialogAlert ref="dialogRejectEndTemp" :type-dialog="'rejectEndTemp'"/>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import DialogPayment from './DialogPayment.vue'
import DialogAlert from '../../../components/DialogAlert.vue'
import moment from 'moment'
export default {
  data () {
    return {
      infoMember: {
        text_status: null,
        class_info: null
      },
      tainMember: {
        text_status: null,
        class_info: null
      },
      dataMember: [],
      text_status: null,
      accountId: null,
      dialogRejectPayment: false,
      clickDialogPayment: false,
      dialogWaitingPayment: false,
      form_payment: [],
      waitingPayment: false,
      shared_token: '',
      round: [],
      waitingPaymentAll: [],
      registerTrain: false,
      register: false,
      train: false,
      isLoad: true,
      memberVip: [],
      memberNo: '',
      isVip: false,
      endDateTrain: false,
      typeDialog: ''
    }
  },
  async created () {
    this.accountId = localStorage.getItem('accountId')
    this.memberNo = localStorage.getItem('memberNo')
    await this.loadData()
    await this.getRound()
    if (!this.dataMember.status) {
      this.typeDialog = 'rejectEndTemp'
      this.$refs.dialogRejectEndTemp.open('สิ้นสุดการเข้าระบบไม่เป็นสมาชิก')
      this.isLoad = false
    } else {
      await this.getMemberVip()
      await this.loadForm()
      const endDateTrain = this.round[0].end_train
      const dateNow = moment()
      this.endDateTrain = dateNow.isAfter(moment(endDateTrain))
      this.checkPaymentSuccess()
      this.memberDetail()
      this.tainDetail()
      this.isLoad = false
    }
  },
  components: {
    DialogPayment, DialogAlert
  },
  computed: {
    formatDateStart () {
      if (!this.round || !this.round[0]?.start_round) return ''
      return this.formatToThaiDate(this.round[0]?.start_round)
    },
    formatDateEnd () {
      if (!this.round || !this.round[0]?.end_round) return ''
      return this.formatToThaiDate(this.round[0]?.end_round)
    }
  },
  methods: {
    async loadData () {
      const res = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/member/getDataMember`,
        data: { accountId: this.accountId }
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      this.dataMember = res.data.result[0]
      localStorage.setItem('memberId', this.dataMember.member_id)
      localStorage.setItem('memberNo', this.dataMember.member_no)
      this.$store.dispatch('actionSetDataMember', this.dataMember)
    },
    async getAllForm () {
      const allForm = await this.axios({
        method: 'post',
        url: `${process.env.VUE_APP_API_URL}/api/formRegister/getAllForm`,
        data: { member_id: this.dataMember.member_id }
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      return allForm
    },
    async loadForm () {
      const allForm = await this.getAllForm()
      if (allForm.data?.status === 200) {
        this.form_payment = allForm.data?.data === undefined ? [] : allForm.data?.data
        if (this.form_payment.length) {
          const tempOrderId = {
            type_form1: this.form_payment[0] ? this.form_payment[0].type_form : '',
            orderId1: this.form_payment[0] ? this.form_payment[0].order_id : '',
            datePayment1: this.form_payment[0] ? this.form_payment[0].date_payment : '',
            type_form2: this.form_payment[1] ? this.form_payment[1].type_form : '',
            orderId2: this.form_payment[1] ? this.form_payment[1].order_id : '',
            datePayment2: this.form_payment[1] ? this.form_payment[1].date_payment : ''
          }
          this.$store.dispatch('actionSetPaymentSuccess', tempOrderId)
        }
      }
    },
    async openDialogPayment () {
      if (this.waitingPaymentAll.length === 0) {
        this.clickDialogPayment = true
        this.$nextTick(() => {
          this.$refs.dialogPayment.open()
        })
      } else if (this.waitingPaymentAll.length) {
        this.isLoad = true
        const formId = this.waitingPaymentAll[0].form_regis_id
        const typePayment = this.waitingPaymentAll[0].type_form
        const createQRcode = await this.axios({
          method: 'GET',
          url: `${process.env.VUE_APP_API_URL}/api/payment/paymentQRCode?formId=${formId}&type_payment=${typePayment}`
        }).then((response) => {
          return response
        }).catch((err) => {
          return err.response
        })
        if (createQRcode.status === 200 && createQRcode.data?.message === 'success') {
          localStorage.setItem('type_payment', createQRcode.data.dataPayment.type_form)
          localStorage.setItem('amount', createQRcode.data.dataPayment.amount)
          localStorage.setItem('qrCode', createQRcode.data.dataPayment.qrCode)
          localStorage.setItem('formId', formId)
          this.qrcodepage = !this.qrcodepage
          this.$router.push({ path: '/profile/payment-qpcode' })
          this.isLoad = false
        }
      }
    },
    memberDetail () {
      if (this.dataMember.type === 'member') {
        this.infoMember.text_status = 'เป็นสมาชิกแล้ว'
        this.infoMember.class_info = 'success-info'
      } else if (this.dataMember.type === 'temp') {
        this.infoMember.text_status = 'ไม่เป็นสมาชิก'
        this.infoMember.class_info = 'success-info'
      } else if (this.dataMember.type === 'regis' && (this.register || this.registerTrain)) {
        this.infoMember.text_status = 'รอตรวจสอบ'
        this.infoMember.class_info = 'waiting-approve'
      } else if (this.dataMember.type === 'regis' && !(this.register || this.registerTrain)) {
        this.infoMember.text_status = 'รอชำระเงิน'
        this.infoMember.class_info = 'waiting-payment'
      }
    },
    detailInfo () {
      if (this.dataMember.type === 'member') {
        this.$router.push({ path: '/profile/detail' })
      } else if (this.dataMember.type === 'temp') {
        this.$router.push({ path: '/profile/detail' })
      } else if (this.dataMember.type === 'regis' && (this.register || this.registerTrain)) {
        this.$refs.dialogRejectAdminApprove.open('ยังไม่สามารถทำรายการเพิ่มเติมได้')
      } else if (this.dataMember.type === 'regis' && !(this.register || this.registerTrain)) {
        this.$refs.dialogWaitingPayment.open('ยังไม่สามารถดูข้อมูลได้')
      }
    },
    tainDetail () {
      if (this.endDateTrain) {
        console.log('เลยวันอบรมแล้ว')
        this.tainMember.text_status = 'สิ้นสุดรอบอบรม'
        this.tainMember.class_info = 'end-train'
      } else {
        console.log('ยังอบรมได้อยู่')
        if (this.registerTrain || this.train || this.isVip) {
          this.tainMember.text_status = 'รอเข้าอบรม'
          this.tainMember.class_info = 'waiting-train'
        } else {
          this.tainMember.text_status = 'รอชำระเงิน'
          this.tainMember.class_info = 'waiting-payment'
        }
      }
    },
    selectPayment () {
      this.$refs.dialogPayment.selectPayment()
      console.log(this.$refs.dialogPayment.selectPayment())
    },
    async goToTrain () {
      if (this.endDateTrain) {
        console.log('click')
        // this.typeDialog = 'rejectEndTrain'
        this.$refs.dialogRejectEndTrain.open('สิ้นสุดการอบรม')
      } else {
        if (this.registerTrain || this.train || this.isVip) {
          await this.getSharedToken()
          window.location.assign(`https://elearning-trva.one.th/oauth/token?token=${this.shared_token}`)
          console.log('เข้าอบรม')
        } else {
          this.$refs.dialogRejectTrain.open('กรุณาชำระเงินค่าสมัครอบรม')
        }
      }
    },
    checkPaymentSuccess () {
      const no = localStorage.getItem('memberNo')
      const checkVip = this.memberVip.filter(item => item.member_no.includes(no))
      this.isVip = checkVip.length > 0
      if (this.form_payment.length > 0) {
        const tempRegisterTrain = this.form_payment.filter(item => item.status_payment === 'success' && item.type_form === 'registerTrain')
        const tempRegister = this.form_payment.filter(item => item.status_payment === 'success' && item.type_form === 'register')
        const tempTrain = this.form_payment.filter(item => item.status_payment === 'success' && item.type_form === 'train')
        const tempWaiting = this.form_payment.filter(item => item.status_payment === 'waiting')
        this.waitingPaymentAll = tempWaiting
        this.registerTrain = tempRegisterTrain.length > 0
        this.register = tempRegister.length > 0 || this.dataMember.type === 'temp'
        this.train = tempTrain.length > 0 || this.endDateTrain
      }
      if (this.isVip) {
        this.registerTrain = true
      }
    },
    async getSharedToken () {
      const res = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/auth/getSharedToken`,
        data: { accountId: this.accountId }
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.data?.result?.status === 200 && res.data?.result?.message === 'success') {
        this.shared_token = res.data.result.shared_token
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
    async getMemberVip () {
      const res = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/member/getMemberVIP`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.status === 200) {
        this.memberVip = res.data?.data
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
.container-hompage-member {
  padding: 0;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #82B6FF 0%, #F2F5FA 21.25%, #F2F5FA 83.81%, #78ABFF 110.84%);
}
.img-header-homepage {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.content-homepage {
  position: absolute;
  z-index: 2;
}
.vector-04 {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.vector-05 {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.img-info-member {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

.text-status {
    padding: 0px 6px;
    text-align: center;
    border-radius: 16px;
}

.waiting-payment {
    color: #1B5DD6;
    background-color: #E8F0FE;
}
.waiting-approve {
    color: #7343E5;
    background-color: #F2EBFD;
}

.waiting-train {
    color: #FAAD14;
    background-color: #FFF1E1;
}
.end-train {
    color: #808080;
    background-color: #dcdcdc;
}
.taining {
    color: #3EB8DD;
    background-color: #ECF7FB;
}
.success-info {
    color: #52C41A;
    background-color: #E0F6D6 ;
}
.success-tain {
    color: #2FC670;
    background-color: #E9F9EF;
}

.card-info {
    border-radius: 16px;
    padding: 5px 0px;
}
.v-card--link:focus:before {
    opacity: 0;
}
.custom-card {
  border-radius: 16px;
  background-image: url('../../../assets/trva/register/Vector.png'),
                    url('../../../assets/trva/register/Vector2.png'),
                    url('../../../assets/trva/register/Vector3.png');
  background-size: auto, auto, cover;
  background-position: left top, right bottom, right bottom;
  background-repeat: no-repeat, no-repeat, no-repeat;
}
.v-progress-circular {
  margin: 1rem;
}
</style>
