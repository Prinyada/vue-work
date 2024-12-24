<template>
    <v-dialog v-model="dialog" persistent width="500px">
        <v-card height="auto" style="padding: 15px 20px; border-radius: 16px;">
            <v-row no-gutters>
                <v-col align="center" cols="12">
                    <v-img contain max-width="170" src="@/assets/trva/register/waiting-approve.png"></v-img>
                    <div class="mt-3 pb-3" style="font-size: 17px; font-weight: 500;">ยังไม่สามารถดูข้อมูลได้<br>
                        กรุณารอเจ้าหน้าที่ตรวจสอบข้อมูล</div>
                </v-col>
                <v-col align="center" cols="12">
                    <v-btn @click="dialog = !dialog" height="40" width="150" color="#166BF9"
                        style="border-radius: 16px; color: #FFFFFF; font-size: 15px;">ปิด
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    open () {
      this.dialog = true
    }
  }
}
</script>
<style scoped></style>
