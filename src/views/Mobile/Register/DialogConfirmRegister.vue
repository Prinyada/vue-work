<template>
    <v-dialog width="380" content-class="elevation-0" v-model="dialog">
            <v-card flat style="border-radius: 16px;">
                <v-container fluid fill-height>
                    <v-row>
                        <v-col cols="12" align="center">
                            <span class="font-weight-bold" style="font-size: 18px;">สมัครสมาชิก</span>
                        </v-col>
                        <v-col cols="12" align="center">
                            <v-img
                            src="@/assets/trva/register/ConfirmRegister.png"
                            alt="Image"
                            contain
                            max-width="180"
                            class="mb-4"
                          ></v-img>
                        </v-col>
                        <v-col cols="12" align="center">
                            <span style="font-weight: 400;">คุณได้ทำการสมัครสมาชิกเรียบร้อย</span><br>
                            <span style="font-weight: 400;">กรุณาชำระเงินในขั้นตอนถัดไป</span>
                        </v-col>
                        <v-col cols="12" align="center" class="mb-4">
                            <v-btn width="120" large style="border-radius: 16px; color: white;" color="#166BF9" @click="close">ปิด</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
              </v-card>
    </v-dialog>
  </template>

<script>
export default {
  props: {
    formPage: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  created () {
    console.log('ccccc')
  },
  methods: {
    actionDialog (val) {
      this.dialog = val
    },
    close () {
      if (this.formPage === 'register-new-member' || this.formPage === 'register-undesirable') {
        this.$emit('goToBiz')
      }
      this.dialog = !this.dialog
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
