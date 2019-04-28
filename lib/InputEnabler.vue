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
    props: ['listaImpuestos', 'impuesto', 'value', 'tasa'],
    data: function () {
      return {
        impuestos: null,
        tasas: this.tasa
      }
    },
    watch: {
      impuestos: function (nv, ov) {
        if (!this.value.impuestos) {
          this.value.impuestos = [];
          this.value.tasas = [];
        }
        if (nv) {
          if (this.value.impuestos.includes(this.impuestos)) return;
          this.value.impuestos.push(this.impuestos);
          let limp = this.listaImpuestos;
          for (let i = 0; i < limp.length; i++) {
            if (limp[i].impuesto === this.impuestos) {
              this.tasas = limp[i].tasa;
              this.value.tasas.push(this.tasas);
              break;
            }
          }
        }
        else if (!nv && ov) {
          this.value.impuestos.splice(this.value.impuestos.indexOf(ov), 1);
          this.value.tasas.splice(this.value.tasas.indexOf(this.tasas), 1);
        }
      },
      tasas: function (nv, ov) {
        if (!this.value.tasas) {
          this.value.tasas = [];
          return;
        }
        this.value.tasas.splice(this.value.tasas.indexOf(ov), 1, nv);
      }
    }
  }
</script>

<style scoped>
</style>