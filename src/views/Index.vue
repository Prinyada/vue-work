<template>
  <div>
    <Navbar/>
    <router-view />
  </div>
</template>

<script>
import Navbar from '../components/Layout/NavBar.vue'
export default {
  components: {
    Navbar
  },
  data () {
    return {}
  },
  computed: {}
}
</script>

<style></style>
