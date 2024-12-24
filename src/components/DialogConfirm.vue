<template>
  <div>
    <v-dialog
      v-model="dialog_confirm"
      width="428"
    >
      <v-card class="pb-2">
          <v-row align="center" style="height: 50px;" no-gutters justify="center">
          <span class="font-weight-bold primary--text" style="font-size: 18px;"> {{title}} </span>
          <v-icon @click="cancel()" size="20" color="#1976D2" style="position: absolute; right: 20px; top: 16px;">mdi-close</v-icon>
          </v-row>

        <v-card-text class="py-5 text-primary">

          <v-row v-for="(line,i) in text" :key="i" class="mt-3 text-center" justify="center" no-gutters>
            <span  style="font-size: 14px;">{{line}}</span>
          </v-row>

          <v-row class="mt-9" no-gutters justify="center">
            <v-btn class="mx-2" @click="cancel()"  outlined width="117" dark color="#1976D2">ยกเลิก</v-btn>
            <v-btn class="mx-2" @click="agree()"  width="117" dark color="#1976D2">ตกลง</v-btn>
          </v-row>

        </v-card-text>

      </v-card>
    </v-dialog>

  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog_confirm: false,

      title: '',
      icon: '',
      text: ''

    }
  },
  watch: {

  },
  methods: {
    // check confirm
    open (title, text, icon) {
      this.dialog_confirm = true
      this.title = title
      this.text = text
      this.icon = icon
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree () {
      this.resolve(true)
      this.dialog_confirm = false
    },
    cancel () {
      this.resolve(false)
      this.dialog_confirm = false
    }

  }
}
</script>
<style scoped>
.font-14 {
  font-size: 14px;
}
</style>
