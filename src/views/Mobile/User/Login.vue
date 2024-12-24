<template>
    <div class="main-background-login">
      <div class="container-login-member">
        <img class="vector-03" src="@/assets/trva/vector03.png"/>
        <img class="logo-login-member" src="@/assets/trva/logo.png" width="120" height="120"/>

        <v-img class="cow-01" src="@/assets/trva/cow01.png"/>
        <v-img class="cow-02" src="@/assets/trva/cow02.png"/>
        <v-img class="cow-03" src="@/assets/trva/cow03.png"/>
        <v-img class="cow-04" src="@/assets/trva/cow04.png"/>

        <img class="vector-06" src="@/assets/trva/vector06.png"/>

        <v-card class="card-login-member">
          <v-form ref="form" v-model="valid">
            <p class="margin-bottom-5">ชื่อ - นามสกุล</p>
            <v-text-field
              v-model="fullName"
              :rules=[rules.requiredFullName]
              style="border-radius: 8px;"
              shaped
              outlined
              placeholder="ระบุชื่อ-นามสกุล"
              dense
            />
            <p class="margin-bottom-5">เลขทะเบียนสมาชิก</p>
            <v-text-field
              v-model="memberNo"
              :rules=[rules.requiredMemberNo]
              style="border-radius: 8px;"
              shaped
              outlined
              placeholder="ระบุเลขทะเบียนสมาชิก"
              dense
            />
          </v-form>
          <v-btn
            style="border-radius: 16px; margin-bottom: 15px;"
            block
            elevation="0"
            color="#166BF9"
            dark
            large
            @click="loginOldMember"
          >เข้าสู่ระบบสมาชิกเดิม</v-btn>
          <v-btn
            style="border-radius: 16px; margin-bottom: 20px;"
            block
            elevation="0"
            color="#166BF9"
            light
            large
            outlined
            @click="registerNewMember"
          >สมัครสมาชิกใหม่</v-btn>

          <div class="text-or">
            <hr size="1" width="50%" color="#CFCFCF">
            <p class="margin-bottom-0" style="padding-left: 20px; padding-right: 20px; color: #CFCFCF;">หรือ</p>
            <hr size="1" width="50%" color="#CFCFCF">
          </div>

          <v-btn
            style="border-radius: 16px; margin-top: 20px;"
            block
            elevation="0"
            color="#166BF9"
            light
            large
            outlined
            @click="registerUndesirable"
          >ไม่ประสงค์สมัครสมาชิก</v-btn>

          <div class="search-login-member">
            <span>ค้นหารายชื่อสมาชิก</span>
            <span style="text-decoration: underline; cursor: pointer; color: #1B5DD6;" @click="search">คลิกที่นี่</span>
          </div>
        </v-card>

        <div class="footer-login-member">
          <img class="frame-height" src="@/assets/trva/footer.png"/>
        </div>
      </div>
      <!-- แจ้งเตือนปิดอบรม -->
      <DialogAlert ref="dialogRejectEndTrain" :type-dialog="'rejectEndTrain'"/>
    </div>
