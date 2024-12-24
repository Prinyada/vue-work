<template>
  <div class="container-list-payment">
    <div style="margin-bottom: 10px">
      <v-row no-gutters justify="start">
        <v-col>
          <span style="font-weight: 700; font-size: 28px; color: #333333;"
            >รายการชำระเงิน</span
          >
        </v-col>
      </v-row>
    </div>
    <v-card flat class="children-page">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <div class="content">
        <v-row class="row-search">
          <v-col class="d-flex">
            <div class="box-search">
              <v-text-field
                v-model="searchData"
                placeholder="ค้นหาจากชื่อ - นามสกุลสมาชิก เลขที่ชำระเงิน และเลขที่ใบเสร็จ"
                append-icon="mdi-magnify"
                hide-details
                outlined
                dense
                class="text-field-search"
              />
            </div>
            &nbsp;&nbsp;&nbsp;
            <!-- <div class="box-date">
              <p class="text-date">วันที่สมัครสมาชิก</p>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="auto"
                :nudge-left="70"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateRegister"
                    placeholder="วว/ดด/ปปปป"
                    outlined
                    append-icon="mdi-calendar-multiselect"
                    background-color="white"
                    hide-details="auto"
                    readonly
                    dense
                    v-bind="attrs"
                    v-on="on"
                    class="text-field-date"
                  />
                </template>
                <v-date-picker
                  v-model="dateRegister"
                  locale="th"
                  @input="menu = false"
                  @change="receiptDateLocale(dateRegister)"
                />
              </v-menu>
            </div> -->
          </v-col>
          <v-col class="text-right">
            <v-btn
              elevation="1"
              color="#166BF9"
              dark
              class="border-r-16"
              @click="openDialogLoadPayment"
            >
              ดาวน์โหลดรายการชำระเงิน
              <v-icon>
                mdi-download-outline
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div>
          <p>รายการชำระเงินทั้งหมด {{ listMember.length }} รายการ</p>
        </div>
        <v-data-table
          class="datas-table-template"
          :headers="headers"
          :items="listMember"
          :items-per-page="15"
          :search="searchData"
        >
          <template #[`item.index`]="{ index }">
            {{ index + 1 }}
          </template>
          <!-- <template #[`item.payment_channel`]="{ item }">
            <span v-if="item.payment_channel === 1" style="">QR Code Payment</span>
          </template> -->
          <template #[`item.date_payment`]="{ item }">
            <span>{{ convertToBuddhistDate(item.date_payment) }}</span>
          </template>
          <template #[`item.type_form`]="{ item }">
            <span v-if="item.type_form === 'register'" style="color: #52C41A;">สมัครสมาชิก</span>
            <span v-else-if="item.type_form === 'train'" style="color: #FE854E;">สมัครอบรม</span>
            <span v-else-if="item.type_form === 'registerTrain'" style="color: #1B5DD6;">สมัครสมาชิกและอบรม</span>
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn
              class="pa-0 ma-0 btn-detail"
              outlined
              dense
              small
              @click="detailPayment(item)"
              elevation="1"
            >
              <v-icon color="rgba(8, 73, 181, 1)" size="18"> mdi-eye-outline </v-icon>
            </v-btn>
            <span style="color: rgba(8, 73, 181, 1);">&nbsp;ดูเพิ่มเติม</span>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <DialogPreview/>
    <DialogLoadPayment ref="dialogLoadPayment"/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import EventBus from '@/event-bus'
