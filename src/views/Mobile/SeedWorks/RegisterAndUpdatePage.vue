<template>
  <v-container class="container-register-member" fluid>
    <img src="@/assets/trva/bgLoginHeader.png" class="img-header-register"/>
    <v-app-bar style="z-index: 2;" height="70" flat color="transparent">
      <v-row no-gutters>
        <v-col
          style="position: absolute; z-index: 2;"
          cols="auto"
          class="d-flex justify-start"
        >
          <v-icon @click="back" color="#3B76EF">mdi-chevron-left</v-icon>
        </v-col>
        <v-col class="d-flex justify-center">
          <span style="font-size: 18px" class="font-weight-bold">{{
            title
          }}</span>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-row v-if="data_type !== 'update'" style="text-align: center" class="mb-5">
      <v-col>
        <div style="font-size: 12px">
          ระบบสมาชิกสมาคมสัตวแพทย์ผู้ควบคุมฟาร์มสัตว์เคี้ยวเอื้อง
        </div>
        <div style="font-size: 12px">
          (Thai Ruminant Veterinary Association)
        </div>
      </v-col>
    </v-row>

    <v-card class="card-style">
      <v-container fluid class="pt-5" style="width: 97%">
        <v-row>
          <v-col cols="auto">
            <v-row class="ma-0">
              <v-progress-circular
                :value="(currentStep / totalSteps) * 100"
                size="70"
                width="10"
                color="#73EE6F"
                rotate="-90"
              >
                <span class="progress-text"
                  >{{ currentStep }}/{{ totalSteps }}</span
                >
              </v-progress-circular>
            </v-row>
          </v-col>
          <v-col :class="currentStep < totalSteps ? 'mt-3' : 'mt-6'">
            <div class="font-weight-bold">
              {{ currentStep }}. {{ itemsTitleStep[currentStep - 1] }}
            </div>
            <div v-if="currentStep !== totalSteps" style="font-size: 14px">
              ถัดไป {{ currentStep + 1 }}. {{ itemsTitleStep[currentStep] }}
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Step 1 -->
      <v-form ref="formStep1" v-if="currentStep === 1">
        <v-container fluid>
          <v-container fluid class="container-info-section">
            <div class="header-section">ข้อมูลส่วนตัว</div>
            <v-row>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">คำนำหน้า</span>
                <span class="red--text"><strong>* </strong></span>
                <v-autocomplete
                  v-model="profile.salutation"
                  :items="itemsSalutations"
                  dense
                  placeholder="เลือกคำนำหน้า"
                  required
                  outlined
                  :rules="[rules.required]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">ชื่อ - นามสกุล</span>
                <span class="red--text"><strong>*</strong></span>
                <v-text-field
                  v-model="profile.full_name"
                  placeholder="ค้นหาชื่อ-นามสกุล"
                  outlined
                  :rules="[rules.thaiOnly]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">วัน/เดือน/ปีเกิด</span>
                <span class="red--text"><strong>*</strong></span>
                <v-menu
                  ref="menuBirthdate"
                  v-model="menuBirthdate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formatDateBirthday"
                      dense
                      placeholder="วว/ดด/ปปปป"
                      :rules="[rules.required]"
                      append-icon="mdi-calendar-month"
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="px-0 calendar-icon-color"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="profile.birthdate"
                    locale="th-TH"
                    :max="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substring(0, 10)
                    "
                    @input="menuBirthdate = false"
                    min="1950-01-01"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <!-- ให้แกด้ป return เบอร์ออกมาด้วย -->
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">เบอร์โทรศัพท์</span>
                <span class="red--text"><strong>*</strong></span>
                <v-text-field
                  v-model="profile.phone"
                  placeholder="ระบุเบอร์โทรศัพท์"
                  outlined
                  :rules="[rules.numberLength]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">อีเมล</span>
                <span class="red--text"><strong>*</strong><span style="font-size: 14px;">&nbsp;ใช้สำหรับส่งใบเสร็จอิเล็กทรอนิกส์</span></span>
                <v-text-field
                  :class="marginBottomLastElement"
                  v-model="profile.email"
                  placeholder="ระบุอีเมล"
                  outlined
                  :rules="[rules.emailRules]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical margin-top-10">
                <span class="detail-section">ประเภทผู้เสียภาษีอากร</span>
                <span class="red--text"><strong>* </strong></span>
                <v-autocomplete
                  v-model="profile.tax_type"
                  :items="itemsTaxType"
                  dense
                  placeholder="เลือกประเภทผู้เสียภาษีอากร"
                  required
                  outlined
                  :rules="[rules.required]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">เลขประจำตัวผู้เสียภาษีอากร</span>
                <span class="red--text"><strong>*</strong></span>
                <v-text-field
                  v-model="profile.tax_id"
                  placeholder="ระบุเลขประจำตัวผู้เสียภาษีอากร"
                  outlined
                  :rules="[validateCitizenId]"
                  @input="onInput"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid class="container-info-section">
            <div class="header-section">ที่อยู่ปัจจุบัน</div>
            <v-row>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">บ้านเลขที่</span>
                <span class="red--text"><strong>*</strong></span>
                <v-text-field
                  v-model="house_address.no"
                  placeholder="ระบุบ้านเลขที่"
                  outlined
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">หมู่ที่</span>
                <v-text-field
                  v-model="house_address.moo"
                  placeholder="ระบุหมู่ที่"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">หมู่บ้าน/อาคาร</span>
                <v-text-field
                  v-model="house_address.building"
                  placeholder="ระบุหมู่บ้าน/อาคาร"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">ตรอก/ซอย</span>
                <v-text-field
                  v-model="house_address.soi"
                  placeholder="ระบุตรอก/ซอย"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">ถนน</span>
                <v-text-field
                  v-model="house_address.street"
                  placeholder="ระบุถนน"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <!-- require -->
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">จังหวัด</span>
                <span class="red--text"><strong>*</strong></span>
                <v-autocomplete
                  v-model="house_address.province"
                  :items="itemsProvincesHouse"
                  item-text="name_th"
                  dense
                  placeholder="เลือกจังหวัด"
                  required
                  outlined
                  :rules="[rules.required]"
                  @change="provinceFilter(house_address.province, 'house')"
                ></v-autocomplete>
              </v-col>
              <!-- require -->
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">เขต/อำเภอ</span>
                <span class="red--text"><strong>*</strong></span>
                <v-autocomplete
                  v-model="house_address.district"
                  :items="itemsDistrictsHouse"
                  item-text="name_th"
                  dense
                  placeholder="เลือกเขต/อำเภอ"
                  required
                  outlined
                  :rules="[rules.required]"
                  @change="districtFilter(house_address.district, 'house')"
                ></v-autocomplete>
              </v-col>
              <!-- require -->
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">แขวง/ตำบล</span>
                <span class="red--text"><strong>* </strong></span>
                <v-autocomplete
                  v-model="house_address.sub_district"
                  :items="itemsSubDistrictsHouse"
                  item-text="name_th"
                  dense
                  placeholder="แขวง/ตำบล"
                  required
                  outlined
                  :rules="[rules.required]"
                  @change="subDistrictFilter(house_address.sub_district, 'house')"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">รหัสไปรษณีย์</span>
                <v-text-field
                  :class="marginBottomLastElement"
                  v-model="house_address.post_code"
                  placeholder="รหัสไปรษณีย์"
                  outlined
                  dense
                  filled
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-form>
      <!-- Step 2 -->
      <v-form ref="formStep2" v-else-if="currentStep === 2">
        <v-container fluid>
          <v-container fluid class="container-info-section">
            <div class="header-section">ข้อมูลการทำงาน</div>
            <v-row>
              <v-col cols="12" md="12" sm="12" class="col-spacing-vertical">
                <span class="detail-section">เลขที่ใบประกอบวิชาชีพการสัตวแพทย์</span>
                <span class="red--text"><strong>* </strong></span>
                <v-text-field
                  v-model="work.license_no"
                  placeholder="ระบุเลขที่ใบประกอบวิชาชีพการสัตวแพทย์"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="col-spacing-vertical">
                <span class="detail-section"
                  >วันที่ใบอนุญาตประกอบวิชาชีพการสัตวแพทย์ ของท่านหมดอายุ</span
                >
                <v-menu
                  ref="menuLicenseEndDate"
                  v-model="menuLicenseEndDate"
                  :return-value.sync="licenseEndDate"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formatLicenseEndDate"
                      dense
                      placeholder="วว/ดด/ปปปป"
                      :rules="[rules.required]"
                      append-icon="mdi-calendar-month"
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="px-0 calendar-icon-color"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="work.license_end_date"
                    locale="th-TH"
                    @input="menuLicenseEndDate = false"
                    min="1950-01-01"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="col-spacing-vertical">
                <span class="detail-section"
                  >วันที่ใบอนุญาตสัตวแพทย์ผู้ควบคุมฟาร์มเลี้ยงสัตว์ประเภทสัตว์เคี้ยวเอื้องของท่านหมดอายุ</span
                >
                <v-menu
                  ref="menuLicenseFarmEndDate"
                  v-model="menuLicenseFarmEndDate"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formatLicenseFarmEndDate"
                      dense
                      placeholder="วว/ดด/ปปปป"
                      :rules="[rules.required]"
                      append-icon="mdi-calendar-month"
                      outlined
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="px-0 calendar-icon-color"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="work.license_farm_end_date"
                    locale="th-TH"
                    @input="menuLicenseFarmEndDate = false"
                    min="1950-01-01"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="col-spacing-vertical">
                <span class="detail-section">อาชีพปัจจุบัน</span>
                <span class="red--text"><strong>* </strong></span>
                <v-text-field
                  :class="marginBottomLastElement"
                  v-model="work.career"
                  dense
                  :rules="[rules.required]"
                  placeholder="ระบุอาชีพปัจจุบัน"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid class="container-info-section">
            <div class="header-section">สถานที่ทำงาน</div>
            <v-row>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">ชื่อสถานที่ทำงาน</span>
                <span class="red--text"><strong>* </strong></span>
                <v-text-field
                  v-model="work_address.work_place"
                  placeholder="ระบุชื่อสถานที่ทำงาน"
                  outlined
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">บ้านเลขที่</span>
                <span class="red--text"><strong>* </strong></span>
                <v-text-field
                  v-model="work_address.no"
                  placeholder="ระบุบ้านเลขที่"
                  outlined
                  :rules="[rules.required]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">หมู่ที่</span>
                <v-text-field
                  v-model="work_address.moo"
                  placeholder="ระบุหมู่ที่"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">หมู่บ้าน/อาคาร</span>
                <v-text-field
                  v-model="work_address.building"
                  placeholder="ระบุหมู่บ้าน/อาคาร"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">ตรอก/ซอย</span>
                <v-text-field
                  v-model="work_address.soi"
                  placeholder="ระบุตรอก/ซอย"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">ถนน</span>
                <v-text-field
                  v-model="work_address.street"
                  placeholder="ระบุถนน"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">จังหวัด</span>
                <span class="red--text"><strong>* </strong></span>
                <v-autocomplete
                  v-model="work_address.province"
                  :items="itemsProvincesWork"
                  item-text="name_th"
                  dense
                  :rules="[rules.required]"
                  placeholder="เลือกจังหวัด"
                  required
                  outlined
                  @change="provinceFilter(work_address.province, 'work')"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">เขต/อำเภอ</span>
                <span class="red--text"><strong>* </strong></span>
                <v-autocomplete
                  v-model="work_address.district"
                  :items="itemsDistrictsWork"
                  item-text="name_th"
                  dense
                  :rules="[rules.required]"
                  placeholder="เลือกเขต/อำเภอ"
                  required
                  outlined
                  @change="districtFilter(work_address.district, 'work')"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">แขวง/ตำบล</span>
                <span class="red--text"><strong>* </strong></span>
                <v-autocomplete
                  v-model="work_address.sub_district"
                  :items="itemsSubDistrictsWork"
                  item-text="name_th"
                  dense
                  :rules="[rules.required]"
                  placeholder="แขวง/ตำบล"
                  required
                  outlined
                  @change="subDistrictFilter(work_address.sub_district, 'work')"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" sm="6" class="col-spacing-vertical">
                <span class="detail-section">รหัสไปรษณีย์</span>
                <v-text-field
                  :class="marginBottomLastElement"
                  v-model="work_address.post_code"
                  placeholder="รหัสไปรษณีย์"
                  outlined
                  dense
                  disabled
                  filled
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-form>
      <!-- Step 3 -->
      <v-form ref="formStep3" v-else-if="currentStep === 3">
        <v-container fluid>
          <v-container
            @click="confirmUpdate"
            fluid
            class="container-info-section"
          >
            <div>
              <div class="confirm-header-section">ข้อมูลส่วนตัว</div>
              <InfoRow label="คำนำหน้า" :value="profile.salutation" />
              <InfoRow label="ชื่อ-นามสกุล" :value="profile.full_name" />
              <InfoRow label="วัน/เดือน/ปีเกิด" :value="formatDateBirthday" />
              <InfoRow label="เบอร์โทรศัพท์" :value="profile.phone" />
              <InfoRow label="อีเมล" :value="profile.email" />

              <div class="confirm-header-section">ที่อยู่ปัจจุบัน</div>
              <InfoRow label="บ้านเลขที่" :value="house_address.no" />
              <InfoRow label="หมู่ที่" :value="house_address.moo" />
              <InfoRow label="หมู่บ้าน/อาคาร" :value="house_address.building" />
              <InfoRow label="ตรอก/ซอย" :value="house_address.soi" />
              <InfoRow label="ถนน" :value="house_address.street" />
              <InfoRow label="แขวง/ตำบล" :value="house_address.sub_district" />
              <InfoRow label="เขต/อำเภอ" :value="house_address.district" />
              <InfoRow label="จังหวัด" :value="house_address.province" />
              <InfoRow label="รหัสไปรษณีย์" :value="house_address.post_code" />
            </div>
          </v-container>

          <v-container fluid class="container-info-section">
            <div>
              <div class="confirm-header-section">ข้อมูลการทำงาน</div>
              <InfoRow
                label="เลขที่ใบประกอบวิชาชีพการสัตวแพทย์"
                :value="work.license_no"
              />
              <InfoRow
                label="วันที่ใบอนุญาตประกอบวิชาชีพการสัตวแพทย์ของท่านหมดอายุ"
                :value="formatLicenseEndDate"
              />
              <InfoRow
                label="วันที่ใบอนุญาตผู้ควบคุมฟาร์มเลี้ยงสัตว์ประเภทสัตว์เคี้ยวเอื้องของท่านหมดอายุ"
                :value="formatLicenseFarmEndDate"
              />
              <InfoRow label="อาชีพปัจจุบัน" :value="work.career" />

              <div class="confirm-header-section mt-5">ที่อยู่สถานที่ทำงาน</div>
              <InfoRow
                label="ชื่อสถานที่ทำงาน"
                :value="work_address.work_place"
              />
              <InfoRow label="บ้านเลขที่" :value="work_address.no" />
              <InfoRow label="หมู่ที่" :value="work_address.moo" />
              <InfoRow label="หมู่บ้าน/อาคาร" :value="work_address.building" />
              <InfoRow label="ตรอก/ซอย" :value="work_address.soi" />
              <InfoRow label="ถนน" :value="work_address.street" />
              <InfoRow label="แขวง/ตำบล" :value="work_address.sub_district" />
              <InfoRow label="เขต/อำเภอ" :value="work_address.district" />
              <InfoRow label="จังหวัด" :value="work_address.province" />
              <InfoRow label="รหัสไปรษณีย์" :value="work_address.post_code" />
            </div>
          </v-container>

          <v-container fluid class="container-info-section">
            <div>
              <span class="confirm-header-section"
                >ท่านต้องการให้ส่งเอกสารต่างๆที่เกี่ยวข้องทางใด</span
              >
              <span class="red--text"><strong>* </strong></span>
            </div>
            <v-radio-group
              v-model="selectedContact"
              :ripple="false"
              class="mb-n5"
              :rules="[rules.select]"
              required
            >
              <v-radio label="ที่อยู่ปัจจุบัน" value="current"></v-radio>
              <v-radio label="สถานที่ทำงาน" value="work"></v-radio>
              <v-radio label="อีเมล" value="email"></v-radio>
            </v-radio-group>
          </v-container>
        </v-container>
      </v-form>

      <!-- Button Section -->
      <v-container fluid class="container-button-section">
        <v-row>
          <v-col cols="6" v-if="currentStep > 1">
            <v-btn
              @click="previousStep()"
              block
              large
              outlined
              color="primary"
              class="btn-style"
              height="45"
            >
              <v-icon left>mdi-chevron-left</v-icon>
              ย้อนกลับ
            </v-btn>
          </v-col>
          <v-col :cols="currentStep === 1 ? 12 : 6">
            <!-- register -->
            <div
              v-if="
                type === 'register-new-member'
              "
            >
              <v-btn
                @click="confirmRegister"
                v-if="currentStep === totalSteps"
                block
                large
                style="color: white"
                color="#166BF9"
                class="btn-style"
                height="45"
                width="120"
              >
                <v-icon left>mdi-file-document-outline</v-icon>
                สมัครสมาชิก
              </v-btn>
              <v-btn
                v-else
                @click="nextStep()"
                block
                large
                style="color: white"
                color="#166BF9"
                class="btn-style"
                height="45"
              >
                ถัดไป
                <v-icon right>mdi-chevron-right</v-icon>
              </v-btn>
            </div>

            <div
              v-else-if="
                type === 'register-undesirable'
              "
            >
              <v-btn
                @click="confirmRegister"
                v-if="currentStep === totalSteps"
                block
                large
                style="color: white"
                color="#166BF9"
                class="btn-style"
                height="45"
                width="120"
              >
                <v-icon left>mdi-file-document-outline</v-icon>
                ยืนยันข้อมูล
              </v-btn>
              <v-btn
                v-else
                @click="nextStep()"
                block
                large
                style="color: white"
                color="#166BF9"
                class="btn-style"
                height="45"
              >
                ถัดไป
                <v-icon right>mdi-chevron-right</v-icon>
              </v-btn>
            </div>

            <!-- update -->
            <div v-else>
              <v-btn
                @click="confirmUpdate"
                v-if="currentStep === totalSteps"
                block
                large
                style="color: white"
                color="#166BF9"
                class="btn-style"
                height="45"
                width="120"
              >
                บันทึก
              </v-btn>
              <v-btn
                v-else
                @click="nextStep()"
                block
                large
                style="color: white"
                color="#166BF9"
                class="btn-style"
                height="45"
              >
                ถัดไป
                <v-icon right>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <DialogConfirmRegister v-if="clickConfirmRegister" ref="dialogConfrim" :formPage="data_type" @goToBiz="goToBiz"/>
    <DialogConfirmUpdate v-if="openConfirmUpdate" ref="dialogConfirmUpdate" :formPage="data_type" @updateDataMember="updateDataMember"/>
    <DialogSuccess v-if="openDialogSuccess" ref="dialogSuccess" :formPage="data_type"/>
    <DialogCancel v-if="clickCancleRegister" ref="dialogCancel" />
  </v-container>
