<template>
  <v-dialog v-model="dialog" max-width="400px">
    <div class="container">
      <div class="header">
        <v-icon @click="closeDialog">mdi-close</v-icon>
      </div>
      <div class="content">
        <img src="../../assets/trva/success.png" width="126" height="126" />
        <p class="text-success">ไม่อนุมัติสมาชิกสำเร็จ</p>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  watch: {},
  methods: {
    open () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.container {
  background: #ffffff;
  border-radius: 24px;
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  justify-content: flex-end;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text-success {
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  color: rgba(82, 196, 26, 1);
}
</style>
