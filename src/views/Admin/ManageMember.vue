<template>
  <div class="container-detail-member">
    <v-overlay :value="overlay">
      <v-progress-circular color="#4574DE" indeterminate size="40" class="circle"></v-progress-circular>
    </v-overlay>
    <div class="header">
      <div class="header-left">
        <v-btn
          class="mx-2"
          fab
          small
          color="#FFFFFF"
          elevation="1"
          @click="back"
        >
          <v-icon color="rgba(59, 118, 239, 1)"> mdi-chevron-left </v-icon>
        </v-btn>
        <p class="text-header">รายละเอียดข้อมูลสมาชิก</p>
        <v-chip v-if="status_form === 'verify' && this.status_payment === 'waiting'" color="#fff3d1" light>
          <span style="color: #FFB800">รอชำระเงิน</span>
        </v-chip>
        <v-chip v-else-if="status_payment === 'success' && status_form === 'verify' && type_form !== 'train'" color="#f2ebfd" light>
          <span style="color: #7343e5">รอตรวจสอบ</span>
        </v-chip>
        <v-chip v-else-if="status_form === 'approved' && status_payment === 'success'" color="#f1ffea" light>
          <span style="color: #2ccc4a">อนุมัติ</span>
        </v-chip>
        <v-chip v-else-if="(status_form === 'verify' && status_payment === 'success') || (status_form === null && type_member === 'member')" color="#f1ffea" light>
          <span style="color: #2ccc4a">เป็นสมาชิก</span>
        </v-chip>
      </div>
      <div class="header-right" v-if="status_form === 'verify' && status_payment === 'success' && type_form !== 'train'">
        <!-- <v-btn class="style-btn" outlined color="rgba(22, 107, 249, 1)">ไม่อนุมัติ</v-btn> -->
        <v-btn class="style-btn" color="rgba(22, 107, 249, 1)" dark elevation="0" @click.stop="openDialogConfirmApprove">อนุมัติ</v-btn>
      </div>
    </div>
    <div class="content">
      <div class="first-content margin-bottom-20">
        <img class="bg-first-content" src="../../assets/trva/bg-first-content.png"/>
        <img class="bg-first-content-1" src="../../assets/trva/vector07.png"/>

        <div class="row-first-content">
          <div class="col-first-content">
            <p class="text-col">วันที่สมัครสมาชิก&nbsp;:</p>
            <p class="sub-text-col">{{ registerDate }}</p>
          </div>
          <div class="col-first-content">
            <p class="text-col">วันที่ชำระเงินสมาชิก&nbsp;:</p>
            <p class="sub-text-col">{{ paymentDate }}</p>
          </div>
          <div class="col-first-content">
            <p class="text-col">เลขทะเบียนสมาชิก&nbsp;:</p>
            <p class="sub-text-col">{{ registerNo }}</p>
          </div>
        </div>
        <!-- <div class="row-first-content">
          <div class="col-first-content">
            <p class="text-col">สถานะอบรม&nbsp;:</p>
            <p class="sub-text-col" style="color: rgba(22, 107, 249, 1)">
              รอชำระเงิน
            </p>
          </div>
          <div class="col-first-content">
            <p class="text-col">วันที่ชำระเงินอบรม&nbsp;:</p>
            <p class="sub-text-col">{{ paymentDateCourse }}</p>
          </div>
          <div class="col-first-content">
            <p class="text-col">วันที่อัปเดตข้อมูล&nbsp;:</p>
            <p class="sub-text-col">{{ updateDate }}</p>
          </div>
        </div> -->
      </div>
      <div class="second-content margin-bottom-20">
        <div class="second-content-header">
          <img src="../../assets/trva/personal.png" width="24" height="24" />
          <p>ข้อมูลส่วนตัว</p>
        </div>
        <div class="row-second-content">
          <div class="col-second-content">
            <div class="detail-second-content">
              <div class="width-120">คำนำหน้า</div>
              <div class="width-180">:&nbsp;{{ prefixTH }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-120">ชื่อ - นามสกุล</div>
              <div class="width-180">:&nbsp;{{ fullname }}</div>
            </div>
            <!-- <div class="detail-second-content">
              <div class="width-60">เพศ</div>
              <div class="width-180">:&nbsp;{{ gender }}</div>
            </div> -->
          </div>
          <div class="col-second-content">
            <div class="detail-second-content">
              <div class="width-120">วัน/เดือน/ปีเกิด</div>
              <div class="width-180">:&nbsp;{{ birthDate }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-120">เบอร์โทรศัพท์</div>
              <div class="width-180">:&nbsp;{{ telMobile }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-60">อีเมล</div>
              <div class="width-180">:&nbsp;{{ email }}</div>
            </div>
          </div>
          <div class="col-second-content">
            <div class="detail-second-content">
              <div class="width-180">เลขประจำตัวผู้เสียภาษี</div>
              <div class="width-180">:&nbsp;{{ tax }}</div>
            </div>
          </div>
        </div>
        <div class="second-content-header" style="margin-top: 15px">
          <img src="../../assets/trva/location.png" width="24" height="24" />
          <p>ที่อยู่ปัจจุบัน</p>
        </div>
        <div class="row-second-content">
          <div class="col-second-content">
            <div class="detail-second-content">
              <div class="width-120">บ้านเลขที่</div>
              <div class="width-180">:&nbsp;{{ now_no }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-60">หมู่ที่</div>
              <div class="width-180">:&nbsp;{{ now_moo }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-120">หมู่บ้าน/อาคาร</div>
              <div class="width-180">:&nbsp;{{ now_building }}</div>
            </div>
          </div>
          <div class="col-second-content">
            <div class="detail-second-content">
              <div class="width-120">ตรอก/ซอย</div>
              <div class="width-180">:&nbsp;{{ now_soi }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-60">ถนน</div>
              <div class="width-180">:&nbsp;{{  now_road }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-120">แขวง/ตำบล</div>
              <div class="width-180">:&nbsp;{{ now_tambon }}</div>
            </div>
          </div>
          <div class="col-second-content">
            <div class="detail-second-content">
              <div class="width-120">เขต/อำเภอ</div>
              <div class="width-180">:&nbsp; {{ now_amphoe }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-60">จังหวัด</div>
              <div class="width-180">:&nbsp;{{  now_provice }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-120">รหัสไปรษณีย์</div>
              <div class="width-180">:&nbsp;{{ now_zipcode }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="third-content margin-bottom-20">
        <div class="third-content-header">
          <img
            src="../../assets/trva/jobDescription.png"
            width="24"
            height="24"
          />
          <p>ข้อมูลการทำงาน</p>
        </div>
        <div class="row-third-content">
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-280">เลขที่ใบประกอบวิชาชีพการสัตวแพทย์</div>
              <div class="width-180">:&nbsp;{{ license_no }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-300">
                วันที่ใบอนุญาตประกอบวิชาชีพการสัตวแพทย์ของท่านหมดอายุ
              </div>
              <div class="width-180">:&nbsp;{{ license_endDate }}</div>
            </div>
          </div>
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-280">
                วันที่ใบอนุญาตสัตวแพทย์ผู้ควบคุมฟาร์มเลี้ยงสัตว์
                ประเภทสัตว์เคี้ยวเอื้องของท่านหมดอายุ
              </div>
              <div class="width-180">:&nbsp;{{ licenseFarm_endDate }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-300">อาชีพปัจจุบัน</div>
              <div class="width-180">:&nbsp;{{ career }}</div>
            </div>
          </div>
        </div>
        <div class="third-content-header" style="margin-top: 15px">
          <img src="../../assets/trva/jobPlace.png" width="24" height="24" />
          <p>ที่อยู่สถานที่ทำงาน</p>
        </div>
        <div class="row-third-content">
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-120">ชื่อสถานที่ทำงาน</div>
              <div class="width-200">:&nbsp;{{ workname }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-120">บ้านเลขที่</div>
              <div class="width-180">:&nbsp;{{  work_no  }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-60">หมู่ที่</div>
              <div class="width-180">:&nbsp;{{ work_moo }}</div>
            </div>
          </div>
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-120">หมู่บ้าน/อาคาร</div>
              <div class="width-200">:&nbsp;{{ work_building }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-120">ตรอก/ซอย</div>
              <div class="width-180">:&nbsp;{{ work_soi }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-60">ถนน</div>
              <div class="width-180">:&nbsp;{{ work_road }}</div>
            </div>
          </div>
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-120">แขวง/ตำบล</div>
              <div class="width-200">:&nbsp;{{ work_tambon }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-120">เขต/อำเภอ</div>
              <div class="width-180">:&nbsp; {{ work_amphoe }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-60">จังหวัด</div>
              <div class="width-180">:&nbsp; {{ work_provice }}</div>
            </div>
          </div>
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-120">รหัสไปรษณีย์</div>
              <div class="width-200">:&nbsp; {{ work_zipcode }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="third-content margin-bottom-20">
        <div class="third-content-header">
          <v-avatar size="28">
            <img
              src="../../assets/trva/COMP-3.jpg"
            />
          </v-avatar>
          <p>ช่องทางการจัดส่งเอกสาร</p>
        </div>
        <div v-if="sendDoc === 'current'" class="row-second-content">
          <div class="col-second-content">
            <div class="detail-second-content">
              <div class="width-120">บ้านเลขที่</div>
              <div class="width-180">:&nbsp;{{ now_no }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-60">หมู่ที่</div>
              <div class="width-180">:&nbsp;{{ now_moo }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-120">หมู่บ้าน/อาคาร</div>
              <div class="width-180">:&nbsp;{{ now_building }}</div>
            </div>
          </div>
          <div class="col-second-content">
            <div class="detail-second-content">
              <div class="width-120">ตรอก/ซอย</div>
              <div class="width-180">:&nbsp;{{ now_soi }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-60">ถนน</div>
              <div class="width-180">:&nbsp;{{  now_road }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-120">แขวง/ตำบล</div>
              <div class="width-180">:&nbsp;{{ now_tambon }}</div>
            </div>
          </div>
          <div class="col-second-content">
            <div class="detail-second-content">
              <div class="width-120">เขต/อำเภอ</div>
              <div class="width-180">:&nbsp; {{ now_amphoe }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-60">จังหวัด</div>
              <div class="width-180">:&nbsp;{{  now_provice }}</div>
            </div>
            <div class="detail-second-content">
              <div class="width-120">รหัสไปรษณีย์</div>
              <div class="width-180">:&nbsp;{{ now_zipcode }}</div>
            </div>
          </div>
        </div>
        <div v-else-if="sendDoc === 'work'" class="row-third-content">
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-120">ชื่อสถานที่ทำงาน</div>
              <div class="width-200">:&nbsp;{{ workname }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-120">บ้านเลขที่</div>
              <div class="width-180">:&nbsp;{{  work_no  }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-60">หมู่ที่</div>
              <div class="width-180">:&nbsp;{{ work_moo }}</div>
            </div>
          </div>
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-120">หมู่บ้าน/อาคาร</div>
              <div class="width-200">:&nbsp;{{ work_building }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-120">ตรอก/ซอย</div>
              <div class="width-180">:&nbsp;{{ work_soi }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-60">ถนน</div>
              <div class="width-180">:&nbsp;{{ work_road }}</div>
            </div>
          </div>
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-120">แขวง/ตำบล</div>
              <div class="width-200">:&nbsp;{{ work_tambon }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-120">เขต/อำเภอ</div>
              <div class="width-180">:&nbsp; {{ work_amphoe }}</div>
            </div>
            <div class="detail-third-content">
              <div class="width-60">จังหวัด</div>
              <div class="width-180">:&nbsp; {{ work_provice }}</div>
            </div>
          </div>
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-120">รหัสไปรษณีย์</div>
              <div class="width-200">:&nbsp; {{ work_zipcode }}</div>
            </div>
          </div>
        </div>
        <div v-else-if="sendDoc === 'email'" class="row-third-content">
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-120">{{ email }}</div>
            </div>
          </div>
        </div>
        <div v-else class="row-third-content">
          <div class="col-third-content">
            <div class="detail-third-content">
              <div class="width-120">ไม่พบข้อมูล</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog -->
     <DialogConfirmApprove ref="dialogConfirmApprove" @approve="approve"/>
     <DialogSuccess ref="dialogApproveSuccess" @close="closeDialog"/>
  </div>
</template>

<script>
import moment from 'moment'
import Swal from 'sweetalert2'
import DialogConfirmApprove from '../../components/DialogApproveMember.vue'
import DialogSuccess from '../../components/DialogSuccess.vue'
export default {
  components: {
    DialogConfirmApprove,
    DialogSuccess
  },
  data () {
    return {
      registerDate: '',
      paymentDate: '',
      registerNo: '',
      paymentDateCourse: '',
      updateDate: '',
      type_form: '',

      prefixTH: '',
      fullname: '',
      firstnameTH: '',
      lastnameTH: '',
      gender: '',

      birthDate: '',
      telMobile: '',
      email: '',
      tax: '',

      now_no: '',
      now_moo: '',
      now_building: '',
      now_soi: '',
      now_road: '',
      now_tambon: '',
      now_amphoe: '',
      now_provice: '',
      now_zipcode: '',

      license_no: '',
      license_endDate: '',

      licenseFarm_no: '', // ของฟาม
      licenseFarm_endDate: '', // ของฟาม

      career: '',

      workname: '',
      work_no: '',
      work_moo: '',
      work_building: '',
      work_soi: '',
      work_road: '',
      work_tambon: '',
      work_amphoe: '',
      work_provice: '',
      work_zipcode: '',

      sendDoc: '',

      memberId: null,
      overlay: true,
      DataUser: '',
      form_id: '',

      accountid: '',

      status_payment: '',

      status_form: 'verify',

      getData: ''
    }
  },
  async created () {
    this.memberId = localStorage.getItem('memberId')
    this.form_id = this.$route.params.id
    if (this.form_id === 'null') {
      await this.getDetailByMemberId()
    } else {
      await this.getDetailByFormId()
    }
    // register = สมัครสมาชิกอย่างเดียว
    // train  = อบรมอย่างเดียว
    // registerTrain = สมัครสมาชิกพร้อมอบรม
  },
  methods: {
    back () {
      this.$router.push({ path: '/admin/members' })
    },
    getBgColor (status) {
      if (status === 1) return 'rgba(242, 247, 255, 1)'
      else if (status === 2) return 'rgba(242, 235, 253, 1)'
      else return 'rgba(241, 255, 234, 1)'
    },
    async approve () {
      var send = {
        form_id: this.form_id,
        accountid: this.accountid
      }
      const res = await this.axios({
        method: 'post',
        data: send,
        url: `${process.env.VUE_APP_API_URL}/api/admin/approveForm`
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })

      if (res.status === 200) {
        // this.overlay = false
        // await Swal.fire({
        //   icon: 'success',
        //   title: 'อนุมัติสำเร็จ',
        //   showConfirmButton: false,
        //   timer: 2500
        // }).then(() => {
        //   location.reload()
        // })
        this.$refs.dialogApproveSuccess.open()
      } else {
        this.overlay = false
        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          location.reload()
        })
      }
    },
    async getDetailByFormId () {
      const res = await this.axios({
        method: 'get',
        headers: {
          Authorization: this.$store.getters.getToken,
          'Content-Type': 'application/json'
        },
        url: `${process.env.VUE_APP_API_URL}/api/admin/getDetailForm?form_id=${this.form_id}`
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        const data = res.data.results
        this.DataUser = res.data.results
        this.overlay = false

        this.accountid = res.data.results.account_id

        this.registerDate = moment(data.create_at).add(543, 'years').format('DD/MM/YYYY')
        this.paymentDate = moment(data.date_payment).add(543, 'years').format('DD/MM/YYYY')
        this.registerNo = data.profile.member_no
        this.paymentDateCourse = ''
        this.updateDate = ''
        this.type_form = data.type_form

        this.status_form = data.status_approve

        this.status_payment = data.status_payment

        this.prefixTH = data.profile.prefix
        this.firstnameTH = ''
        this.lastnameTH = ''
        this.fullname = data.profile.full_name

        this.gender = ''

        this.birthDate = moment(data.profile.date_of_birth).format('DD-MM-YYYY')
        this.telMobile = data.profile.phone_number
        this.email = data.profile.email
        this.tax = data.profile.TIN

        this.now_no = data.adress.houseNo === '' ? '-' : data.adress.houseNo
        this.now_moo = data.adress.houseMoo === '' ? '-' : data.adress.houseMoo
        this.now_building = data.adress.houseBuilding === '' ? '-' : data.adress.houseBuilding
        this.now_soi = data.adress.houseSoi === '' ? '-' : data.adress.houseSoi
        this.now_road = data.adress.houseStreet === '' ? '-' : data.adress.houseStreet
        this.now_tambon = data.adress.houseSubDistrict === '' ? '-' : data.adress.houseSubDistrict
        this.now_amphoe = data.adress.houseDistrict === '' ? '-' : data.adress.houseDistrict
        this.now_provice = data.adress.houseProvince === '' ? '-' : data.adress.houseProvince
        this.now_zipcode = data.adress.housePostCode === '' ? '-' : data.adress.housePostCode

        this.license_no = data.workInfo.licenseNo === null ? '-' : data.workInfo.licenseNo
        this.license_endDate = data.workInfo.licenseEndDate === null ? '-' : moment(data.workInfo.licenseEndDate).format('DD-MM-YYYY')

        this.licenseFarm_endDate = data.workInfo.licenseFarmEnd === null ? '-' : moment(data.workInfo.licenseFarmEnd).format('DD-MM-YYYY')

        this.career = data.workInfo.career === null ? '-' : data.workInfo.career

        this.workname = data.workAddress.workName === '' || data.workAddress.workName === undefined ? '-' : data.workAddress.workName
        this.work_no = data.workAddress.workNo === '' || data.workAddress.workNo === undefined ? '-' : data.workAddress.workNo
        this.work_moo = data.workAddress.workMoo === '' || data.workAddress.workMoo === undefined ? '-' : data.workAddress.workMoo
        this.work_building = data.workAddress.workBuilding === '' || data.workAddress.workBuilding === undefined ? '-' : data.workAddress.workBuilding
        this.work_soi = data.workAddress.workSoi === '' || data.workAddress.workSoi === undefined ? '-' : data.workAddress.workSoi
        this.work_road = data.workAddress.workStreet === '' || data.workAddress.workStreet === undefined ? '-' : data.workAddress.workStreet
        this.work_tambon = data.workAddress.workSubDistrict === '' || data.workAddress.workSubDistrict === undefined ? '-' : data.workAddress.workSubDistrict
        this.work_amphoe = data.workAddress.workDistrict === '' || data.workAddress.workDistrict === undefined ? '-' : data.workAddress.workDistrict
        this.work_provice = data.workAddress.workProvince === '' || data.workAddress.workProvince === undefined ? '-' : data.workAddress.workProvince
        this.work_zipcode = data.workAddress.workPostCode === '' || data.workAddress.workPostCode === undefined ? '-' : data.workAddress.workPostCode

        this.sendDoc = data.profile.sendDoc === null ? '-' : data.profile.sendDoc
      }
      this.overlay = false
    },
    async getDetailByMemberId () {
      const res = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/admin/getDetailsByMemberId`,
        data: { member_id: this.memberId }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200 && res.data?.results?.length !== 0) {
        const data = res.data.results
        this.DataUser = res.data.results
        this.overlay = false

        this.accountid = res.data.results.account_id

        this.registerDate = moment(data.create_at).format('DD-MM-YYYY')
        this.paymentDate = moment(data.date_payment).format('DD-MM-YYYY')
        this.registerNo = data.profile.member_no
        this.paymentDateCourse = ''
        this.updateDate = ''

        this.status_form = data.status_approve

        this.status_payment = data.status_payment

        this.prefixTH = data.profile.prefix
        this.firstnameTH = ''
        this.lastnameTH = ''
        this.fullname = data.profile.full_name
        this.type_member = data.profile.type

        this.gender = ''

        this.birthDate = moment(data.profile.date_of_birth).format('DD-MM-YYYY')
        this.telMobile = data.profile.phone_number
        this.email = data.profile.email
        this.tax = data.profile.TIN

        this.now_no = data.adress.houseNo === '' ? '-' : data.adress.houseNo
        this.now_moo = data.adress.houseMoo === '' ? '-' : data.adress.houseMoo
        this.now_building = data.adress.houseBuilding === '' ? '-' : data.adress.houseBuilding
        this.now_soi = data.adress.houseSoi === '' ? '-' : data.adress.houseSoi
        this.now_road = data.adress.houseStreet === '' ? '-' : data.adress.houseStreet
        this.now_tambon = data.adress.houseSubDistrict === '' ? '-' : data.adress.houseSubDistrict
        this.now_amphoe = data.adress.houseDistrict === '' ? '-' : data.adress.houseDistrict
        this.now_provice = data.adress.houseProvince === '' ? '-' : data.adress.houseProvince
        this.now_zipcode = data.adress.housePostCode === '' ? '-' : data.adress.housePostCode

        this.license_no = data.workInfo.licenseNo === '' ? '-' : data.workInfo.licenseNo
        this.license_endDate = moment(data.workInfo.licenseEndDate).format('DD-MM-YYYY')

        this.licenseFarm_endDate = moment(data.workInfo.licenseFarmEnd).format('DD-MM-YYYY')

        this.career = data.workInfo.career

        this.workname = data.workAddress.workName === '' ? '-' : data.workAddress.workName
        this.work_no = data.workAddress.workNo === '' ? '-' : data.workAddress.workNo
        this.work_moo = data.workAddress.workMoo === '' ? '-' : data.workAddress.workMoo
        this.work_building = data.workAddress.workBuilding === '' ? '-' : data.workAddress.workBuilding
        this.work_soi = data.workAddress.workSoi === '' ? '-' : data.workAddress.workSoi
        this.work_road = data.workAddress.workStreet === '' ? '-' : data.workAddress.workStreet
        this.work_tambon = data.workAddress.workSubDistrict === '' ? '-' : data.workAddress.workSubDistrict
        this.work_amphoe = data.workAddress.workDistrict === '' ? '-' : data.workAddress.workDistrict
        this.work_provice = data.workAddress.workProvince === '' ? '-' : data.workAddress.workProvince
        this.work_zipcode = data.workAddress.workPostCode === '' ? '-' : data.workAddress.workPostCode

        this.sendDoc = data.profile.sendDoc === null ? '-' : data.profile.sendDoc
      } else if (res.status === 200 && res.data?.results?.length === 0) { // กรณียังไม่มีใบชำระเงิน
        const resWait = await this.axios({
          method: 'POST',
          url: `${process.env.VUE_APP_API_URL}/api/admin/getDetailsMemberWaiting`,
          data: { member_id: this.memberId }
        }).then((response) => {
          return response
        }).catch((err) => {
          return err.response
        })
        const data = resWait.data.results[0]
        this.DataUser = resWait.data.results
        this.overlay = false

        this.accountid = res.data.results.account_id

        this.registerDate = moment(data.create_at).format('DD-MM-YYYY')
        this.paymentDate = moment(data.date_payment).format('DD-MM-YYYY')
        this.registerNo = data.member_no
        this.paymentDateCourse = ''
        this.updateDate = ''

        this.status_form = data.status_approve === undefined ? null : data.status_approve
        console.log('this.status_form :>> ', this.status_form)

        this.status_payment = data.status_payment

        this.prefixTH = data.prefix
        this.firstnameTH = ''
        this.lastnameTH = ''
        this.fullname = data.full_name
        this.type_member = data.type

        this.gender = ''

        this.birthDate = moment(data.date_of_birth).format('DD-MM-YYYY')
        this.telMobile = data.phone_number
        this.email = data.email
        this.tax = data.TIN

        this.now_no = data.houseNo === '' ? '-' : data.houseNo
        this.now_moo = data.houseMoo === '' ? '-' : data.houseMoo
        this.now_building = data.houseBuilding === '' ? '-' : data.houseBuilding
        this.now_soi = data.houseSoi === '' ? '-' : data.houseSoi
        this.now_road = data.houseStreet === '' ? '-' : data.houseStreet
        this.now_tambon = data.houseSubDistrict === '' ? '-' : data.houseSubDistrict
        this.now_amphoe = data.houseDistrict === '' ? '-' : data.houseDistrict
        this.now_provice = data.houseProvince === '' ? '-' : data.houseProvince
        this.now_zipcode = data.housePostCode === '' ? '-' : data.housePostCode

        this.license_no = data.licenseNo
        this.license_endDate = moment(data.licenseEndDate).format('DD-MM-YYYY')

        this.licenseFarm_endDate = moment(data.licenseFarmEnd).format('DD-MM-YYYY')

        this.career = data.career

        this.workname = data.workName === '' || data.workName === null ? '-' : data.workName
        this.work_no = data.workNo === '' || data.workNo === null ? '-' : data.workNo
        this.work_moo = data.workMoo === '' || data.workMoo === null ? '-' : data.workMoo
        this.work_building = data.workBuilding === '' || data.workBuilding === null ? '-' : data.workBuilding
        this.work_soi = data.workSoi === '' || data.workSoi === null ? '-' : data.workSoi
        this.work_road = data.workStreet === '' || data.workStreet === null ? '-' : data.workStreet
        this.work_tambon = data.workSubDistrict === '' || data.workSubDistrict === null ? '-' : data.workSubDistrict
        this.work_amphoe = data.workDistrict === '' || data.workDistrict === null ? '-' : data.workDistrict
        this.work_provice = data.workProvince === '' || data.workProvince === null ? '-' : data.workProvince
        this.work_zipcode = data.workPostCode === '' || data.workPostCode === null ? '-' : data.workPostCode

        this.sendDoc = data.sendDoc === null ? '-' : data.sendDoc
      }
      this.overlay = false
    },
    openDialogConfirmApprove () {
      const data = {
        prefix: this.prefixTH,
        full_name: this.fullname,
        registerDate: this.registerDate,
        paymentDate: this.paymentDate
      }
      this.$refs.dialogConfirmApprove.open(data)
    },
    closeDialog () {
      location.reload()
    }
  }
}
</script>

<style scoped>
.container-detail-member {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
}

.status-verifying-style {
  border-radius: 999px;
  background: #fff3d1 !important;
  color: #FFB800 !important;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}
.header-left p {
  margin-bottom: 0;
}
.text-header {
  font-size: 28px;
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
}
.header-right {
  display: flex;
  gap: 10px;
}
.style-btn {
  width: 120px;
  border-radius: 16px;
  padding: 8px 16px 8px 16px;
}
.content {
  margin-top: 20px;
}
/* first content */

.first-content {
  display: flex;
  flex-direction: column;
  /* background-image: url("../../assets/trva/frame.png"); */
  background: linear-gradient(90deg, #FFFFFF, #E6F0FF, #6EABFF);
  border-radius: 16px;
  height: 153px;
  padding: 24px;
  justify-content: center;
}
.bg-first-content {
  position: absolute;
  right: 85px;
  top: 155px;
  z-index: 2;
}
.bg-first-content-1 {
  position: absolute;
  width: 300px;
  right: 20px;
  top: 147px;
  z-index: 0;
  border-radius: 0px 16px 0px 0px;
}
.row-first-content {
  display: flex;
  max-height: 50%;
}
.col-first-content {
  width: 250px;
}
.col-first-content .text-col {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(152, 152, 152, 1);
}
.col-first-content .sub-text-col {
  font-size: 16px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
/* second content + third-content */
.second-content,
.third-content {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
}
.second-content-header,
.third-content-header {
  gap: 10px;
}
.row-second-content,
.row-third-content {
  display: flex;
  flex-direction: column;
  background-color: rgba(250, 250, 250, 1);
  padding: 16px 16px 6px 16px;
  border-radius: 16px;
}
.col-second-content,
.detail-second-content,
.second-content-header,
.third-content-header,
.col-third-content,
.detail-third-content {
  display: flex;
}
.col-second-content,
.col-third-content {
  margin-bottom: 15px;
}
/* other */
.width-60 {
  width: 60px;
}
.width-120 {
  width: 120px;
}
.width-180 {
  width: 180px;
}
.width-200 {
  width: 200px;
}
.width-280 {
  width: 280px;
}
.width-300 {
  width: 300px;
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
</style>
