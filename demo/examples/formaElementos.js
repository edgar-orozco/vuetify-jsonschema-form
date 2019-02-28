module.exports = {
  title: 'Forma objetos',
  schema: {
    '$id': 'https://example.com/formaobjetos.schema.json',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    description: 'Representación de la forma dinámica',
    type: 'object',
    properties: {
      valoresElementos: {
        type: 'array',
        title: 'Valores de selección',
        description: 'Esta es la sección donde se conforman los elementos',
        items: {
          type: 'string'
        }
      },
      elemento: {
        '$ref': '#/definitions/tipoElemento'
      }
    },
    definitions: {
      tipoElemento: {
        type: 'object',
        oneOf: [
          {$ref: '#/definitions/textosimple'},
          {$ref: '#/definitions/selector'},
          {$ref: '#/definitions/fecha'},
          {$ref: '#/definitions/creditCardPayment'},
          {$ref: '#/definitions/paypalPayment'}]
      },
      textosimple: {
        title: 'Texto simple',
        properties: {
          type: {const: 'text'}
        }
      },
      selector: {
        title: 'Selector',
        properties: {
          type: {const: 'selector'},
          opciones: {
            type: 'array',
            title: 'Opciones',
            description: 'Ingrese las opciones que podrá escoger el usuario.',
            items: {
              type: 'string'
            }
          }
        }
      },
      fecha: {
        title: 'Fecha',
        properties: {
          type: {const: 'date'},
          fecha: {type: 'string', format: 'date', title: 'La Fecha', description: 'Es la fecha para probar esta cosa'}
        }
      },

      creditCardPayment: {
        title: 'Credit card payment',
        properties: {
          type: {const: 'creditcardpayment'},
          credit_card: { type: 'number' }
        },
        required: ['credit_card'],
        dependencies: {
          credit_card: {
            properties: {
              billing_address: { type: 'string' }
            },
            required: ['billing_address']
          }
        }
      },
      elementos: {
        type: 'object',
        required: [
          'elementoNombre'
        ],
        properties: {
          elementoNombre: {
            title: 'Nombre del elemento',
            type: 'string',
            description: 'Es la etiqueta que aparecerá al lado del elemento.'
          },
          elementoDescripcion: {
            title: 'Descripción o texto guía',
            type: 'string',
            description: 'Es el texto que aparecerá en la ayuda o información guía del elemento.'
          },
          elementoTipo: {
            type: 'string',
            title: 'Tipo de elemento',
            description: 'Es el tipo de elemento que aparecerá en pantalla.',
            oneOf: [
              {
                '$ref': '#/definitions/creditCardPayment'
              }
            ]
          },
          elementoObligatorio: {
            title: 'Obligatorio',
            type: 'boolean',
            description: '¿Es obligatorio introducir el elemento?'
          }
        }
      }
    }
  }
}
