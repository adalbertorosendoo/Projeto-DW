
// Alert component para exibir mensagens de sucesso, erro e alerta
const alertSuccess = (message) => {
    return `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <small>${message}</small>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
}

// Alert component para exibir mensagens de sucesso, erro e alerta
const alertDanger = (message) => {
    return `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <small>${message}</small>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
}

// Alert component para exibir mensagens de sucesso, erro e alerta
const alertWarning = (message) => {
    return `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <small>${message}</small>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
}

// Exporta os componentes de alerta
export { alertSuccess, alertDanger, alertWarning };