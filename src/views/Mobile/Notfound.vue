<template>
  <div class="mobile-form-bg">
    <v-card outlined class="card-form mx-3 mb-3 py-5 mt-10">
      <v-card>
      </v-card>
      <div style="text-align: center !important;font-size: 15px;font-weight: 800;">กรุณา login ด้วย เลขบัตรประชาชนเเละเบอร์โทรศัพท์</div>
      <v-img src="@/assets/img/mobile/wrongway.png" style="width: 300px !important;display: block;margin-left: auto;margin-right: auto;"></v-img>
    </v-card>
  </div>
</template>
<script>
// import Swal from 'sweetalert2'
export default {
  data: () => ({
  }),
  async created () {
  },
  computed: {
  },
  methods: {

  }
}
</script>
<style scoped>
.mobile-form-bg {
  height: 100%;
  background-color: #EBF4FF;
}
table,
th,
td {
  border: 1px solid black;
}

.sign-img {
  width: 50px;
  height: 50px;
  margin-right: 20%;
}

.img {
  height: 80px;
  width: 80px;
  text-align: center;
  align-items: center;

}

.span-text {
  font-size: 11px;
  color: red;
}

.back-bth {
  position: absolute;
  top: 50%;
  left: 25px;
  transform: translate(-50%, -50%);
}

.main-list {
  font-weight: 700;
  font-size: 16px;
  color: black;
}

.head-text {
  text-align: center;
  align-items: center;
  color: #006AF1;
  font-weight: 700;
  font-size: 24px;
}

.card-menu {
  position: absolute;
  left: 0px;
  top: 100px;
  height: 100%;

  /* width: 430px; */
  /* height: 450px; */

  /* Neural/FFFFFF */

  /* background: #FFFFFF; */
  /* Shadow 1 */

  box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.08),
    0px 0.5px 2px rgba(96, 97, 112, 0.16);
  border-radius: 64px 64px 0px 0px;
}

.subhead-text {
  text-align: center;
  align-items: center;
  color: #808080;
  font-weight: 400;
  font-size: 16px;
}

.menu-option {
  /* margin-top: 10px; */
}

.request-btn-text {
  font-family: "Sarabun";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 120%;
  /* or 29px */

  text-align: right;

  /* Neural/FFFFFF */

  color: #ffffff;
}

.request-btn-text2 {
  font-family: "Sarabun";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 120%;
  /* or 29px */

  text-align: right;

  /* Neural/FFFFFF */

  color: #ffffff;
}

.request-btn-text3 {
  font-family: "Sarabun";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 120%;
  /* or 29px */

  text-align: right;

  /* Neural/FFFFFF */

  color: #ffffff;
}

.menu-btn {
  overflow: hidden;
  border-radius: 16px;
}

.textzone {
  border-radius: 16px;
}

.card-form {
  border-radius: 16px;
}

.form-title {
  font-size: 14px;
  color: #666666;
}

.note-text {
  font-size: 12px;
  color: #006af1;
}
</style>