</template>
<script>
// import DialogConfirmDisirable from '../Register/DialogConfirmDisirable.vue'
import DialogAlert from '../../../components/DialogAlert.vue'
import Swal from 'sweetalert2'
import moment from 'moment'
export default {
  components: {
    DialogAlert
  },
  data () {
    return {
      windowHeight: window.innerHeight,
      memberNo: '',
      img: '',
      fullName: '',
      acc: '',
      valid: true,
      rules: {
        requiredFullName: (value) => !!value || 'กรุณากรอกชื่อ-นามสกุล',
        requiredMemberNo: (value) => !!value || 'กนุณาระบุเลขทะเบียนสมาชิก'
      },
      clickConfirmDisirable: false,
      accountId: null,
      tempDupData: [],
      round: [],
      endDateTrain: false,
      startRound: false
    }
  },
  computed: {
    menuCardHeight () {
      var height = this.windowHeight - 600
      return height
    }
  },
  async created () {
    localStorage.removeItem('formId')
    localStorage.removeItem('qrCode')
    localStorage.removeItem('type_payment')
    localStorage.removeItem('amount')
    localStorage.removeItem('memberId')
    localStorage.removeItem('memberNo')
    localStorage.removeItem('fullName')
    this.accountId = localStorage.getItem('accountId')
    await this.getRound()
    const endDateTrain = this.round[0].end_train
    const startRound = this.round[0].start_round
    console.log('startRound :>> ', startRound)
    const dateNow = moment()
    this.endDateTrain = dateNow.isAfter(moment(endDateTrain))
    this.startRound = dateNow.isAfter(moment(startRound))
    console.log('this.endDateTrain :>> ', this.endDateTrain)
    console.log('this.startRound :>> ', this.startRound)
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  methods: {
    registerNewMember () {
      this.$router.push('/register-new-member')
    },
    registerUndesirable () {
      if (!this.endDateTrain || !this.startRound) {
        this.clickConfirmDisirable = true
        this.$router.push('/register-undesirable')
      } else {
        this.$refs.dialogRejectEndTrain.open('สิ้นสุดการอบรม')
      }
    },
    async loginOldMember () {
      const isValid = this.$refs.form.validate()
      if (!isValid) {
        this.$refs.form.validate()
      } else {
        const res = await this.axios({
          method: 'POST',
          url: `${process.env.VUE_APP_API_URL}/api/member/loginOldMember`,
          data: { member_no: this.memberNo, full_name: this.fullName, accountId: this.accountId }
        }).then((response) => {
          return response
        }).catch((err) => {
          return err.response
        })
        if (res.status === 200 && res.data?.status === 'success' && res.data?.message !== 'Member Duplicate') { // กรณีคนเก่าเข้ามาครั้งแรก
          localStorage.setItem('memberNo', this.memberNo)
          localStorage.setItem('fullName', this.fullName)
          await Swal.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.$router.push('/login-old-member')
          })
        } else if (res.status === 200 && res.data?.status === 'success' && res.data?.message === 'Member Duplicate') { // กรณีคนเก่ากดเข้ามาซ้ำ และมีข้อมูลแล้ว
          this.tempDupData = res.data.data
          localStorage.setItem('memberNo', this.memberNo)
          localStorage.setItem('fullName', this.fullName)
          await this.goToBiz()
        } else {
          Swal.fire({
            title: 'ไม่พบข้อมูลสมาชิกของท่าน',
            text: 'โปรดติดต่อเจ้าหน้าที่',
            icon: 'error'
          })
          this.$refs.form.reset()
        }
      }
    },
    onResize () {
      this.windowHeight = window.innerHeight
    },
    search () {
      this.$router.push('/searchMember')
    },
    async goToBiz () {
      const payload = {
        prefix: this.tempDupData.prefix,
        full_name: this.tempDupData.full_name
      }
      const setToBiz = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/member/setToBiz`,
        data: { payload: payload, accountId: this.accountId }
      })
      if (setToBiz.data.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
        console.log('set to biz ok')
      } else {
        Swal.fire({
          title: 'ระบบขัดข้อง',
          text: 'กรุณาลองใหม่อีกครั้ง',
          icon: 'error'
        })
      }
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
.main-background-login {
  width: 100vw;
  height: 100vh;
  background-color: #F5F8FF;
}
.container-login-member {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #207DFF 2.77%, #72ACFF 12.1%, #F5F8FF 37.98%);
}
.vector-03 {
  width: 100%;
  position: absolute;
  z-index: 0;
  top: -5%;
}
.logo-login-member {
  position: absolute;
  top: 5%;
  z-index: 2;
}
.card-login-member {
  width: 80%;
  padding: 25px;
  position: absolute;
  z-index: 2;
  border-radius: 24px;
  top: 30%;
}

.text-or {
  display: flex;
  align-items: center;
}

.search-login-member {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
}

.cow-01 {
  position: absolute;
  width: 25vw;
  left: 0;
  top: 15%;
  z-index: 2;
}

.cow-02 {
  position: absolute;
  width: 40vw;
  left: 0;
  top: 23%;
  z-index: 2;
}

.cow-03 {
  position: absolute;
  width: 40vw;
  right: 0;
  top: 23%;
  z-index: 2;
}

.cow-04 {
  position: absolute;
  width: 25vw;
  right: -2%;
  top: 15%;
  z-index: 2;
}

.footer-login-member {
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.frame-height {
  width: 100%;
  height: 80px;
}

/* ----- ohther ------ */
.margin-bottom-0 {
  margin-bottom: 0px;
}
.margin-bottom-5 {
  margin-bottom: 5px;
}
.vector-06 {
  width: 100%;
  position: absolute;
  top: 25%;
  z-index: 1;
}
</style>