import Swal from 'sweetalert2'
import DialogPreview from '../Admin/DialogPreview.vue'
import DialogLoadPayment from '../../components/DialogLoadPayment.vue'
export default {
  components: {
    DialogPreview,
    DialogLoadPayment
  },
  filters: {
    commaExpense (val) {
      if (val) {
        const expense = `${val}`
        return expense.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    }
  },
  data () {
    return {
      headers: [
        {
          sortable: false,
          text: 'ลำดับ',
          align: 'center',
          value: 'index'
        },
        {
          sortable: false,
          text: 'เลขที่ชำระเงิน',
          align: 'center',
          value: 'payment_reference_id'
        },
        {
          sortable: false,
          text: 'เลขที่ใบเสร็จ',
          align: 'center',
          value: 'receipt_no',
          note: '{เลขที่ใบเสร็จ}/2567'
        },
        { sortable: false, text: 'ชื่อ-นามสกุล', align: 'center', value: 'full_name' },
        { sortable: false, text: 'วันที่ในใบเสร็จ', align: 'center', value: 'date_payment' },
        {
          sortable: false,
          text: 'วันที่ชำระเงิน',
          align: 'center',
          value: 'date_payment'
        },
        {
          sortable: false,
          text: 'ช่องทางการชำระเงิน',
          align: 'center',
          value: 'payment_type'
        },
        {
          sortable: false,
          text: 'รายการ',
          align: 'center',
          value: 'type_form'
        },
        {
          sortable: false,
          text: 'จัดการ',
          align: 'center',
          value: 'action'
        }
      ],
      dataDoc: [],
      enddate_compare: '',
      searchData: '',
      total: 0,
      page: 1,
      pageCount: 0,
      overlay: false,
      pagestart: 1,
      pagex: 0,
      loading: false,
      dialogfilter: false,
      dialogSentData: false,
      normal_lic: false,
      statuslicense: 'ทั้งหมด',
      itemsPerPage: 10,
      fail_lic: false,
      dateRegister: '',
      tempDataTableMember: [],
      menu: false,
      typeMember: 0,
      selectedStatus: null,
      activeItem: null,
      showData: [],
      listMember: []
    }
  },
  async created () {
    await this.getListPayment()
    this.initialize()
  },
  watch: {},
  computed: {
    formatDateUpdate (val) {
      if (!val) return ''
      return this.convertToBuddhistDate(val)
    }
  },
  methods: {
    ...mapActions(['actionSetBreadcrumbs']),
    initialize () {
      this.showData = this.tempDataTableMember
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
    openDetail (item) {
      this.$router.push('/members/profile/detail/' + item.member_id)
    },
    // get color status
    getStatusClass (item) {
      return item.backgroundStatus
    },
    detailPayment (item) {
      EventBus.$emit('preview-receipt', item)
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
      this.dialog = true
    },
    deleteItem (item) {
      this.dialogDelete = true
    },
    getMember () {
      this.typeMember = 0
    },
    getNoMember () {
      this.typeMember = 1
    },
    selectCardStatus (data) {
      const status = data.status
      if (status !== 5) {
        const tempFilter = this.tempDataTableMember.filter(item => item.status === data.status)
        this.showData = tempFilter
      } else {
        this.showData = this.tempDataTableMember
      }
    },
    async getListPayment () {
      const res = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/admin/getPaymentList`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.status === 200) {
        this.listMember = res.data?.data
      } else {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาติดต่อเจ้าหน้าที่',
          icon: 'error'
        })
      }
    },
    convertToBuddhistDate (gregorianDate) {
      const date = new Date(gregorianDate)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear() + 543
      return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
    },
    openDialogLoadPayment () {
      this.$refs.dialogLoadPayment.open()
    }
  }
}
</script>
<style scoped>
.container-list-payment {
  display: flex;
  flex-direction: column;
  padding: 0px 20px 0px 20px;
}
.children-page {
  min-height: 80vh;
  width: 100%;
  border-radius: 8px !important;
  padding: 20px 30px 20px 30px;
}

/* search */
.row-search {
  display: flex;
  margin-bottom: 5px;
}
.box-search {
  display: flex;
  align-items: flex-end;
}
.text-field-search {
  width: 500px;
  border-radius: 16px;
}
.text-date {
  margin-bottom: 0;
}
.text-field-date {
  width: 240px;
  border-radius: 16px;
}
/* table */
.v-data-table-header {
  background-color: #f0f4fc !important;
}
.btn-detail {
  width: 24px !important;
  height: 24px !important;
  min-width: 0px !important;
  background-color: #FFFFFF !important;
  border: none;
  border-radius: 6px;
}

/* other */
.border-r-16 {
  border-radius: 16px !important;
}
</style>
