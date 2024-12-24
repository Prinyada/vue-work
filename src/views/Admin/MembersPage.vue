<template>
  <div class="container-main-admin">
    <v-overlay :value="overlay">
      <v-progress-circular color="#4574DE" indeterminate size="40" class="circle"></v-progress-circular>
    </v-overlay>
    <div style="margin-bottom: 10px">
      <v-row no-gutters justify="start">
        <v-col>
          <span style="font-weight: 700 !important; font-size: 28px !important; color: #333333 !important;">ข้อมูลสมาชิก</span>
        </v-col>
      </v-row>
      <div class="display-header">
        <div class="box-type-member">
          <v-chip :color="typeMember === 0 ? '#FFB85B' : '#FFFFFF'"
            :class="typeMember === 0 ? 'text-chip' : 'text-chip-active'" @click="getMember">สมาชิกสมาคม</v-chip>
          <v-chip :color="typeMember === 1 ? '#FFB85B' : '#FFFFFF'"
            :class="typeMember === 1 ? 'text-chip' : 'text-chip-active'"
            @click="getNoMember">ไม่ประสงค์เป็นสมาชิก</v-chip>
          <v-chip :color="typeMember === 2 ? '#FFB85B' : '#FFFFFF'"
            :class="typeMember === 2 ? 'text-chip' : 'text-chip-active'"
            @click="getOldMember">สมาชิกเก่า</v-chip>
        </div>
        <div class="download-zone">
          <v-btn
            elevation="1"
            color="#166BF9"
            dark
            class="border-r-16"
            @click="openDialogLoadMember"
          >
            ดาวน์โหลดรายชื่อสมาชิก
            <v-icon>
              mdi-download-outline
            </v-icon>
          </v-btn>
        </div>
      </div>
      <!-- -------------------------------- tab -------------------------------- -->
      <div v-if="typeMember === 0" class="display-status">
        <v-card v-for="(item, i) in statusMember" :key="i" class="box-status"
        :style="{ border: selectedStatus === item ?
        `3px solid ${item.borderColor}` : '3px solid transparent', borderRadius: '20px',}"
          elevation="1" @click="selectCardStatus(item)">
          <div class="box-status-top">
            <v-chip class="icon-status" :class="getStatusClass(item)"><v-icon color="#FFFFFF" size="32">{{
              item.iconStatus }}</v-icon></v-chip>
            <p class="text-count">{{ item.countStatus }}</p>
          </div>
          <div class="box-status-bottom">
            <p class="text-name-status">{{ item.nameStatus }}</p>
          </div>
        </v-card>
      </div>
      <div v-else-if="typeMember === 1" class="display-status">
        <v-card v-for="(item, i) in statusTempMember" :key="i" class="box-status"
        :style="{ border: selectedStatus === item ?
        `3px solid ${item.borderColor}` : '3px solid transparent', borderRadius: '20px',}"
          elevation="1" @click="selectCardStatusNon(item)">
          <div class="box-status-top">
            <v-chip class="icon-status" :class="getStatusClass(item)"><v-icon color="#FFFFFF" size="32">{{
              item.iconStatus }}</v-icon></v-chip>
            <p class="text-count"  v-if="item.countStatus === '' || item.countStatus === null">0</p>
            <p class="text-count" v-else>{{ item.countStatus }}</p>
          </div>
          <div class="box-status-bottom">
            <p class="text-name-status">{{ item.nameStatus }}</p>
          </div>
        </v-card>
      </div>
      <div v-else-if="typeMember === 2" class="display-status">
        <v-card v-for="(item, i) in statusOldMember" :key="i" class="box-status"
        :style="{ border: selectedStatus === item ?
        `3px solid ${item.borderColor}` : '3px solid transparent', borderRadius: '20px',}"
          elevation="1" @click="selectCardOldMember(item)">
          <div class="box-status-top">
            <v-chip class="icon-status" :class="getStatusClass(item)"><v-icon color="#FFFFFF" size="32">{{
              item.iconStatus }}</v-icon></v-chip>
            <p class="text-count"  v-if="item.countStatus === '' || item.countStatus === null">0</p>
            <p class="text-count" v-else>{{ item.countStatus }}</p>
          </div>
          <div class="box-status-bottom">
            <p class="text-name-status">{{ item.nameStatus }}</p>
          </div>
        </v-card>
      </div>
      <!-- --------------------------------------------------------------------- -->
    </div>
    <v-card flat class="children-page">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <div class="content">
        <v-row class="row-search">
          <v-col class="d-flex">
            <div class="box-search" v-if="typeMember === 0">
              <v-text-field v-model="search" placeholder="ค้นหาชื่อ-นามสกุล" append-icon="mdi-magnify"
                hide-details outlined dense class="text-field-search" />
            </div>
            <div class="box-search" v-else-if="typeMember === 1">
              <v-text-field v-model="searchnon" placeholder="ค้นหาชื่อ-นามสกุล" append-icon="mdi-magnify"
                hide-details outlined dense class="text-field-search" />
            </div>
            <div class="box-search" v-else-if="typeMember === 2">
              <v-text-field v-model="searchOld" placeholder="ค้นหาชื่อ-นามสกุล" append-icon="mdi-magnify"
                hide-details outlined dense class="text-field-search" />
            </div>
            &nbsp;&nbsp;&nbsp;
            <!-- <div class="box-date">
              <p class="text-date">วันที่สมัครสมาชิก</p>
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" min-width="auto"
                :nudge-left="70" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="dateRegister" placeholder="วว/ดด/ปปปป" outlined
                    append-icon="mdi-calendar-multiselect" background-color="white" hide-details="auto" readonly dense
                    v-bind="attrs" v-on="on" class="text-field-date" />
                </template>
                <v-date-picker v-model="dateRegister" locale="th" @input="menu = false"
                  @change="receiptDateLocale(dateRegister)" />
              </v-menu>
            </div> -->
          </v-col>
        </v-row>
        <div>
          <p v-if="typeMember === 0" >รายชื่อสมาชิกทั้งหมด {{ showDataMember.length }} รายการ</p>
          <p v-if="typeMember === 1" >รายชื่อสมาชิกทั้งหมด {{ showDataTempMember.length }} รายการ</p>
        </div>
        <v-data-table v-if="typeMember === 0" class="datas-table-template sticky-action-column" :headers="headers"
          :search="search"
          :items="showDataMember" :items-per-page="15">
          <template #[`item.index`]="{ item }">
            {{ item.index }}
          </template>
          <template #[`item.fullName`]="{ item }">
            {{ item.firstName + ' ' + item.lastName }}
          </template>
          <template #[`item.status`]="{ item }">
            <v-chip class="status-waiting-style" v-if="item.status_payment === 'waiting' || (item.type === 'regis' && item.status_approve === null)">รอชำระเงิน</v-chip>
            <v-chip class="status-verifying-style" v-else-if="item.status_payment === 'success' && item.status_approve === 'verify' && item.type_form !== 'train'">รอตรวจสอบ</v-chip>
            <v-chip class="status-success-style" v-else>เป็นสมาชิกแล้ว</v-chip>
          </template>
          <template #[`item.dateUpdate`]="{ item }">
            <template v-if="item.dateUpdate === ''">-</template>
            <template v-else>{{ item.dateUpdate }}</template>
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn class="pa-0 ma-0 btn-edit-delete" outlined dense small @click="detailItem(item)" elevation="1">
              <v-icon color="#0849b5" size="18"> mdi-clipboard-text-search-outline </v-icon>
            </v-btn>
            <span @click="detailItem(item)" style="color: #0849b5 !important;">&nbsp;รายละเอียด</span>
            &nbsp;
            <!-- <v-btn class="pa-0 ma-0 btn-edit-delete" outlined dense small @click="deleteItem(item)" elevation="1">
              <v-icon color="#d1392b" size="18"> mdi-trash-can-outline </v-icon>
            </v-btn>
            <span style="color: #d1392b !important;">&nbsp !important;ลบ</span> -->
          </template>
        </v-data-table>
        <v-data-table v-else-if="typeMember === 1" class="datas-table-template" :headers="headersTempMember" :items="showDataTempMember" :search="searchnon"
          :items-per-page="15">
          <template #[`item.index`]="{ index }">
            {{ index + 1 }}
          </template>
          <template #[`item.fullname`]="{ item }">
            {{ item.fullname }}
          </template>
          <template #[`item.type`]="{ item }">
            <v-chip :color="getBgColor(item.type)" light>
              <span v-if="item.type === 'temp'" style="color: #52c41a !important;">ไม่เป็นสมาชิก</span>
              <span v-else style="color: #d1392b !important;">หมดอายุสมาชิก</span>
            </v-chip>
          </template>
          <template #[`item.registerDate`]="{ item }">
            <template v-if="item.registerDate === ''">-</template>
            <template v-else>{{ item.registerDate }}</template>
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn class="pa-0 ma-0 btn-edit-delete" outlined dense small @click="detailItemNon(item)" elevation="1">
              <v-icon color="#0849b5" size="18"> mdi-clipboard-text-search-outline </v-icon>
            </v-btn>
            <span @click="detailItemNon(item)"  style="color: #0849b5 !important;">&nbsp;รายละเอียด</span>
            &nbsp;
            <!-- <v-btn class="pa-0 ma-0 btn-edit-delete" outlined dense small @click="deleteItem(item)" elevation="1">
              <v-icon color="#d1392b" size="18"> mdi-trash-can-outline </v-icon>
            </v-btn>
            <span style="color: #d1392b !important;">&nbsp !important;ลบ</span> -->
          </template>
        </v-data-table>
        <v-data-table v-else-if="typeMember === 2" class="datas-table-template" :headers="headersOldMember" :items="showDataOldMember" :search="searchOld"
          :items-per-page="15">
          <template #[`item.index`]="{ index }">
            {{ index + 1 }}
          </template>
          <template #[`item.fullname`]="{ item }">
            {{ item.fullname }}
          </template>
        </v-data-table>
      </div>
    </v-card>
    <!-- <DialogApproveMember ref="dialogApproveMember"/> -->
    <!-- <DialogSuccess ref="dialogSuccess" />
    <DialogRejectMember ref="dialogRejectMember" @submit="submit" />
    <DialogRejectSuccess ref="dialogRejectSuccess" /> -->
    <DialogLoadMember ref="dialogLoadMember"/>
  </div>
