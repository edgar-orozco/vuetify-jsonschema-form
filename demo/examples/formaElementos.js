module.exports = {
  title: 'Forma objetos',
  schema: {
    '$id': 'https://example.com/formaobjetos.schema.json',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    description: 'Representación de la forma dinámica',
    type: 'object',
    properties: {
      nombreSeccion: {
        type: 'string',
        title: 'Nombre de la sección',
        description: 'Esta es la sección donde se conforman los elementos'
      },
      elementos: {
        type: 'array',
        description: 'Listado de elementos que integran la forma.',
        noedit: true,
        items: {
          '$ref': '#/definitions/elementos'
        }
      }
    },
    definitions: {
      textosimple: {
        title: 'Texto simple',
        noedit: true,
        properties: {
          type: {const: 'text'}
        }
      },
      check: {
        title: 'Opción tipo "check"',
        noedit: true,
        properties: {
          type: {const: 'boolean'}
        }
      },
      entero: {
        title: 'Entrada numérica',
        noedit: true,
        properties: {
          type: {const: 'string'}
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
              'type': 'string'
            }
          }
        }
      },
      fecha: {
        title: 'Fecha',
        properties: {
          type: {const: 'date'},
          fecha: {type: 'string', 'format': 'date', 'title': 'La Fecha', 'description': 'Es la fecha para probar esta cosa'}
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
          tipoElemento: {
            type: 'object',
            oneOf: [
              {$ref: '#/definitions/textosimple'},
              {$ref: '#/definitions/selector'},
              {$ref: '#/definitions/check'},
              {$ref: '#/definitions/fecha'}]
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
