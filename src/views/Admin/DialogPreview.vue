<template>
  <v-row>
    <v-col>
      <v-overlay :value="loading"></v-overlay>
      <div class="text-center progress-center" v-show="loading">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-show="!loading">
        <v-dialog v-model="dialog" max-width="70%">
          <v-card>
            <v-card-title class="headline text-center">
              <v-row class="justify-center text-center" ref="pdfform">
                <v-spacer></v-spacer>
                <v-col cols="10">
                </v-col>
                <v-col cols="1" sm="1" md="1" lg="1">
                  <v-btn icon color="#166BF9" @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-card outlined>
                 <vue-pdf-embed :source="src" />
              </v-card>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import EventBus from '@/event-bus'
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
export default {
  data: () => ({
    dialog: false,
    src: '',
    file: '',
    numPages: undefined,
    loading: false
  }),
  components: {
  // FormDocument
  // pdf
    VuePdfEmbed
  },
  mounted () {
    EventBus.$on('preview-receipt', this.getdata)
  },
  created () {
  // this.url = process.env.VUE_APP_API_URL
  },
  watch: {
    dialog (val) {
      if (val === false) {
        this.loading = false
        this.$refs.pdfform.scrollIntoView()
      }
    }
  },
  methods: {
    async getdata (item) {
      console.log('item', item)
      this.loading = true
      const getLink = await this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/api/payment/getreceipt?order_id=${item.order_id}`
      }).then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      this.dialog = true
      this.src = getLink.data.pdfURL.pdfURL
    }
  },
  beforeDestroy () {
    EventBus.$off('preview-receipt')
  }
}
</script>

<style scoped>
.progress-center {
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.pdf-border{
  border-radius: 16px 0px 0px 0px;
}
</style>