</template>
<script>
import moment from 'moment'
import { mapActions } from 'vuex'
// import DialogApproveMember from './DialogApproveMember.vue'
// import DialogSuccess from './DialogSuccess.vue'
// import DialogRejectMember from './DialogRejectMember.vue'
// import DialogRejectSuccess from './DialogRejectSuccess.vue'
import DialogLoadMember from '../../components/DialogLoadMember.vue'
export default {
  components: {
    // DialogApproveMember,
    // DialogSuccess,
    // DialogRejectMember,
    // DialogRejectSuccess,
    DialogLoadMember
  },
  filters: {
    // commaExpense (val) {
    //   if (val) {
    //     const expense = `${val}`
    //     return expense.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    //   }
    // }
  },
  data () {
    return {
      // header สมาชิก
      headers: [
        { sortable: false, text: 'ลำดับ', align: 'center', value: 'index' },
        { sortable: false, text: 'คำนำหน้า', align: 'center', value: 'prefix' },
        { sortable: false, text: 'ชื่อ - นามสกุล', align: 'center', value: 'fullname' },
        { sortable: false, text: 'เบอร์โทรศัพท์', align: 'center', value: 'phone_number' },
        { sortable: false, text: 'วันที่สมัครสมาชิก', align: 'center', value: 'registerDate' },
        { sortable: false, text: 'สถานะสมาชิก', align: 'center', value: 'status' },
        { sortable: false, text: 'วันที่อัปเดตข้อมูล', align: 'center', value: 'dateUpdate' },
        { sortable: false, text: 'จัดการ', align: 'center', value: 'action' }
      ],
      overlay: true,
      countWaiting: 0,
      countWaitingOld: 0,

      countWaitingNon: 0,
      countSuccessNon: 0,

      countmemberOld: 0,
      countMember: 0,
      countWaitingNonOld: 0,
      countSuccessNonOld: 0,

      headersTempMember: [{ sortable: false, text: 'ลำดับ', align: 'center', value: 'index' },
        { sortable: false, text: 'คำนำหน้า', align: 'center', value: 'prefix' },
        { sortable: false, text: 'ชื่อ - นามสกุล', align: 'center', value: 'fullname' },
        { sortable: false, text: 'เบอร์โทรศัพท์', align: 'center', value: 'phone_number' },
        { sortable: false, text: 'วันที่สมัครสมาชิก', align: 'center', value: 'registerDate' },
        { sortable: false, text: 'สถานะสมาชิก', align: 'center', value: 'type' },
        { sortable: false, text: 'จัดการ', align: 'center', value: 'action' }
      ],
      headersOldMember: [{ sortable: false, text: 'ลำดับ', align: 'center', value: 'index' },
        { sortable: false, text: 'เลขที่สมาชิก', align: 'center', value: 'member_no' },
        { sortable: false, text: 'คำนำหน้า', align: 'center', value: 'prefix' },
        { sortable: false, text: 'ชื่อ - นามสกุล', align: 'center', value: 'full_name' },
        { sortable: false, text: 'เบอร์โทรศัพท์', align: 'center', value: 'phone_number' }
      ],
      dataDoc: [],
      enddate_compare: '',
      search: '',
      searchnon: '',
      searchOld: '',
      total: 0,
      page: 1,
      pageCount: 0,
      pagestart: 1,
      pagex: 0,
      loading: false,
      dialogfilter: false,
      dialogSentData: false,
      normal_lic: false,
      statuslicense: 'ทั้งหมด',
      itemsPerPage: 10,
      fail_lic: false,
      statusMember: [
        {
          iconStatus: 'mdi-account',
          nameStatus: 'ทั้งหมด',
          countStatus: 0,
          backgroundStatus: 'gradient-all',
          code: 'all',
          class: 'active-all-card',
          borderColor: '#64C2FF'
        },
        {
          iconStatus: 'mdi-credit-card-outline',
          nameStatus: 'รอชำระเงิน',
          countStatus: 0,
          code: 'waiting',
          backgroundStatus: 'gradient-pending',
          class: 'active-wait-payment',
          borderColor: '#F8CB48'
        },
        {
          iconStatus: 'mdi-magnify',
          nameStatus: 'รอตรวจสอบ',
          countStatus: 0,
          backgroundStatus: 'gradient-review',
          code: 'verify',
          class: 'active-wait-check',
          borderColor: '#d7beff'
        },
        {
          iconStatus: 'mdi-account-check',
          nameStatus: 'เป็นสมาชิกแล้ว',
          countStatus: 0,
          backgroundStatus: 'gradient-member',
          code: 'approved',
          class: 'active-member-card',
          borderColor: '#4CDD75'
        },
        {
          iconStatus: 'mdi-account-cancel',
          nameStatus: 'ไม่อนุมัติ',
          countStatus: 0,
          code: 'reject',
          backgroundStatus: 'gradient-reject',
          class: 'active-reject-card',
          borderColor: '#F85C5F'
        }
      ],
      statusTempMember: [
        {
          iconStatus: 'mdi-account',
          nameStatus: 'ทั้งหมด',
          countStatus: 0,
          code: 'tempAll',
          backgroundStatus: 'gradient-all',
          class: 'active-all-card',
          borderColor: '#64C2FF'
        },
        {
          iconStatus: 'mdi-account-check',
          nameStatus: 'ไม่เป็นสมาชิก',
          countStatus: 0,
          code: 'tempMember',
          backgroundStatus: 'gradient-member',
          class: 'active-member-card',
          borderColor: '#4CDD75'
        },
        {
          iconStatus: 'mdi-account-cancel',
          nameStatus: 'หมดอายุสมาชิก',
          countStatus: 0,
          code: 'tempExpire',
          backgroundStatus: 'gradient-reject',
          class: 'active-reject-card',
          borderColor: '#F85C5F'
        }
      ],
      statusOldMember: [
        {
          iconStatus: 'mdi-account',
          nameStatus: 'ทั้งหมด',
          countStatus: 0,
          code: 'oldAll',
          backgroundStatus: 'gradient-all',
          class: 'active-all-card',
          borderColor: '#64C2FF'
        }
        // {
        //   iconStatus: 'mdi-account-check',
        //   nameStatus: 'เข้าใช้งานแล้ว',
        //   countStatus: 0,
        //   backgroundStatus: 'gradient-member',
        //   code: 'old_active',
        //   class: 'active-member-card',
        //   borderColor: '#4CDD75'
        // },
        // {
        //   iconStatus: 'mdi-account-cancel',
        //   nameStatus: 'ยังไม่เข้าใช้งาน',
        //   countStatus: 0,
        //   code: 'old_non_active',
        //   backgroundStatus: 'gradient-reject',
        //   class: 'active-reject-card',
        //   borderColor: '#F85C5F'
        // }
      ],
      dateRegister: '',
      tempDataTableMember: [],
      tempDataTableNoMember: [],
      menu: false,
      typeMember: 0,
      selectedStatus: null,
      activeItem: null,
      showDataMember: [],
      showDataTempMember: [],
      showDataOldMember: [],
      memberId: null,
      openDetailMember: false,
      // สำหรับสมาชิกสมาคม
      allWaiting: [],
      allVerify: [],
      allMember: [],
      allReject: [],
      allData: [],
      // ไม่ประสงค์เป็นสมาชิก
      allDataTemp: [],
      allDataTempMember: [],
      allDataTempExpire: []
    }
  },
  async created () {
    this.initialize()
    // this.getDash()
    this.getRegister()
    this.getNoRegister()
    this.getDataOldMember()
    localStorage.removeItem('memberId')
    this.selectedStatus = this.statusMember[0]
  },
  watch: {
    typeMember (newType) {
      switch (newType) {
        case 0:
          this.selectedStatus = this.statusMember[0]
          this.showDataMember = this.allData
          break
        case 1:
          this.selectedStatus = this.statusTempMember[0]
          this.showDataMember = this.allDataTemp
          break
        case 2:
          this.selectedStatus = this.statusOldMember[0]
          this.showDataMember = this.allDataTemp
          break
        default:
          this.selectedStatus = null
      }
    }
  },
  methods: {
    ...mapActions(['actionSetBreadcrumbs']),
    initialize () {
      this.showDataMember = this.tempDataTableMember
      const breadcrumbs = [
        {
          text: 'จัดการสมาชิก',
          path: '',
          active: false
        }
      ]
      this.actionSetBreadcrumbs(breadcrumbs)
    },
    async checkdatestatusdate () {
      await this.axios({
        method: 'get',
        headers: {
          Authorization: this.$store.getters.getToken,
          'Content-Type': 'application/json'
        },
        url: `${process.env.VUE_APP_API_URL}/api/user/checkdatestatusdate`
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
    },

    openfilter () {
      this.dialogfilter = true
    },
    closefilter () {
      this.dialogfilter = false
    },
    openDetail (id) {
      this.memberId = id
      this.openDetailMember = true
      // this.$router.push('/members/profile/detail/' + item.member_id)
    },
    async checktoken () {
      if (!this.$cookies.isKey('token')) {
        this.$router.push({ path: '/login' })
      }
    },
    // get color status
    getStatusClass (item) {
      return item.backgroundStatus
    },
    // change date bud
    receiptDateLocale (date) {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
      const event = new Date(date)
      const DateLocale = event.toLocaleString('th-TH', options)
      this.dateRegister = DateLocale
    },
    getBgColor (status) {
      if (status === 0) return 'rgba(255, 225, 225, 1)'
      else if (status === 1) return 'rgba(242, 247, 255, 1)'
      else if (status === 2) return 'rgba(242, 235, 253, 1)'
      else return 'rgba(241, 255, 234, 1)'
    },
    detailItem (item) {
      localStorage.setItem('memberId', item.member_id)
      this.$router.push({ path: '/admin/detail-member/' + item.form_id })
    },
    detailItemNon (item) {
      localStorage.setItem('memberId', item.member_id)
      this.$router.push({ path: '/admin/detail-nonmember/' + item.form_id })
    },
    deleteItem (item) {
      this.dialogDelete = true
    },
    getMember () {
      this.typeMember = 0
      this.selectedStatus = this.statusMember[0]
      // this.getRegister()
    },
    getNoMember () {
      this.typeMember = 1
      this.selectedStatus = this.statusTempMember[0]
      // this.getNoRegister()
    },
    getOldMember () {
      this.typeMember = 2
      this.selectedStatus = this.statusOldMember[0]
      // this.getNoRegister()
    },
    selectCardStatus (item) {
      this.selectedStatus = item
      if (item.code === 'all') {
        this.showDataMember = this.allData
      } else if (item.code === 'waiting') {
        this.showDataMember = this.allWaiting
      } else if (item.code === 'verify') {
        this.showDataMember = this.allVerify
      } else if (item.code === 'approved') {
        this.showDataMember = this.allMember
      } else if (item.code === 'reject') {
        this.showDataMember = this.allReject
      }
    },
    selectCardStatusNon (item) {
      this.selectedStatus = item
      if (item.code === 'tempAll') {
        this.showDataTempMember = this.allDataTemp
      } else if (item.code === 'tempMember') {
        this.showDataTempMember = this.allDataTempMember
      } else if (item.code === 'tempExpire') {
        this.showDataTempMember = this.allDataTempExpire
      }
    },
    selectCardOldMember (item) {
      this.selectedStatus = item
      if (item.code === 'oldAll') {
        this.showDataOldMember = this.allDataTemp
      }
      // else if (item.code === 'old_active') {

      // } else if (item.code === 'old_non_active') {

      // }
    },
    // want member
    async getRegister () {
      this.showDataMember = []
      const res = await this.axios({
        method: 'get',
        headers: {
          Authorization: this.$store.getters.getToken,
          'Content-Type': 'application/json'
        },
        url: `${process.env.VUE_APP_API_URL}/api/admin/getAllformregister`
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })

      if (res.status === 200) {
        const data = res.data.results
        for (let i = 0; i < data.length; i++) {
          this.showDataMember.push({
            index: i + 1,
            status_approve: data[i].status_approve,
            status_payment: data[i].status_payment,
            form_id: data[i].form_regis_id,
            type_form: data[i].type_form,
            member_id: data[i].member_id,
            account_id: data[i].account_id,
            prefix: data[i].prefix,
            fullname: data[i].full_name,
            phone_number: data[i].phone_number,
            registerDate: moment(data[i].create_at).format('DD-MM-YYYY'),
            type: data[i].type,
            status: data[i].status_approve,
            dateUpdate: data[i].update_at ? moment(data[i].update_at).format('DD-MM-YYYY') : '-'
          })
        }
        this.allData = this.showDataMember
        this.showDataMember.forEach(item => {
          if (item.status_payment === 'waiting' || (item.type === 'regis' && item.status_approve === null)) {
            this.allWaiting.push(item)
          } else if (item.status_payment === 'success' && item.status_approve === 'verify' && item.type_form !== 'train') {
            this.allVerify.push(item)
          } else if (item.type === 'member') {
            this.allMember.push(item)
          }
        })
        this.statusMember.forEach(item => {
          if (item.code === 'all') {
            item.countStatus = this.allData.length
          } else if (item.code === 'waiting') {
            item.countStatus = this.allWaiting.length
          } else if (item.code === 'verify') {
            item.countStatus = this.allVerify.length
          } else if (item.code === 'approved') {
            item.countStatus = this.allMember.length
          }
        })
        this.overlay = false
      }
    },
    async getNoRegister () {
      const res = await this.axios({
        method: 'get',
        headers: {
          Authorization: this.$store.getters.getToken,
          'Content-Type': 'application/json'
        },
        url: `${process.env.VUE_APP_API_URL}/api/admin/getAllformregister-NON`
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        const data = res.data.results
        for (let i = 0; i < data.length; i++) {
          this.showDataTempMember.push({
            index: i + 1,
            status_approve: data[i].status_approve,
            status_payment: data[i].status_payment,
            form_id: data[i].form_regis_id,
            type_form: data[i].type_form,
            member_id: data[i].member_id,
            account_id: data[i].account_id,
            prefix: data[i].prefix,
            fullname: data[i].full_name,
            phone_number: data[i].phone_number,
            registerDate: moment(data[i].create_at).format('DD-MM-YYYY'),
            type: data[i].type,
            status: data[i].status_approve,
            dateUpdate: data[i].update_at ? moment(data[i].update_at).format('DD-MM-YYYY') : '-'
          })
        }
        this.allDataTemp = this.showDataTempMember
        this.showDataTempMember.forEach(item => {
          if (item.type === 'temp') {
            this.allDataTempMember.push(item)
          } else if (item.type === 'expire') {
            this.allDataTempExpire.push(item)
          }
        })
        this.statusTempMember.forEach(item => {
          if (item.code === 'tempAll') {
            item.countStatus = this.allDataTemp.length
          } else if (item.code === 'tempMember') {
            item.countStatus = this.allDataTempMember.length
          } else if (item.code === 'tempExpire') {
            item.countStatus = this.allDataTempExpire.length
          }
        })
        this.overlay = false
      }
      this.overlay = false
    },
    async getDataOldMember () {
      this.showDataOldMember = []
      const res = await this.axios({
        method: 'get',
        headers: {
          Authorization: this.$store.getters.getToken,
          'Content-Type': 'application/json'
        },
        url: `${process.env.VUE_APP_API_URL}/api/admin/getOldMember`
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })

      console.log('res', res)
      // if (res.status === 200) {
      //   const data = res.data.results
      //   for (let i = 0; i < data.length; i++) {
      //     this.showDataTempMember.push({
      //       index: i + 1,
      //       status_approve: data[i].status_approve,
      //       status_payment: data[i].status_payment,
      //       form_id: data[i].form_regis_id,
      //       type_form: data[i].type_form,
      //       member_id: data[i].member_id,
      //       account_id: data[i].account_id,
      //       prefix: data[i].prefix,
      //       fullname: data[i].full_name,
      //       phone_number: data[i].phone_number,
      //       registerDate: moment(data[i].create_at).format('DD-MM-YYYY'),
      //       type: data[i].type,
      //       status: data[i].status_approve,
      //       dateUpdate: data[i].update_at ? moment(data[i].update_at).format('DD-MM-YYYY') : '-'
      //     })
      //   }
      //   this.allDataTemp = this.showDataTempMember
      //   this.showDataTempMember.forEach(item => {
      //     if (item.type === 'temp') {
      //       this.allDataTempMember.push(item)
      //     } else if (item.type === 'expire') {
      //       this.allDataTempExpire.push(item)
      //     }
      //   })
      //   this.statusTempMember.forEach(item => {
      //     if (item.code === 'tempAll') {
      //       item.countStatus = this.allDataTemp.length
      //     } else if (item.code === 'tempMember') {
      //       item.countStatus = this.allDataTempMember.length
      //     } else if (item.code === 'tempExpire') {
      //       item.countStatus = this.allDataTempExpire.length
      //     }
      //   })
      // }
      // this.overlay = false
      if (res.status === 200) {
        const data = res.data.results
        this.showDataOldMember = data
        this.statusOldMember.forEach(item => {
          if (item.code === 'oldAll') {
            item.countStatus = this.showDataOldMember.length
          }
        })
        this.overlay = false
      }
    },
    openDialogLoadMember () {
      this.$refs.dialogLoadMember.open()
    }
  }
}
</script>
<style scoped>
.children-page {
  min-height: 80vh !important;
  width: 100% !important;
  border-radius: 8px !important;
  padding: 20px 30px 20px 30px !important;
}
.display-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-success-style {
  border-radius: 999px !important;
  background: #ECFDE3 !important;
  color: #52C41A !important;
}
.status-verifying-style {
  border-radius: 999px !important;
  background: #f2ebfd !important;
  color: #7343e5 !important;
}
.status-reject-style {
  border-radius: 999px !important;
  background: #FEEBED !important;
  color: #ED4157 !important;
}

.status-waiting-style {
  border-radius: 999px !important;
  background: #fff3d1 !important;
  color: #FFB800 !important;
}
.status-regis-style {
  border-radius: 999px !important;
  background: #f2d7fd !important;
  color: #b900f1 !important;
}

.container-main-admin {
  display: flex !important;
  flex-direction: column !important;
  padding: 0px 20px 0px 20px !important;
}

.display-status {
  display: flex !important;
}

.box-type-member {
  width: fit-content !important;
  background-color: #FFFFFF !important;
  border-radius: 50px !important;
  display: flex !important;
  gap: 10px !important;
  padding: 5px !important;
}

.text-chip {
  color: #FFFFFF !important;
  font-size: 18px !important;
  font-weight: 700 !important;
}

.text-chip-active {
  color: rgba(152, 152, 152, 1) !important;
  font-size: 18px !important;
  font-weight: 500 !important;
}

.v-card--link::before {
  background: none !important;
}

.box-status {
  width: 215px !important;
  background-color: #FFFFFF !important;
  border-radius: 16px !important;
  margin: 10px 15px 10px 0px !important;
  padding: 10px !important;
}

.icon-status {
  width: 48px !important;
  height: 48px !important;
  display: flex !important;
  justify-content: center !important;
  padding: 5px !important;
}

.text-count {
  font-size: 36px !important;
  line-height: 50px !important;
  font-weight: 700 !important;
}

.box-status-top {
  display: flex !important;
  justify-content: space-between !important;
}

.box-status-top p {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0;
}

.box-status-bottom {
  display: flex !important;
  justify-content: flex-end !important;
}

.box-status-bottom p {
  margin-bottom: 0 !important;
  font-size: 18px !important;
  font-weight: 500 !important;
  color: #A1A1A1 !important;
}

/* color status */
.gradient-all {
  background: linear-gradient(270deg, #4970F6 0%, #64C2FF 100%) !important;
}

.gradient-pending {
  background: linear-gradient(270deg, #FE854E 0%, #F8CB48 100%) !important;
}

.gradient-review {
  background: linear-gradient(270deg, #7343e5 0%, #d7beff 100%) !important;
}

.gradient-member {
  background: linear-gradient(90deg, #93F7AF 0%, #4CDD75 100%) !important;
}

.gradient-reject {
  background: linear-gradient(90deg, #F99999 0%, #F85C5F 100%) !important;
}

/* search */
.row-search {
  display: flex !important;
  margin-bottom: 5px !important;
}

.box-search {
  display: flex !important;
  align-items: flex-end !important;
}

.text-field-search {
  width: 435px !important;
  border-radius: 16px !important;
}

.text-date {
  margin-bottom: 0 !important;
}

.text-field-date {
  width: 240px !important;
  border-radius: 16px !important;
}

/* table */
.v-data-table-header {
  background-color: #f0f4fc !important;
}

.btn-edit-delete {
  width: 24px !important;
  height: 24px !important;
  min-width: 0px !important;
  background-color: #FFFFFF !important;
  border: none !important;
  border-radius: 6px !important;
}
</style>
