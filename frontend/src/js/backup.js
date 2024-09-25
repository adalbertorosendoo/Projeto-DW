import { protectPage, isAuthenticated } from './utils/auth.js';
import base from "./config.js";
import { getProfile } from './utils/profile.js';
import { alertDanger, alertSuccess } from "./components/alert.js";

const backupForm = document.getElementById('backupForm');
const fileInput = document.getElementById('fileInput');
const alertArea = document.querySelector('#alert-area');


// Função para enviar arquivo
backupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = isAuthenticated();
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch(`${base.API_BASE_URL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alertArea.innerHTML = alertSuccess(result.message);
            fileInput.value = '';
        } else {
            alertArea.innerHTML = alertDanger(result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar arquivo:', error);
        alertArea.innerHTML = alertDanger('Erro ao enviar arquivo. Tente novamente mais tarde.');
    }
});


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
            document.getElementById('diskInfo').innerHTML = `<i class= "bi bi-hdd text-info" > </i> ${result.diskUsage['tm_files']} / ${result.diskUsage['free_disk']}`;
        }
    } catch (error) {
        console.error('Erro ao carregar informações de disco:', error);
        alertArea.innerHTML = alertDanger('Erro ao carregar informações de disco. Tente novamente mais tarde.');
    }

}





loadDiskInfo();
protectPage();
getProfile();
