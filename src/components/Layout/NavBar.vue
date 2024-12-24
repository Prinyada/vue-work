<template>
  <div>
    <v-navigation-drawer v-model="drawer" app class="container-sidebar">
      <img class="top-left" src="../../assets/trva/nav-top-left.png"/>
      <img class="top-right" src="../../assets/trva/nav-top-right.png"/>

      <img class="bottom-left" src="../../assets/trva/nav-bottom-left.png"/>
      <img class="bottom-right" src="../../assets/trva/nav-bottom-right.png"/>
      <v-card flat color="transparent" class="sidebar-header">
        <v-row no-gutters class="logo">
          <v-img width="100" height="100" src="@/assets/trva/logo.png" />
        </v-row>
        <p class="name-title">ระบบสมาชิกสมาคมสัตวแพทย์</p>
        <p class="name-title">ผู้ควบคุมฟาร์มสัตว์เคี้ยวเอื้อง</p>
        <p class="name-sub-title">(Thai Ruminant Veterinary Association)</p>
      </v-card>
      <v-divider class="line"></v-divider>
      <v-list class="tap">
        <v-card
          v-for="(item, i) in items"
          :key="i"
          dense
          elevation="0"
          @click="navigateTo(item.route)"
          :class="{
            'tap-menu-active tap-menu': isActive(item.route),
            'tap-menu-inactive tap-menu': !isActive(item.route),
          }"
        >
          <router-link :to="item.route" class="link-router">
            <v-icon
              :color="
                isActive(item.route) ? '#FFFFFF' : 'rgba(165, 188, 215, 1)'
              "
              >{{ item.icon }}</v-icon
            >
            &nbsp;
            <p
              :class="{
                'text-active text-1': isActive(item.route),
                'text-inactive text-1': !isActive(item.route),
              }"
            >
              {{ item.text }}
            </p>
          </router-link>
        </v-card>
      </v-list>
    </v-navigation-drawer>

    <div class="navbar">
      <v-btn
        class="button-menu"
        width="44"
        height="44"
        fab
        color="#FFFFFF"
        elevation="2"
        @click="toggleDrawer"
      >
        <v-icon color="rgba(22, 107, 249, 1)">mdi-menu</v-icon>
      </v-btn>

      <v-card class="card-logout" elevation="1" @click="toggleDropdown">
        <v-col class="pa-0">
          <v-row no-gutters>
            <div class="img-admin">
              <img
                width="40"
                height="40"
                src="../../assets/trva/Non-profile.png"
              />
            </div>
            <div class="name-admin">
              <p
                class="text-1"
                style="color: #000000; font-size: 16px; font-weight: 500"
              >
                {{ adminData.username }}
              </p>
              <p
                class="text-1"
                style="color: #a5bcd7; font-size: 12px; font-weight: 400"
              >
              {{ adminData.role }}
              </p>
            </div>
            <div class="arrow-down">
              <v-icon v-if="!dropdownVisible" color="rgba(22, 107, 249, 1)">mdi-chevron-down</v-icon>
              <v-icon v-else color="rgba(22, 107, 249, 1)">mdi-chevron-up</v-icon>
            </div>
          </v-row>
        </v-col>

        <v-row no-gutters v-show="dropdownVisible" class="dropdown-content">
          <v-col>
            <v-card class="card-logout" @click="logOut">
              <v-card-actions>
                <v-btn  class="transparent-btn">
                  <v-icon color="333333" small> mdi-logout </v-icon>
                  ออกจากระบบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      drawer: true,
      dropdownVisible: false,
      adminData: {
        username: '',
        role: ''
      },
      selectedItem: 0,
      items: [
        { text: 'ข้อมูลสมาชิก', icon: 'mdi-account', route: '/admin/members' },
        {
          text: 'รายการชำระเงิน',
          icon: 'mdi-credit-card-outline',
          route: '/admin/payment'
        }
        // {
        //   text: 'แดชบอร์ด',
        //   icon: 'mdi-view-dashboard',
        //   route: '/admin/dashboard'
        // }
      ]
    }
  },
  created () {
    this.initialize()
    const storedAdminData = localStorage.getItem('adminData')
    this.adminData = JSON.parse(storedAdminData)
  },
  computed: {
    ...mapGetters(['getterBreadcrumbs'])
  },
  async mounted () {},
  methods: {
    ...mapActions(['actionSetBreadcrumbs']),
    initialize () {},
    navigateTo (route) {
      this.$router.push(route).catch((err) => {
        if (err.name !== 'NavigationDuplicated') {
          throw err
        }
      })
    },
    isActive (route) {
      return this.$route.path === route
    },
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    toggleDropdown () {
      this.dropdownVisible = !this.dropdownVisible
    },
    logOut () {
      this.$cookies.remove('token')
      this.$router.push('/login')
      localStorage.removeItem('adminData')
    }
  }
}
</script>
<style scoped>
.container-sidebar {
  background: linear-gradient(179.75deg, #FFFFFF 82.71%, #8BBBFF 115.44%, #227EFF 135.57%);
  border-radius: 0px 24px 24px 0px !important;
  height: 100vh !important;
  padding: 15px !important;
}
.sidebar-header {
  margin-top: 20px !important;
}
.logo {
  display: flex !important;
  justify-content: center !important;
  flex-direction: column !important;
  align-items: center !important;
}
.name-title {
  text-align: center !important;
  margin-bottom: 0 !important;
  font-size: 16px !important;
}
.name-sub-title {
  text-align: center !important;
  margin-bottom: 0 !important;
  font-size: 12px !important;
}
.line {
  margin: 10px !important;
}
.link-router {
  text-decoration: none !important;
  display: flex !important;
}
.top-left {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
}
.top-right {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
}
.bottom-left {
  position: absolute !important;
  bottom: 0 !important;
  left: 0 !important;
}
.bottom-right {
  position: absolute !important;
  bottom: 0 !important;
  right: 0 !important;
}
.tap-menu {
  border-radius: 16px !important;
  display: flex !important;
  align-items: center !important;
  padding: 8px !important;
  margin-bottom: 10px !important;
}
.tap-menu-active {
  background: rgba(22, 107, 249, 1) !important;
}
.tap-menu-inactive {
  background: transparent !important;
}
.text-active {
  color: #ffffff !important;
}
.text-inactive {
  color: rgba(165, 188, 215, 1) !important;
}
/* navbar */
.navbar {
  padding: 15px 20px 0px 20px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}
.card-logout {
  background-color: #ffffff !important;
  height: auto !important;
  display: flex !important;
  justify-content: space-between !important;
  padding: 4px 8px 4px 8px !important;
  border-radius: 16px !important;
}
.img-admin {
  display: flex;
  align-items: center;
}
.name-admin {
  margin-left: 10px;
  margin-right: 10px;
}
.arrow-down {
  display: flex !important;
  align-items: center !important;
}
.text-1 {
  margin-bottom: 0 !important;
}
.dropdown-content {
  height: 16px !important;
  border-radius: 20px !important;
  margin-top: 1px;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: flex;
  z-index: 1;
}
.transparent-btn {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
