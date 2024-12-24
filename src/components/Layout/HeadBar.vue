<template>
  <div>
    <v-app-bar class="px-3" dark color="primary" elevation="0"
    clipped-left
      height="56"
      app >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>
        <span class="font-20"> เว็บไซด์ </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-card flat color="transparent">
        <v-row no-gutters align="center">
          <v-avatar class="mx-3 avter-box" size="36">
            <img src="https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg" alt="John" />
          </v-avatar>

          <div>
          <span>Name Nmae</span>
          <br>
          <span>Role</span>
          </div>

          <v-btn class="ml-3">
           <span style="text-transform: capitalize;">Logout</span>
           <v-icon right>mdi-logout-variant</v-icon>
          </v-btn>
        </v-row>
      </v-card>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menu: false
    }
  },
  computed: {
  },
  methods: {
    logOut () {
    }
  }
}
</script>
<style scoped>
.avter-box {
  border: 1px solid #ffffff;
}
</style>
