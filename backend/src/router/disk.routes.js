import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { getDiskUsage } from '../utils/ssh2.js';

// Cria um objeto de roteamento
const router = express.Router();

// Rota para pegar o uso de disco
router.get('/disk-usage', isAuthenticated, async (req, res) => {
    try {
        // Pega o usuário autenticado
        const { username } = req.user; // Considerando que req.user contém o usuário logado

        // Chama a função que faz a conexão SSH e retorna o uso do disco
        const diskUsage = await getDiskUsage(username); // Use await para aguardar a Promise

        // Retorna o uso de disco para o frontend
        res.json({ diskUsage });
    } catch (error) {
        console.error('Erro ao pegar uso de disco:', error);
        res.status(500).json({ error: 'Falha ao pegar uso de disco.' });
    }
});

export default router;
