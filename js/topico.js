// 1. A ARMADILHA: Empurra um estado novo para o histórico assim que carrega.
history.pushState(null, null, window.location.href);

// 2. O EVENTO: Agora, quando clicar em voltar, o evento popstate VAI disparar
window.addEventListener('popstate', (event) => {
    // Redireciona forçadamente para o index
    window.location.href = 'index.html'; 
});

function selectTheme(theme) {
    localStorage.setItem('selectedTheme', theme);
    const folderPath = `questions_${theme}/`;
    const fileName = `${theme}.html`;
    window.location.href = folderPath + fileName;
}

function navigateTo(page) {
    window.location.href = page;
}