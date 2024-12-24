<template>
    <v-container class="bg-register">
      <v-app-bar v-show="!loading" height="70" flat color="transparent">
        <v-row no-gutters="" justify="center" v-if="e1 > 1">
          <v-icon class="back-bth" color="black" @click="goBefore()"> mdi-chevron-left </v-icon>
          <span class="font-weight-bold">สมัครสมาชิก</span>
        </v-row>
        <v-row no-gutters="" justify="center" v-if="e1 === 1">
          <v-icon class="back-bth" color="black" @click="goHome()"> mdi-chevron-left </v-icon>
          <span class="font-weight-bold">สมัครสมาชิก</span>
        </v-row>
      </v-app-bar>

      <v-card v-show="!loading" outlined class="card-form mx-3 mb-3 py-5" flat>
        <v-stepper v-if="e1 < 5" v-model="e1" class="elevation-0">
          <v-stepper-header flat>
            <v-stepper-step :complete="e1 > 1" step="1" @click="step1()">
              1
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2" @click="step2()">
              2
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3" @click="step3()">
              3
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 4" step="4" @click="step4()">
              4
            </v-stepper-step>

          </v-stepper-header>

        </v-stepper>

        <v-card-text v-if="e1 === 1" class="primary-text">
          <div style="text-align: center;font-size: 16px; font-weight: 700; color: black;">อัปโหลดรูป</div>
          <br />
          <v-card flat>
            <br />
            <v-row justify="center" class="">
              <v-card :style="imageUrl ? '' : 'border: 2px dashed #006AF1;'" @click="onPickFilePic" flat color=""
                class="mt-6 mx-auto" width="280" height="294">
                <v-img v-if="imageUrl" width="280" height="294" :src="imageUrl"></v-img>
                <v-row v-if="!imageUrl" justify="center" no-gutters>
                  <v-col cols="12" class="mt-5">
                    <v-img class="center" src="@/assets/img/Group1504775373.png"></v-img>
                    <br />
                    <div style="text-align: center;font-weight: 500;font-size: 10px;color: #006AF1;">
                      รูปถ่ายหน้าตรง
                      ครึ่งตัว ท่าปกติ ถ่ายไว้ไม่เกิน 6 เดือน <br /> จำนวน 1 รูป</div>
                  </v-col>

                </v-row>
                <input ref="fileInput" type="file" accept="image/png, image/jpeg" hidden @change="onFilePickedPic" />
              </v-card>
            </v-row>
            <br />
            <br />
          </v-card>

        </v-card-text>

        <v-form ref="form2" class="mx-2" lazy-validation>
          <v-card-text v-if="e1 === 2" class="primary-text">
            <div class="d-flex flex-row align-center">
              <v-icon color="#006AF1" class="mr-3">mdi-folder-account-outline</v-icon>
              <span class="font-weight-bold address-title">ข้อมูลส่วนตัว</span>
            </div>
            <v-divider class="mt-1"></v-divider>
            <br />
            <div>
              <span class="form-title"> คำนำหน้า </span>
              <v-select :items="itemsPrefixTH" @change="comparePrefix()" v-model="prefixTH" class="mt-1 textzone"
                placeholder="ระบุคำนำหน้าชื่อ" outlined dense style="font-size: 12px;" :rules="[rules.select]"
                required></v-select>
            </div>
            <div>
              <span class="form-title"> ชื่อ (ภาษาไทย) </span>
              <v-text-field v-model="nameTH" class="mt-1 textzone" placeholder="ระบุชื่อภาษาไทย" outlined dense
                style="font-size: 12px;" :rules="[rules.thaiOnly]" required></v-text-field>
            </div>
            <div>
              <span class="form-title">นามสกุล (ภาษาไทย) </span>
              <v-text-field v-model="lastnameTH" class="mt-1 textzone" placeholder="ระบุนามสกุล" outlined dense
                style="font-size: 12px;" :rules="[rules.thaiOnly]" required></v-text-field>
            </div>
            <div>
               <!-- . -->
              <span class="form-title"> Title </span>
              <v-autocomplete :items="itemsPrefixEN" v-model="prefixEN" class="mt-1 textzone" placeholder="title" outlined
                dense style="font-size: 12px;" :rules="[rules.select]" required></v-autocomplete>
            </div>
            <div>
              <span class="form-title"> First name </span>
              <v-text-field v-model="nameEN" class="mt-1 textzone" placeholder="first name" outlined dense
                style="font-size: 12px;" :rules="[rules.required_eng]" required></v-text-field>
            </div>
            <div>
              <span class="form-title"> Last name </span>
              <v-text-field v-model="lastnameEN" class="mt-1 textzone" placeholder="last name" outlined dense
                style="font-size: 12px;" :rules="[rules.required_eng]" required></v-text-field>
            </div>

            <div>
              <span class="form-title"> เพศ </span>
              <v-radio-group row v-model="gender" :rules="[rules.select]" required>
                <v-radio v-model="a" label="ชาย"></v-radio>
                <v-radio v-model="b" label="หญิง"></v-radio>
              </v-radio-group>
            </div>

            <div>
              <span class="form-title"> เลขบัตรประชาชน </span>
              <v-text-field v-model="idcard" class="mt-1 textzone" outlined dense style="font-size: 12px;"
                placeholder="ระบุหมายเลขบัตรประชาชน" readonly filled></v-text-field>
            </div>

            <div>
              <span class="form-title"> เลขหนังสือเดินทาง (Passsport) </span>
              <v-text-field v-model="passsport" class="mt-1 textzone" placeholder="Passsport" outlined dense
                style="font-size: 12px;">
              </v-text-field>
            </div>

            <div>
              <span class="form-title"> วัน / เดือน / ปี เกิด </span>
              <!-- <v-text-field v-model="birth" class="mt-1 textzone" placeholder="ระบุวัน เดือน ปี เกิด" outlined dense
                          style="font-size: 12px;">
                      </v-text-field> -->
              <v-menu v-model="birthmenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                offset-y min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field dense v-model="thDateFormat" @change="calAge()" outlined placeholder="กรุณาระบุวันเกิด" :rules="[rules.required]" required
                    v-bind="attrs" v-on="on" color="#006AF1" class="textzone" append-icon="mdi-calendar"
                    style="font-size: 12px"></v-text-field>
                </template>
                <v-date-picker locale="th-th" v-model="birth" no-title @change="calAge()" :max="min_brith"
                  @input="birthmenu = false"></v-date-picker>
              </v-menu>
            </div>

            <div>
              <v-row no-gutters>
                <v-col cols="6">
                  <span class="form-title"> อายุ </span>
                  <v-text-field v-model="age" class="mt-1 mx-1 textzone" placeholder="ระบุอายุ" outlined dense
                    style="font-size: 12px;" :rules="[rules.numberOnly]" required>
                  </v-text-field>
                </v-col>
                <!-- <v-col cols="6">
                              <span class="form-title"> ศาสนา </span>
                              <v-text-field v-model="religion" class="mt-1 mx-1 textzone" placeholder="ระบุศาสนา" outlined
                                  dense style="font-size: 12px;">
                              </v-text-field>
                          </v-col> -->
                <v-col cols="6">
                  <span class="form-title">สัญชาติ</span>
                  <v-text-field v-model="nationality" class="mt-1 mx-1 textzone" placeholder="ระบุสัญชาติ" outlined dense
                    style="font-size: 12px;" :rules="[rules.required]" required>
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <span class="form-title"> เชื้อชาติ </span>
                  <v-text-field v-model="ethnicity" class="mt-1 mx-1 textzone" placeholder="ระบุเชื้อชาติ" outlined dense
                    style="font-size: 12px;" :rules="[rules.required]" required>
                  </v-text-field>
                </v-col>

              </v-row>
            </div>

            <div>
              <span class="form-title"> เบอร์โทร </span>
              <v-text-field v-model="telmobile" class="mt-1 textzone" placeholder="ระบุเบอร์โทรศัพท์" outlined dense
                style="font-size: 12px;" :rules="[rules.numberOnly]" required> </v-text-field>
            </div>

            <div>
              <span class="form-title"> อีเมล </span>
              <v-text-field v-model="email" class="mt-1 textzone" placeholder="ระบุอีเมล" outlined dense
                style="font-size: 12px;" :rules="[rules.email]" required>
              </v-text-field>
            </div>
            <div class="d-flex flex-row align-center">
              <v-icon color="#006AF1" class="mr-3">mdi-folder-home-outline</v-icon>
              <span class="font-weight-bold address-title">ข้อมูลการศึกษา</span>
            </div>
            <v-divider class="mt-1"></v-divider>
            <br />
            <div>
              <span class="form-title"> วุฒิการศึกษาในระดับปริญญาตรี </span>
              <v-select v-model="degree" :items="degreesitem" class="mt-1 textzone" placeholder="ระบุสถาบันการศึกษา"
                outlined dense style="font-size: 12px;" :rules="[rules.required]" required>
              </v-select>
            </div>
            <div>
              <span class="form-title"> สถาบันการศึกษาในระดับปริญญาตรี </span>
              <v-select v-model="university" :items="degreeitem" class="mt-1 textzone"
                placeholder="ระบุสถาบันการศึกษา" :rules="[rules.required]" required outlined dense style="font-size: 12px;">
              </v-select>
            </div>
            <div>
              <span class="form-title"> ประเทศ </span>
              <v-text-field v-model="country" class="mt-1 textzone" placeholder="ระบุประเทศ" outlined dense
                style="font-size: 12px;">
              </v-text-field>
            </div>
            <div>
              <span class="form-title"> วัน เดือน ปี ที่สำเร็จการศึกษา </span>
              <v-menu v-model="menudate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                offset-y min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field dense v-model="thDateFormatEDU" :rules="[rules.required]" required outlined placeholder="DD/MM/YYYY" v-bind="attrs" v-on="on"
                    color="#95358c" class="textzone" append-icon="mdi-calendar" style="font-size: 12px"></v-text-field>
                </template>
                <v-date-picker locale="th-th" v-model="graduate" no-title @input="menudate = false"></v-date-picker>
              </v-menu>
            </div>

          </v-card-text>
        </v-form>

        <v-form ref="form3" class="mx-2" lazy-validation>
          <v-card-text v-if="e1 === 3" class="primary-text">
            <div class="d-flex flex-row align-center">
              <v-icon color="#006AF1" class="mr-3">mdi-folder-home-outline</v-icon>
              <span class="font-weight-bold address-title">ข้อมูลที่อยู่ตามทะเบียนบ้าน</span>
            </div>
            <v-divider class="mt-1"></v-divider>
            <br />
            <div>
              <span class="form-title"> บ้านเลขที่</span>
              <v-text-field v-model="no_reg" class="mt-1 textzone " outlined dense placeholder="ระบุบ้านเลขที่"
                style="font-size: 12px;" :rules="[rules.required]" required>
              </v-text-field>
            </div>
            <div>
              <span class="form-title"> อาคาร</span>
              <v-text-field v-model="building_reg" class="mt-1 textzone " outlined dense placeholder="ระบุอาคาร"
                style="font-size: 12px;">
              </v-text-field>
            </div>
            <div>
              <span class="form-title">หมู่</span>
              <v-text-field v-model="moo_reg" class="mt-1 textzone " outlined dense placeholder="ระบุหมู่"
                style="font-size: 12px;">
              </v-text-field>
            </div>
            <div>
              <span class="form-title">ถนน</span>
              <v-text-field v-model="road_reg" class="mt-1 textzone " outlined dense placeholder="ระบุถนน"
                style="font-size: 12px;">
              </v-text-field>
            </div>
            <div>
              <span class="form-title">ซอย </span>
              <v-text-field v-model="soi_reg" class="mt-1 textzone " outlined dense placeholder="ระบุซอย"
                style="font-size: 12px;">
              </v-text-field>
            </div>
            <div>
              <span class="form-title"> จังหวัด </span>
              <v-autocomplete :items="province_lists" item-text="name_th" item-value="name_th" @change="setAmphuresReg"
                v-model="province_reg" class="mt-1 textzone" outlined dense placeholder="เลือกจังหวัด"
                style="font-size: 12px;" :rules="[rules.required]" required>
              </v-autocomplete>
            </div>

            <div>
              <span class="form-title"> อำเภอ / เขต </span>
              <v-autocomplete :items="amphures_reg_lists" item-text="name_th" item-value="name_th" @change="setTambonsReg"
                v-model="amphures_reg" class="mt-1 textzone " placeholder="เลือกอำเภอ" outlined dense
                style="font-size: 12px;" :rules="[rules.required]" required>
              </v-autocomplete>
            </div>

            <div>
              <span class="form-title"> ตำบล / แขวง </span>
              <v-autocomplete :items="tambons_reg_lists" item-text="name_th" item-value="name_th" @change="setZipcodeReg"
                v-model="tambons_reg" class="mt-1 textzone " placeholder="เลือกตำบล" outlined dense style="font-size: 12px;"
                :rules="[rules.required]" required>
              </v-autocomplete>
            </div>

            <div>
              <span class="form-title"> รหัสไปรษณีย์ </span>
              <v-text-field v-model="zipcode_reg" class="mt-1 textzone" placeholder="ระบุรหัสไปรษณีย์" outlined dense
                style="font-size: 12px;" :rules="[rules.required]" required>
              </v-text-field>
            </div>
            <!-- <div>
                          <span class="form-title"> โทรศัพท์บ้าน </span>
                          <v-text-field v-model="home_phone_reg" class="mt-1 textzone" placeholder="ระบุโทรศัพท์บ้าน" outlined
                              dense style="font-size: 12px;">
                          </v-text-field>
                      </div>
                      <div>
                          <span class="form-title"> โทรสาร </span>
                          <v-text-field v-model="fax_reg" class="mt-1 textzone" placeholder="ระบุโทรสาร" outlined dense
                              style="font-size: 12px;">
                          </v-text-field>
                      </div> -->

            <div class="d-flex flex-row align-center">
              <v-icon color="#006AF1" class="mr-3">mdi-folder-home-outline</v-icon>
              <span class="font-weight-bold address-title">ข้อมูลที่อยู่ปัจจุบัน</span>
            </div>
            <v-divider class="mt-1"></v-divider>
            <br />
            <div>
              <span class="form-title"> บ้านเลขที่</span>
              <v-text-field v-model="no_now" class="mt-1 textzone " outlined dense placeholder="ระบุบ้านเลขที่"
                style="font-size: 12px;" :rules="[rules.required]" required>
              </v-text-field>
            </div>
            <div>
              <span class="form-title"> อาคาร</span>
              <v-text-field v-model="building_now" class="mt-1 textzone " outlined dense placeholder="ระบุบ้านอาคาร"
                style="font-size: 12px;">
              </v-text-field>
            </div>
            <div>
              <span class="form-title">หมู่</span>
              <v-text-field v-model="moo_now" class="mt-1 textzone " outlined dense placeholder="ระบุหมู่"
                style="font-size: 12px;">
              </v-text-field>
            </div>
            <div>
              <span class="form-title">ถนน</span>
              <v-text-field v-model="road_now" class="mt-1 textzone " outlined dense placeholder="ระบุถนน"
                style="font-size: 12px;">
              </v-text-field>
            </div>
            <div>
              <span class="form-title">ซอย </span>
              <v-text-field v-model="soi_now" class="mt-1 textzone " outlined dense placeholder="ระบุซอย"
                style="font-size: 12px;">
              </v-text-field>
            </div>
            <div>
              <span class="form-title"> จังหวัด </span>
              <v-autocomplete @change="setAmphuresNow" :items="province_lists" item-text="name_th" item-value="name_th"
                v-model="province_now" class="mt-1 textzone" outlined dense placeholder="เลือกจังหวัด"
                style="font-size: 12px;" :rules="[rules.required]" required>
              </v-autocomplete>
            </div>

            <div>
              <span class="form-title"> อำเภอ / เขต </span>
              <v-autocomplete @change="setTambonsNow" :items="amphures_now_lists" item-text="name_th" item-value="name_th"
                v-model="amphures_now" class="mt-1 textzone " placeholder="ระบุอำเภอ" outlined dense
                style="font-size: 12px;" :rules="[rules.required]" required>
              </v-autocomplete>
            </div>

            <div>
              <span class="form-title"> ตำบล / แขวง </span>
              <v-autocomplete @change="setZipcodeNow" :items="tambons_now_lists" item-text="name_th" item-value="name_th"
                v-model="tambons_now" class="mt-1 textzone " placeholder="ระบุตำบล" outlined dense style="font-size: 12px;"
                :rules="[rules.required]" required>
              </v-autocomplete>
            </div>

            <div>
              <span class="form-title"> รหัสไปรษณีย์ </span>
              <v-text-field v-model="zipcode_now" class="mt-1 textzone" placeholder="ระบุรหัสไปรษณีย์" outlined dense
                style="font-size: 12px;" :rules="[rules.required]" required>
              </v-text-field>
            </div>
            <!-- <div>
                          <span class="form-title"> โทรศัพท์บ้าน </span>
                          <v-text-field v-model="home_phone_now" class="mt-1 textzone" placeholder="ระบุโทรศัพท์บ้าน" outlined
                              dense style="font-size: 12px;">
                          </v-text-field>
                      </div>
                      <div>
                          <span class="form-title"> โทรสาร </span>
                          <v-text-field v-model="fax_now" class="mt-1 textzone" placeholder="ระบุโทรสาร" outlined dense
                              style="font-size: 12px;">
                          </v-text-field>
                      </div> -->

            <div class="d-flex flex-row align-center mt-3">
              <v-icon color="#006AF1" class="mr-3">mdi-home-account</v-icon>
              <span class="font-weight-bold address-title">ที่อยู่ที่ติดต่อได้</span>
            </div>
            <v-divider class="mt-1"></v-divider>
            <v-card flat class="mt-6">
              <v-radio-group v-model="address_active" column :rules="[rules.select]" required>
                <v-radio label="ที่อยู่ปัจจุบัน" :value="1"></v-radio>
                <!-- <v-radio label="ที่อยู่ที่ทำงาน" :value="2"></v-radio> -->
                <v-radio label="ที่อยู่ตามทะเบียนบ้าน" :value="3"></v-radio>
                <v-radio label="อื่นๆ" :value="4"></v-radio>
              </v-radio-group>
            </v-card>
            <v-card v-if="address_active === 4" elevation="0">
              <div>
                <span class="form-title"> บ้านเลขที่</span>
                <v-text-field v-model="no_con" class="mt-1 textzone " outlined dense placeholder="ระบุบ้านเลขที่"
                  style="font-size: 12px;" :rules="[rules.required]" required>
                </v-text-field>
              </div>
              <div>
                <span class="form-title"> อาคาร</span>
                <v-text-field v-model="building_con" class="mt-1 textzone " outlined dense placeholder="ระบุบ้านอาคาร"
                  style="font-size: 12px;">
                </v-text-field>
              </div>
              <div>
                <span class="form-title">หมู่</span>
                <v-text-field v-model="moo_con" class="mt-1 textzone " outlined dense placeholder="ระบุหมู่"
                  style="font-size: 12px;">
                </v-text-field>
              </div>
              <div>
                <span class="form-title">ถนน</span>
                <v-text-field v-model="road_con" class="mt-1 textzone " outlined dense placeholder="ระบุถนน"
                  style="font-size: 12px;">
                </v-text-field>
              </div>
              <div>
                <span class="form-title">ซอย </span>
                <v-text-field v-model="soi_con" class="mt-1 textzone " outlined dense placeholder="ระบุซอย"
                  style="font-size: 12px;">
                </v-text-field>
              </div>
              <div>
                <span class="form-title"> จังหวัด </span>
                <v-autocomplete v-model="province_con" :items="province_lists" item-text="name_th" item-value="name_th"
                  class="mt-1 textzone" @change="setAmphuresCon" outlined dense placeholder="เลือกจังหวัด"
                  style="font-size: 12px;" :rules="[rules.required]" required>
                </v-autocomplete>
              </div>

              <div>
                <span class="form-title"> อำเภอ / เขต </span>
                <v-autocomplete v-model="amphures_con" :items="amphures_con_lists" item-text="name_th" item-value="name_th"
                  class="mt-1 textzone " @change="setTambonsCon" placeholder="ระบุอำเภอ" outlined dense
                  style="font-size: 12px;" :rules="[rules.required]" required>
                </v-autocomplete>
              </div>

              <div>
                <span class="form-title"> ตำบล /แขวง </span>
                <v-autocomplete v-model="tambons_con" class="mt-1 textzone " :items="tambons_con_lists" item-text="name_th"
                  item-value="name_th" @change="setZipcodeCon" placeholder="ระบุตำบล" outlined dense
                  style="font-size: 12px;" :rules="[rules.required]" required>
                </v-autocomplete>
              </div>

              <div>
                <span class="form-title"> รหัสไปรษณีย์ </span>
                <v-text-field v-model="zipcode_con" class="mt-1 textzone" placeholder="ระบุรหัสไปรษณีย์" outlined dense
                  style="font-size: 12px;" :rules="[rules.required]" required>
                </v-text-field>
              </div>
              <!-- <div>
                              <span class="form-title"> โทรศัพท์บ้าน </span>
                              <v-text-field v-model="home_phone_con" class="mt-1 textzone" placeholder="ระบุโทรศัพท์บ้าน"
                                  outlined dense style="font-size: 12px;">
                              </v-text-field>
                          </div>
                          <div>
                              <span class="form-title"> โทรสาร </span>
                              <v-text-field v-model="fax_con" class="mt-1 textzone" placeholder="ระบุโทรสาร" outlined dense
                                  style="font-size: 12px;">
                              </v-text-field>
                          </div> -->
            </v-card>
            <div class="d-flex flex-row align-center mt-3">
              <v-icon color="#006AF1" class="mr-3">mdi-home-account</v-icon>
              <span class="font-weight-bold address-title">ที่อยู่จัดส่งเอกสาร</span>
            </div>
            <v-divider class="mt-1"></v-divider>
            <v-card flat class="mt-6">
              <v-radio-group v-model="address_send_doc" column :rules="[rules.select]" required>
                <v-radio label="ที่อยู่ปัจจุบัน" :value="1"></v-radio>
                <!-- <v-radio label="ที่อยู่ที่ทำงาน" :value="2"></v-radio> -->
                <v-radio label="ที่อยู่ตามทะเบียนบ้าน" :value="3"></v-radio>
                <v-radio label="อื่นๆ" :value="4"></v-radio>
              </v-radio-group>
            </v-card>

            <a v-if="address_send_doc === 4">
              <!-- <div class="d-flex flex-row align-center">
                          <v-icon color="#006AF1" class="mr-3">mdi-folder-home-outline</v-icon>
                          <span class="font-weight-bold address-title">ที่อยู่ส่งเอกสาร</span>
                      </div> -->
              <!-- <v-divider class="mt-1"></v-divider> -->
              <br />
              <div>
                <span class="form-title"> บ้านเลขที่</span>
                <v-text-field v-model="no_send_document" class="mt-1 textzone " outlined dense placeholder="ระบุบ้านเลขที่"
                  style="font-size: 12px;">
                </v-text-field>
              </div>
              <div>
                <span class="form-title"> อาคาร</span>
                <v-text-field v-model="building_send_document" class="mt-1 textzone " outlined dense
                  placeholder="ระบุบ้านเลขที่" style="font-size: 12px;">
                </v-text-field>
              </div>
              <div>
                <span class="form-title">หมู่</span>
                <v-text-field v-model="moo_send_document" class="mt-1 textzone " outlined dense placeholder="ระบุหมู่"
                  style="font-size: 12px;">
                </v-text-field>
              </div>
              <div>
                <span class="form-title">ถนน</span>
                <v-text-field v-model="road_send_document" class="mt-1 textzone " outlined dense placeholder="ระบุถนน"
                  style="font-size: 12px;">
                </v-text-field>
              </div>
              <div>
                <span class="form-title">ซอย </span>
                <v-text-field v-model="soi_send_document" class="mt-1 textzone " outlined dense placeholder="ระบุถนน"
                  style="font-size: 12px;">
                </v-text-field>
              </div>
              <div>
                <span class="form-title"> จังหวัด </span>
                <v-autocomplete v-model="province_send_document" @change="setAmphuresSend" :items="province_lists"
                  item-text="name_th" item-value="name_th" class="mt-1 textzone" outlined dense placeholder="เลือกจังหวัด"
                  style="font-size: 12px;">
                </v-autocomplete>
              </div>

              <div>
                <span class="form-title"> อำเภอ / เขต </span>
                <v-autocomplete v-model="amphures_send_document" @change="setTambonsSend" :items="amphures_send_lists"
                  item-text="name_th" item-value="name_th" class="mt-1 textzone " outlined dense style="font-size: 12px;">
                </v-autocomplete>
              </div>

              <div>
                <span class="form-title"> ตำบล / แขวง </span>
                <v-autocomplete v-model="tambons_send_document" @change="setZipcodeSend" :items="tambons_send_lists"
                  item-text="name_th" item-value="name_th" class="mt-1 textzone " outlined dense style="font-size: 12px;">
                </v-autocomplete>
              </div>

              <div>
                <span class="form-title"> รหัสไปรษณีย์ </span>
                <v-text-field v-model="zipcode_send_document" class="mt-1 textzone" outlined dense style="font-size: 12px;">
                </v-text-field>
              </div>
            </a>
          </v-card-text>
        </v-form>

        <v-card-text v-if="e1 === 4" class="primary-text">
          <div class="d-flex flex-row align-center">
            <v-icon color="#006AF1" class="mr-3">mdi-folder-account-outline</v-icon>
            <span class="font-weight-bold address-title">อัปโหลดเอกสาร</span>
          </div>
          <v-divider class="mt-1"></v-divider>
          <br />
          <v-card v-if="!file1"
            style="border-radius: 16px; border: 2px solid #E6E6E6; height: 75px;background-color: #E6E6E6;">
            <v-row no-gutters>
              <v-col cols="3" style="margin-top: 6%;margin-left: 5%;">
                <v-icon class="mr-3 mb-5" size="35">
                  mdi-file-document
                </v-icon>
              </v-col>
              <v-col cols="7" style="margin-top: 8%;">
                <div>สำเนาปริญญาบัตร</div>
              </v-col>
              <v-col @click="opendialogfile1()" cols="1" style="margin-top: 7%;">
                <v-icon class="" size="25" color="#4697FF">
                  mdi-plus-circle
                </v-icon>
              </v-col>
            </v-row>
          </v-card>
          <v-card v-if="file1"
            style="margin-top: 10px; border-radius: 16px; border: 2px solid #E6E6E6; height: 75px;background-color: white;">
            <v-row no-gutters>
              <v-col cols="2" style="margin-top: 6%;margin-left: 5%;">
                <v-icon class="mr-3 mb-5" size="35" color="#4697FF">
                  mdi-file-document
                </v-icon>
              </v-col>
              <v-col cols="8" style="margin-top: 5%;">
                <v-card style="background-color: #cce2ff; width: 80%; height: 40px; border-radius: 16px;">
                  <div class="pa-2" style="color:#006af1; text-align: center;;">{{ fileName1 }}</div>
                </v-card>
              </v-col>
              <v-col @click="opendialogfile1()" cols="1" style="margin-top: 7%;">
                <v-icon class="" size="25" color="#4697FF">
                  mdi-plus-circle
                </v-icon>
              </v-col>
            </v-row>
          </v-card>
          <v-card v-if="!file2"
            style="margin-top: 10px;border-radius: 16px; border: 2px solid #E6E6E6; height: 75px;background-color: #E6E6E6;">
            <v-row no-gutters>
              <v-col cols="3" style="margin-top: 6%;margin-left: 5%;">
                <v-icon class="mr-3 mb-5" size="35">
                  mdi-file-document
                </v-icon>
              </v-col>
              <v-col cols="7" style="margin-top: 8%;">
                <div>ใบรับรองแพทย์ฯ </div>
              </v-col>
              <v-col @click="opendialogfile2()" cols="1" style="margin-top: 7%;">
                <v-icon class="" size="25" color="#4697FF">
                  mdi-plus-circle
                </v-icon>
              </v-col>
            </v-row>
          </v-card>
          <v-card v-if="file2"
            style="margin-top: 10px;border-radius: 16px; border: 2px solid #E6E6E6; height: 75px;background-color: white;">
            <v-row no-gutters>
              <v-col cols="2" style="margin-top: 6%;margin-left: 5%;">
                <v-icon class="mr-3 mb-5" size="35" color="#4697FF">
                  mdi-file-document
                </v-icon>
              </v-col>
              <v-col cols="8" style="margin-top: 5%;">
                <v-card style="background-color: #cce2ff; width: 80%; height: 40px; border-radius: 16px;">
                  <div class="pa-2" style="color:#006af1; text-align: center;;">{{ fileName2 }}</div>
                </v-card>
              </v-col>
              <v-col @click="opendialogfile2()" cols="1" style="margin-top: 7%;">
                <v-icon class="" size="25" color="#4697FF">
                  mdi-plus-circle
                </v-icon>
              </v-col>
            </v-row>
          </v-card>
          <v-card v-if="!file3"
            style="margin-top: 10px;border-radius: 16px; border: 2px solid #E6E6E6; height: 75px;background-color: #E6E6E6;">
            <v-row no-gutters>
              <v-col cols="3" style="margin-top: 6%;margin-left: 5%;">
                <v-icon class="mr-3 mb-5" size="35">
                  mdi-file-document
                </v-icon>
              </v-col>
              <v-col cols="7" style="margin-top: 8%;">
                <div>เอกสารอื่นๆ</div>
              </v-col>
              <v-col @click="opendialogfile3()" cols="1" style="margin-top: 7%;">
                <v-icon class="" size="25" color="#4697FF">
                  mdi-plus-circle
                </v-icon>
              </v-col>
            </v-row>
          </v-card>
          <v-card v-if="file3"
            style="margin-top: 10px;border-radius: 16px; border: 2px solid #E6E6E6; height: 75px;background-color: white;">
            <v-row no-gutters>
              <v-col cols="2" style="margin-top: 6%;margin-left: 5%;">
                <v-icon class="mr-3 mb-5" size="35" color="#4697FF">
                  mdi-file-document
                </v-icon>
              </v-col>
              <v-col cols="8" style="margin-top: 5%;">
                <v-card style="background-color: #cce2ff; width: 80%; height: 40px; border-radius: 16px;">
                <div class="pa-2" style="color:#006af1; text-align: center;;">{{ fileName3 }}</div>
                </v-card>
              </v-col>
              <v-col @click="opendialogfile3()" cols="1" style="margin-top: 7%;">
                <v-icon class="" size="25" color="#4697FF">
                  mdi-plus-circle
                </v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
        <v-card-text v-if="e1 === 5" class="primary-text">
          <div style="font-size: 16px;line-height: 120%;text-align: center;color:black">
            <span style="color:red">**</span> กรุณานำส่งหลักฐานตัวจริงเพื่อประกอบ <span
              style="color:red">**</span><br />การพิจารณาการสมัครสมาชิก
          </div>
          <v-card class="pa-5 mt-3" elevation="0"
            style="background: #FFFFFF;border: 1px solid #E6E6E6;border-radius: 14px;">
            <div class="text-send">1. ใบรับรองวุฒิที่สภามหาวิทยาลัยอนุมัติฉบับจริงหรือสำเนาปริญญาบัตร</div>
            <br/>
            <div class="text-send">2. ใบรับรองแพทย์ (ใช้ฟอร์มของแพทยสภา) ที่ขอไม่เกิน 30 วัน</div>
            <br/>
            <div class="text-send">3. เอกสารอื่นๆ (ถ้ามี)</div>
          </v-card>
          <div class="mt-3" style="font-weight: 400;font-size: 13px;color:#006AF1"> <v-icon
              style="color: #006AF1;">mdi-alert-circle-outline</v-icon> กรุณาส่งทางไปรษณีย์ลงทะเบียน หรือ EMS
            วงเล็บมุมซองว่า
            “สมัครสมาชิกสภาฯ”</div>
            <div style="font-weight: 400;font-size: 13px;color:#006AF1">ส่งมาที่ “สภาเทคนิคการแพทย์ บ้านเลขที่ 88/19 หมู่ที่ 4 ชั้น 6 อาคารมหิตลาธิเบศร ปากซอยสาธารณสุข 8 กระทรวงสาธารณสุข ถนนติวานนท์ ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี 11000”</div>
            <div style="color: red; font-weight: 600;margin-top: 5px;">** กรุณาเปิดแจ้งเตือนเเอพ OnePlatform เพื่อรับการแจ้งเตือนในการตรวจสอบสถานะเอกสาร **</div>
        </v-card-text>
        <v-card-text v-if="e1 === 6" class="primary-text">
          <v-img class="center" style=" width: 112px;height: 112px;" src="@/assets/img/checked 1.png"></v-img>
          <br />
          <div style="text-align: center;font-weight: 700;font-size: 25px;color:#006AF1 ;">ส่งข้อมูลสำเร็จ</div>
          <br /><br />
          <!-- <div style="text-align: center;font-weight: 700;font-size: 16px;color: black;">คุณได้ดำเนินการส่งข้อมูลเพื่อสมาชิกและขึ้น<br/>ทะเบียนผู้ประกอบวิชาชีพเรียบร้อยแล้ว</div> -->
          <div style="text-align: center;font-weight: 700;font-size: 16px;color: black;" class="mt-2">
            เจ้าหน้าที่จะทำการตรวจสอบข้อมูลและแจ้งผลภายหลัง</div>
          <br /><br /><br /><br />
          <div style="text-align: center;font-weight: 700;font-size: 14px;">
            กรุณานำส่งหลักฐานตัวจริงเพื่อประกอบการพิจารณา</div>
          <div style="text-align: center;font-weight: 400;font-size: 14px;color: #006AF1; text-decoration: underline;"
            class="mt-2" @click="opendialogDetail()">รายละเอียดการส่งหลักฐานตัวจริงเพื่อประกอบการพิจารณา</div>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="e1 < 5" @click="nextpage()" dark="" color="#006af1" block class="textzone">
            <span>ถัดไป</span>
          </v-btn>
          <v-btn v-if="e1 === 5" @click="opendialogAsk()" dark="" color="#006af1" block class="textzone">
            <span>รับทราบ</span>
          </v-btn>
          <v-btn v-if="e1 === 6" @click="goHome()" dark="" color="#006af1" block class="textzone">
            <span>ตกลง</span>
          </v-btn>
        </v-card-actions>
      </v-card>
      <div class="text-center">
        <v-dialog v-model="dialogAsk" fullscreen hide-overlay>
          <v-card>
            <v-card-title style="text-align: end; padding: 5px 0px 5px">
              <v-row no-gutters justify="end">
                <v-col col="1" sm="1" mb="1" lg="1">
                  <v-btn icon color="white">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text style="text-align: center;margin-top: 10%;">
              <span
                style="font-family: Sarabun;font-size: 16px;color: black;text-align: center;font-weight: 800;">คุณต้องการขึ้นทะเบียนผู้ประกอบวิชาชีพ<br />หรือไม่</span>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col cols="12" style="text-align: center" class="pa-5">
                  <v-img src="@/assets/img/Frame.png"></v-img>
                  <!-- <div>คะเเนนสะสมทั้งหมด</div> -->
                </v-col>
              </v-row>
              <v-row class="justify-center text-center">
                <v-col cols="12" class="btn">
                  <v-btn class="mr-3 textzone" style="  width: 100%; height:48px" outlined color="primary"
                    @click="gopage5()">
                    ไม่ต้องการ
                  </v-btn>
                </v-col>
                <v-col cols="12" class="btn">
                  <v-btn class="mr-3 textzone" style="background-color:#006AF1;color:white; width: 100%; height:48px"
                    outlined @click="goRegislic()">
                    ต้องการ
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <div class="text-center">
        <v-dialog v-model="dialogAsk2" max-width="500" height="400" persistent>
          <v-card>
            <v-card-title style="text-align: end; padding: 5px 0px 5px">
              <v-row no-gutters justify="end">
                <v-col col="1" sm="1" mb="1" lg="1">
                  <v-btn icon color="white">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text style="text-align: center;">
              <span
                style="font-family: Sarabun;font-size: 16px;color: black;text-align: center;font-weight: 800;">คุณยืนยันในการขึ้นทะเบียนต่อใช่หรือไม่
                ?</span>
            </v-card-text>
            <v-card-text>
              <v-row class="justify-center text-center">
                <v-col cols="12" class="btn">
                  <v-btn class="mr-3 textzone" style="  width: 90%; height:40px" outlined color="primary"
                    @click="closedialogAsk2()">
                    ย้อนกลับ
                  </v-btn>
                </v-col>
                <v-col cols="12" class="btn">
                  <v-btn class="mr-3 textzone" style="background-color:#006AF1;color:white; width: 90%; height:40px"
                    outlined @click="goRegislicReal()">
                    ยืนยัน
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <v-container class="text-center">
        <v-dialog v-model="dialogAdvice" max-width="500" height="400" persistent>
          <v-card outlined class="card-form mx-3 mb-3 py-5">
            <v-card-text class="primary-text">
              <v-row justify="end">
                <div>
                  <v-col col="1" sm="1" mb="1" lg="1">
                    <v-btn icon color="#006AF1" @click="closedialogAdvice()">
                      <v-icon> mdi-close </v-icon>
                    </v-btn>
                  </v-col>
                </div>
              </v-row>
              <v-row no-gutters justify="start" class="mt-2" style="font-size: 12px;">
                <div class="">1. สวมเสื้อสุภาพมีแขน เช่น ชุดข้าราชการปกติขาว หรือชุดสีกากี
                  เสื้อกาวน์สั้นตราสภาเทคนิคการแพทย์ ชุดสูทสุภาพ เสื้อคอไม่ลึก ไม่กว้างเกินไป ไม่เปิดไหล่
                  ไม่ใส่เสื้อยืด ไม่สวมครุยที่ไม่ใช่วุฒิทาง เทคนิคการแพทย์</div>
                <div>2. ภาพถ่ายหน้าตรง ครึ่งตัวท่าปกติ เห็นหน้าชัดเจน ไม่ใส่แว่นตาดำ ไม่ยิ้มเห็นฟัน
                  ถ่ายไว้ไม่เกิน 6 เดือน ภาพถ่ายที่ควรถ่ายจากร้าน ถ่ายภาพ ขนาด 1นิ้ว
                  พิมพ์ลงบนกระดาษสำหรับภาพถ่ายเท่านั้น</div>
                <div>3. ขนาด 1 นิ้ว หรือ 2.5 x 3 เซ็นติเมตร อนุโลมได้ให้ไม่เกิน 2 นิ้ว
                  ไม่รับรูปถ่ายที่เห็นแต่หน้าเต็มใบแบบถ่ายขอวีซ่า</div>
                <div>4. งดใช้ภาพถ่ายที่มีการตกแต่งหรือแสกนจากคอมพิวเตอร์ ไม่รับภาพถ่ายท่ายืนที่ตัดเหลือครึ่งตัว
                  เห็นหน้าไม่ชัด ถ่าย และพิมพ์เองด้วยกระดาษไม่ดี สีจะซีดและไม่คงทนนาน 5 ปี ลอกหลุดได้</div>
                <div>5. ภาพถ่ายจำนวน 4 ภาพที่นอกเหนือจากติดคำขอ ไม่ควรเขียนชื่อ ด้านหลังด้วยหมึก จะทำให้เปื้อน
                  ให้ใช้ดินสอแทน การบรรจุให้ใส่ ซองพลาสติก หรือห่อกระดาษ แทนการเย็บด้วยลวดกระดาษหรือ คลิปเหล็ก
                  จะได้ไม่มีรู หรือรอยคลิป บนรูป</div>
                <div class="head-text mt-5">ตัวอย่างรูปถ่ายที่ดี และถูกต้อง</div>
              </v-row>
              <div class="mt-5">
                <v-img src="@/assets/img/mobile/example.png" class="img-ex"></v-img>
              </div>

            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
      <v-container class="text-center">
        <v-dialog v-model="dialogDetail" max-width="500" height="400" persistent>
          <v-card outlined class="card-form mx-3 mb-3 py-5">
            <v-card-text class="primary-text">
              <v-row justify="end">
                <div>
                  <v-col col="1" sm="1" mb="1" lg="1">
                    <v-btn icon color="#006AF1" @click="closedialogDetail()">
                      <v-icon> mdi-close </v-icon>
                    </v-btn>
                  </v-col>
                </div>
              </v-row>
              <div style="font-size: 16px;line-height: 120%;text-align: center;color:black">
                <span style="color:red">**</span> กรุณานำส่งหลักฐานตัวจริงเพื่อประกอบ <span
                  style="color:red">**</span><br />การพิจารณาการสมัครสมาชิก
              </div>
              <v-row no-gutters justify="start" class="mt-2" style="font-size: 12px;">
                <div class="">1. สำเนาหลักฐานแสดงวุฒิในวิชาชีพเทคนิคการแพทย์</div>
                <div>2. ใบรับรองแพทย์</div>
                <div class="">3. เอกสารอื่นๆ (ถ้ามี)</div>
                <div class="mt-3" style="font-weight: 400;font-size: 13px;color:#006AF1">กรุณาส่งทางไปรษณีย์ลงทะเบียน หรือ EMSวงเล็บมุมซองว่า
                  “สมัครสมาชิกสภาฯ”</div>
                <div style="font-weight: 400;font-size: 13px;color:#006AF1">ส่งมาที่ “สํานักงานสภาเทคนิคการแพทย์ ชั้น 2
                  ตึกกองวิศวกรรมการแพทย์ ถนนสาธารณสุข 8 กระทรวงสาธารณสุข
                  ถนนติวานนท์ ตําบลตลาดขวัญ อําเภอเมือง จังหวัดนนทบุรี 11000</div>
                </v-row>

            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
      <div class="text-center">
        <v-dialog v-model="dialogfile1" max-width="500" height="400" persistent>
          <v-card>
            <v-card-title style="text-align: end; padding: 5px 0px 5px">
              <v-row no-gutters justify="end">
                <v-col col="1" sm="1" mb="1" lg="1">
                  <v-btn icon color="#006AF1" @click="closedialogfile1()" v-if="file1">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                  <v-btn icon color="#006AF1" @click="closedialogfile1()" v-if="!file1">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text style="text-align: center">
              <span style="
                font-family: Sarabun;
                font-size: 16px;
                color: #006AF1;
                text-align: center;
                font-weight: 800;
              ">อัปโหลดเอกสาร</span>
            </v-card-text>
            <v-card-text>
              <v-row class="">
                <v-col cols="12" style="text-align: center">
                  <p class="text">
                    <span style="color: #333333; text-align: center; font-size: 13px">
                      อัปโหลดเอกสาร
                    </span>
                  </p>
                </v-col>
              </v-row>
              <v-row class="justify-center text-center">
                <v-col cols="12" v-if="file1">
                  <div class="mt-1 pt-1"
                    style="width: 90%; height: 38px; background-color: #cce2ff; border-radius: 16px; margin: 10px auto;">
                    <span style="font-size: 14px; color: #006af1;">
                      <!-- {{ file1.name }} -->
                      {{ fileName1 }}
                    </span>
                    <v-avatar class="mx-1 mb-2" size="24" color="#4697FF" v-if="file1">
                      <v-btn @click.stop="openCFDialog1()" color="#4697FF">
                        <v-icon color="white"> mdi-close </v-icon>
                      </v-btn>
                    </v-avatar>
                  </div>
                </v-col>
                <v-col cols="12" class="btn">
                  <input ref="file1" type="file" accept="application/pdf" hidden @change="onFilePickedfile1" />
                  <v-btn v-if="!file1" class="mr-3 textzone" dark color="primary" @click="onPickFilefile1">
                    เลือกเอกสาร
                  </v-btn>
                  <v-btn v-if="file1" class="mr-3 textzone" dark color="primary" @click.stop="closedialogfile1()">
                    ยืนยัน
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <div class="text-center">
        <v-dialog v-model="dialogfile2" max-width="500" height="400" persistent>
          <v-card>
            <v-card-title style="text-align: end; padding: 5px 0px 5px">
              <v-row no-gutters justify="end">
                <v-col col="1" sm="1" mb="1" lg="1">
                  <v-btn icon color="#006AF1" @click="closedialogfile2()" v-if="file1">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                  <v-btn icon color="#006AF1" @click="closedialogfile2()" v-if="!file1">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text style="text-align: center">
              <span style="
                font-family: Sarabun;
                font-size: 16px;
                color: #006AF1;
                text-align: center;
                font-weight: 800;
              ">อัปโหลดเอกสาร</span>
            </v-card-text>
            <v-card-text>
              <v-row class="">
                <v-col cols="12" style="text-align: center">
                  <p class="text">
                    <span style="color: #333333; text-align: center; font-size: 13px">
                      อัปโหลดเอกสาร
                    </span>
                  </p>
                </v-col>
              </v-row>
              <v-row class="justify-center text-center">
                <v-col cols="12" v-if="file2">
                  <div class="mt-1 pt-1"
                    style="width: 90%; height: 38px; background-color: #cce2ff; border-radius: 16px; margin: 10px auto;">
                    <span style="font-size: 14px; color: #006af1;">
                      <!-- {{ file2.name }} -->
                      {{ fileName2 }}
                    </span>
                    <v-avatar class="mx-1 mb-2" size="24" color="#4697FF" v-if="file2">
                      <v-btn @click.stop="openCFDialog2()" color="#4697FF">
                        <v-icon color="white"> mdi-close </v-icon>
                      </v-btn>
                    </v-avatar>
                  </div>
                </v-col>
                <v-col cols="12" class="btn">
                  <input ref="file2" type="file" accept="application/pdf" hidden @change="onFilePickedfile2" />
                  <v-btn v-if="!file2" class="mr-3 textzone" dark color="primary" @click="onPickFilefile2">
                    เลือกเอกสาร
                  </v-btn>
                  <v-btn v-if="file2" class="mr-3 textzone" dark color="primary" @click.stop="closedialogfile2()">
                    ยืนยัน
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <div class="text-center">
        <v-dialog v-model="dialogfile3" max-width="500" height="400" persistent>
          <v-card>
            <v-card-title style="text-align: end; padding: 5px 0px 5px">
              <v-row no-gutters justify="end">
                <v-col col="1" sm="1" mb="1" lg="1">
                  <v-btn icon color="#006AF1" @click="closedialogfile3()" v-if="file1">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                  <v-btn icon color="#006AF1" @click="closedialogfile3()" v-if="!file1">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text style="text-align: center">
              <span style="
                font-family: Sarabun;
                font-size: 16px;
                color: #006AF1;
                text-align: center;
                font-weight: 800;
              ">อัปโหลดเอกสาร</span>
            </v-card-text>
            <v-card-text>
              <v-row class="">
                <v-col cols="12" style="text-align: center">
                  <p class="text">
                    <span style="color: #333333; text-align: center; font-size: 13px">
                      อัปโหลดเอกสาร
                    </span>
                  </p>
                </v-col>
              </v-row>
              <v-row class="justify-center text-center">
                <v-col cols="12" v-if="file3">
                  <div class="mt-1 pt-1"
                    style="width: 90%; height: 38px; background-color: #cce2ff; border-radius: 16px; margin: 10px auto;">
                    <span style="font-size: 14px; color: #006af1;">
                      <!-- {{ file3.name }} -->
                      {{ fileName3  }}
                    </span>
                    <v-avatar class="mx-1 mb-2" size="24" color="#4697FF" v-if="file3">
                      <v-btn @click.stop="openCFDialog3()" color="#4697FF">
                        <v-icon color="white"> mdi-close </v-icon>
                      </v-btn>
                    </v-avatar>
                  </div>
                </v-col>
                <v-col cols="12" class="btn">
                  <input ref="file3" type="file" accept="application/pdf" hidden @change="onFilePickedfile3" />
                  <v-btn v-if="!file3" class="mr-3 textzone" dark color="primary" @click="onPickFilefile3">
                    เลือกเอกสาร
                  </v-btn>
                  <v-btn v-if="file3" class="mr-3 textzone" dark color="primary" @click.stop="closedialogfile3()">
                    ยืนยัน
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </template>
<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
import moment from 'moment'
export default {
  data: () => ({

    loading: false,

    form_id: '',

    degreesitem: ['วท.บ. (เทคนิคการแพทย์)',
      'เทคนิคการแพทย์บัณฑิต'],

    degreeitem: ['มหาวิทยาลัยวลัยลักษณ์',
      'มหาวิทยาลัยเชียงใหม่',
      'มหาวิทยาลัยขอนแก่น',
      'มหาวิทยาลัยรังสิต',
      'มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา',
      'มหาวิทยาลัยนเรศวร',
      'มหาวิทยาลัยเวสเทิร์น กาญจนบุรี',
      'มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ',
      'มหาวิทยาลัยบูรพา',
      'มหาวิทยาลัยสงขลานครินทร์',
      'มหาวิทยาลัยพะเยา',
      'วิทยาลัยนครราชสีมา',
      'มหาวิทยาลัยปทุมธานี',
      'มหาวิทยาลัยวลัยลักษณ์ ',
      'มหาวิทยาลัยมหิดล',
      'มหาวิทยาลัยธรรมศาสตร์',
      //   'จุฬาลงกรณ์มหาวิทยาลัย',
      'จุฬาลงกรณ์มหาวิทยาลัย'],

    rules: {
      required: (value) => !!value || 'กรุณากรอกข้อมูล.',
      email: (v) => !!(v || '').match(/@/) || 'อีเมล',
      thaiOnly: (value) => /^([ก-๙])+$/.test(value) || 'กรุณากรอกเป็นภาษาไทยเท่านั้น',
      numberOnly: (value) => /^([0-9, ','])+$/.test(value) || 'กรุณากรอกเป็นตัวเลขเท่านั้น',
      required_eng: (v) => /^([a-zA-Z])+$/.test(v) || '* กรุณากรอกข้อมูลเป็นภาษาอังกฤษ',
      select: value => !!value || 'กรุณาเลือกข้อมูล'
    },
    e1: 1,
    imageUrl: '',
    dialogAsk: false,
    dialogAdvice: false,

    dialogAsk2: false,
    address_active: 0,

    fileName1: '',
    fileName2: '',
    fileName3: '',

    datareg: '',
    check_licesen: '',

    menudate: '',

    itemsPrefixTH: ['นาย', 'นาง', 'นางสาว'],
    itemsPrefixEN: ['Mr.', 'Miss', 'Mrs.'],

    acc: '',
    a: 'ชาย',
    b: 'หญิง',

    dialogfile1: false,
    dialogfile2: false,
    dialogfile3: false,

    file1: '',
    file2: '',
    file3: '',
    file_profile: '',

    prefixTH: '',
    nameTH: '',
    lastnameTH: '',
    prefixEN: '',
    nameEN: '',
    lastnameEN: '',
    gender: '',
    idcard: '',
    passsport: '',
    birth: '',
    birthmenu: '',
    age: '',
    religion: '',
    nationality: '',
    ethnicity: '',
    telmobile: '',
    email: '',

    min_brith: moment(new Date()).add(-19, 'y').format('YYYY-MM-DD'),

    amphures_send_lists: [],
    tambons_send_lists: [],

    no_send_document: '',
    province_send_document: '',
    amphures_send_document: '',
    tambons_send_document: '',
    zipcode_send_document: '',
    home_phone_send_document: '',
    fax_send_document: '',
    moo_send_document: '',
    soi_send_document: '',
    road_send_document: '',
    building_send_document: '',
    send_documents_address: '',

    address_send_doc: '',

    degree: '',
    university: '',
    country: '',
    graduate: '',

    no_reg: '',
    moo_reg: '',
    soi_reg: '',
    road_reg: '',
    province_reg: '',
    amphures_reg: '',
    tambons_reg: '',
    zipcode_reg: '',
    home_phone_reg: '',
    fax_reg: '',
    building_reg: '',

    no_now: '',
    moo_now: '',
    road_now: '',
    soi_now: '',
    province_now: '',
    amphures_now: '',
    tambons_now: '',
    zipcode_now: '',
    home_phone_now: '',
    fax_now: '',
    building_now: '',

    no_con: '',
    moo_con: '',
    soi_con: '',
    road_con: '',
    province_con: '',
    amphures_con: '',
    tambons_con: '',
    zipcode_con: '',
    home_phone_con: '',
    fax_con: '',
    building_con: '',

    no_work: '',
    moo_work: '',
    soi_work: '',
    province_work: '',
    amphures_work: '',
    tambons_work: '',
    zipcode_work: '',
    home_phone_work: '',
    fax_work: '',
    building_work: '',

    type_address: '',

    province_lists: [],

    dialogDetail: false,

    amphures_work_lists: [],
    tambons_work_lists: [],

    amphures_con_lists: [],
    tambons_con_lists: [],

    amphures_now_lists: [],
    tambons_now_lists: [],

    amphures_reg_lists: [],
    tambons_reg_lists: []

  }),
  async created () {
    this.acc = this.$route.params.account
    await this.getData()
    await this.getProvince()
    this.notiPic()
  },
  computed: {
    thDateFormat () {
      return this.birth ? moment(this.birth).add(543, 'year').format('DD-MM-YYYY') : ''
    },
    thDateFormatEDU () {
      return this.graduate ? moment(this.graduate).add(543, 'year').format('DD-MM-YYYY') : ''
    }
  },
  methods: {
    ...mapActions(['SetITEMFORMSTATUS']),
    goBefore () {
      this.e1--
    },
    async notiAddress () {
      const lines = ['กรุณาเปิดแจ้งเตือนเเอพ OnePlatform เพื่อรับการแจ้งเตือนในการตรวจสอบสถานะเอกสาร']
      await Swal.fire({
        icon: 'warning',
        title: 'เเจ้งเตือน',
        // html: lines.join('<br>'),
        html: lines,
        showConfirmButton: true
        // timer: 2000
      })
    },
    async notiPic () {
      const lines = ['รูปภาพที่อัปโหลดใช้สำหรับการสมาชิกและขึ้นทะเบียนใบอนุญาต']
      await Swal.fire({
        icon: 'warning',
        title: 'เเจ้งเตือน',
        // html: lines.join('<br>'),
        html: lines,
        showConfirmButton: true
        // timer: 2000
      })
    },
    calAge () {
      console.log('1')
      console.log('this.birth', this.birth)
      var a = moment(this.birth).year()
      this.age = moment().year() - a
      console.log('this.age', this.age)
    },
    async getData () {
      const res = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/user/getnewmembers/${this.acc}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('getdata', res.data.results)
      this.prefixTH = res.data.results.prefix
      this.nameTH = res.data.results.firstnameTH
      this.lastnameTH = res.data.results.lastnameTH
      this.email = res.data.results.email
      this.idcard = res.data.results.idcardnumber
      this.telmobile = res.data.results.telephone_number
      this.comparePrefix()
    },
    comparePrefix () {
      if (this.prefixTH === 'นาย') {
        this.prefixEN = 'Mr.'
      } else if (this.prefixTH === 'นางสาว') {
        this.prefixEN = 'Miss'
      } else if (this.prefixTH === 'นาง') {
        this.prefixEN = 'Mrs.'
      }
    },
    async updateFile () {
      var formData = new FormData()
      formData.append('file_technicalcertificate', this.file1)
      formData.append('file_certmedtech', this.file2)
      formData.append('file_other', this.file3)
      //   formData.append('file_profile', this.file_profile)

      //   console.log(`${process.env.VUE_APP_API_URL}/api/user/uploadfilemedtech?member_id=${this.acc}`)

      const res = await this.axios({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_URL}/api/user/uploadfilemedtech?member_id=${this.acc}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.log(err)
        })

      console.log(res)
    },
    async updatepic () {
      var formData = new FormData()
      formData.append('file_profile', this.file_profile)
      const res = await this.axios({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_URL}/api/user/uploadprofilenewmember?member_id=${this.acc}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('update pic', res.data)
    },
    async Restatus () {
      var send = {
        formregis_id: ''
      }
      const res = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/license_register/CancelRejectFormRegisBYFormRegisId`,
        data: send,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('restatus', res.data)
    },
    async createform (item) {
      var send = {
        member_id: this.acc,
        type_price: item
      }
      const res = await this.axios({
        method: 'post',
        url: `${process.env.VUE_APP_API_URL}/api/license_register/createLicense_Register`,
        data: send,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('createform', res.data)
      this.form_id = res.data.form_id
    },
    async updateregis (item) {
      this.loading = true
      await this.updatepic()
      await this.updateFile()

      if (this.address_active === 1) {
        this.no_con = this.no_now
        this.province_con = this.province_now
        this.amphures_con = this.amphures_now
        this.tambons_con = this.tambons_now
        this.zipcode_con = this.zipcode_now
        this.home_phone_con = this.home_phone_now
        this.building_con = this.building_now
        this.fax_con = this.fax_now
        this.moo_con = this.moo_now
        this.soi_con = this.soi_now
        this.road_con = this.road_now
      } else if (this.address_active === 3) {
        this.no_con = this.no_reg
        this.province_con = this.province_reg
        this.amphures_con = this.amphures_reg
        this.tambons_con = this.tambons_reg
        this.zipcode_con = this.zipcode_reg
        this.home_phone_con = this.home_phone_reg
        this.building_con = this.building_reg
        this.fax_con = this.fax_reg
        this.moo_con = this.moo_reg
        this.soi_con = this.soi_reg
        this.road_con = this.road_reg
      }

      if (this.address_send_doc === 1) {
        this.no_send_document = this.no_now
        this.province_send_document = this.province_now
        this.amphures_send_document = this.amphures_now
        this.tambons_send_document = this.tambons_now
        this.zipcode_send_document = this.zipcode_now
        this.home_phone_send_document = this.home_phone_now
        this.building_send_document = this.building_now
        this.fax_send_document = this.fax_now
        this.moo_send_document = this.moo_now
        this.soi_send_document = this.soi_now
        this.road_send_document = this.road_now
      } else if (this.address_send_doc === 3) {
        this.no_send_document = this.no_reg
        this.province_send_document = this.province_reg
        this.amphures_send_document = this.amphures_reg
        this.tambons_send_document = this.tambons_reg
        this.zipcode_send_document = this.zipcode_reg
        this.home_phone_send_document = this.home_phone_reg
        this.building_send_document = this.building_reg
        this.fax_send_document = this.fax_reg
        this.moo_send_document = this.moo_reg
        this.soi_send_document = this.soi_reg
        this.road_send_document = this.road_reg
      }

      var send = {
        profile: {
          member_id: this.acc,
          prefix: this.prefixTH,
          firstnameTH: this.nameTH,
          lastnameTH: this.lastnameTH,
          prefixEN: this.prefixEN,
          firstnameEN: this.nameEN,
          lastnameEN: this.lastnameEN,
          idcardnumber: this.idcard,
          passsport: this.passsport,
          birthday: this.birth,
          age: this.age.toString(),
          religion: this.religion,
          nationality: this.nationality,
          ethnicity: this.ethnicity,
          telephone_number: this.telmobile,
          email: this.email,
          gender: this.gender
        },
        education: {
          degree: this.degree,
          educational_name: this.university,
          graduat_date: this.graduate,
          country: this.country
        },
        address_now: {
          no_now: this.no_now,
          province_now: this.province_now,
          amphures_now: this.amphures_now,
          tambons_now: this.tambons_now,
          zipcode_now: this.zipcode_now,
          home_phone_now: this.home_phone_now,
          fax_now: this.fax_now,
          moo_now: this.moo_now,
          soi_now: this.soi_now,
          building_now: this.building_now,
          road_now: this.road_now
        },
        address_contact: {
          no_contact: this.no_con,
          province_contact: this.province_con,
          amphures_contact: this.amphures_con,
          tambons_contact: this.tambons_con,
          zipcode_contact: this.zipcode_con,
          home_phone_contact: this.home_phone_con,
          building_contact: this.building_con,
          fax_contact: this.fax_con,
          moo_contact: this.moo_con,
          soi_contact: this.soi_con,
          road_contact: this.road_con,
          contact_address: this.address_active
        },
        address_regis: {
          no_regis: this.no_reg,
          province_regis: this.province_reg,
          amphures_regis: this.amphures_reg,
          tambons_regis: this.tambons_reg,
          zipcode_regis: this.zipcode_reg,
          home_phone_regis: this.home_phone_reg,
          fax_regis: this.fax_reg,
          moo_regis: this.moo_reg,
          soi_regis: this.soi_reg,
          building_regis: this.building_reg,
          road_regis: this.road_reg
        },
        address_send_document: {
          no_send_document: this.no_send_document,
          province_send_document: this.province_send_document,
          amphures_send_document: this.amphures_send_document,
          tambons_send_document: this.tambons_send_document,
          zipcode_send_document: this.zipcode_send_document,
          home_phone_send_document: this.home_phone_send_document,
          fax_send_document: this.fax_send_document,
          moo_send_document: this.moo_send_document,
          soi_send_document: this.soi_send_document,
          road_send_document: this.road_send_document,
          building_send_document: this.building_send_document,
          send_documents_address: this.address_send_doc
        },
        // type_address: this.address_active,
        work: {
          no_work: '',
          province_work: '',
          amphures_work: '',
          tambons_work: '',
          zipcode_work: '',
          responsible_work_phone: '',
          fax_work: '',
          moo_work: '',
          soi_work: '',
          building_work: '',
          road_work: ''
        }
      }

      console.log('send', send)
      const res = await this.axios({
        method: 'POST',
        data: send,
        url: `${process.env.VUE_APP_API_URL}/api/user/updateNewMembers`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (response) => {
          try {
            await this.createform(item)
          } catch (err) {
            console.log(err)
          }
          return response
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('updateNewMembers', res.data)
      this.loading = false
    },
    async GetRegister () {
      const res = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/user/GetRegister?member_id=${this.acc}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.log(err)
        })
      if (res.status === 200) {
        if (res.data.data_total > 0) {
          this.check_licesen = true
          this.datareg = res.data.results[0]
          console.log('datareg', this.datareg)
        } else this.check_licesen = false
      }
    },
    opendialogfile1 () {
      this.dialogfile1 = true
    },
    opendialogfile2 () {
      this.dialogfile2 = true
    },
    opendialogfile3 () {
      this.dialogfile3 = true
    },
    closeDialogScore2 () {

    },
    closedialogfile1 () {
      this.dialogfile1 = false
    },
    closedialogfile2 () {
      this.dialogfile2 = false
    },
    closedialogfile3 () {
      this.dialogfile3 = false
    },
    openCFDialog2 () {
      this.file2 = ''
      this.$refs.file2.value = null
    },
    openCFDialog3 () {
      this.file3 = ''
      this.$refs.file3.value = null
    },
    openCFDialog1 () {
      this.file1 = ''
      this.$refs.file1.value = null
    },
    onPickFilePic () {
      this.$refs.fileInput.click()
    },
    async onFilePickedPic (event) {
      const files = event.target.files
      console.log('file', files[0])
      //   this.file_profile = files[0]
      //   console.log('final file pic', this.file)

      var safe = this

      if (files[0].size > 3000000) {
        Swal.fire({
          icon: 'warning',
          title: 'ไฟล์รูปภาพมีขนาดใหญ่เกินไป',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        if (files[0].type.match('jpeg.*') || files[0].type.match('png.*')) {
          var reader = new FileReader()
          reader.readAsDataURL(files[0])

          safe.file_profile = files[0]
          console.log('file_profile', safe.file_profile)

          reader.onload = function () {
            safe.imageUrl = reader.result
            // console.log('imageUrl', safe.imageUrl)
            safe.file_name = files[0].name
            safe.profile_picture = {
              file_name: files[0].name,
              file: reader.result,
              type: 'Profile Picture'
            }
            // console.log('profile_picture', safe.profile_picture)
          }
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'กรุณาเลือกไฟล์ .jpg, .jpej หรือ .png',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    },
    onPickFilefile1 () {
      this.$refs.file1.click()
    },
    onPickFilefile2 () {
      this.$refs.file2.click()
    },
    onPickFilefile3 () {
      this.$refs.file3.click()
    },
    async onFilePickedfile1 (event) {
      const files = event.target.files
      this.file1 = files[0]

      console.log(files[0].name.length)

      console.log('file1', this.file1)

      if (files[0].name.length > 14) {
        this.fileName1 = files[0].name.slice(0, 13) + '...'
      }
    },
    async onFilePickedfile2 (event) {
      const files = event.target.files
      this.file2 = files[0]

      console.log('file2', this.file2)

      if (files[0].name.length > 14) {
        this.fileName2 = files[0].name.slice(0, 13) + '...'
      }
    },
    async onFilePickedfile3 (event) {
      const files = event.target.files
      this.file3 = files[0]

      if (files[0].name.length > 14) {
        this.fileName3 = files[0].name.slice(0, 13) + '...'
      }

      console.log('file3', this.file3)
    },
    insertMember () {

    },
    async getPic () {
      const res = await this.axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_URL}/api/user/GetfilesNewMember?regis_member=${this.$route.params.id}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.log(err)
        })
      console.log('getPic ->', res.data)
      //   this.imageUrl = 'data:image/png;base64,' + res.data.results.file_profile
    },
    async opendialogAsk () {
      this.dialogAsk = true
    },
    opendialogAdvice () {
      this.dialogAdvice = true
    },
    closedialogAdvice () {
      this.dialogAdvice = false
    },
    opendialogDetail () {
      this.dialogDetail = true
    },
    closedialogDetail () {
      this.dialogDetail = false
    },
    closedialogAsk () {
      this.dialogAsk = false
    },
    opendialogAsk2 () {
      this.dialogAsk2 = true
    },
    closedialogAsk2 () {
      this.dialogAsk2 = false
      this.dialogAsk = true
    },
    async goRegislic () {
      //   this.closedialogAsk()
      this.opendialogAsk2()
      //   this.SetITEMFORMSTATUS('signupandregister')
      //   await this.updateregis('signupandregister')
      //   this.$router.push('/mobile/reglicense/' + this.acc)
    },
    async goRegislicReal () {
      this.dialogAsk = false
      this.dialogAsk2 = false
      this.SetITEMFORMSTATUS('signupandregister')
      await this.updateregis('signupandregister')
      this.$router.push('/mobile/reglicense/' + this.acc)
    },
    async gopage5 () {
      this.closedialogAsk()
      this.SetITEMFORMSTATUS('signup') // set type ของใบนั้น
      await this.updateregis('signup') // อัปเดตข้อมูลเเละสร้างใบ
      console.log('this.form_id', this.form_id)
      this.$router.push('/mobile/new/payment/' + this.acc + '/' + this.form_id)
      //   this.e1 = 6
    },
    nextpage () {
      //   console.log(this.e1)
      if (this.e1 === 4) {
        this.e1++
        this.notiAddress()
      }
      if (this.e1 === 3) {
        if (this.$refs.form3.validate()) {
          this.e1++
        }
      }
      if (this.e1 === 2) {
        if (this.$refs.form2.validate()) {
          this.e1++
        }
      }
      if (this.e1 === 1) {
        if (this.imageUrl) {
          this.e1++
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'กรุณาอัปโหลดรูป',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
      //   console.log(this.e1)
    },
    step1 () {
      this.e1 = 1
    },
    step2 () {
      if (this.imageUrl) {
        this.e1 = 2
      }
    },
    step3 () {
      if (this.imageUrl && this.$refs.form2.validate() && this.$refs.form3.validate()) {
        this.e1 = 3
      }
    },
    step4 () {
      if (this.imageUrl && this.$refs.form2.validate() && this.$refs.form3.validate()) {
        this.e1 = 4
      }
    },
    goHome () {
      this.$router.push('/mobile/home-reg/' + this.acc)
      //   this.$router.go(-1)
    },
    /// //////////////////////////////////////////////////////////////////
    async getProvince () {
      //   this.birth = moment(new Date()).format('DD-MM-YYYY')
      await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/location/Province-thai`,
        headers: {
          Authorization: this.$store.getters.getToken,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.province_lists = response.data.results
          return response
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getTambons (id) {
      const res = await this.axios(
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          url: `${process.env.VUE_APP_API_URL}/api/location/Tambons-thai/${id}`
        })
        .then(response => {
          return response
        })
        .catch(err => {
          return err.response
        })

      if (res.data.message === 'success') {
        return res.data.results
      }
    },
    async getAmphure (id) {
      const res = await this.axios(
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          url: `${process.env.VUE_APP_API_URL}/api/location/Amphure-thai/${id}`
        })
        .then(response => {
          return response
        })
        .catch(err => {
          return err.response
        })
      if (res.data.message === 'success') {
        return res.data.results
      }
    },
    /// //////////////////////////////////////////////////////////////////
    async setAmphuresReg (val) {
      const found = this.province_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      const resData = await this.getAmphure(found.id)
      this.amphures_reg_lists = resData
    },
    async setTambonsReg (val) {
      const found = this.amphures_reg_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      const resData = await this.getTambons(found.id)
      this.tambons_reg_lists = resData
    },
    async setZipcodeReg (val) {
      const found = this.tambons_reg_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      this.zipcode_reg = found.zip_code
    },
    /// //////////////////////////////////////////////////////////////////
    async setAmphuresCon (val) {
      const found = this.province_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      const resData = await this.getAmphure(found.id)
      this.amphures_con_lists = resData
    },
    async setTambonsCon (val) {
      const found = this.amphures_con_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      const resData = await this.getTambons(found.id)
      this.tambons_con_lists = resData
    },
    async setZipcodeCon (val) {
      const found = this.tambons_con_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      this.zipcode_con = found.zip_code
    },
    /// //////////////////////////////////////////////////////////////////
    async setAmphuresSend (val) {
      const found = this.province_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      const resData = await this.getAmphure(found.id)
      this.amphures_send_lists = resData
    },
    async setTambonsSend (val) {
      const found = this.amphures_send_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      const resData = await this.getTambons(found.id)
      this.tambons_send_lists = resData
    },
    async setZipcodeSend (val) {
      const found = this.tambons_send_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      this.zipcode_send_document = found.zip_code
    },
    /// //////////////////////////////////////////////////////////////////
    async setAmphuresWork (val) {
      const found = this.province_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      const resData = await this.getAmphure(found.id)
      this.amphures_work_lists = resData
    },
    async setTambonsWork (val) {
      const found = this.amphures_work_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      const resData = await this.getTambons(found.id)
      this.tambons_work_lists = resData
    },
    async setZipcodeWork (val) {
      const found = this.tambons_work_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      this.zipcode_work = found.zip_code
    },
    /// //////////////////////////////////////////////////////////////////
    async setAmphuresNow (val) {
      const found = this.province_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      const resData = await this.getAmphure(found.id)
      this.amphures_now_lists = resData
    },
    async setTambonsNow (val) {
      const found = this.amphures_now_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      const resData = await this.getTambons(found.id)
      this.tambons_now_lists = resData
    },
    async setZipcodeNow (val) {
      const found = this.tambons_now_lists.find(v => v.name_th === val)
      if (!found) {
        return
      }
      this.zipcode_now = found.zip_code
    }
  }
  /// //////////////////////////////////////////////////////////////////
}
</script>
  <style scoped>
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20%;
    width: 50%;
  }

  .back-bth {
    position: absolute;
    top: 50%;
    left: 25px;
    transform: translate(-50%, -50%);
  }

  .onScroll {
    background-color: #006af1 !important;
    color: #fff;
  }

  .onScroll .icon-color {
    color: #fff !important;
  }

  .page-padding {
    padding-top: 70px;
  }

  .card-form {
    border-radius: 16px;
  }

  .textzone {
    border-radius: 14px;
  }

  .form-title {
    font-size: 14px;
    color: #666666;
  }

  .note-text {
    font-size: 10px;
    color: #006af1;
  }

  .text-send {
    font-weight: 400;
    font-size: 16px;
    color: #808080;
  }
  </style>
