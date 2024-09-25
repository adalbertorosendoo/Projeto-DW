function showSpinner() {
    document.getElementById('loading-area').classList.remove('d-none');
}

function hideSpinner() {
    document.getElementById('loading-area').classList.add('d-none');
}


export { showSpinner, hideSpinner };