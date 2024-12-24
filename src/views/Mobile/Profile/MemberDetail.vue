<template>
  <v-container fluid class="container-member-detail">
    <img src="@/assets/trva/bgLoginHeader.png" class="img-header-detail" />
    <v-app-bar style="z-index: 2" height="70" flat color="transparent">
      <v-row no-gutters>
        <v-col
          style="position: absolute"
          cols="auto"
          class="d-flex justify-start"
        >
          <v-icon @click="back" color="#3B76EF">mdi-chevron-left</v-icon>
        </v-col>
        <v-col class="d-flex justify-center">
          <span style="font-size: 18px" class="font-weight-bold"
            >ข้อมูลสมาชิก</span
          >
        </v-col>
      </v-row>
    </v-app-bar>
    <v-card class="mt-5 card-style">
      <v-container fluid>
        <v-container fluid class="container-info-title">
          <!-- เป็นสมาชิกทั่วไป -->
          <div v-if="dataMember.type === 'member' && !isVip">
            <InfoRow label="เลขทะเบียนสมาชิก" :value="dataMember.member_no" />
            <v-row no-gutters class="align-start mb-2">
              <v-col cols="3" class="text-left">
                <span class="confirm-subject">วันที่ชำระเงิน</span>
              </v-col>
              <v-col cols="1" class="text-left">
                <span class="confirm-subject">: &nbsp;</span>
              </v-col>
              <v-col v-if="payment_success.length !== 0" cols="8" class="text-left display-receipt">
                <span v-if="payment_success?.datePayment1 !== '' && payment_success?.datePayment1 !== ''" class="confirm-detail">{{ convertToBuddhistDate(this.payment_success.datePayment1) }}</span>
                <br/>
                <span v-if="payment_success?.datePayment2 !== '' && payment_success?.datePayment2 !== ''" class="confirm-detail">{{ convertToBuddhistDate(this.payment_success.datePayment2) }}</span>
              </v-col>
              <v-col v-else cols="8" class="text-left display-receipt">
                <span class="confirm-detail">-</span>
              </v-col>
            </v-row>
            <InfoRow label="วันที่อัปเดตข้อมูล" :value="formatDateUpdate" />
            <v-row no-gutters class="align-start mb-2">
              <v-col cols="3" class="text-left">
                <span class="confirm-subject">ใบเสร็จ</span>
              </v-col>
              <v-col cols="1" class="text-left">
                <span class="confirm-subject">: &nbsp;</span>
              </v-col>
              <v-col v-if="payment_success.length !== 0" cols="8" class="text-left display-receipt">
                <span v-if="payment_success?.orderId1 !== '' && payment_success?.type_form1 !== ''" class="link-download" @click="downloadReceipt(payment_success.orderId1)">{{ typeDownload(payment_success.type_form1) }}</span>
                <br/>
                <span v-if="payment_success?.orderId2 !== '' && payment_success?.type_form2 !== ''" class="link-download" @click="downloadReceipt(payment_success.orderId2)">{{ typeDownload(payment_success.type_form2) }}</span>
              </v-col>
              <v-col v-else cols="8" class="text-left display-receipt">
                <span class="confirm-detail">-</span>
              </v-col>
            </v-row>
          </div>
          <!-- เป็นสมาชิก vip -->
          <div v-else-if="dataMember.type === 'member' && isVip">
            <v-row no-gutters class="align-start mb-2">
              <v-col cols="5" class="text-left">
                <span class="confirm-subject">เลขทะเบียนสมาชิก</span>
              </v-col>
              <v-col cols="1" class="text-left">
                <span class="confirm-subject">: &nbsp;</span>
              </v-col>
              <v-col cols="6" class="text-left display-receipt">
                <span class="confirm-detail">{{ dataMember.member_no }}</span>
              </v-col>
            </v-row>
            <v-row no-gutters class="align-start mb-2">
              <v-col cols="5" class="text-left">
                <span class="confirm-subject">วันที่อัปเดตข้อมูล</span>
              </v-col>
              <v-col cols="1" class="text-left">
                <span class="confirm-subject">: &nbsp;</span>
              </v-col>
              <v-col cols="6" class="text-left display-receipt">
                <span class="confirm-detail">{{ formatDateUpdate }}</span>
              </v-col>
            </v-row>
          </div>
          <!-- ไม่ประสงค์เป็นสมาชิก -->
          <div v-else-if="dataMember.type === 'temp'">
            <v-row no-gutters class="align-start mb-2">
                <v-col cols="5" class="text-left">
                    <span class="confirm-subject">ระยะเวลาเป็นสมาชิก</span>
                </v-col>
                <v-col cols="7" class="text-left">
                    <span class="confirm-detail">:&nbsp;วันที่ {{ formatDateStart }} - {{ formatDateEnd }}</span>
                </v-col>
            </v-row>
            <v-row no-gutters class="align-start mb-2">
                <v-col cols="5" class="text-left">
                    <span class="confirm-subject">ใบเสร็จ</span>
                </v-col>
                <v-col cols="1" class="text-left">
                  <span class="confirm-subject">: &nbsp;</span>
                </v-col>
                <v-col cols="6" class="text-left">
                  <span v-if="payment_success?.orderId1 !== '' && payment_success?.type_form1 !== ''" class="link-download" @click="downloadReceipt(payment_success.orderId1)">{{ typeDownload(payment_success.type_form1) }}</span>
                  <span v-if="payment_success.length === 0" class="confirm-detail">-</span>
                </v-col>
            </v-row>
          </div>
        </v-container>

        <v-container fluid class="container-info-section">
          <div>
            <div class="confirm-header-section">ข้อมูลส่วนตัว</div>
            <InfoRow label="คำนำหน้า" :value="dataMember.prefix" />
            <InfoRow label="ชื่อ-นามสกุล" :value="dataMember.full_name" />
            <InfoRow
              label="วัน/เดือน/ปีเกิด"
              :value="formatDateBirthday"
            />
            <InfoRow label="เบอร์โทรศัพท์" :value="dataMember.phone_number" />
            <InfoRow label="อีเมล" :value="dataMember.email" />

            <div class="confirm-header-section">ที่อยู่ปัจจุบัน</div>
            <InfoRow label="บ้านเลขที่" :value="dataMember.houseNo" />
            <InfoRow label="หมู่ที่" :value="dataMember.houseMoo" />
            <InfoRow label="ตรอก/ซอย" :value="dataMember.houseSoi" />
            <InfoRow label="ถนน" :value="dataMember.houseStreet" />
            <InfoRow label="แขวง/ตำบล" :value="dataMember.houseSubDistrict" />
            <InfoRow label="เขต/อำเภอ" :value="dataMember.houseDistrict" />
            <InfoRow label="จังหวัด" :value="dataMember.houseProvince" />
            <InfoRow label="รหัสไปรษณีย์" :value="dataMember.housePostCode" />
          </div>
        </v-container>

        <v-container fluid class="container-info-section">
          <div>
            <div class="confirm-header-section">ข้อมูลการทำงาน</div>
            <v-row no-gutters class="align-start mb-2">
              <v-col cols="5" class="text-left">
                <span class="confirm-subject">เลขที่ใบประกอบวิชาชีพการสัตวแพทย์</span>
              </v-col>
              <v-col cols="1" class="text-left">
                <span class="confirm-subject">: &nbsp;</span>
              </v-col>
              <v-col cols="6" class="text-left">
                <span class="confirm-detail">{{ dataMember.licenseNo }}</span>
              </v-col>
            </v-row>
            <v-row no-gutters class="align-start mb-2">
              <v-col cols="5" class="text-left">
                <span class="confirm-subject">วันที่ใบอนุญาตประกอบวิชาชีพการสัตวแพทย์ของท่านหมดอายุ</span>
              </v-col>
              <v-col cols="1" class="text-left">
                <span class="confirm-subject">: &nbsp;</span>
              </v-col>
              <v-col cols="6" class="text-left">
                <span class="confirm-detail">{{ formatLicenseEndDate }}</span>
              </v-col>
            </v-row>
            <v-row no-gutters class="align-start mb-2">
              <v-col cols="5" class="text-left">
                <span class="confirm-subject">วันที่ใบอนุญาตผู้ควบคุมฟาร์มเลี้ยงสัตว์ประเภทสัตว์เคี้ยวเอื้องของท่านหมดอายุ</span>
              </v-col>
              <v-col cols="1" class="text-left">
                <span class="confirm-subject">: &nbsp;</span>
              </v-col>
              <v-col cols="6" class="text-left">
                <span class="confirm-detail">{{ formatLicenseFarmEndDate }}</span>
              </v-col>
            </v-row>
            <InfoRow label="อาชีพปัจจุบัน" :value="dataMember.career" />

            <div class="confirm-header-section mt-5">ที่อยู่สถานที่ทำงาน</div>
            <InfoRow
              label="ชื่อสถานที่ทำงาน"
              :value="dataMember.workplace_name"
            />
            <InfoRow label="บ้านเลขที่" :value="dataMember.workplace_number" />
            <InfoRow label="หมู่ที่" :value="dataMember.workplace_moo" />
            <InfoRow
              label="หมู่บ้าน/อาคาร"
              :value="dataMember.workplace_building"
            />
            <InfoRow label="ตรอก/ซอย" :value="dataMember.workplace_soi" />
            <InfoRow label="ถนน" :value="dataMember.workplace_street" />
            <InfoRow label="แขวง/ตำบล" :value="dataMember.workplace_subDistrict" />
            <InfoRow label="เขต/อำเภอ" :value="dataMember.workplace_district" />
            <InfoRow label="จังหวัด" :value="dataMember.workplace_province" />
            <InfoRow
              label="รหัสไปรษณีย์"
              :value="dataMember.workplace_postCode"
            />
          </div>
        </v-container>

        <v-container fluid class="container-info-section">
          <div v-if="dataMember.type !== 'temp'">
            <v-row no-gutters class="align-start mb-2">
              <v-col cols="5" class="text-left">
                <span class="confirm-subject">ข้อมูลการส่งเอกสาร</span>
              </v-col>
              <v-col cols="1" class="text-left">
                <span class="confirm-subject">: &nbsp;</span>
              </v-col>
              <v-col cols="auto" class="text-left">
                <span class="confirm-detail">{{ typeSendDoc(dataMember.sendDoc) }}</span>
              </v-col>
              <v-spacer></v-spacer>
              <v-col v-if="dataMember.type !== 'temp'" cols="auto" class="text-left">
                <div class="d-flex flex-row align-center">
                  <v-img
                    contain
                    max-width="30"
                    src="@/assets/trva/update/edit.png"
                    class="text-link mr-1"
                    @click="editSendDoc()"
                  ></v-img>
                  <span @click="editSendDoc()" class="text-link">แก้ไข</span>
                </div>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-row no-gutters class="align-start mb-2">
                <v-col cols="5" class="text-left">
                    <span class="confirm-subject">ข้อมูลการส่งเอกสาร</span>
                </v-col>
                <v-col cols="7" class="text-left">
                    <span class="confirm-detail">:&nbsp;&nbsp;{{ typeSendDoc(dataMember.sendDoc) }}</span>
                </v-col>
            </v-row>
          </div>
        </v-container>

        <v-container v-if="dataMember.type !== 'temp'" fluid class="container-button-section">
          <v-row>
            <v-col>
              <v-btn
                @click="updateInfo()"
                block
                large
                color="primary"
                class="btn-style"
                height="45"
              >
                อัปเดตข้อมูล
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-card>
    <DialogSendDoc ref="dialogSendDoc" />
  </v-container>
