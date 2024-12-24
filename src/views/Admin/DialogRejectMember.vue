<template>
  <v-dialog v-model="dialog" max-width="500px">
    <div class="container">
      <div>
        <v-row>
          <v-col cols="10" class="header-dialog">ไม่อนุมัติ</v-col>
          <v-col cols="2" class="text-right">
            <v-icon>mdi-close</v-icon>
          </v-col>
        </v-row>
      </div>
      <div class="content">
        <div class="text-content">
            คุณแน่ใจหรือไม่ว่าต้องการไม่อนุมัติการเป็นสมาชิกของผู้สมัครนี้
        </div>
        <v-textarea
          v-model="reasonReject"
          name="input-7-4"
          placeholder="ระบุเหตุผล"
          outlined
          hide-details
        ></v-textarea>
      </div>
      <div class="bottom-zone">
        <v-btn class="style-btn" outlined color="rgba(22, 107, 249, 1)"
          >ยกเลิก</v-btn
        >
        <v-btn
          class="style-btn"
          color="rgba(22, 107, 249, 1)"
          @click="submit"
          elevation="0"
        >
          <p class="margin-bottom-zero" style="color: #ffffff">ยืนยัน</p>
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ['approve'],
  data () {
    return {
      dialog: false,
      reasonReject: ''
    }
  },
  watch: {},
  methods: {
    open () {
      this.dialog = true
    },
    submit () {
      this.$emit('submit')
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.container {
  background: #ffffff;
  border-radius: 24px;
}

.header-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20%;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background: rgba(250, 250, 250, 1);
  border-radius: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.text-content {
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(99, 99, 99, 1);
  margin-bottom: 10px;
}

.display-approve {
  display: flex;
  align-items: center;
}

.bottom-zone {
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* style font */
.head-font {
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(152, 152, 152, 1);
}

.detail-font {
  font-size: 16px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}

/* styly bottom */
.style-btn {
  width: 120px;
  border-radius: 16px;
  padding: 8px 16px 8px 16px;
}

/* other */
.margin-bottom-zero {
  margin-bottom: 0;
}
</style>
