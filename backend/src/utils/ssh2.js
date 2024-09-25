import { Client } from 'ssh2';


// Função para obter o uso de disco de um diretório
async function getDiskUsage(username) {

    // Retorna uma Promise para obter o uso de disco de um diretório
    return new Promise((resolve, reject) => {

        // Instancia o cliente SSH
        const conn = new Client();

        // Quando o cliente SSH estiver pronto para uso (conectado)
        conn.on('ready', () => {

            // Mensagem de log
            console.log('Client :: ready');

            // Executa o comando para obter o uso de disco
            conn.exec(`du -sh backup/${username} && df -h backup/${username}`, (err, stream) => {

                // Se houver erro, rejeita a Promise
                if (err) return reject(err);

                // Variável para armazenar o output
                let output = '';

                // Quando o stream for fechado (comando finalizado)
                stream.on('close', (code, signal) => {

                    // Encerra a conexão
                    conn.end();

                    // Processa o output
                    const diskUsage = processOutput(output);

                    // Resolve a Promise com o uso de disco obtido do output do comando SSH
                    resolve(diskUsage);

                    // Mensagem de log
                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                }).on('data', (data) => {

                    // Adiciona o output ao buffer de output (conversão para string)
                    output += data.toString();

                }).stderr.on('data', (data) => {

                    // Mensagem de log para STDERR (erro)
                    console.log('STDERR: ' + data);
                });
            });

            // Mensagem de log
            console.log(`Exec :: du -sh backup/${username} && df -h backup/${username}`);

        }).connect({ // Conecta ao servidor SSH
            host: process.env.BACKUP_SERVER_IP,
            port: process.env.BACKUP_SERVER_PORT,
            username: process.env.BACKUP_SERVER_USERNAME,
            password: process.env.BACKUP_SERVER_PASSWORD,
        });
    });
}


// Função para processar o output do comando SSH
function processOutput(output) {

    // Regex para capturar o tamanho do diretório e o uso do disco
    // (?<tm_files>\d+K|\d+G|\d+T) - Tamanho dos arquivos
    // (?<tm_disk>\d+G|\d+T) - Tamanho do disco
    // (?<uso_disk>\d+,\d+G|\d+G|\d+T) - Uso do disco
    // (?<free_disk>\d+G|\d+T) - Espaço livre no disco
    // (?<percent_uso>\d+%|\d+,\d+%) - Porcentagem de uso do disco

    const regex = /^(?<tm_files>\d+K|\d+M|\d+G|\d+T|\d,\d+K|\d,\d+M|\d,\d+G|\d,\d+T).*\s+\S+.*\s+\W+\S+\s+(?<tm_disk>\d+G|\d+T)\s+(?<uso_disk>\d+,\d+G|\d+G|\d+T)\s+(?<free_disk>\d+G|\d+T)\s+(?<percent_uso>\d+%|\d+,\d+%)\s+\W$/gm;

    // Executa a regex no output
    const match = regex.exec(output);

    // Se houver match
    if (match) {
        // Pega os grupos da regex
        const { tm_files, tm_disk, uso_disk, free_disk, percent_uso } = match.groups;

        // Retorna o uso de disco
        return { tm_files, tm_disk, uso_disk, free_disk, percent_uso };
    }

    // Se não houver match
    return null;
}


// Exporta a função para ser utilizada em outros arquivos
export { getDiskUsage };
