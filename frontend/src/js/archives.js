import { protectPage, isAuthenticated } from './utils/auth.js';
import base from "./config.js";
import { getProfile } from './utils/profile.js';
import { getFileIcons } from "./utils/icons.js";
import { formatDate, formatFileSize } from './utils/format.js';
import { showSpinner, hideSpinner } from "./components/spinner.js";


// Função para listar arquivos dentro do servidor de backup
async function getArchives() {

    const token = isAuthenticated();
    const tbody = document.getElementById('serverFilesList');

    try {

        showSpinner();

        const response = await fetch(`${base.API_BASE_URL}/server-files`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        hideSpinner();

        const result = await response.json();

        if (response.ok) {

            if (result.length === 0) {
                tbody.innerHTML = `
                            <tr>
                                <td colspan="5" class="text-center">Nenhum arquivo encontrado.</td>
                            </tr>
                        `;
            } else {
                tbody.innerHTML = result.map(file => `
                            <tr>
                                <td>${file.type}</td>
                                <td>${getFileIcons(file.name, file.type)} ${file.name}</td>
                                <td>${formatFileSize(file.size)}</td>
                                <td>${formatDate(file.modifyTime)}</td>
                                <td>${formatDate(file.accessTime)}</td>
                            </tr>
                        `).join('');
            }

        } else {
            tbody.innerHTML = `
                        <tr>
                            <td colspan="5" class="text-center">Erro ao carregar arquivos do servidor.</td>
                        </tr>
                    `;
        }

    }
    catch (error) {
        console.error('Erro:', error);
        tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">Erro ao carregar arquivos do servidor.</td>
                </tr>
            `;
    }

}

getArchives();
protectPage();
getProfile();