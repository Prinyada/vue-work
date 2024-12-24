<template>
    <v-dialog v-model="dialog" persistent width="500px" content-class="elevation-0">
        <v-card height="auto" style="padding: 15px 20px; border-radius: 16px;">
            <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <v-btn icon color="#166BF9">
                        <v-icon @click="dialog = !dialog"> mdi-close </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col align="center" cols="12">
                    <div style="font-size: 16px; color: #333333;" class="font-weight-bold">แก้ไขข้อมูลการส่งเอกสาร</div>
                </v-col>
                <v-col>
                    <div style="font-size: 16px; color: #333333;" class="font-weight-bold mt-2">
                        เลือกช่องทางการจัดส่งเอกสาร</div>
                </v-col>
            </v-row>
            <v-row align="stretch">
                <v-col cols="12" v-for="(item, i) in items" :key="i">
                    <v-card @click="selectSendDoc(i)" :class="isActive === i ? 'card-select' : ''"
                        style="padding: 10px 10px; border-radius: 16px; height: 100%;">
                        <v-row no-gutters>
                            <v-col cols="12" align="start">
                                <div class="d-flex flex-row align-center">
                                    <v-img contain max-width="55" :src="item.img" class="mr-2"></v-img>
                                    <span style="font-weight: 500; font-size: 16px;">{{ item.text }}</span>
                                    <v-spacer></v-spacer>
                                    <v-icon style="color: #FFFFFF;"> mdi-check-circle </v-icon>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn :disabled="!sendDoc" @click="save" block
                        height="40" color="#166BF9" style="border-radius: 16px; color: #FFFFFF; font-size: 15px;">ยืนยัน
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    <DialogSuccess ref="dialogSuccess" formPage="editSendDoc"/>
    </v-dialog>
</template>
<script>
import DialogSuccess from '../SeedWorks/DialogSuccess.vue'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      dialog: false,
      isActive: null,
      sendDoc: null,
      items: [
        {
          img: require('@/assets/trva/update/address.png'),
          text: 'ที่อยู่ปัจจุบัน',
          send_doc: 'current'
        },
        {
          img: require('@/assets/trva/update/work.png'),
          text: 'สถานที่ทำงาน',
          send_doc: 'work'
        },
        {
          img: require('@/assets/trva/update/email.png'),
          text: 'อีเมล',
          send_doc: 'email'
        }
      ],
      dataMember: []
    }
  },
  components: {
    DialogSuccess
  },
  created () {
    this.dataMember = this.$store.state.dataMember
  },
  methods: {
    open (data) {
      this.sendDoc = null
      this.isActive = null
      var type = -1
      switch (data) {
        case 'current':
          type = 0
          break
        case 'work':
          type = 1
          break
        case 'email':
          type = 2
          break
        default:
          break
      }
      this.selectSendDoc(type)
      this.dialog = true
    },
    selectSendDoc (index) {
      this.isActive = index
      this.sendDoc = this.items[index].send_doc
    },
    async save () {
      const apiUpdateSendDoc = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/member/updateSendDoc`,
        data: { member_id: this.dataMember.member_id, send_doc: this.sendDoc }
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (apiUpdateSendDoc.status === 200) {
        const data = {
          title: 'ข้อมูลการส่งเอกสาร',
          img: require('@/assets/trva/success.png'),
          subTitle: 'คุณได้ทำการแก้ไขข้อมูลการส่งเอกสารเรียบร้อย',
          textBtn: 'ปิด',
          linkClose: '/profile/homepage'
        }
        this.dialog = !this.dialog
        this.$refs.dialogSuccess.open(data)
      } else {
        await Swal.fire({
          title: 'ไม่สามารถอัปเดตข้อมูลได้',
          text: 'กรุณาลองใหม่อีกครั้ง',
          icon: 'error'
        })
        this.$router.push({ path: '/profile/homepage' })
      }
    }
  }

}
</script>
<style scoped>
.card-select {
    color: #FFFFFF;
    background: linear-gradient(to bottom, #92BFFF, #62A3FF);
}
</style>
