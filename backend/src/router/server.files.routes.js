import express from 'express';
import { listFilesOnSFTP } from '../utils/sftp.js';
import { isAuthenticated } from '../middlewares/auth.js';

// Cria um objeto de roteamento
const router = express.Router();


// Rota para listar os arquivos no servidor SFTP
router.get('/server-files', isAuthenticated, async (req, res) => {

    const { username } = req.user;

    // Lista os arquivos no servidor SFTP
    const files = await listFilesOnSFTP(username);

    // Retorna a resposta para o frontend
    return res.json(files);
});


// Exporta o objeto de roteamento
export default router;