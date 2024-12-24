<template>
  <v-dialog width="380" content-class="elevation-0" v-model="dialog">
    <v-card flat style="border-radius: 16px;">
      <v-container fluid fill-height>
        <v-row>
          <v-col cols="12" align="center" class="mt-2">
            <span class="font-weight-bold" style="font-size: 18px;">ยกเลิกรายการ</span>
          </v-col>
          <v-col cols="12" align="center">
            <v-img src="@/assets/trva/register/cancel.png" alt="Image" contain max-width="180"></v-img>
          </v-col>
          <v-col cols="12" align="center">
            <span style="font-weight: 400;">คุณต้องการยืนยัน</span><br>
            <span style="font-weight: 400;">การยกเลิกรายการสมัครสมาชิกหรือไม่</span>
          </v-col>
        </v-row>
        <v-row v-if="data.btn_cancel !== ''">
          <v-col cols="12" align="center" class="mb-2">
            <v-btn width="110" height="42" outlined style="border-radius: 16px; margin: 0px 6px;" color="primary"
              @click="dialog = !dialog">ยกเลิก</v-btn>
            <v-btn width="110" height="42" style="border-radius: 16px; margin: 0px 5px;" color="primary"
              @click="close">ยืนยัน</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <DialogSuccess ref="dialogSuccess" form-page="dialogCancle"/>
  </v-dialog>
</template>
<script>
import DialogSuccess from '../SeedWorks/DialogSuccess.vue'
export default {
  data () {
    return {
      dialog: false,
      data: {}
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
      const textSuccess = {
        title: 'ยกเลิกรายการ',
        img: require('@/assets/trva/success.png'),
        subTitle: 'คุณได้ทำการยกเลิกการสมัครสมาชิกเรียบร้อย',
        textBtn: 'ปิด',
        linkClose: '/login-member'
      }
      this.$nextTick(() => {
        this.$refs.dialogSuccess.open(textSuccess)
      })
      this.dialog = !this.dialog
    }
  }
}
</script>
<style scoped></style>
