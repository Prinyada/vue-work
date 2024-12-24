<template>
  <v-dialog v-model="dialog" max-width="400px" persistent>
    <div class="container-dialog-success">
      <div class="header-dialog-success">
        <v-icon @click="closeDialog">mdi-close</v-icon>
      </div>
      <div class="content-dialog-success">
        <img src="../assets/trva/success.png" width="126" height="126" />
        <p class="text-success">อนุมัติสมาชิกสำเร็จ</p>
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
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.container-dialog-success {
  background: #ffffff;
  border-radius: 24px;
  padding-bottom: 30px;
}
.header-dialog-success {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.content-dialog-success {
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
