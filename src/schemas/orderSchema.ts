import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.number({ message: "Número da mesa é obrigatório" }).int({ message: "O número da mesa deve ser um inteiro" }),
    name: z.string({ message: "Nome do cliente é obrigatório" }).min(1, { message: "Nome do cliente não pode estar vazio" }),
  }),
});

export const listOrderSchema = z.object({
  query: z.object({
    draft: z.enum(["true", "false"], { message: "O parâmetro draft deve ser 'true' ou 'false'" }).optional().default("false").transform((value) => value === "true"),
  }),
});
