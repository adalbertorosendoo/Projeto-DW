import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.service.js';
import { verifyPassword } from '../utils/cryptography.js';
import { createUserDirectoryOnSFPT } from '../utils/sftp.js';

// Cria um objeto de roteamento
const router = express.Router();


router.post('/login', async (req, res) => {

    // Pega os valores dos campos de input no corpo da requisição
    const { email, password } = req.body;

    // Verifica se os campos estão preenchidos
    if (!email || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    // Verifica se a senha é válida (mínimo de 8 caracteres)
    if (password.length < 8) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 8 caracteres.' });
    }

    // Busca o usuário no banco de dados
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    // Verifica se o usuário existe
    if (!user) {
        return res.status(400).json({ message: 'E-mail ou senha incorretos, tente novamente.' });
    }

    // Verifica se a senha é válida
    const validPassword = await verifyPassword(user.password, password);
    if (!validPassword) {
        return res.status(400).json({ message: 'E-mail ou senha incorretos, tente novamente.' });
    }

    // Cria o diretório do usuário no servidor SFTP de backup
    const directoryCreated = await createUserDirectoryOnSFPT(user.username);

    // Verifica se o diretório foi criado
    if (!directoryCreated) {
        return res.status(500).json({
            message: 'O servidor de backup não está disponível no momento. Tente novamente mais tarde.'
        });
    }

    // Gera um token de autenticação
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: process.env.JWT_ALGORITHM
    });


    // Retorna o token para o frontend
    return res.json({ auth: true, token: token });

});



router.post('/logout', (req, res) => {

    // Retorna um token nulo para desautenticar o usuário no frontend (remover o token do localStorage)
    return res.json({ auth: false, token: null });
});



// Exporta o objeto de roteamento
export default router;