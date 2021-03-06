module.exports = {
  title: 'Dependencies',
  schema: {
    type: 'object',
    properties: {
      name: { 'type': 'string' },
      acceptTC: {
        title: 'Accept terms and conditions',
        type: 'boolean'
      }
    },
    dependencies: {
      acceptTC: {
        oneOf: [
          {$ref: '#/definitions/fecha'},
          {$ref: '#/definitions/creditCardPayment'},
          {$ref: '#/definitions/paypalPayment'}]
      }
    },
    definitions: {
      fecha: {
        title: 'Fecha',
        properties: {
          type: {const: 'date'},
          fecha: {type: 'string', 'format': 'date', 'title': 'La Fecha', 'description': 'Es la fecha para probar esta cosa'}
        }
      },
      creditCardPayment: {
        title: 'Credit card payment',
        properties: {
          type: {const: 'creditcardpayment'},
          credit_card: { 'type': 'number' }
        },
        required: ['credit_card'],
        dependencies: {
          credit_card: {
            properties: {
              billing_address: { 'type': 'string' }
            },
            required: ['billing_address']
          }
        }
      },
      paypalPayment: {
        title: 'Paypal payment',
        properties: {
          type: {const: 'paypalpayment'},
          paypal_account: { 'type': 'string' }
        },
        required: ['paypal_account']
      }
    }
  },
  data: {
    // acceptTC: true,
    // type: 'creditcardpayment',
    // credit_card: 10
  }
}
