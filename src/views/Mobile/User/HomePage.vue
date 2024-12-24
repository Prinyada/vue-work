<template>
  <div class="mobile-page-bg">
    <div>
      <v-img class="main-logo" src="@/assets/trva/logo.png"></v-img>
      <v-img class="cow-01" src="@/assets/trva/cow01.png"></v-img>
      <v-img class="cow-02" src="@/assets/trva/cow02.png"></v-img>
      <v-img class="cow-03" src="@/assets/trva/cow03.png"></v-img>
      <v-img class="cow-04" src="@/assets/trva/cow04.png"></v-img>
    </div>

    <div>
      <v-card flat class="login-card">
        <v-card-text>
          <v-card flat class="pa-5" :height="menuCardHeight">
            <p> ชื่อ - นามสกุล </p>
            <v-text-field dense outlined placeholder="ระบุชื่อ-นามสกุล"></v-text-field>
            <p> เลขที่ทะเบียนสมาชิก</p>
            <v-text-field class="mt-" dense outlined placeholder="ระบุเลขทะเบียนสมาชิก"></v-text-field>
            <v-btn dense color="#166BF9" style="color: white; width: 100%; border-radius: 12px;">เข้าสู่ระบบ</v-btn>
            <v-btn @click="register" dense color="#166BF9" outlined style="width: 100%; border-radius: 12px;"
              class="mt-5">สมัครสมาชิก</v-btn>
            <v-row align="center" class="my-4">
              <v-col>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="auto">
                <span class="divider-text">หรือ</span>
              </v-col>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-btn dense color="#166BF9" outlined style="width: 100%; border-radius: 12px;">ไม่ประสงค์เป็นสมาชิก</v-btn>
            <v-row no-gutters class="mt-3" justify="center">
              <span style="font-size: 13px; color: #333333;">ค้นหารายชื่อสมาชิก <span
                  style="font-size: 13px; color: #4574DE; text-decoration: underline;" @click="search">คลิกที่นี่</span></span>
            </v-row>
          </v-card>
        </v-card-text>
      </v-card>
    </div>

    <div class="footer">
      <v-img class="" src="@/assets/trva/footer.png"></v-img>
    </div>
  </div>
</template>
<script>
export default {
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
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    onResize () {
      this.windowHeight = window.innerHeight
    },
    testvuex () {
      this.fullname = 'คุณ' + this.profile_store.firstnameTH + ' ' + this.profile_store.lastnameTH
      this.memberid = this.profile_page.license_no

      if (this.file_store) {
        this.img = 'data:image/png;base64,' + this.file_store.file_profile
      } else {
        this.img = ''
      }
    },
    async getData () {
      // var self = this
      const res = await this.axios(
        {
          method: 'get',
          headers: {
            Authorization: this.$store.getters.getToken,
            'Content-Type': 'application/json'
          },
          url: `${process.env.VUE_APP_API_URL}/api/user/getMemberDetails/${this.acc}`
        })
        .then(response => {
          return response
        })
        .catch(err => {
          return err.response
        })
      console.log(res.data.results)
      this.memberid = res.data.results.mem_id_txt
      if (res.data.results.file_member) {
        this.img = 'data:image/png;base64,' + res.data.results.file_member.file_profile
      } else {
        this.img = ''
      }

      this.fullname = 'คุณ' + res.data.results.firstnameTH + ' ' + res.data.results.lastnameTH
    },
    gotoUpdateInfo () {
      this.$router.push('/mobile/profile/' + this.acc)
    },
    gotoLicense () {
      this.$router.push('/mobile/license/' + this.acc)
    },
    goDoc () {
      this.$router.push('/mobile/document/' + this.acc)
    },
    goCard () {
      this.$router.push('/mobile/member-card/' + this.acc)
    },
    search () {
      console.log('2')
      this.$router.push('/searchMember')
    }
  }
}
</script>
<style scoped>
.img-01 {
  position: absolute;
  top: 47px;
}

@media (max-width: 1264px) {}

@media (max-width: 768px) {}

@media (max-width: 426px) {

  .main-logo {
    position: absolute;
    width: 35%;
    left: 132px;
    top: 55px;
  }

  .cow-01 {
    position: absolute;
    width: 25%;
    left: -15px;
    top: 140px;
  }

  .cow-02 {
    position: absolute;
    width: 40%;
    left: -15px;
    top: 200px;
  }

  .cow-03 {
    position: absolute;
    width: 32%;
    left: 270px;
    top: 185px;
  }

  .cow-04 {
    position: absolute;
    width: 30%;
    height: 35%;
    left: 310px;
    top: 115px;
  }

  .login-card {
    height: 550px;
    width: 90%;
    border-radius: 40px !important;
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  /* background-color: red; */
  color: white;
  text-align: center;
}

.dis-img {
  position: absolute;
  background: rgb(0, 0, 0);
}

.overlay {
  top: 305px;
  background: rgb(0, 0, 0);
}

.img-02 {
  position: absolute;
  /* top: 54px;
  right: 0px; */
  width: 554.56px;
  height: 307px;
  /* left: px; */
  top: 120px;
}

.title-1 {
  position: absolute;
  width: 120px;
  height: 30px;
  left: 16px;
  top: 60px;

  /* Title / Medium */

  font-family: "Sarabun";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 120%;
  /* identical to box height, or 30px */

  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
}

.title-2 {
  position: absolute;
  /* width: 285px; */
  height: 37px;
  left: 16px;
  top: 95px;

  font-family: "Sarabun";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 120%;
  /* or 37px */

  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
}

.card-title-3 {
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 25px;
  gap: 10px;

  position: absolute;
  /* width: 117px; */
  height: 29px;
  left: 16px;
  top: 140px;

  /* Secondary/Red */

  background: #ed4157;
  border-radius: 16px;
}

.title-3 {
  width: 150px;
  height: 16px;

  /* Description / Medium */

  font-family: "Sarabun";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 120%;
  /* identical to box height, or 16px */

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}

.profile-avatar {
  border: 8px solid #fff !important;

  background: #ffffff;
  /* Shadow 4 */
  box-shadow: 0px 2px 4px rgba(40, 41, 61, 0.04),
    0px 8px 16px rgba(96, 97, 112, 0.16);

  position: absolute;
  left: 50%;
  top: -99px;
  transform: translate(-50%, 0%);
}

.menu-option {
  margin-top: 119px;
}

.menu-btn {
  overflow: hidden;
  border-radius: 16px;
}

.menu-btn1 {
  overflow: hidden;
  border-radius: 16px;
  /* background-color: black; */
  opacity: 0.4;
}

.request-btn-text {
  font-family: "Sarabun";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;
  /* or 29px */

  text-align: right;

  /* Neural/FFFFFF */

  color: #ffffff;
}

.update-btn-text {
  font-family: "Sarabun";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;
  /* identical to box height, or 29px */

  text-align: right;

  /* Neural/FFFFFF */

  color: #ffffff;

  margin-top: -20px;
}
</style>
