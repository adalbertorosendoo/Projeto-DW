import express from 'express';
import prisma from '../prisma.service.js';
import { hashPassword } from '../utils/cryptography.js';

const router = express.Router();


router.post('/register', async (req, res) => {

    // Pega os valores dos campos de input no corpo da requisição
    const { username, email, password } = req.body;

    // Verifica se os campos estão preenchidos
    if (!username || !email || !password) {
        return res.status(400).json({ registered: false, message: 'Preencha todos os campos.' });
    }

    // Verifica se a senha é válida (mínimo de 8 caracteres)
    if (password.length < 8) {
        return res.status(400).json({ registered: false, message: 'A senha deve ter no mínimo 8 caracteres.' });
    }

    // Verifica se o e-mail já está cadastrado
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (user) {
        return res.status(400).json({ registered: false, message: 'E-mail já cadastrado.' });
    }

    // Faz o hash da senha
    const hashedPassword = await hashPassword(password);

    // Cria o usuário no banco de dados
    await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    }).catch(err => {
        return res.status(500).json({ registered: false, message: 'Erro ao cadastrar usuário.' });
    });

    return res.json({ registered: true, message: 'Usuário cadastrado com sucesso.' });

});

// Exporta o router
export default router;