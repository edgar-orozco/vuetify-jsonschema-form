# vuetify-jsonschema-form

Generate forms for the [vuetify](https://vuetifyjs.com/en/) UI library (vuejs) based on annotated JSON schemas.

For a view of all the functionalities check the [demo](https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/).

## Usage

    npm i --save @edgar-orozco/vuetify-jsonschema-form

```
<template>
  <v-form v-model="formValid">
    <v-jsonschema-form v-if="schema" :schema="schema" :model="dataObject" :options="options" @error="showError" />
  </v-form>
</template>

<script>

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Draggable from 'vuedraggable'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.min.css'
import VJsonschemaForm from '@edgar-orozco/vuetify-jsonschema-form'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

Vue.component('swatches', Swatches)
Vue.component('draggable', Draggable)

export default {
  components: {VJsonschemaForm},
  data: function() {
    return {
      schema: {...},
      dataObject: {},
      formValid: false,
      options: {
        debug: false,
        disableAll: false,
        autoFoldObjects: true
      }
    }
  },
  methods: {
    showError(err) {
      window.alert(err)
    }
  }
}

</script>
```
