<template>
    <v-row no-gutters class="align-start mb-2">
      <v-col cols="4" class="text-left">
        <span class="confirm-subject">{{ label }}</span>
      </v-col>
      <v-col cols="1" class="text-left">
        <span class="confirm-subject">: &nbsp;</span>
      </v-col>
      <v-col cols="7" class="text-left">
        <span class="confirm-detail">{{ value }}</span>
      </v-col>
    </v-row>
  </template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.confirm-detail {
    font-size: 16px;
    font-weight: 500;
}

.confirm-subject {
    font-size: 16px;
    color: #989898;
}
</style>
