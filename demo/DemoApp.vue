<template lang="html">
  <v-app>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-title>vuetify-jsonschema-form demo</v-toolbar-title>
    </v-toolbar>
    <v-content>

        {{modelo}}

        <v-container class="impuestos-container" grid-list-md text-xs-center v-for="(item, index) in listaImpuestos">
            <input-enabler
                    :model="modelo"
                    :lista-impuestos="listaImpuestos"
                    v-bind:impuesto="item.impuesto"
                    v-bind:tasa="item.tasa"
            />

        </v-container>


        <template>
            <div class="">
                <v-btn fab outline small>
                    <v-icon dark small>photo_camera</v-icon>
                </v-btn>

                <v-btn fab outline small @click.stop="addFile">
                    <v-icon dark small>folder</v-icon>
                    <input type="file" id="file" name="file" @change="onFile" ref="file"/>
                </v-btn>

                <v-btn fab outline small>
                    <v-icon dark small>photo</v-icon>
                </v-btn>

            </div>
        </template>

      <v-container fluid grid-list-md>
        <v-layout row>
          <v-flex xs6>
            <h2 class="title my-4">Schema:</h2>
            <v-layout row wrap>
              <v-flex xs6>
                <v-select :items="examples" v-model="example" :return-object="true" item-text="title" label="Choose an example" @change="applyExample" />
              </v-flex>
              <v-flex xs6>
                <v-container>
                  <v-layout row wrap>
                    <v-spacer/>
                    <v-btn color="primary" @click="applySchema">Apply</v-btn>
                    <v-btn @click="formatSchema">Format</v-btn>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>

            <v-textarea v-model="schemaStr" :error-messages="schemaError ? [schemaError.message] : []" :rows="20"/>
          </v-flex>
          <v-flex xs6>
            <h2 class="title my-4">
              Form
              <v-chip v-if="formValid" color="success">valid</v-chip>
              <v-chip v-else color="danger">invalid</v-chip>
              <v-btn color="primary" @click="$refs.myForm.validate()">validate</v-btn>
            </h2>

            <v-form ref="myForm" v-model="formValid">
              <v-jsonschema-form v-if="schema"
                                 :schema="schema"
                                 :model="dataObject"
                                 :options="{debug: true,
                                    editable: true,
                                    locale: 'es',
                                    i18n: { es: {cancel: 'Cancelar', ok: '-OK-'}},
                                    disableAll: false,
                                    requiredMessage: 'Este dato es requerido',
                                    noDataMessage: 'No se han encontrado coincidencias',
                                    autoFoldObjects: false,
                                    context: {owner: {type: 'organization', id: '5a5dc47163ebd4a6f438589b'}}, accordionMode: 'normal'}"
                                 @error="e => window.alert(e)" />
            </v-form>
            <h2 class="title my-4">Data:</h2>
            <pre>{{ JSON.stringify(dataObject, null, 2) }}</pre>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import VJsonschemaForm from '../lib/index.vue'
import FileUpload from 'vue-base64-file-upload';
import InputEnabler from '../lib/InputEnabler.vue';

import examples from './examples'
import hjson from 'hjson' // more tolerant parsing of the schema for easier UX

export default {
  components: {VJsonschemaForm, FileUpload, InputEnabler},
  data: function() {
    return {
      window,
      listaImpuestos: [{impuesto:'IVA',tasa:0.16}, {impuesto:'IEPS',tasa:.23},],
      impuestos: [], tasas:[], modelo: { impuestos:[], tasas:[] },
      schema: null,
      schemaStr: '{}',
      schemaError: null,
      dataObject: {},
      examples,
      customImageMaxSize: 3,
      example: examples[0],
      formValid: false
    }
  },
  mounted() {
    this.applyExample();
  },
  created(){
    this.$bus.$on('clicked-element-edit', id => {
      console.log(`Oh, that's nice. It's gotten ${id} edited! :)`)
    });
  },
  methods: {
    addFile(){
        this.$refs.file.click();
    },
    onFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        //this.$emit("onLoad", e.target.result);
        console.log(e.target.result); // data-uri string
      }
      reader.readAsDataURL(file);
    },

    onLoad(dataUri) {
      console.log('entra acui');
      console.log(dataUri); // data-uri string
    },

    onSizeExceeded(size) {
      alert(`Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`);
    },
    clickOnEditElement(ele){
        console.log('desde el demo app',ele);
    },
    applySchema() {
      try {
        this.schema = hjson.parse(this.schemaStr)
        this.schemaError = null
      } catch (err) {
        this.schemaError = err
      }
    },
    formatSchema() {
      try {
        const schema = hjson.parse(this.schemaStr)
        this.schemaStr = JSON.stringify(schema, null, 2)
        this.schemaError = null
      } catch (err) {
        this.schemaError = err
      }
    },
    applyExample() {
      this.schema = null
      setTimeout(() => {
        this.dataObject = JSON.parse(JSON.stringify(this.example.data || {}))
        this.schemaStr = JSON.stringify(this.example.schema, null, 2)
        this.applySchema()
      }, 1)
    }
  }
}
</script>

<style lang="css">
    .vjsf-property .v-subheader {
        font-size: 16px;
        background-color: white;
    }

    .vjsf-tooltip p:last-child {
        margin-bottom: 0;
    }
    .editable{
        border: thin dashed violet;
        margin-left: -100px;
    }

    [type="file"] {
        height: 0;
        overflow: hidden;
        width: 0;
    }
    .file-selected {
        border: thin greenyellow solid !important;
        color: greenyellow !important;
    }
    .photo-selected {
        border: thin greenyellow solid !important;
        color: greenyellow !important;
    }
</style>
