<template>
  <div class="container-search">
    <div class="header-search">
      <div class="left-search">
        <v-icon color="rgba(59, 118, 239, 1)" @click="goback()">mdi-chevron-left</v-icon>
      </div>
      <div class="right-search">
        <p class="text-search-1" style="margin-bottom: 0px;">ค้นหารายชื่อสมาชิก</p>
      </div>
    </div>
    <div class="content-search">
      <div class="box-search">
        <v-text-field
          v-model="search"
          placeholder="ค้นหาชื่อ - นามสกุล"
          outlined
          append-icon="mdi-magnify"
          style="background-color: #FFFFFF; border-radius: 8px;"
          hide-details
          dense
          @change="searchMember"
        ></v-text-field>
      </div>
      <v-card v-if="resultSearch.length === 0 && !noMember" class="content-no-data" style="border-radius: 16px;" elevation="0">
        <img width="200" height="144" src="@/assets/trva/search.png"/>
        <div>
          <p style="color: #FA9316; font-weight: 500; font-size: 18px;">ค้นหารายชื่อสมาชิก</p>
        </div>
      </v-card>
      <v-card v-if="resultSearch.length === 0 && noMember" class="content-no-data" style="border-radius: 16px;" elevation="0">
        <img width="200" height="144" src="@/assets/trva/noMember.png"/>
        <div class="diaplay-text-1">
          <p style="color: #989898; font-weight: 500; font-size: 18px; margin-bottom: 0px; margin-top: 5px;">คุณยังไม่ได้เป็นสมาชิก</p>
          <p style="color: #989898; font-weight: 500; font-size: 18px;">สมาคมสัตวแพทย์ผู้ควบคุมฟาร์มสัตว์เคี้ยวเอื้อง</p>
        </div>
      </v-card>
      <v-card v-else-if="resultSearch.length === 1" class="content-show-data" style="background: #FFFFFF; border-radius: 16px;" elevation="0">
        <div class="box-content">
          <div class="margin-bottom-5">
            <span style="color: #333333; font-weight: 600;">ข้อมูลสมาชิก</span>
          </div>
          <div class="gap-4 margin-bottom-5">
            <span style="color: #989898; font-weight: 400;">เลขทะเบียนสมาชิก</span>
            <span style="color: #333333; font-weight: 600;">&nbsp;:&nbsp;{{ resultSearch[0].member_no }}</span>
          </div>
          <div class="gap-32 margin-bottom-5">
            <span style="color: #989898; font-weight: 400;">ชื่อ - นามสกุล</span>
            <span style="color: #333333; font-weight: 600;">&nbsp;:&nbsp;{{ resultSearch[0].full_name }}</span>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDetail: false,
      search: '',
      resultSearch: [],
      oldMemberData: [],
      noMember: false
    }
  },
  async created () {
    const getOldMember = await this.axios({
      method: 'GET',
      url: `${process.env.VUE_APP_API_URL}/api/member/getOldMemberForSearch`
    }).then((response) => {
      return response
    }).catch((err) => {
      return err.response
    })
    this.oldMemberData = getOldMember.data?.result
  },
  methods: {
    searchMember () {
      if (this.search !== '') {
        this.resultSearch = this.oldMemberData.filter(item => item.full_name.includes(this.search))
        if (this.resultSearch.length === 0) {
          this.noMember = true
        } else {
          this.noMember = false
        }
      } else if (this.search === '') {
        this.noMember = false
        this.resultSearch = []
      }
    },
    goback () {
      this.$router.push('/login-member')
    }
  }
}
</script>

<style scoped>
.container-search {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-image: linear-gradient(180deg, #b4d0ff 9%, #F6FBFF 30%);
  display: flex;
  flex-direction: column;
}
.header-search {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-search {
  flex: 0;
  padding-left: 10px;
}
.right-search {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
}
.text-search-1 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
.content-search {
  padding: 15px;
  height: 90%;
  display: flex;
  flex-direction: column;
}
.box-search {
  display: flex;
  align-items: center;
  gap: 10px;
}
.content-no-data {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #FFFFFF;
}
.content-show-data {
  height: 90%;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.box-content {
  width: 95%;
  margin-top: 10px;
  background: #FAFAFA;
  border-radius: 16px;
  padding: 10px;
}
/* ---- other ----- */
.gap-4 {
  display: flex;
  gap: 4px;
}
.gap-32 {
  display: flex;
  gap: 32px;
}
.margin-top-5 {
  margin-top: 5px;
}
.margin-bottom-0 {
  margin-bottom: 0px;
}
.margin-bottom-5 {
  margin-bottom: 5px;
}
.diaplay-text-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
