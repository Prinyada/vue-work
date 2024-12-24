<template>
    <v-dialog v-model="dialog" persistent width="500px">
        <v-card height="auto" style="padding: 15px 20px; border-radius: 16px;">
            <v-row no-gutters>
                <v-col align="center" cols="12">
                    <div class="mt-3 pb-3 font-weight-bold" style="font-size: 17px;">{{ data.title }}</div>
                    <v-img contain max-width="70" :src="data.img"></v-img>
                    <div class="mt-3 pb-3" style="font-size: 16px; font-weight: 500;">{{ data.subTitle }}</div>
                </v-col>
                <v-col align="center" cols="12">
                    <v-btn @click="close" height="40" width="120" color="#166BF9"
                        style="border-radius: 16px; color: #FFFFFF; font-size: 15px;">{{ data.textBtn }}
                    </v-btn>
                </v-col>
            </v-row>
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
      dialog: false,
      data: {}
    }
  },
  methods: {
    open (datas) {
      this.data = datas
      this.dialog = true
    },
    close () {
      if (this.formPage === 'loginOld') {
        console.log('เข้า')
        this.$emit('goToBiz')
      } else {
        this.$router.push({ path: this.data.linkClose })
      }
      this.dialog = !this.dialog
    }
  }
}
</script>
<style scoped></style>
