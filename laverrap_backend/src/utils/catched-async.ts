/** Funcion de orden superior: Recibe una funcion(en este caso los controladores) y/o
 * devuelve una nueva funcion que maneja errores asincronos.
 *
 * @param fn Funcion asincrona a envolver
 * @returns Nueva funcion que maneja errores asincronos
 */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const catchedAsync = (
  fn: (req: Request, res: Response) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch((error: Error | ZodError | unknown) => next(error));
  };
};
