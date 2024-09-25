import base from "./config.js";
import { logout } from './utils/auth.js';

// Seleciona elementos do DOM
const linkLogout = document.querySelector('.nav-item a#logout');

// Função para fazer logout
async function handleLogout(event) {
    event.preventDefault();

    // Faz a requisição para a API
    try {

        const response = await fetch(`${base.API_BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // Se o logout for bem sucedido, redireciona para a página de login
        if (response.ok && data.auth === false && data.token === null) {

            // Remove o token do localStorage
            logout();

            // Redireciona para a página de login
            window.location.href = '/';
        }

    } catch (error) {
        // Debuga o erro no console
        console.error('Erro:', error);
    }
}


// Eventos de clique
linkLogout.addEventListener('click', handleLogout);
