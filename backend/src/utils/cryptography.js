import argon2 from 'argon2';

// O argon2 é uma biblioteca que implementa o algoritmo de hash de senha Argon2, 
// que é considerado o melhor algoritmo de hash de senha atualmente. Ele é mais 
// seguro que o bcrypt e o scrypt, que são os algoritmos mais comuns utilizados para fazer hash de senha.

// Função para fazer hash da senha
const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        console.error('Erro ao fazer hash da senha:', error);
        return null;
    }
}

// Função para verificar a senha
const verifyPassword = async (hashedPassword, password) => {
    try {
        const validPassword = await argon2.verify(hashedPassword, password);
        return validPassword;
    } catch (error) {
        console.error('Erro ao verificar a senha:', error);
        return null;
    }
}

// Exporta as funções para serem utilizadas em outros arquivos
export { hashPassword, verifyPassword };