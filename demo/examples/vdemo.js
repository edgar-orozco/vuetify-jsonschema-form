module.exports = {
  '$id': 'https://example.com/checklist.schema.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  title: 'Multiple elements',
  schema: {
    'id': 'elcheck-tracto',
    'title': 'Check list para tractocamión',
    'noedit': true,
    'type': 'object',
    required: ['gender', 'fecha_vencimiento_extintor'],
    'properties': {
      'fecha_vencimiento_extintor': {
        'id': 'la-fecha-devemcimiento',
        'noedit': true,
        'type': 'string',
        'format': 'date',
        'title': 'Fecha de vencimiento del extintor',
        'description': 'Es la fecha en que vence la revisión del extintor.'
      },
      'gender': {
        'id': '23423423hhhj',
        'type': 'string',
        'noedit': true,
        'title': 'El gender',
        'description': "The person's gender.",
        enum: ['male', 'female', 'trans'],
        'x-radio': true
      },
      'impuesto': {
        'id': 'g1554925071726',
        'type': 'object',
        'noedit': true,
        'title': 'Impuestos aplicables',

        'required': [],
        'properties': {
          'impuestos': {
            'id': 'a1554925097284',
            'idg': 'g1554925071726',
            'type': 'input-enabler',
            'input-enabler': true,
            'title': 'Impuesto',
            'description': 'Seleccione el impuesto que aplica',
            'enum': [
              {impuesto: 'IVA', tasa: 0.16},
              {impuesto: 'IEPS', tasa: 0.23},
              {impuesto: 'IETU', tasa: ''}
            ]
          },

          'gender': {
            'id': '23423423hhhj',
            'type': 'string',
            'noedit': true,
            'title': 'El gender',
            'description': "The person's gender.",
            enum: ['male', 'female', 'trans'],
            'x-radio': true
          }


        }
      },
      'articulos_en_tracto': {
        'id': 'articulos-entracto',
        'noedit': true,
        type: 'object',
        title: 'Artículos en tracto',
        required: ['firma'],
        properties: {
          'firma': {
            'id': '23423423i',
            title: 'Firmar checklist',
            'noedit': true,
            type: 'string',
            description: 'Firme el checlist',
            'x-signpad': true
          },
          'comprobantes': {
            'id': '23423423ci',
            title: 'Comprobantes',
            type: 'string',
            description: 'Ingrese el documento comprobante del gasto',
            'x-photo-doc': true
          },
          'alarma_retroceso': {
            'id': 'la-alaramaretro',
            title: 'Alarma retroceso',
            type: 'boolean',
            description: 'Seleccione si es que la alarma de retroceso funciona correctamente'
          },
          'botiquin_primerosauxilios': {
            'id': 'botiquinprimerosayx',
            title: 'Botiquín de primeros auxilios',
            type: 'boolean',
            description: 'Seleccione si es que el botiquín de primeros auxilios existe'
          },
          'celular_operativo': {
            'id': '23423423a',
            title: 'Celular operativo',
            type: 'boolean',
            description: 'Seleccione si es que se encuentra el teléfono celular operando normalmente'
          },
          'cunias': {
            'id': '23423423b',
            title: 'Cuñas en buen estado',
            type: 'boolean',
            description: 'Seleccione si es que las cuñas se encuentran en buen estado'
          },
          'kit_emergencia': {
            'id': '23423423c',
            title: 'Kit de emergencia',
            type: 'boolean',
            description: 'Seleccione si es que se encuentra el kit de emergencia'
          },
          'kit_electrico': {
            'id': '23423423d',
            title: 'Kit eléctrico',
            type: 'boolean',
            description: 'Seleccione si es que se encuentra el kit eléctrico'
          },
          'kit_herramientas': {
            'id': '23423423e',
            title: 'Kit de herramientas',
            type: 'boolean',
            description: 'Seleccione si es que se encuentra el kit de herramientas completo'
          },
          'lava_ojos': {
            'id': '23423423f',
            title: 'Kit lava ojos con agua',
            type: 'boolean',
            description: 'Seleccione si es que se encuentra el kit lavaojos con agua'
          },
          'letrero_expedidor': {
            'id': '23423423g',
            title: 'Letrero expedidor',
            type: 'boolean',
            description: 'Seleccione si es que se encuentra el letrero expedidor'
          },
          'letrero_nu_mas_rombo': {
            'id': '23423423h',
            title: 'Letrero NU + rombo',
            type: 'boolean',
            description: 'Seleccione si es que se encuentra el letrero expedidor'
          }
        }
      }
    }
  }
}
