<template>
  <v-dialog v-model="dialog" width="600px" persistent>
    <div class="container-approve-member">
        <div class="header-approve-member">
            <v-row>
                <v-col cols="10" class="header-dialog">อนุมัติสมาชิก</v-col>
                <v-col cols="2" class="text-right">
                    <v-icon @click="closeDialog">mdi-close</v-icon>
                </v-col>
            </v-row>
        </div>
        <div class="content-approve-member">
            <v-row>
                <v-col cols="4" class="head-font">ชื่อ - นามสกุล</v-col>
                <v-col cols="8" class="detail-font">:&nbsp;{{ prefix }} {{ full_name }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="head-font">วันที่สมัครสมาชิก</v-col>
                <v-col cols="8" class="detail-font">:&nbsp;{{ registerDate }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="head-font">วันที่ชำระเงินสมาชิก</v-col>
                <v-col cols="8" class="detail-font">:&nbsp;{{ paymentDate }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="4" class="head-font">เลขทะเบียนสมาชิก</v-col>
                <v-col ols="8" class="detail-font" style="color: rgba(22, 107, 249, 1)">:&nbsp;{{ this.num_next }}</v-col>
            </v-row>
        </div>
        <div class="display-approve">
          <v-checkbox
            v-model="checkbox"
            color="rgba(59, 118, 239, 1)"
          ></v-checkbox>
          <p class="head-font margin-bottom-zero" style="color: rgba(51, 51, 51, 1)">ยืนยันอนุมัติการสมาชิกของผู้สมัครนี้</p>
        </div>
        <div class="bottom-zone">
          <v-btn class="style-btn" outlined color="rgba(22, 107, 249, 1)" @click="closeDialog">ยกเลิก</v-btn>
          <v-btn class="style-btn" color="rgba(22, 107, 249, 1)" :disabled="!checkbox" @click="adminApprove" elevation="0">
            <p class="margin-bottom-zero" style="color: #FFFFFF;">อนุมัติ</p>
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
      checkbox: false,
      num_next: null,
      prefix: null,
      full_name: null,
      registerDate: null,
      paymentDate: null
    }
  },
  methods: {
    async open (data) {
      this.prefix = data.prefix
      this.full_name = data.full_name
      this.registerDate = data.registerDate
      this.paymentDate = data.paymentDate
      await this.getNumberRun()
      this.dialog = true
    },
    closeDialog () {
      this.checkbox = false
      this.dialog = false
    },
    adminApprove () {
      this.$emit('approve')
      this.dialog = false
    },
    is_3_digits (num) {
      const tempNum = num
      const length = tempNum.toString().length
      return length === 3
    },
    async getNumberRun () {
      const res = await this.axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_URL}/api/admin/getNumberNext`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.status === 200 && res.data.message === 'success') {
        const data = res.data.results[0]
        if (this.is_3_digits(data.number_next)) {
          this.num_next = `1-0${data.number_next}`
        } else {
          this.num_next = `1-${data.number_next}`
        }
      }
    }
  }
}
</script>

<style>
.container-approve-member {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 15px;
}
.v-dialog {
  overflow-y: hidden !important; /* บังคับปิด scroll */
  overflow-x: hidden !important;
  box-shadow: none !important; /* ลบเงา */
  margin: 0px;
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
.content-approve-member {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 20px 20px 30px;
  background: rgba(250, 250, 250, 1);
  border-radius: 16px;
}
.header-approve-member {
  display: flex;
}
.display-approve {
  display: flex;
  align-items: center;
}
.bottom-zone {
  display: flex;
  justify-content: center;
  gap: 10px;
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
.margin-bottom-zero {
  margin-bottom: 0px !important;
}
</style>
