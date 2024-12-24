<template>
  <v-dialog width="380" content-class="elevation-0" v-model="dialog">
    <v-card flat style="border-radius: 16px;">
      <v-container fluid fill-height>
        <v-row>
          <v-col cols="12" align="center">
            <span class="font-weight-bold" style="font-size: 18px;">อัปเดตข้อมูลสมาชิก</span>
          </v-col>
          <v-col cols="12" align="center">
            <v-img src="@/assets/trva/update/update.png" alt="Image" contain max-width="180" class="mb-4"></v-img>
          </v-col>
          <v-col cols="12" align="center">
            <span style="font-weight: 400;">คุณต้องการยืนยัน</span><br>
            <span style="font-weight: 400;">การอัปเดตข้อมูลสมาชิกหรือไม่</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" align="center" class="mb-2">
            <v-btn width="110" height="42" outlined style="border-radius: 16px; margin: 0px 6px;" color="primary" @click="close">ยกเลิก</v-btn>
            <v-btn width="110" height="42" style="border-radius: 16px; margin: 0px 5px;" color="primary" @click="save">ยืนยัน</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <DialogSuccess v-if="clickConfirmUpdate" ref="dialogSuccess" :formPage="formPage" @goToBiz="goToBiz"/>
  </v-dialog>
</template>

<script>
import DialogSuccess from '../SeedWorks/DialogSuccess.vue'
import Swal from 'sweetalert2'
export default {
  props: {
    formPage: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      clickConfirmUpdate: false
    }
  },
  components: {
    DialogSuccess
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    save () {
      if (this.formPage === 'update') {
        this.$emit('updateDataMember')
        this.dialog = false
      } else {
        const data = {
          title: 'อัปเดตข้อมูลสมาชิก',
          img: require('@/assets/trva/success.png'),
          subTitle: 'อัปเดตข้อมูลสมาชิกเรียบร้อย',
          textBtn: 'ปิด',
          linkClose: '/profile/detail'
        }
        this.clickConfirmUpdate = true
        this.$nextTick(() => {
          this.$refs.dialogSuccess.open(data)
        })
        this.dialog = false
      }
    },
    async goToBiz () {
      const payload = {
        prefix: this.profile.salutation,
        full_name: this.profile.full_name
      }
      const setToBiz = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/member/setToBiz`,
        data: { payload: payload, accountId: this.accountId }
      })
      if (setToBiz.data.status === 200) {
        console.log('set to biz ok')
      } else {
        Swal.fire({
          title: 'ระบบขัดข้อง',
          text: 'กรุณาลองใหม่อีกครั้ง',
          icon: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
.headline {
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}
</style>
