function getFileIcon(filename) {
    // Extrai a extensão do arquivo
    const extension = filename.split('.').pop().toLowerCase();

    // Mapeamento de extensões de arquivo para ícones e cores
    const icons = {
        pdf: { icon: 'bi-filetype-pdf', color: 'text-danger' },
        zip: { icon: 'bi-file-zip', color: 'text-secondary' },
        rar: { icon: 'bi-file-zip', color: 'text-secondary' },
        jpg: { icon: 'bi-file-image', color: 'text-warning' },
        jpeg: { icon: 'bi-file-image', color: 'text-warning' },
        png: { icon: 'bi-file-image', color: 'text-warning' },
        gif: { icon: 'bi-file-image', color: 'text-warning' },
        svg: { icon: 'bi-filetype-svg', color: 'text-primary' },
        txt: { icon: 'bi-filetype-txt', color: 'text-muted' },
        md: { icon: 'bi-filetype-md', color: 'text-info' },
        mp3: { icon: 'bi-file-music', color: 'text-success' },
        mp4: { icon: 'bi-file-play', color: 'text-danger' },
        csv: { icon: 'bi-filetype-csv', color: 'text-warning' },
        xls: { icon: 'bi-file-earmark-excel', color: 'text-success' },
        xlsx: { icon: 'bi-file-earmark-excel', color: 'text-success' },
        doc: { icon: 'bi-filetype-doc', color: 'text-primary' },
        docx: { icon: 'bi-filetype-docx', color: 'text-primary' },
        ppt: { icon: 'bi-filetype-ppt', color: 'text-danger' },
        pptx: { icon: 'bi-filetype-pptx', color: 'text-danger' },
        js: { icon: 'bi-filetype-js', color: 'text-info' },
        json: { icon: 'bi-filetype-json', color: 'text-success' },
        html: { icon: 'bi-filetype-html', color: 'text-danger' },
        css: { icon: 'bi-filetype-css', color: 'text-primary' },
        exe: { icon: 'bi-filetype-exe', color: 'text-muted' },
        py: { icon: 'bi-filetype-py', color: 'text-info' },
        java: { icon: 'bi-filetype-java', color: 'text-warning' },
        php: { icon: 'bi-filetype-php', color: 'text-primary' },
        sql: { icon: 'bi-filetype-sql', color: 'text-info' },
        sh: { icon: 'bi-filetype-sh', color: 'text-muted' },
        xml: { icon: 'bi-filetype-xml', color: 'text-primary' },
        yml: { icon: 'bi-filetype-yml', color: 'text-success' },
        default: { icon: 'bi-file', color: 'text-secondary' }
    };

    // Retorna o HTML do ícone com a classe de cor
    const { icon, color } = icons[extension] || icons['default'];
    return `<i class="bi ${icon} ${color}"></i>`;
}


function getFileIcons(filename, type) {

    // Verifica se o tipo é um arquivo ou diretório
    if (type === '-') {
        return getFileIcon(filename);
    }

    // Retorna o ícone de diretório
    return '<i class="bi bi-folder text-warning"></i>';
}


// Exporta a função getFileIcon
export { getFileIcon, getFileIcons };