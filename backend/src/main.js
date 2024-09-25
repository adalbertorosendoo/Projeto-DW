import express from 'express';
import 'dotenv/config'; // Importa as variáveis de ambiente
import cors from 'cors';
import morgan from 'morgan';


// Importações das rotas
import loginRoutes from './router/login.routes.js';
import registerRoutes from './router/register.routes.js';
import profileRoutes from './router/profile.routes.js';
import uploadFilesRoutes from './router/upload.routes.js';
import logUploadRoutes from './router/log.files.routes.js';
import serverFilesRoutes from './router/server.files.routes.js';
import diskUsageRoutes from './router/disk.routes.js';

// Porta do servidor
const port = process.env.PORT || 5000;

// Inicialização do servidor
const app = express();


// Middlewares
app.use(cors()); // Permite requisições de outros domínios
app.use(morgan('dev')); // Logger das requisições
app.use(express.json()); // Permite requisições com JSON
app.use(express.urlencoded({ extended: true })); // Permite requisições com URL Encoded


// Rota inicial
app.get('/', (req, res) => {
    res.send('Hello World');
});


// Rotas da aplicação
app.use('/api/v1', loginRoutes);
app.use('/api/v1', registerRoutes);
app.use('/api/v1', profileRoutes);
app.use('/api/v1', uploadFilesRoutes);
app.use('/api/v1', logUploadRoutes);
app.use('/api/v1', serverFilesRoutes);
app.use('/api/v1', diskUsageRoutes);


// Inicialização do servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});