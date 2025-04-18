import * as Yup from 'yup';

const validationLoadSchema = Yup.object().shape({
  tipo: Yup.string()
    .required('El tipo es obligatorio.')
    .trim(),
  tipoCarga: Yup.string()
    .required('El tipo de carga es obligatorio.')
    .trim(),
  peso: Yup.string()
    .required('El peso es obligatorio.')
    .trim(),
  tipoEquipo: Yup.string()
    .required('El tipo de equipo es obligatorio.')
    .trim(),
  localidadCarga: Yup.string()
    .required('La localidad de carga es obligatoria.')
    .trim(),
  localidadDescarga: Yup.string()
    .required('La dirección de descarga es obligatoria.')
    .trim(),
  correo: Yup.string()
    .email('El correo debe ser válido.')
    .trim(),
  telefono: Yup.string()
    .required('El teléfono es obligatorio.')
    .matches(/^\d+$/, 'El teléfono solo debe contener números.')
    .trim(),
  puntoReferencia: Yup.string()
    .trim(),
  precio: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, 'El precio debe ser un número válido.')
    .trim(),
    // provinciaCarga: Yup.string()
    // .required('Selecciona provincia de Carga')
    // .trim(),
    // ciudadCarga: Yup.string()
    // .required('Selecciona ciudad de Carga')
    // .trim(),
    // provinciaDescarga: Yup.string()
    // .required('Selecciona provincia de Descarga')
    // .trim(),
    // ciudadDescarga: Yup.string()
    // .required('Selecciona ciudad de Descarga')
    // .trim(),
});

export default validationLoadSchema;
