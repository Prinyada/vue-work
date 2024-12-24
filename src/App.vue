<template>
  <v-app>
    <v-main class="bg-color">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  font-family: 'Kanit', sans-serif !important;
}

html, body {
  font-family: 'Kanit', sans-serif !important;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Kanit', sans-serif !important;
  background-color: rgba(246, 250, 253, 1);
}

.bg-color {
  background-color: rgba(246, 250, 253, 1);
}

.datas-table-template {
  border: 1px solid #EBF4FF;
}

.datas-table-template  th {
  background:rgba(240, 246, 255, 1) !important;
  color: rgba(102, 150, 230, 1)!important;
}
.sticky-action-column .v-data-table__wrapper {
  overflow-x: auto;
}

.sticky-action-column th:nth-child(8),
.sticky-action-column td:nth-child(8) {
  width: 200px;
  position: sticky;
  right: 0;
  z-index: 1; /* Ensure the sticky column is above others */
}

.sticky-action-column th {
  z-index: 2; /* For the header to stay above the content */
}

.datas-table-template
  tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
  td {
  background: #F5F6FA !important;
}

 /* mobile */

.mobile-page-bg {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(0deg, #FFFFFF 53.19%, #006AFF 99.76%);
}
</style>
