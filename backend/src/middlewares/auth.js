import jwt from 'jsonwebtoken';
import prisma from '../prisma.service.js';


// Middleware para verificar o token de autenticação
async function isAuthenticated(req, res, next) {

    // Pega o token de autenticação do cabeçalho da requisição (Bearer <token>)
    const token = req.headers['authorization'].split(' ')[1];

    // Verifica se o token existe
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado.' });
    }

    try {

        // Extrai o token do cabeçalho (Bearer <token>)


        // Verifica se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Busca o usuário no banco de dados
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
                username: decoded.username
            }
        });

        // Verifica se o usuário existe
        if (!user) {
            return res.status(401).json({ message: 'Acesso negado.' });
        }

        // Adiciona o usuário na requisição
        req.user = user;

        // Chama o próximo middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Acesso negado.' });
    }
}

export { isAuthenticated };