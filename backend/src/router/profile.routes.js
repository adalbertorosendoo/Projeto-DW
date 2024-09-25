import express from 'express';
import prisma from '../prisma.service.js';
import { isAuthenticated } from '../middlewares/auth.js';

// Cria um objeto de roteamento
const router = express.Router();


router.get('/profile', isAuthenticated, async (req, res) => {

    // Busca o usuário no banco de dados
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,
            username: req.user.username
        },
        select: {
            id: true,
            username: true,
            email: true
        }
    });

    // Retorna os dados do usuário
    return res.json(user);

});


// Exporta o objeto de roteamento
export default router;