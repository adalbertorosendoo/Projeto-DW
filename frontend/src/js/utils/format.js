function formatDate(isoString) {
    const date = new Date(isoString);

    // Pega o dia, mês e ano
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é baseado em 0
    const year = date.getFullYear();

    // Pega a hora e minutos
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Formata a data como "DD/MM/YYYY HH:MM"
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
}


function getStatusBadge(status) {
    // Define o tipo de badge com base no status
    const badgeClass = status === 'sucesso' ? 'success' : 'danger';

    // Retorna o HTML do badge com o status correspondente
    return `<span class="badge bg-${badgeClass}">${status}</span>`;
}

function formatFileSize(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let index = 0;

    // Continua dividindo por 1024 até encontrar a unidade apropriada
    while (bytes >= 1024 && index < units.length - 1) {
        bytes /= 1024;
        index++;
    }

    // Formata o número para duas casas decimais e retorna o valor com a unidade correspondente
    return `${bytes.toFixed(2)} ${units[index]}`;
}




// Exporta a função formatDate
export { formatDate, getStatusBadge, formatFileSize };