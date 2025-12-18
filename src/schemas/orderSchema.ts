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

export const addItemSchema = z.object({
  body: z.object({
    order_id: z.string({ message: "order deve ser uma string" }).min(1, "A order_id deve ser obrigatória"),
    product_id: z.string({ message: "product_id deve ser uma string" }).min(1, "O product_id deve ser obrigatória"),
    amount: z.number().int("Quantidade deve ser um número inteiro").positive("Quantidade deve ser no mínimo 1"),
  }),
});
 
export const removeItemSchema = z.object({
  query: z.object({
    item_id: z.string({ message: "item_id deve ser uma string" }).min(1),
  }),
});

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z.string({ message: "order_id deve ser uma string" }).min(1, "order_id é obrigatório"),
  }),
});

export const sendOrderSchema = z.object({
  body: z.object({
    order_id: z.string({ message: "ID do pdido precisa ser uma string" }),
    name: z.string({ message: "O nome é obrigatorio" }),
  }),
});
