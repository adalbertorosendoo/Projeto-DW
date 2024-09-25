import express from 'express';
import prisma from '../prisma.service.js';
import { isAuthenticated } from '../middlewares/auth.js';


// Cria um objeto de roteamento
const router = express.Router();


// Rota para listar o histórico de arquivos do usuário logado
router.get('/log-upload', isAuthenticated, async (req, res) => {

    const { id } = req.user;

    // Busca os arquivos do usuário no banco de dados
    const files = await prisma.file.findMany({
        where: {
            userId: id
        }
    });

    // Retorna a resposta para o frontend
    return res.json(files);
});



// Rota para listar o histórico de arquivos do usuário logado do mais recente para o mais antigo (limitada a 6 registros)
router.get('/log-upload/recent', isAuthenticated, async (req, res) => {

    const { id } = req.user;

    // Busca os arquivos do usuário no banco de dados
    const files = await prisma.file.findMany({
        where: {
            userId: id
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 6
    });

    // Retorna a resposta para o frontend
    return res.json(files);
});




// Rota para retornar total de uploads, total de uploads sucesso e total de uploads falha do usuário logado
router.get('/log-upload/stats', isAuthenticated, async (req, res) => {

    const { id } = req.user;

    // Busca os arquivos do usuário no banco de dados
    const files = await prisma.file.findMany({
        where: {
            userId: id
        }
    });

    // Conta o total de uploads
    const total = files.length;

    // Conta o total de uploads com sucesso
    const totalSuccess = files.filter(file => file.status === 'sucesso').length;

    // Conta o total de uploads com falha
    const totalFail = files.filter(file => file.status === 'falhou').length;

    // Retorna a resposta para o frontend
    return res.json({ total, totalSuccess, totalFail });
});


// Exporta o objeto de roteamento
export default router;