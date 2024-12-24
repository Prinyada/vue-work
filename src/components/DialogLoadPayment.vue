<template>
  <v-dialog v-model="dialog" width="600px" persistent class="dialog-load-payment">
    <div class="container-approve-member">
      <div class="header-load-payment">
        <v-row>
          <v-col cols="10" class="header-dialog">ดาวน์โหลดรายการชำระเงิน</v-col>
          <v-col cols="2" class="text-right">
            <v-icon color="#166BF9" @click="closeDialog">mdi-close</v-icon>
          </v-col>
        </v-row>
      </div>
      <div class="content-approve-member">
        <v-row class="display-1">
          <v-col cols="4" class="head-font">เลือกรายการชำระเงิน</v-col>
          <v-col cols="8" class="detail-font display-select">
            :&nbsp;&nbsp;
            <v-select
              v-model="selectListPayment"
              :items="listPayment"
              placeholder="กรุณาเลือกรายการชำระเงิน"
              item-text="name"
              outlined
              dense
              class="border-r-16 select-payment"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="display-1">
          <v-col cols="4" class="head-font">วันที่เริ่มต้น</v-col>
          <!-- <v-col cols="8" class="detail-font">:&nbsp;10/07/2567</v-col> -->
          <v-col cols="8" class="detail-font display-select">
            <v-menu
              ref="menuStartDate"
              v-model="menuStartDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                :&nbsp;&nbsp;
                <v-text-field
                  v-model="formatStartDate"
                  dense
                  placeholder="วว/ดด/ปปปป"
                  append-icon="mdi-calendar-month"
                  outlined
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  class="px-0 calendar-icon-color"
                  style="border-radius: 16px;"
                  hide-details
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                locale="th-TH"
                @input="menuStartDate = false"
                min="1950-01-01"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row class="display-1">
          <v-col cols="4" class="head-font">วันที่สิ้นสุด</v-col>
          <!-- <v-col cols="8" class="detail-font">:&nbsp;10/07/2567</v-col> -->
          <v-col cols="8" class="detail-font display-select">
            <v-menu
              ref="menuEndDate"
              v-model="menuEndDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                :&nbsp;&nbsp;
                <v-text-field
                  v-model="formatEndDate"
                  dense
                  placeholder="วว/ดด/ปปปป"
                  append-icon="mdi-calendar-month"
                  outlined
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  class="px-0 calendar-icon-color"
                  style="border-radius: 16px;"
                  hide-details
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                locale="th-TH"
                @input="menuEndDate = false"
                :min="startDate"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </div>
      <div class="bottom-zone">
        <v-btn class="style-btn" outlined color="rgba(22, 107, 249, 1)" @click="closeDialog"
          >ยกเลิก</v-btn
        >
        <v-btn
          class="style-btn"
          color="rgba(22, 107, 249, 1)"
          :disabled="!isFormValid"
          @click="submitLoad"
          elevation="0"
        >
          <p class="margin-bottom-zero" style="color: #ffffff">ดาวน์โหลด</p>
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ['approve'],
  data () {
    return {
      dialog: false,
      listPayment: [
        {
          code: 'all',
          name: 'ทั้งหมด'
        },
        {
          code: 'register',
          name: 'ค่าสมัครสมาชิก'
        },
        {
          code: 'train',
          name: 'ค่าสมัครอบรม'
        },
        {
          code: 'registerTrain',
          name: 'ค่าสมัครสมาชิกและอบรม'
        }
      ],
      selectListPayment: null,
      menuStartDate: false,
      menuEndDate: false,
      startDate: null,
      endDate: null
    }
  },
  watch: {},
  computed: {
    formatStartDate () {
      if (!this.startDate) return ''
      return this.formatToThaiDate(this.startDate)
    },
    formatEndDate () {
      if (!this.endDate) return ''
      return this.formatToThaiDate(this.endDate)
    },
    isFormValid () {
      return (
        this.selectListPayment && // ตรวจสอบว่ามีการเลือกประเภทการชำระเงิน
        this.startDate && // ตรวจสอบว่ามีการกรอกวันที่เริ่มต้น
        this.endDate // ตรวจสอบว่ามีการกรอกวันที่สิ้นสุด
      )
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    closeDialog () {
      this.selectListPayment = null
      this.startDate = null
      this.endDate = null
      this.dialog = false
    },
    formatToThaiDate (date) {
      const [year, month, day] = date.split('-')
      const buddhistYear = parseInt(year, 10) + 543 // Add 543 to get the Buddhist year
      return `${day}/${month}/${buddhistYear}`
    },
    submitLoad () {
      const tempType = this.listPayment.filter(item => item.name === this.selectListPayment)
      window.open(`${process.env.VUE_APP_API_URL}/api/excel/exportReportPayment?type=${tempType[0].code}&date_start=${this.startDate}&date_end=${this.endDate}`)
      this.closeDialog()
    }
  }
}
</script>

<style>
.v-dialog {
  overflow-y: hidden !important; /* บังคับปิด scroll */
  overflow-x: hidden !important;
  box-shadow: none !important; /* ลบเงา */
  margin: 0px;
}

.container-approve-member {
  background: #ffffff;
  border-radius: 24px;
  padding: 15px;
}
.header-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20%;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
.header-load-payment {
  display: flex;
}
.display-select {
  display: flex;
}
.content-approve-member {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 20px 20px 30px;
  background: rgba(250, 250, 250, 1);
  border-radius: 16px;
}
.display-approve {
  display: flex;
  align-items: center;
}
.bottom-zone {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
/* style font */
.head-font {
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(152, 152, 152, 1);
}
.detail-font {
  font-size: 16px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
/* styly bottom */
.style-btn {
  width: 120px;
  border-radius: 16px;
  padding: 8px 16px 8px 16px;
}
/* other */
.display-1 {
  display: flex;
  align-items: center;
}
.margin-bottom-zero {
  margin-bottom: 0px !important;
}
.border-r-16 {
  border-radius: 16px !important;
}
</style>
