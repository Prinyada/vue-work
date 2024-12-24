<template>
    <v-container fluid class="container-consent">
        <img src="@/assets/trva/vector03.png" class="img-header-consent"/>
        <v-row class="header-text-consent">
            <v-col align="center">
                <div style="color: white; font-size: 20px; font-weight: 700;">นโยบายคุ้มครองข้อมูลส่วนบุคคล</div>
            </v-col>
        </v-row>
        <v-row class="content-consent">
            <v-col cols="12">
                <v-card ref="scrollCard" @scroll="checkIfScrolledToBottom" class="card-info">
                    <v-card-text style="color: #333333; font-weight: 400; font-size: 15px;">
                        <span class="text-info">สมาคมสัตวแพทย์ผู้ควบคุมฟาร์มสัตว์เคี้ยวเอื้อง (ต่อไปนี้จะเรียกว่า
                            ‘สมาคม/เรา’)
                            เป็นผู้ให้บริการแพลตฟอร์มออนไลน์และช่องทางโซเชียลมีเดีย
                            อื่นๆ สมาคมขอเรียนว่าสมาคมเคารพความเป็นส่วนตัว
                            ของผู้ใช้งานและตระหนักดีว่าข้อมูลส่วนบุคคลของผู้ใช้งาน
                            แต่ละท่านมีความสําคัญอย่างยิ่ง สมาคมจึงต้องการ
                            ที่จะชี้แจงให้ทราบเกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผย
                            ข้อมูลส่วนบุคคลของท่าน
                        </span><br>
                        <span class="text-info"> ดังนั้น สมาคมจึงได้มีนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้
                            เพื่อชี้แจงรายละเอียดและ วิธีการจัดเก็บ รวบรวม ใช้ และ/หรือ
                            เปิดเผย การคุ้มครองข้อมูล การเข้าถึงข้อมูลการโอนย้าย และ
                            การวิเคราะห์ประมวลผล ข้อมูลส่วนบุคคลของท่าน ดังต่อไปนี้
                        </span><br>
                        <span class="text-info">
                            ข้อมูลส่วนบุคคลในที่นี้หมายถึงข้อมูลต่างๆ ในการทําการ
                            ลงทะเบียนผ่านแพลตฟอร์มออนไลน ์การลงทะเบียนเข้าร่วม
                            กิจกรรมต่างๆ ของสมาคม คุกกี้ ข้อมูลการทํารายการ
                            และประสบการณ์การใช้งาน
                        </span><br>
                        <span class="text-info"> นโยบายการคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy) นี้
                            อยู่ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
                            โดยสมาคมมีอํานาจหน้าที่ตัดสินใจเกี่ยวกับการเก็บรวบรวม ใช้
                            หรือเปิดเผยข้อมูลส่วนบุคคล ซึ่งตามกฎหมายเรียกว่า
                            ‘ผู้ควบคุมข้อมูลส่วนบุคคล’ โดยมีพนักงานที่สมาคมมอบหมาย
                            โดยเฉพาะให้มีหน้าที่ดําเนินการเกี่ยวกับการเก็บรวบรวม ใช้
                            หรือเปิดเผยข้อมูลส่วนบุคคลตามคําสั่งหรือในนามของสมาคม
                            ซึ่งตามกฎหมายเรียกว่า ‘ผู้ประมวลผลข้อมูลส่วนบุคคล’
                            ส่วนท่านถือเป็น ‘เจ้าของข้อมูลส่วนบุคคล’ ตามกฎหมายนี้
                        </span><br>
                        <span class="text-info"> ข้อ 1. ข้อมูลส่วนบุคคลอะไรบ้างที่สมาคมเก็บรวบรวม ใช้
                            และ/หรือเปิดเผยเราจะเก็บรวบรวมข้อมูลส่วนบุคคล
                            ซึ่งเป็นข้อมูลที่ทําให้สามารถระบุตัวตนของท่านได้
                            ไม่ว่าทางตรง หรือทางอ้อม ได้แก่ข้อมูลที่ท่านให้ไว้โดยตรงจาก
                            การลงทะเบียนผ่านแพลตฟอร์มออนไลน์การลงทะเบียนเข้าร่วมกิจกรรมต่างๆของสมาคมคุกกี้ข้อมูลการทํารายการและ
                            ประสบการณ์การใช้งานผ่านหน้าเว็บไซต์ ผู้ที่ได้รับมอบหมาย หรือช่องทางอื่นใด เช่น
                        </span><br>
                        <span style="padding: 0 0 0 40px;"> - ข้อมูลส่วนตัว เช่น ชื่อ นามสกุล อายุ วันเดือนปีเกิด
                            สถานภาพสมรส
                            เลขประจําตัวประชาชน
                            แพลตฟอร์มเพื่อให้ท่านเข้าถึงข้อมูลได้อย่างทั่วถึงและปลอดภัย
                            คุกกี้เพื่อวัดผลการทํางานของแพลตฟอร์ม (Performance Cookies):
                            ใช้ในการจัดเก็บข้อมูลของผู้เข้าชมแพลตฟอร์มแบบ
                            ไม่ระบุตัวตนและนํามาวิเคราะห์จํานวนและพฤติกรรมของ
                            ผู้เข้าชม เพื่อปรับปรุงแพลตฟอร์มให้มีประสิทธิภาพและ
                            ตรงกับความต้องการของผู้ใช้มากขึ้น
                            คุกกี้บุคคลที่สาม (Third-party Cookies): คุกกี้ชนิดนี้จะถูกกําหนดใช้โดย
                            ผู้บริการซึ่งเป็นบุคคลที่สาม
                            อาทิ Google Analytics <br>
                        </span>
                        <span class="text-info"> ข้อ 1.1. การตั้งค่าคุกกี้
                            ในกรณีที่คุณไม่ประสงค์ให้มีการเก็บรวบรวมข้อมูลของผู้ใช้
                            บริการผ่านทางคุกกี้ ซอฟต์แวร์ และ
                            เครื่องมือการตรวจวัด คุณสามารถลบหรือปฏิเสธคุกกี้หรือซอฟต์แวร์การตรวจวัดบาง
                            รายการผ่านทาง
                            เบราว์เซอร์ได้ โดยหากคุณนําคุกกี้ออก คุณจะออกจากระบบเว็บไซต์และระบบอาจลบค่ากําหนดที่
                            บันทึกไว้
                            ของคุณ ด้วยวิธีการดังนี้
                            <ul style="padding: 0 0 0 50px;">
                                <li>การตั้งค่าคุกกี้ใน Chrome</li>
                                <li>การตั้งค่าคุกกี้ใน Safari และ iOS</li>
                                <li>การตั้งค่าคุกกี้ใน Internet Explorer</li>
                                <li>การตั้งค่าคุกกี้ใน Firefox</li>
                            </ul>
                        </span>
                        <span class="text-info"> ข้อ 1.2. ท่านจะติดต่อสมาคมได้อย่างไร
                            หากท่านมีข้อเสนอแนะหรือต้องการสอบถามข้อมูลเกี่ยวกับ
                            รายละเอียดการเก็บรวบรวมใช้และหรือเปิดเผยข้อมูลส่วน
                            บุคคล รวมถึงการขอใช้สิทธิตามนโยบายฉบับนี้ ท่านสามารถติดต่อสมาคมได้ผ่าน
                            ช่องทางดังนี้
                        </span><br><br>
                        <span>
                            อีเมล: ruminantvet.trva@gmail.com<br>
                            โทร: 081-7321493<br>
                            สถานที่ติดต่อ: สมาคมสัตวแพทย์ผู้ควบคุมฟาร์มสัตว์เคี้ยวเอื้อง เลขที่ 43 หมู่ 4 ต.กรับใหญ่
                            อ.บ้านโป่ง จ.ราชบุรี 70190 <br>
                            เมื่อคุณตกลงยอมรับนโยบายคุ้มครองข้อมูลส่วนบุคคลฉบับนี้ สมาคมจะถือว่าท่านยอมรับว่าการใช้
                            บริการใดๆ ของสมาคมถือเป็นการยอมรับข้อกําหนดและเงื่อนไขการใช้
                            บริการทั้งหมด และการตกลงยอมรับ
                            ดังกล่าวมีผลสมบูรณ์
                        </span>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col align="center" style="margin: 0 20px;" class="pt-0">
                <v-btn v-if="!scrolledToBottom" outlined block height="50" color="#166BF9"
                    style="border-radius: 16px; background-color: #FFFFFF; font-size: 15px;"
                    @click="scrollToBottom">เลื่อนลงไปด้านล่างสุด
                </v-btn>
                <v-btn v-else block height="50" color="#166BF9"
                    style="border-radius: 16px; color: #FFFFFF; font-size: 15px;" @click="confirmRule">ยอมรับเงื่อนไข
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
  data () {
    return {
      scrolledToBottom: false,
      accountId: null
    }
  },
  created () {
    this.accountId = localStorage.getItem('accountId')
  },
  methods: {
    scrollToBottom () {
      const card = this.$refs.scrollCard
      if (card && card.$el) {
        card.$el.scrollTo({
          top: card.$el.scrollHeight,
          behavior: 'smooth'
        })
      }
    },
    checkIfScrolledToBottom () {
      const card = this.$refs.scrollCard.$el
      if (card.scrollTop + card.clientHeight >= card.scrollHeight - 10) {
        this.scrolledToBottom = true
      } else {
        this.scrolledToBottom = false
      }
    },
    async confirmRule () {
      await this.axios({
        method: 'post',
        url: `${process.env.VUE_APP_API_URL}/api/member/insertLogConsent`,
        data: { accountId: this.accountId }
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      this.$router.push({ path: '/login-member' })
    }
  }
}
</script>
<style scoped>
.container-consent {
    height: 100vh;
    width: 100vw;
    background: linear-gradient(0deg, #FFFFFF 73.19%, #006AFF 91.76%);
}
.img-header-consent {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
.header-text-consent {
    margin-top: 10px;
    position: relative;
    z-index: 2;
}
.content-consent {
    z-index: 2;
}
.card-info {
    background-color:  rgba(255, 255, 255, 0.7);
    padding: 10px 20px;
    border-radius: 16px;
    margin: 10px 20px;
    max-height: calc(100vh - 21vh);
    overflow-y: auto;
    position: relative;
    z-index: 2;
}
.text-info {
    padding: 0 0 0 30px;
}
</style>
