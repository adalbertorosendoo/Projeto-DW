// Objetivo: Funções de autenticação e proteção de rotas

// Função para verificar se o usuário está autenticado
function isAuthenticated() {
    const token = localStorage.getItem('token:acronis');
    if (!token) {
        return false;
    }

    return token;
}


// Função para redirecionar o usuário para a página de login
function redirectToLogin() {
    window.location.href = '/';
}

// Função para deslogar o usuário
function logout() {
    localStorage.removeItem('token:acronis');
    redirectToLogin();
}

// Função para proteger uma página
function protectPage() {

    // Se o usuário não estiver autenticado, redireciona para a página de login
    if (!isAuthenticated()) {
        redirectToLogin();
    }
}

// Exporta as funções para serem utilizadas em outros arquivos
export { isAuthenticated, redirectToLogin, logout, protectPage };