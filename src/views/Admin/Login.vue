<template>
  <div class="container-longin">
    <!--------- background ------------>
    <img class="top-1" src="../../assets/trva/top01.png"/>
    <img class="top-2" src="../../assets/trva/top02.png"/>
    <img class="bg-center" src="../../assets/trva/background01.png"/>
    <img class="tank" src="../../assets/trva/tank.png"/>
    <img class="cow-5" src="../../assets/trva/cow05.png"/>
    <img class="goat" src="../../assets/trva/goat.png"/>
    <img class="cow-6" src="../../assets/trva/cow06.png"/>
    <img class="sheep" src="../../assets/trva/sheep.png"/>
    <img class="haystack" src="../../assets/trva/haystack.png"/>
    <div class="display-footer">
      <img class="frame-1" src="../../assets/trva/frame01.png"/>
      <img class="frame-2" src="../../assets/trva/frame02.png"/>
      <img class="frame-3" src="../../assets/trva/frame03.png"/>
      <img class="frame-3" src="../../assets/trva/frame03.png"/>
    </div>

    <!--------- login card ------------>
    <v-card class="login-card" elevation="1">
      <div class="login-top">
        <img class="dot-top" src="../../assets/trva/dotgroup.png"/>
        <img class="right-top" src="../../assets/trva/vector02.png"/>
        <img class="dot-bottom" src="../../assets/trva/dotgroup02.png"/>
        <img class="left-bottom" src="../../assets/trva/vector01.png"/>
        <div class="login-header">
          <img width="110" height="110" src="../../assets/trva/logo.png"/>
          <p class="text-1">ระบบสมาชิกสมาคมสัตวแพทย์</p>
          <p class="text-1">ผู้ควบคุมฟาร์มสัตว์เคี้ยวเอื้อง</p>
          <p class="text-2">(Thai Ruminant Veterinary Association)</p>
        </div>
      </div>
      <div class="login-bottom">
        <p class="text-3">ชื่อผู้ใช้งาน</p>
        <v-text-field
          @keyup.enter="login"
          v-model="username"
          placeholder="ระบุชื่อผู้ใช้งาน"
          outlined
          dense
        ></v-text-field>
        <p class="text-3">รหัสผ่าน</p>
        <v-text-field
          @keyup.enter="login"
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          placeholder="ระบุรหัสผ่าน"
          outlined
          dense
          @click:append="show1 = !show1"
        ></v-text-field>
        <!-- <div class="sub-login-bottom">
          <v-row align="center">
            <v-col class="sub-left">
              <v-checkbox v-model="checkbox"></v-checkbox>
              จดจำฉันในระบบ
            </v-col>
            <v-col class="sub-right">
              ลืมรหัสผ่าน
            </v-col>
          </v-row>
        </div> -->
        <v-btn class="button-login"  @keyup.enter="login" color="rgba(22, 107, 249, 1)" elevation="0" block @click="login">เข้าสู่ระบบ</v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      username: '',
      password: '',
      show1: false,
      checkbox: false
    }
  },
  created () {
    localStorage.removeItem('adminData')
  },
  computed: {
    ...mapGetters(['authToken'])
  },
  methods: {
    ...mapActions(['setAuthToken', 'setUserDatas', 'setPermission']),
    async login () {
      var send = {
        username: this.username,
        password: this.password
      }

      const res = await this.axios({
        method: 'post',
        data: send,
        headers: {
          Authorization: this.$store.getters.getToken,
          'Content-Type': 'application/json'
        },
        url: `${process.env.VUE_APP_API_URL}/api/auth/loginAdmin`
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })

      if (res.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          const adminData = res.data.results[0]
          localStorage.setItem('adminData', JSON.stringify(adminData)) // แปลง object เป็น JSON แล้วเก็บใน localStorage
          this.$router.push('/admin/members')
        })
      } else {
        this.password = ''
        this.username = ''
        Swal.fire({
          title: 'ไม่สามารถเข้าสู่ระบบได้',
          text: 'กรุณาตรวจสอบชื่อผู้ใช้ และรหัสผ่านอีกครั้ง',
          icon: 'error'
        })
      }
    }
  }
}
</script>
<style scoped>
.container-longin {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(180deg, #b4d0ff, #F6FBFF 10%);
}
.top-1 {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2; /* This ensures .top-1 is on top of .top-2 */
}
.top-2 {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
}
.bg-center {
  width: 100vw;
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
}
.tank {
  position: absolute;
  bottom: 30px;
  left: 10px;
  z-index: 2;
}
.cow-5 {
  position: absolute;
  left: 0;
  top: 40%;
  z-index: 1;
}
.goat {
  position: absolute;
  left: 140px;
  top: 60%;
  z-index: 2;
}
.cow-6 {
  position: absolute;
  right: 0;
  top: 40%;
  z-index: 1;
}
.sheep {
  position: absolute;
  right: 140px;
  top: 60%;
  z-index: 2;
}
.display-footer {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
}
.haystack {
  position: absolute;
  bottom: 20px;
  right: 0;
}
/* -------- card -----------*/
.login-card {
  z-index: 2;
  width: 445px;
  height: 650px;
  border-radius: 24px;
  position: relative;
}
.login-top {
  width: 100%;
  height: 50%;
  background: rgba(22, 107, 249, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dot-top {
  position: absolute;
  top: 15px;
  left: 0;
}
.dot-bottom {
  position: absolute;
  top: 290px;
  right: 0;
}
.left-bottom {
  position: absolute;
  bottom: 50%;
  left: 0;
}
.right-top {
  position: absolute;
  right: 0;
  border-radius: 0px 24px 0px 0px;
}
.login-header {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
.text-1 {
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 0;
}
.text-2 {
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 0;
  margin-top: 10px;
}
.login-bottom {
  padding: 25px;
}
.text-3 {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 5px;
}
.sub-login-bottom {
  display: flex;
  justify-content: space-between;
}
.sub-left {
  text-align: left !important;
  display: flex;
  align-items: center;
  height: 40px;
}
.sub-right {
  text-align: right !important;
}
.button-login {
  border-radius: 16px;
  color: #FFFFFF;
  margin-top: 10px;
}
</style>
