import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

// Cria uma instância do PrismaClient
const prisma = new PrismaClient()


// Função principal para criar o usuário admin no banco de dados com a senha adminadmin criptografada com o Argon2
async function main() {

    // Cria o usuário admin no banco de dados
    const user = await prisma.user.create({
        data: {
            username: 'admin',
            email: 'admin@acronis.io',
            password: await argon2.hash('adminadmin'),
        },
    })

    // Exibe o usuário criado no console
    console.log(user)
}


// Chama a função principal
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })