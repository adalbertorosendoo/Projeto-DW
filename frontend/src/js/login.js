
import { alertDanger } from "./components/alert.js";
import { showSpinner, hideSpinner } from "./components/spinner.js";
import base from "./config.js";

// Seleciona os elementos do formulário
const form = document.querySelector('form');
const alertArea = document.querySelector('#alert-area');


// Função para fazer login
async function handleLogin(event) {
    event.preventDefault();

    // Pega os valores dos campos de input
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Monta o corpo da requisição
    const body = {
        email,
        password
    }


    // Faz a requisição para a API
    try {

        // Exibe o spinner de carregamento
        showSpinner();
        const response = await fetch(`${base.API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        // Esconde o spinner de carregamento
        hideSpinner();

        const data = await response.json();

        // Se o login for bem sucedido, redireciona para a página inicial
        if (response.ok && data.auth === true) {
            // Salva o token no localStorage
            localStorage.setItem('token:acronis', data.token);

            // Redireciona para a página inicial
            window.location.href = '/dashboard';

        } else {

            // Se o login falhar, exibe uma mensagem de erro
            alertArea.innerHTML = alertDanger(data.message);

            // Limpa os campos do formulário
            form.reset();
        }

    } catch (error) {
        // Debuga o erro no console
        console.error('Erro:', error);

        // Exibe uma mensagem de erro genérica
        alertArea.innerHTML = alertDanger('Erro ao fazer login. Tente novamente mais tarde.');
    }
}


// Adiciona o evento de submit ao formulário
form.addEventListener('submit', handleLogin);