</template>

<script>
// import moment from 'moment'
import Swal from 'sweetalert2'
import InfoRow from '../SeedWorks/InfoRow.vue'
import DialogConfirmRegister from '../Register/DialogConfirmRegister.vue'
import DialogConfirmUpdate from '../Register/DialogConfirmUpdate.vue'
import DialogSuccess from './DialogSuccess.vue'
import DialogCancel from './DialogCancel.vue'
export default {
  components: {
    InfoRow,
    DialogConfirmRegister,
    DialogConfirmUpdate,
    DialogCancel,
    DialogSuccess
  },
  data () {
    return {
      currentStep: 1, // ขั้นตอนปัจจุบัน
      totalSteps: 3, // จำนวนขั้นตอนทั้งหมด
      marginBottomLastElement: 'mb-n5',
      urlBackRouter: '',
      title: '',
      type: '',
      data_type: {},
      itemsTitleStep: ['ข้อมูลส่วนตัว', 'ข้อมูลการทำงาน', 'ยืนยันข้อมูล'],
      itemsSalutations: ['นายสัตวแพทย์', 'สัตวแพทย์หญิง'],
      itemsProvincesHouse: [],
      itemsDistrictsHouse: [],
      itemsSubDistrictsHouse: [],
      itemsProvincesWork: [],
      itemsDistrictsWork: [],
      itemsSubDistrictsWork: [],
      itemsTaxType: ['บุคคลธรรมดา'],
      selectedContact: null,
      profile: {
        salutation: '',
        full_name: '',
        birthdate: '',
        phone: '',
        email: '',
        tax_type: '',
        tax_id: ''
      },
      house_address: {
        no: '',
        moo: '',
        building: '',
        soi: '',
        street: '',
        province: '',
        district: '',
        sub_district: '',
        post_code: ''
      },
      work: {
        license_no: '',
        license_end_date: '',
        license_farm_end_date: '',
        career: ''
      },
      work_address: {
        work_place: '',
        no: '',
        moo: '',
        building: '',
        soi: '',
        street: '',
        province: '',
        district: '',
        sub_district: '',
        post_code: ''
      },
      menuBirthdate: false,
      menuLicenseEndDate: false,
      menuLicenseFarmEndDate: false,
      birthDate: new Date().toISOString().substr(0, 10),
      licenseEndDate: new Date().toISOString().substr(0, 10),
      licenseFarmEndDate: new Date().toISOString().substr(0, 10),
      rules: {
        pass: (value) =>
          value.length >= 5 || 'กรุณากรอกรหัสผ่านอย่างน้อย 5 ตัว',
        required: (value) => !!value || 'กรุณากรอกข้อมูล',
        select: (value) => !!value || 'กรุณาเลือกข้อมูล',
        thaiOnly: (value) =>
          /^([ก-๙\s])+$/i.test(value) || 'กรุณากรอกเป็นภาษาไทยเท่านั้น',
        engCompany: (value) =>
          /^([A-Za-z\s.,-])+$/i.test(value) ||
          'กรุณากรอกเป็นภาษาอังกฤษเท่านั้น',
        engOnly: (value) =>
          /^([A-Za-z\s])+$/i.test(value) || 'กรุณากรอกเป็นภาษาอังกฤษเท่านั้น',
        numberOnly: (value) =>
          /^([0-9, ','])+$/.test(value) || 'กรุณากรอกเป็นตัวเลขเท่านั้น',
        emailRules: (value) =>
          /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          'รูปแบบอีเมลไม่ถูกต้อง',
        numberLength: (value) =>
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value) ||
          'กรุณากรอกจำนวนตัวเลขไม่เกิน 10 หลัก',
        numberHouseOnly: (value) =>
          /^(\d+\/\d+|\d+)$/.test(value) || 'กรุณากรอกเป็นตัวเลขเท่านั้น',
        numberTax: (value) =>
          /^[0-9]{13}$/.test(value) ||
          'กรุณากรอกจำนวนตัวเลข 13 หลัก'
      },
      formValid: false,
      accountId: null,
      clickConfirmRegister: false,
      clickCancleRegister: false,
      openConfirmUpdate: false,
      province: {},
      district: {},
      subDistrict: {},
      openDialogSuccess: false,
      member_id: ''
    }
  },
  async created () {
    this.dataMember = this.$store.state.dataMember
    this.accountId = localStorage.getItem('accountId')
    this.member_id = localStorage.getItem('memberId')
  },
  computed: {
    formatDateBirthday () {
      if (!this.profile.birthdate) return ''
      return this.formatToThaiDate(this.profile.birthdate)
    },
    formatLicenseEndDate () {
      if (!this.work.license_end_date) return ''
      return this.formatToThaiDate(this.work.license_end_date)
    },
    formatLicenseFarmEndDate () {
      if (!this.work.license_farm_end_date) return ''
      return this.formatToThaiDate(this.work.license_farm_end_date)
    }
  },
  methods: {
    formatToThaiDate (date) {
      const [year, month, day] = date.split('-')
      const buddhistYear = parseInt(year, 10) + 543 // Add 543 to get the Buddhist year
      return `${day}/${month}/${buddhistYear}`
    },
    async provinceFilter (provinceName, type) {
      if (type === 'house') {
        this.house_address.post_code = ''
        this.house_address.district = ''
        this.house_address.sub_district = ''
        this.$refs.formStep1.resetValidation()
      } else if (type === 'work') {
        this.work_address.post_code = ''
        this.work_address.district = ''
        this.work_address.sub_district = ''
        this.$refs.formStep2.resetValidation()
      }
      let obj = {}
      if (provinceName && type === 'house') {
        obj = this.itemsProvincesHouse.find((v) => v.name_th === provinceName)
      } else if (provinceName && type === 'work') {
        obj = this.itemsProvincesWork.find((v) => v.name_th === provinceName)
      }
      this.province = {
        id: obj.id || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || ''
      }
      await this.apiGetDistrict(this.province.id, type)
    },
    async districtFilter (districtName, type) {
      if (type === 'house') {
        this.house_address.post_code = ''
        this.house_address.sub_district = ''
        this.$refs.formStep1.resetValidation()
      } else if (type === 'work') {
        this.work_address.post_code = ''
        this.work_address.sub_district = ''
        this.$refs.formStep2.resetValidation()
      }
      let obj = {}
      if (districtName && type === 'house') {
        obj = this.itemsDistrictsHouse.find((v) => v.name_th === districtName)
      }
      if (districtName && type === 'work') {
        obj = this.itemsDistrictsWork.find((v) => v.name_th === districtName)
      }
      this.district = {
        code: obj.code || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || ''
      }
      await this.apiGetSubDistrict(this.district.code, type)
    },
    async subDistrictFilter (subDistrictName, type) {
      let obj = {}
      if (subDistrictName && type === 'house') {
        obj = this.itemsSubDistrictsHouse.find((v) => v.name_th === subDistrictName)
      } else if (subDistrictName && type === 'work') {
        obj = this.itemsSubDistrictsWork.find((v) => v.name_th === subDistrictName)
      }
      this.subDistrict = {
        zip_code: obj.zip_code || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || ''
      }
      if (type === 'house') {
        this.house_address.post_code = this.subDistrict.zip_code
      } else if (type === 'work') {
        this.work_address.post_code = this.subDistrict.zip_code
      }
    },
    // ดึงข้อมูลจังหวัด
    async apiGetProvince (type) {
      const res = await this.axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_URL}/api/location/getProvince`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.status === 200 && type === 'house') {
        this.itemsProvincesHouse = res.data.results
      } else if (res.status === 200 && type === 'work') {
        this.itemsProvincesWork = res.data.results
      }
    },
    // ดึงข้อมูลเขต
    async apiGetDistrict (provinceId, type) {
      const res = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/location/getDistrict?province_code=${provinceId}`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.status === 200 && type === 'house') {
        this.itemsDistrictsHouse = res.data.results
      } else if (res.status === 200 && type === 'work') {
        this.itemsDistrictsWork = res.data.results
      }
    },
    // ดึงข้อมูลแขวง
    async apiGetSubDistrict (districtId, type) {
      const res = await this.axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_URL}/api/location/getSubDistrict?district_code=${districtId}`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.status === 200 && type === 'house') {
        this.itemsSubDistrictsHouse = res.data.results
      } else if (res.status === 200 && type === 'work') {
        this.itemsSubDistrictsWork = res.data.results
      }
    },
    async sendData (data) {
      this.data_type = data.type
      if (data.type === 'register-new-member') {
        await this.apiGetProvince('house')
        await this.apiGetProvince('work')
        this.type = data.type
        this.title = 'สมัครสมาชิก'
        this.itemsTitleStep = [
          'ข้อมูลส่วนตัว',
          'ข้อมูลการทำงาน',
          'ยืนยันข้อมูล'
        ]
        this.currentStep = 1
        this.totalSteps = 3
        this.urlBackRouter = '/login-member'
      } else if (data.type === 'register-undesirable') {
        await this.apiGetProvince('house')
        await this.apiGetProvince('work')
        this.type = data.type
        this.title = 'กรอกข้อมูลเพื่อใช้งาน'
        this.itemsTitleStep = [
          'ข้อมูลส่วนตัว',
          'ข้อมูลการทำงาน',
          'ยืนยันข้อมูล'
        ]
        this.currentStep = 1
        this.totalSteps = 3
        this.urlBackRouter = '/login-member' // TODO
      } else if (data.type === 'update') {
        await this.apiGetProvince('house')
        await this.provinceFilterUpdate(this.dataMember.houseProvince, 'house')
        await this.districtFilterUpdate(this.dataMember.houseDistrict, 'house')
        await this.subDistrictFilterUpdate(this.dataMember.houseSubDistrict, 'house')
        await this.apiGetProvince('work')
        await this.provinceFilterUpdate(this.dataMember.workplace_province, 'work')
        await this.districtFilterUpdate(this.dataMember.workplace_district, 'work')
        await this.subDistrictFilterUpdate(this.dataMember.workplace_subDistrict, 'work')
        this.type = data.type
        this.title = 'อัปเดทข้อมูลสมาชิก'
        this.itemsTitleStep = ['ข้อมูลส่วนตัว', 'ข้อมูลการทำงาน']
        this.currentStep = 1
        this.totalSteps = 2
        this.urlBackRouter = '/profile/homepage'
        this.profile = {
          salutation: this.dataMember.prefix,
          full_name: this.dataMember.full_name,
          birthdate: this.dataMember.date_of_birth,
          phone: this.dataMember.phone_number,
          email: this.dataMember.email,
          tax_type: this.dataMember.taxpayer_type,
          tax_id: this.dataMember.TIN
        }
        this.house_address = {
          no: this.dataMember.houseNo,
          moo: this.dataMember.houseMoo,
          building: this.dataMember.houseBuilding,
          soi: this.dataMember.houseSoi,
          street: this.dataMember.houseStreet,
          province: this.dataMember.houseProvince,
          district: this.dataMember.houseDistrict,
          sub_district: this.dataMember.houseSubDistrict,
          post_code: this.dataMember.housePostCode
        }
        this.work = {
          license_no: this.dataMember.licenseNo,
          license_end_date: this.dataMember.licenseEndDate,
          license_farm_end_date: this.dataMember.licenseFarmEnd,
          career: this.dataMember.career
        }
        this.work_address = {
          work_place: this.dataMember.workplace_name,
          no: this.dataMember.workplace_number,
          moo: this.dataMember.workplace_moo,
          building: this.dataMember.workplace_building,
          soi: this.dataMember.workplace_soi,
          street: this.dataMember.workplace_street,
          province: this.dataMember.workplace_province,
          district: this.dataMember.workplace_district,
          sub_district: this.dataMember.workplace_subDistrict,
          post_code: this.dataMember.workplace_postCode
        }
      }
    },
    async confirmRegister () {
      const isValid = this.$refs[`formStep${this.currentStep}`].validate()
      if (isValid) {
        const payloadRegister = {
          accountID: this.accountId,
          prefix: this.profile.salutation,
          full_name: this.profile.full_name,
          date_of_birth: this.profile.birthdate,
          phone_number: this.profile.phone,
          email: this.profile.email,
          taxpayer_type: this.profile.tax_type,
          TIN: this.profile.tax_id,
          type: this.data_type === 'register-new-member' ? 'regis' : 'temp',
          houseNo: this.house_address.no,
          houseMoo: this.house_address.moo,
          houseBuilding: this.house_address.building,
          houseSoi: this.house_address.soi,
          houseStreet: this.house_address.street,
          houseDistrict: this.house_address.district,
          houseSubDistrict: this.house_address.sub_district,
          houseProvince: this.house_address.province,
          housePostCode: this.house_address.post_code,
          workName: this.work_address.work_place,
          workNo: this.work_address.no,
          workMoo: this.work_address.moo,
          workBuilding: this.work_address.building,
          workSoi: this.work_address.soi,
          workStreet: this.work_address.street,
          workDistrict: this.work_address.district,
          workSubDistrict: this.work_address.sub_district,
          workProvince: this.work_address.province,
          workPostCode: this.work_address.post_code,
          licenseNo: this.work.license_no,
          licenseEndDate: this.work.license_end_date,
          licenseFarmEnd: this.work.license_farm_end_date,
          career: this.work.career,
          addressSendDoc: this.selectedContact
        }
        const registerMember = await this.axios({
          method: 'POST',
          url: `${process.env.VUE_APP_API_URL}/api/member/registerMember`,
          data: payloadRegister
        }).then((response) => {
          return response
        }).catch((err) => {
          return err.response
        })
        if (registerMember.data.status === 200 && registerMember.data.message === 'Insert Success') {
          this.clickConfirmRegister = true
          this.$nextTick(() => {
            this.$refs.dialogConfrim.actionDialog(true)
          })
        } else if (registerMember.data.message === 'duplicate') {
          await Swal.fire({
            title: 'ไม่สามารถสมัครสมาชิกได้',
            text: 'เป็นสมาชิกในระบบแล้ว',
            icon: 'error'
          })
          await this.goToBiz()
        }
      }
    },
    async goToBiz () {
      const payload = {
        prefix: this.profile.salutation,
        full_name: this.profile.full_name
      }
      const setToBiz = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/member/setToBiz`,
        data: { payload: payload, accountId: this.accountId }
      })
      if (setToBiz.data.status === 200) {
        console.log('set to biz ok')
      } else {
        Swal.fire({
          title: 'ระบบขัดข้อง',
          text: 'กรุณาลองใหม่อีกครั้ง',
          icon: 'error'
        })
      }
    },
    confirmUpdate () {
      this.openConfirmUpdate = true
      this.$nextTick(() => {
        this.$refs.dialogConfirmUpdate.open()
      })
    },
    async previousStep () {
      if (this.currentStep > 1) {
        this.currentStep--
        this.$nextTick(() => {
          const prevForm = this.$refs[`formStep${this.currentStep}`]
          if (prevForm) {
            prevForm.resetValidation()
          } else {
            console.warn(`Form step ${this.currentStep} does not exist`)
          }
        })
      } else {
        console.warn('Already at the first step')
      }
    },
    async nextStep () {
      const isValid = this.$refs[`formStep${this.currentStep}`].validate()
      if (isValid) {
        if (this.currentStep < this.totalSteps) {
          this.currentStep++
          this.$nextTick(() => {
            const nextForm = this.$refs[`formStep${this.currentStep}`]
            if (nextForm) {
              nextForm.resetValidation()
            } else {
              console.warn(`Form step ${this.currentStep} does not exist`)
            }
          })
        } else {
          console.warn('No more steps available')
        }
      }
    },
    formatDate  (dateString) {
      if (dateString) {
        var date = new Date(dateString)
        if (!isNaN(date.getTime())) {
          var day = ('0' + date.getDate()).slice(-2)
          var month = ('0' + (date.getMonth() + 1)).slice(-2)
          var year = date.getFullYear() + 543
          return `${day}/${month}/${year}`
        }
        return null
      }
    },
    back () {
      if (
        this.data_type === 'register-new-member' ||
        this.data_type === 'register-undesirable'
      ) {
        this.clickCancleRegister = true
        this.$nextTick(() => {
          this.$refs.dialogCancel.open()
        })
      } else {
        this.$router.push({ path: this.urlBackRouter })
      }
    },
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // เลื่อนขึ้นแบบ smooth
      })
    },
    validateStep () {
      // ตรวจสอบความถูกต้องของฟอร์มเมื่อผู้ใช้กดถัดไป

      this.$refs[`formStep${this.currentStep}`].validate().then((isValid) => {
        if (isValid) {
          this.currentStep++
        }
      })
    },
    async updateDataMember () {
      this.openConfirmUpdate = false
      const payloadUpdate = {
        accountID: this.accountId,
        prefix: this.profile.salutation,
        full_name: this.profile.full_name,
        date_of_birth: this.profile.birthdate,
        phone_number: this.profile.phone,
        email: this.profile.email,
        taxpayer_type: this.profile.tax_type,
        TIN: this.profile.tax_id,
        type: 'member',
        houseNo: this.house_address.no,
        houseMoo: this.house_address.moo,
        houseBuilding: this.house_address.building,
        houseSoi: this.house_address.soi,
        houseStreet: this.house_address.street,
        houseDistrict: this.house_address.district,
        houseSubDistrict: this.house_address.sub_district,
        houseProvince: this.house_address.province,
        housePostCode: this.house_address.post_code,
        workName: this.work_address.work_place,
        workNo: this.work_address.no,
        workMoo: this.work_address.moo,
        workBuilding: this.work_address.building,
        workSoi: this.work_address.soi,
        workStreet: this.work_address.street,
        workDistrict: this.work_address.district,
        workSubDistrict: this.work_address.sub_district,
        workProvince: this.work_address.province,
        workPostCode: this.work_address.post_code,
        licenseNo: this.work.license_no,
        licenseEndDate: this.work.license_end_date,
        licenseFarmEnd: this.work.license_farm_end_date,
        career: this.work.career,
        member_id: this.member_id,
        addressSendDoc: this.dataMember.sendDoc
      }
      const apiUpdateDataMember = await this.axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/api/member/updateDataMember`,
        data: payloadUpdate
      }).then((response) => {
        return response
      }).catch((error) => {
        return error.response
      })
      if (apiUpdateDataMember.data.status === 200) {
        const data = {
          title: 'บันทึกข้อมูล',
          img: require('@/assets/trva/success.png'),
          subTitle: 'คุณได้ทำการบันทึกข้อมูลสมาชิกเรียบร้อย',
          textBtn: 'ปิด',
          linkClose: '/profile/detail'
        }
        this.openDialogSuccess = true
        this.$nextTick(() => {
          this.$refs.dialogSuccess.open(data)
        })
      } else {
        Swal.fire({
          title: 'ไม่สามารถบันทึกข้อมูลได้',
          text: 'กรุณาลองใหม่อีกครั้ง',
          icon: 'error'
        })
      }
    },
    async provinceFilterUpdate (provinceName, type) {
      let obj = {}
      if (provinceName && type === 'house') {
        obj = this.itemsProvincesHouse.find((v) => v.name_th === provinceName)
      } else if (provinceName && type === 'work') {
        obj = this.itemsProvincesWork.find((v) => v.name_th === provinceName)
      }
      this.province = {
        id: obj.id || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || ''
      }
      await this.apiGetDistrict(this.province.id, type)
    },
    async districtFilterUpdate (districtName, type) {
      let obj = {}
      if (districtName && type === 'house') {
        obj = this.itemsDistrictsHouse.find((v) => v.name_th === districtName)
      }
      if (districtName && type === 'work') {
        obj = this.itemsDistrictsWork.find((v) => v.name_th === districtName)
      }
      this.district = {
        code: obj.code || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || ''
      }
      await this.apiGetSubDistrict(this.district.code, type)
    },
    async subDistrictFilterUpdate (subDistrictName, type) {
      let obj = {}
      if (subDistrictName && type === 'house') {
        obj = this.itemsSubDistrictsHouse.find((v) => v.name_th === subDistrictName)
      } else if (subDistrictName && type === 'work') {
        obj = this.itemsSubDistrictsWork.find((v) => v.name_th === subDistrictName)
      }
      this.subDistrict = {
        zip_code: obj.zip_code || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || ''
      }
      if (type === 'house') {
        this.house_address.post_code = this.subDistrict.zip_code
      } else if (type === 'work') {
        this.work_address.post_code = this.subDistrict.zip_code
      }
    },
    isValidThaiCitizenID (id) {
      if (!/^[1-9]\d{12}$/.test(id)) return false
      let sum = 0
      for (let i = 0; i < 12; i++) {
        sum += parseInt(id[i]) * (13 - i)
      }
      const checkDigit = (11 - (sum % 11)) % 10
      return checkDigit === parseInt(id[12])
    },
    // Validation Rule สำหรับ v-text-field
    validateCitizenId (value) {
      if (!value) return 'กรุณากรอกเลขบัตรประชาชน'
      if (!this.isValidThaiCitizenID(value)) return 'เลขบัตรประชาชนไม่ถูกต้อง'
      return true
    },
    // บังคับให้กรอกเฉพาะตัวเลข
    onInput () {
      this.citizenId = this.citizenId.replace(/[^0-9]/g, '')
    }
  }
}
</script>

<style scoped>
.container-register-member {
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  background: linear-gradient(180deg, #82B6FF 0%, #F2F5FA 11.5%, #F2F5FA 90.14%, #78ABFF 110.84%);
}
.img-header-register {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.card-style {
  /*Main card*/
  border-radius: 16px 16px 0px 0px !important;
  width: 100%;
  height: 100%;
}

.col-spacing-vertical {
  padding: 0px 10px;
}

.header-section {
  font-weight: bold;
  margin-bottom: 20px;
}

.progress-text {
  font-size: 14px;
  font-weight: bold;
  color: black;
}

.container-info-section {
  border-radius: 16px;
  background-color: #fafafa;
  width: 97%;
  margin-bottom: 20px;
}

.container-button-section {
  width: 95.7%;
  margin-top: -20px;
  padding-bottom: 20px;
}

.detail-section {
  font-size: 16px;
}

.confirm-header-section {
  font-weight: bold;
  margin-bottom: 16px;
}

.v-autocomplete .v-input__control,
.v-text-field .v-input__control {
  border-radius: 8px;
  font-size: 11px;
}

.calendar-icon-color .v-icon {
  color: blue !important;
}

.btn-style {
  border-radius: 16px;
  width: 50%;
}

.v-input--selection-controls__input .mdi-radiobox-blank {
  color: #3b76ef;
}
.margin-top-10 {
  margin-top: 10px;
}
</style>
