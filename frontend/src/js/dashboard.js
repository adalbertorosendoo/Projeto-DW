import { protectPage, isAuthenticated } from './utils/auth.js';
import base from "./config.js";
import { getProfile } from './utils/profile.js';
import { alertDanger } from "./components/alert.js";
import { getFileIcon } from "./utils/icons.js";
import { formatDate, getStatusBadge, formatFileSize } from './utils/format.js';


const alertArea = document.querySelector('#alert-area');



// Função para carregar total de uploads, total de uploads sucesso e total de uploads falha
async function loadStats() {

    const token = isAuthenticated();
    try {
        const response = await fetch(`${base.API_BASE_URL}/log-upload/stats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('totalUploads').innerHTML = `<i class="bi bi-cloud-upload text-info"></i> ${result.total}`;
            document.getElementById('totalSuccess').innerHTML = `<i class="bi bi-check-circle text-success"></i> ${result.totalSuccess}`;
            document.getElementById('totalFailed').innerHTML = `<i class="bi bi-x-circle text-danger"></i> ${result.totalFail}`;
        }

    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        alertArea.innerHTML = alertDanger('Erro ao carregar estatísticas. Tente novamente mais tarde.');

    }

}


// Função para carregar os arquivos do usuário
async function loadFiles() {

    // Pega o token de autenticação
    const token = isAuthenticated();

    // Pega o tbody da tabela de arquivos do HTML pelo ID filesTable
    const tbody = document.getElementById('filesTable');

    // Tenta carregar os arquivos do usuário
    try {

        // Faz uma requisição GET para a rota /api/v1/log-upload/recent
        const response = await fetch(`${base.API_BASE_URL}/log-upload/recent`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Pega o resultado da requisição
        const result = await response.json();

        // Inicializa o índice da tabela para o top 6 arquivos
        let index = 0;

        // Se a requisição foi bem sucedida, adiciona os arquivos na tabela
        if (response.ok) {

            // Para cada arquivo no resultado, adiciona uma linha na tabela
            result.forEach((file) => {

                // Adiciona uma linha na tabela com o índice, ícone do arquivo, nome do arquivo, data de criação e status
                tbody.innerHTML += `
                <tr>
                    <td>${++index}</td>
                    <td>${getFileIcon(file.name)} ${file.name}</td>
                    <td>${formatFileSize(file.size)}</td>
                    <td>${formatDate(file.createdAt)}</td>
                    <td>${getStatusBadge(file.status)}</td>
                </tr>
                `;
            });
        }

    }
    catch (error) {
        console.error('Erro ao carregar arquivos:', error);

        // Se houver um erro, exibe uma mensagem de erro na área de alerta
        alertArea.innerHTML = alertDanger('Erro ao carregar arquivos. Tente novamente mais tarde.');
    }
}


// Função para carregar informações de disco de armazenamento do servidor
async function loadDiskInfo() {
    const token = isAuthenticated();

    try {
        const response = await fetch(`${base.API_BASE_URL}/disk-usage`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('diskInfo').innerHTML = `<i class="bi bi-hdd text-info"> </i> ${result.diskUsage['tm_files']}/${result.diskUsage['free_disk']}`;
        }
    } catch (error) {
        console.error('Erro ao carregar informações de disco:', error);
        alertArea.innerHTML = alertDanger('Erro ao carregar informações de disco. Tente novamente mais tarde.');
    }

}




// Protege a página e pega o perfil do usuário
protectPage();

// Pega o perfil do usuário
getProfile();

// Carrega as estatísticas
loadStats()

// Carrega informações de disco
loadDiskInfo()

// Carrega os arquivos do top 6 do usuário
loadFiles()

