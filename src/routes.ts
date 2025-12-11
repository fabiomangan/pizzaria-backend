import express, { NextFunction, Request, Response } from 'express'

const app = express();

app.use(express.json());

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});