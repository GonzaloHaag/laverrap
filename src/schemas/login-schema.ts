import { email, minLength, nonEmpty, object, pipe, string } from "valibot";

export const LoginSchema = object({
    email:pipe(string(), nonEmpty("El email es obligatorio"), email("Email inválido")),
    password: pipe(string(), minLength(6, "Minimo 6 caracteres"))
})