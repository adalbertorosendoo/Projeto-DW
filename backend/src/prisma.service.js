import { PrismaClient } from '@prisma/client'

// Instancia do PrismaClient para ser usada em toda a aplicação
const prisma = new PrismaClient()

// Exporta a instância do PrismaClient
export default prisma