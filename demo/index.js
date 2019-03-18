import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DemoApp from './DemoApp.vue'
import Draggable from 'vuedraggable'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.min.css'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

Vue.component('swatches', Swatches)
Vue.component('draggable', Draggable)

new Vue({
  el: '#app',
  components: {DemoApp},
  render: h => h('demo-app')
})