</template>
<script>
import DialogSendDoc from './DialogSendDoc.vue'
import InfoRow from '../SeedWorks/InfoRow.vue'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      doc_send: '',
      dataMember: [],
      round: [],
      isVip: false
    }
  },
  components: {
    InfoRow,
    DialogSendDoc
  },
  async created () {
    this.dataMember = this.$store.state.dataMember
    this.payment_success = this.$store.state.payment_success
    this.accountId = localStorage.getItem('accountId')
    this.round = this.$store.state.round
    await this.getMemberVip()
    await this.loadData()
  },
  computed: {
    formatDateBirthday () {
      if (!this.dataMember.date_of_birth) return ''
      return this.formatToThaiDate(this.dataMember.date_of_birth)
    },
    formatLicenseEndDate () {
      if (!this.dataMember.licenseEndDate) return ''
      return this.formatToThaiDate(this.dataMember.licenseEndDate)
    },
    formatLicenseFarmEndDate () {
      if (!this.dataMember.licenseFarmEnd) return ''
      return this.formatToThaiDate(this.dataMember.licenseFarmEnd)
    },
    formatDateStart () {
      if (!this.round || !this.round[0]?.start_round) return ''
      return this.convertToBuddhistDate(this.round[0]?.start_round)
    },
    formatDateEnd () {
      if (!this.round || !this.round[0]?.end_round) return ''
      return this.convertToBuddhistDate(this.round[0]?.end_round)
    },
    formatDateUpdate () {
      if (!this.dataMember.update_at) return ''
      return this.convertToBuddhistDate(this.dataMember.update_at)
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
      this.$store.dispatch('actionSetDataMember', this.dataMember)
    },
    convertToBuddhistDate (gregorianDate) {
      const date = new Date(gregorianDate)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear() + 543
      return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
    },
    formatToThaiDate (date) {
      const [year, month, day] = date.split('-')
      const buddhistYear = parseInt(year, 10) + 543 // Add 543 to get the Buddhist year
      return `${day}/${month}/${buddhistYear}`
    },
    editSendDoc () {
      this.$refs.dialogSendDoc.open(this.dataMember.sendDoc)
    },
    updateInfo () {
      this.$router.push('/profile/update-detail')
    },
    back () {
      this.$router.push({ path: '/profile/homepage' })
    },
    typeSendDoc (type) {
      if (type === 'current') {
        return 'ที่อยู่ปัจจุบัน'
      } else if (type === 'work') {
        return 'สถานที่ทำงาน'
      } else if (type === 'email') {
        return 'อีเมล'
      }
    },
    typeDownload (type) {
      if (type === 'register') {
        return 'ดาวน์โหลดใบเสร็จค่าสมัครสมาชิก'
      } else if (type === 'train') {
        return 'ดาวน์โหลดใบเสร็จค่าสมัครอบรม'
      } else if (type === 'registerTrain') {
        return 'ดาวน์โหลดใบเสร็จค่าสมัครสมาชิกและอบรม'
      }
    },
    async downloadReceipt (orderId) {
      const order = orderId
      const getLink = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/payment/getreceipt?order_id=${order}`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      window.open(getLink.data.pdfURL.pdfURL)
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
        const no = localStorage.getItem('memberNo')
        const checkVip = this.memberVip.filter(item => item.member_no.includes(no))
        this.isVip = checkVip.length > 0
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
.container-member-detail {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(0deg, #ffffff 73.19%, #006aff 102.76%);
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}
.img-header-detail {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.card-style {
  border-radius: 16px !important;
  width: 100%;

}

.btn-style {
  border-radius: 16px;
  width: 50%;
}

.container-info-section {
  border-radius: 16px;
  background-color: #fafafa;
  width: 97%;
  margin-bottom: 20px;
}

.container-info-title {
  border-radius: 16px;
  background-color: #fcf8f3;
  width: 97%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.confirm-header-section {
  font-weight: bold;
  margin-bottom: 16px;
}

.confirm-detail {
  font-size: 16px;
  font-weight: 500;
}

.confirm-subject {
  font-size: 16px;
  color: #989898;
}
.container-button-section {
  width: 95.7%;
  margin-top: -20px;
  padding-bottom: 20px;
}
.link-download {
  text-decoration: underline;
  cursor: pointer;
  color: #1b5dd6;
}
</style>
