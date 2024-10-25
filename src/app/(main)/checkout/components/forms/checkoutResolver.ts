import * as yup from "yup"

export interface Checkout {
    name: string;
    phone: string;
    building: number;
    apto: number;
}

const checkoutSchema: yup.ObjectSchema<Checkout>= yup.object({
    name: yup.string().required("Por favor ingresa un nombre"),
    phone: yup.string().length(10, "El número de teléfono debe tener 10 caracteres").required("Por favor ingresa tu número de teléfono"),
    building: yup.number().typeError("¿ En que torre vives ?").required("¿ En que torre vives?"),
    apto: yup.number().typeError("¿ En que apto vives ?").required("Por favor ingresa el número de la piso"),
})

export default checkoutSchema;