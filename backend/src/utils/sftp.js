import SFTPClient from 'ssh2-sftp-client';


// Função para fazer upload de arquivos via SFTP
async function sftpUpload(localFilePath, remoteFilePath) {


    const sftp = new SFTPClient();

    try {

        // Conectando ao servidor SFTP de backup
        await sftp.connect({
            host: process.env.BACKUP_SERVER_IP,
            port: process.env.BACKUP_SERVER_PORT,
            username: process.env.BACKUP_SERVER_USERNAME,
            password: process.env.BACKUP_SERVER_PASSWORD,

        });

        // Verifica se o arquivo já existe no servidor
        const fileExists = await sftp.exists(remoteFilePath);

        // Se o arquivo já existe, não faz upload
        if (fileExists) {
            console.log("Arquivo já existe no servidor");
            return false;
        }

        // Enviando arquivo para o servidor
        await sftp.put(localFilePath, remoteFilePath);

        return true;

    } catch (error) {
        console.error("Erro ao conectar ao servidor SFTP de backup", error);
        return false;
    }
    finally {
        sftp.end();
    }
}


// Função para criar diretório no SFTP
async function createUserDirectoryOnSFPT(username) {

    // Instanciando o cliente SFTP
    const sftp = new SFTPClient();

    // Diretório remoto onde os backups serão armazenados
    const remoteDirectory = `backup/${username}`;

    try {

        // Conectando ao servidor SFTP de backup
        await sftp.connect({
            host: process.env.BACKUP_SERVER_IP,
            port: process.env.BACKUP_SERVER_PORT,
            username: process.env.BACKUP_SERVER_USERNAME,
            password: process.env.BACKUP_SERVER_PASSWORD,

        });

        // Verifica se o diretório do usuário existe
        const directoryExists = await sftp.exists(remoteDirectory);

        // Se o diretório não existe, cria
        if (!directoryExists) {
            await sftp.mkdir(remoteDirectory, true); // 'true' cria diretórios pai se não existirem
        }

        return true;

    } catch (error) {
        console.error("Erro ao conectar ao servidor SFTP de backup", error);
        return false;
    }

    finally {
        sftp.end();
    }
}


// Lista os arquivos de um diretório no servidor SFTP
async function listFilesOnSFTP(username) {

    // Instanciando o cliente SFTP
    const sftp = new SFTPClient();

    // Diretório remoto onde os backups são armazenados
    const remoteDirectory = `backup/${username}`;

    try {

        // Conectando ao servidor SFTP de backup
        await sftp.connect({
            host: process.env.BACKUP_SERVER_IP,
            port: process.env.BACKUP_SERVER_PORT,
            username: process.env.BACKUP_SERVER_USERNAME,
            password: process.env.BACKUP_SERVER_PASSWORD,
            timeout: 3000

        });

        // Listando os arquivos do diretório
        const files = await sftp.list(remoteDirectory);

        return files;

    } catch (error) {
        console.error("Erro ao conectar ao servidor SFTP de backup", error);
        return [];
    }

    finally {
        sftp.end();
    }
}


export { sftpUpload, createUserDirectoryOnSFPT, listFilesOnSFTP };