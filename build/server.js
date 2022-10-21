"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient({
    log: ['query'],
});
app.get('/produtos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const produtos = yield prisma.produtos.findMany();
    return res.json(produtos);
}));
app.get('/produtos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const produtoId = req.params.id;
    const produto = yield prisma.produtos.findMany({
        where: {
            id: produtoId,
        },
    });
    return res.json(produto);
}));
app.post('/produtos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const newProduto = yield prisma.produtos.create({
        data: {
            name: body.name,
            preco: body.preco,
            descricao: body.descricao,
            row: body.row,
            img: body.img,
        },
    });
    return res.status(201).json(newProduto);
}));
app.delete('/produtos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const produtoId = req.params.id;
    const removedProduto = yield prisma.produtos.delete({
        where: {
            id: produtoId,
        },
    });
    return res.json(removedProduto);
}));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
