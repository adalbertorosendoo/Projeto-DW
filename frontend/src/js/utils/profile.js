import { isAuthenticated } from "./auth";


// Pega o elemento span com o id username
const username = document.querySelector('span#username');


// Função para pegar o username do usuário logado e exibir na tela
async function getProfile() {

    const token = isAuthenticated();

    const response = await fetch('http://localhost:5000/api/v1/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    username.innerHTML = data.username;

}

// Exporta a função para ser utilizada em outros arquivos
export { getProfile };