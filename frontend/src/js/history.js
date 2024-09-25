import { protectPage, isAuthenticated } from './utils/auth.js';
import base from "./config.js";
import { getProfile } from './utils/profile.js';
import { getFileIcon } from "./utils/icons.js";
import { formatDate, getStatusBadge, formatFileSize } from './utils/format.js';



// Função para carregar histórico de uploads do usuário

async function loadHistory() {

    // Pega o token de autenticação
    const token = isAuthenticated();

    // Pega o tbody da tabela de histórico do HTML pelo ID historyTable
    const tbody = document.getElementById('filesList');

    // Tenta carregar o histórico de uploads do usuário
    try {

        // Faz uma requisição GET para a rota /api/v1/log-upload
        const response = await fetch(`${base.API_BASE_URL}/log-upload`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Pega o resultado da requisição
        const result = await response.json();

        // Se a requisição foi bem sucedida
        if (response.ok) {

            // Se o resultado for um array vazio
            if (result.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center">Nenhum arquivo enviado.</td>
                    </tr>
                `;
            } else {
                // Se o resultado não for um array vazio
                tbody.innerHTML = result.map(file => `
                    <tr>
                        <td>${file.id}</td>
                        <td>${getFileIcon(file.name)} ${file.name}</td>
                        <td>${formatFileSize(file.size)}</td>
                        <td>${formatDate(file.createdAt)}</td>
                        <td>${getStatusBadge(file.status)}</td>
                    </tr>
                `).join('');
            }

        } else {
            // Se a requisição não foi bem sucedida
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">Erro ao carregar histórico de uploads.</td>
                </tr>
            `;
        }

    } catch (error) {
        // Se ocorrer um erro durante a requisição
        console.error('Erro ao carregar histórico de uploads:', error);
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">Erro ao carregar histórico de uploads. Tente novamente mais tarde.</td>
            </tr>
        `;
    }


}












loadHistory()
protectPage();
getProfile();