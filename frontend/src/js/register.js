import { alertDanger, alertSuccess } from "./components/alert";
import base from "./config.js";

// Seleciona os elementos do formulário
const form = document.querySelector('form');
const alertArea = document.querySelector('#alert-area');


// Função para fazer registro
async function handleRegister(event) {
    event.preventDefault();

    // Pega os valores dos campos de input
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Monta o corpo da requisição
    const body = {
        username,
        email,
        password
    }

    // Faz a requisição para a API
    try {

        const response = await fetch(`${base.API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        // Se o registro for bem sucedido, exibe uma mensagem de sucesso
        if (response.ok && data.registered === true) {
            alertArea.innerHTML = alertSuccess(data.message);

            // Redireciona para a página de login
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);

            // Limpa os campos do formulário
            form.reset();

        } else {

            // Se o registro falhar, exibe uma mensagem de erro
            alertArea.innerHTML = alertDanger(data.message);

            // Limpa os campos do formulário
            form.reset();
        }

    } catch (error) {
        // Debuga o erro no console
        console.error('Erro:', error);

        // Exibe uma mensagem de erro genérica
        alertArea.innerHTML = alertDanger('Erro ao fazer registro. Tente novamente mais tarde.');
    }

}


// Adiciona o evento de submit ao formulário
form.addEventListener('submit', handleRegister);