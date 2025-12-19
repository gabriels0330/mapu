document.addEventListener('DOMContentLoaded', () => {
    // Mantemos a lógica do áudio exatamente como estava
    const som = new Audio('../sond-efects/intro-topic-sound-efect.mp3'); 
    som.volume = 0.5; 
    som.play().catch(e => console.log("Autoplay bloqueado até interação do usuário"));
});

// A função de embaralhar foi removida daqui, pois o selection.js fará isso depois.

function selectTheme(theme) {
    // 1. Apenas salva o prefixo do tema (ex: 'natureza', 'sociedade')
    // O arquivo selection.js vai ler isso depois para saber qual quiz carregar.
    localStorage.setItem('lastTopicPrefix', theme);

    // 2. Redireciona para a página ÚNICA de seleção de modo.
    // ATENÇÃO: Verifique se o caminho abaixo está correto em relação à pasta onde estão seus arquivos de tema.
    // Se 'select-mode.html' estiver na mesma pasta que 'natureza.html', use apenas o nome do arquivo.
    window.location.href = '../select-mode.html'; 
}

function navigateTo(page) {
    window.location.href = page;
}