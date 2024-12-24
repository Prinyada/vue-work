<template>
    <div class="mobile-page-bg main-padding">
        <v-container style="height: 100vh;" fluid>
            <div>
                <v-img class="cow-01" src="@/assets/trva/cow01.png"></v-img>
                <v-img class="cow-02" src="@/assets/trva/cow02.png"></v-img>
                <v-img class="cow-03" src="@/assets/trva/cow03.png"></v-img>
                <v-img class="cow-04" src="@/assets/trva/cow04.png"></v-img>
            </div>
            <v-row>
                <v-col class="main-logo" align="center">
                    <v-img max-width="150" src="@/assets/trva/logo.png"></v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col align="center">
                    <v-card flat class="login-card">
                        <v-card-text>
                            <v-row no-gutters>
                              <v-col cols="12">
                                <v-avatar size="120" class="orange-background">
                                  <v-img class="" src="@/assets/trva/register/reject-register.png"></v-img>
                                </v-avatar>
                              </v-col>
                              <v-col cols="12" class="mt-5" style="font-size: 18px; color: #FA9316;">
                                <div>การสมัครสมาชิกไม่ถูกอนุมัติ</div>
                                <div>กรุณาสมัครสมาชิกใหม่อีกครั้ง</div>
                              </v-col>
                              <v-col cols="12" class="mt-5">
                                <div>รายละเอียดการคืนเงินค่าสมาชิก</div>
                                <div>จะมีเจ้าหน้าที่ติดต่อไปภายใน 3-7 วันทำการ</div>
                              </v-col>
                              <v-col cols="12" class="mt-5">
                                <v-row>
                                  <v-col cols="12" class="mb-n2">
                                    <v-btn @click="registerNewMember" block large style="color: white; border-radius: 16px;" color="#166BF9" class="btn-style" height="45">
                                      สมัครสมาชิก
                                  </v-btn>
                                </v-col>
                                <v-col col="12" class="mb-2">
                                <v-btn @click="registerUndesirable" style="border-radius: 16px;"  block large outlined color="primary" height="45">
                                  ไม่ประสงค์สมัครสมาชิก
                              </v-btn>
                              </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <div class="footer">
            <v-img class="" src="@/assets/trva/footer.png"></v-img>
        </div>
        <DialogConfirmDisirable ref="dialogConfirmDisirable" />
    </div>
</template>
<script>
import DialogConfirmDisirable from '../Register/DialogConfirmDisirable.vue'
export default {
  components: {
    DialogConfirmDisirable
  },
  data () {
    return {
      windowHeight: window.innerHeight,
      memberid: '',
      img: '',
      fullname: '',
      acc: ''
    }
  },
  computed: {
    menuCardHeight () {
      var height = this.windowHeight - 600
      return height
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {
    registerNewMember () {
      this.$router.push('/register-new-member')
    },
    registerUndesirable () {
      this.$refs.dialogConfirmDisirable.actionDialog(true)
    }

  }
}
</script>
<style scoped>
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    max-height: 300px;
    color: white;
    text-align: center;
}

.login-card {
    height: auto;
    width: 90%;
    border-radius: 40px !important;
    margin-top: 10px
}

.main-padding {
    padding-top: 30px;
}

.cow-01 {
    position: absolute;
    width: 25vw;
    left: 0%;
    top: 14%;
    transform: translateX(0);
}

.cow-02 {
    position: absolute;
    width: 40vw;
    left: 0%;
    top: 20%;
}

.cow-03 {
    position: absolute;
    width: 40vw;
    right: -2%;
    top: 19%;
}

.cow-04 {
    position: absolute;
    width: 30vw;
    right: -8%;
    top: 12%;
}
.orange-background {
  /*background: linear-gradient(180deg, #FFF3E0, #ffddb1,  #ffddb1); */
  background: linear-gradient(to top, #ffddb1, #ffffff);
  border-radius: 50%; /* ทำให้รูปภาพเป็นวงกลม */
  padding: 10px; /* เพิ่มระยะห่างระหว่างรูปภาพกับพื้นหลัง */
}

</style>
