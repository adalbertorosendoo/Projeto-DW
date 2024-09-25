import express from 'express';
import upload from '../utils/multer.js';
import { sftpUpload } from '../utils/sftp.js';
import prisma from '../prisma.service.js';
import { isAuthenticated } from '../middlewares/auth.js';


// Cria um objeto de roteamento
const router = express.Router();


// Rota para upload de arquivos
router.post('/upload', isAuthenticated, upload.single('file'), async (req, res) => {

    const { file } = req;
    const { id, username } = req.user;

    // Verifica se existe um arquivo
    if (!file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    // Monta o caminho do arquivo no servidor
    const remoteFilePath = `backup/${username}/${file.originalname}`;

    // Faz o upload do arquivo para o servidor SFTP e retorna o status
    const status = await sftpUpload(file.path, remoteFilePath);

    // Armazena as informações do arquivo no banco de dados
    const uploadedFile = await prisma.file.create({
        data: {
            name: file.originalname,
            path: remoteFilePath,
            size: file.size,
            status: status ? 'sucesso' : 'falhou',
            userId: id
        }
    });

    // Retorna a resposta para o frontend
    if (status) {
        return res.json({ message: 'Arquivo enviado com sucesso.', file: uploadedFile });
    } else {
        return res.status(500).json({ message: 'Falha ao enviar arquivo.', file: uploadedFile });
    }
});



// Exporta o objeto de roteamento
export default router;