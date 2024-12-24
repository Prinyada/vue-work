<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    persistent
    class="dialog-load-member"
  >
    <div class="container-load-member">
      <div class="header-load-member">
        <v-row>
          <v-col cols="10" class="header-dialog">ดาวน์โหลดรายชื่อสมาชิก</v-col>
          <v-col cols="2" class="text-right">
            <v-icon color="#166BF9" @click="closeDialog">mdi-close</v-icon>
          </v-col>
        </v-row>
      </div>
      <div class="content-load-member">
        <v-row class="display-1">
          <v-col cols="4" class="head-font">เลือกรายชื่อสมาชิก</v-col>
          <v-col cols="8" class="detail-font display-select">
            :&nbsp;&nbsp;
            <v-select
              v-model="selectListMember"
              :items="listMember"
              placeholder="กรุณาเลือกรายชื่อสมาชิก"
              item-text="name"
              outlined
              dense
              class="border-r-16 select-member"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="display-1">
          <v-col cols="4" class="head-font">สถานะสมาชิก</v-col>
          <v-col v-if="selectListMember === 'สมาชิกสมาคม' || selectListMember === null" cols="8" class="detail-font display-select">
            :&nbsp;&nbsp;
            <v-select
              v-model="selectListStatusMember"
              :items="listStatusMember"
              placeholder="กรุณาเลือกสถานะสมาชิก"
              item-text="name"
              outlined
              dense
              class="border-r-16 select-member"
              hide-details
              :disabled="!selectListMember"
            ></v-select>
          </v-col>
          <v-col v-else-if="selectListMember === 'ไม่ประสงค์เป็นสมาชิก'" cols="8" class="detail-font display-select">
            :&nbsp;&nbsp;
            <v-select
              v-model="selectListStatusMember"
              :items="listStatusNonMember"
              placeholder="กรุณาเลือกสถานะสมาชิก"
              item-text="name"
              outlined
              dense
              class="border-r-16 select-member"
              hide-details
              :disabled="!selectListMember"
            ></v-select>
          </v-col>
          <v-col v-else-if="selectListMember === 'สมาชิกเก่า'" cols="8" class="detail-font display-select">
            :&nbsp;&nbsp;
            <v-select
              v-model="selectListStatusMember"
              :items="listStatusOldMember"
              placeholder="กรุณาเลือกสถานะสมาชิก"
              item-text="name"
              outlined
              dense
              class="border-r-16 select-member"
              hide-details
              :disabled="!selectListMember"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <div class="bottom-zone">
        <v-btn
          class="style-btn"
          outlined
          color="rgba(22, 107, 249, 1)"
          @click="closeDialog"
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
      listMember: [
        {
          code: 'member',
          name: 'สมาชิกสมาคม'
        },
        {
          code: 'temp',
          name: 'ไม่ประสงค์เป็นสมาชิก'
        },
        {
          code: 'old_member',
          name: 'สมาชิกเก่า'
        }
      ],
      listStatusMember: [
        {
          code: 'all',
          name: 'ทั้งหมด'
        },
        {
          code: 'wait_payment',
          name: 'รอชำระเงิน'
        },
        {
          code: 'wait_approve',
          name: 'รอตรวจสอบ'
        },
        {
          code: 'member',
          name: 'เป็นสมาชิก'
        }
      ],
      listStatusNonMember: [
        {
          code: 'all',
          name: 'ทั้งหมด'
        },
        {
          code: 'active',
          name: 'ยังใช้งานอยู่'
        },
        {
          code: 'expire',
          name: 'หมดอายุ'
        }
      ],
      listStatusOldMember: [
        {
          code: 'all',
          name: 'ทั้งหมด'
        },
        {
          code: 'active',
          name: 'เคยเข้ามาใช้งาน'
        },
        {
          code: 'no_active',
          name: 'ยังไม่เคยเข้าใช้งาน'
        }
      ],
      selectListStatusMember: null,
      selectListMember: null
    }
  },
  watch: {},
  computed: {
    isFormValid () {
      return (
        this.selectListMember &&
        this.selectListStatusMember
      )
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    closeDialog () {
      this.selectListMember = null
      this.selectListStatusMember = null
      this.dialog = false
    },
    formatToThaiDate (date) {
      const [year, month, day] = date.split('-')
      const buddhistYear = parseInt(year, 10) + 543 // Add 543 to get the Buddhist year
      return `${day}/${month}/${buddhistYear}`
    },
    submitLoad () {
      if (this.selectListMember === 'สมาชิกสมาคม' || this.selectListMember === 'ไม่ประสงค์เป็นสมาชิก') {
        this.dowloadMember()
      } else if (this.selectListMember === 'สมาชิกเก่า') {
        this.dowloadOldMember()
      }
    },
    dowloadMember () {
      const tempType = this.listMember.filter((item) => item.name === this.selectListMember)
      const tempStatus = this.listStatusMember.filter((item) => item.name === this.selectListStatusMember)
      window.open(`${process.env.VUE_APP_API_URL}/api/excel/exportReportMember?type_member=${tempType[0].code}&status=${tempStatus[0].code}`)
      this.closeDialog()
    },
    dowloadOldMember () {
      const tempType = this.listMember.filter((item) => item.name === this.selectListMember)
      const tempStatus = this.listStatusOldMember.filter((item) => item.name === this.selectListStatusMember)
      window.open(`${process.env.VUE_APP_API_URL}/api/excel/exportReportOldMember?type_member=${tempType[0].code}&status=${tempStatus[0].code}`)
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

.container-load-member {
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
.header-load-member {
  display: flex;
}
.display-select {
  display: flex;
}
.content-load-member {
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
