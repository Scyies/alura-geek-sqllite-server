import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query'],
});

app.get('/produtos', async (req, res) => {
  const produtos = await prisma.produtos.findMany();

  return res.json(produtos);
});

app.get('/produtos/:id', async (req, res) => {
  const produtoId = req.params.id;

  const produto = await prisma.produtos.findMany({
    where: {
      id: produtoId,
    },
  });

  return res.json(produto);
});

app.post('/produtos', async (req, res) => {
  const body = req.body;

  const newProduto = await prisma.produtos.create({
    data: {
      name: body.name,
      preco: body.preco,
      descricao: body.descricao,
      row: body.row,
      img: body.img,
    },
  });

  return res.status(201).json(newProduto);
});

app.delete('/produtos/:id', async (req, res) => {
  const produtoId = req.params.id;

  const removedProduto = await prisma.produtos.delete({
    where: {
      id: produtoId,
    },
  });

  return res.json(removedProduto);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
