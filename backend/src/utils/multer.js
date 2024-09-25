import multer from 'multer';


// Configurando multer para upload temporário de arquivos
const upload = multer({ dest: 'uploads/' });

export default upload;