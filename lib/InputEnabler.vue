<template>
    <v-layout row wrap>
        <v-flex xs6>
            <v-checkbox
                    v-model="impuestos"
                    :value="impuesto"
                    :label="impuesto"
            ></v-checkbox>
        </v-flex>
        <v-flex xs6>
            <v-text-field
                    v-model="tasas"
                    type="number"
                    :disabled="!impuestos"
                    :value="tasa"
                    label="Tasa"
            ></v-text-field>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: "input-enabler",
    props: ['listaImpuestos', 'impuesto', 'model', 'tasa'],
    data: function () {
      return {
        impuestos: null,
        tasas: this.tasa
      }
    },
    watch: {
      impuestos: function (nv, ov) {
        if (nv) {
          if (this.model.impuestos.includes(this.impuestos)) return;
          this.model.impuestos.push(this.impuestos);
          let limp = this.listaImpuestos;
          for (let i = 0; i < limp.length; i++) {
            if (limp[i].impuesto === this.impuestos) {
              this.tasas = limp[i].tasa;
              this.model.tasas.push(this.tasas);
              break;
            }
          }
        }
        else if (!nv && ov) {
          this.model.impuestos.splice(this.model.impuestos.indexOf(ov), 1);
          this.model.tasas.splice(this.model.tasas.indexOf(this.tasas), 1);
        }
      },
      tasas: function (nv, ov) {
        this.model.tasas.splice(this.model.tasas.indexOf(ov), 1, nv);
      }
    }
  }
</script>

<style scoped>
</style>