document.addEventListener('DOMContentLoaded', () => {
    // Mude o caminho abaixo para o seu arquivo de som desejado
    const som = new Audio('../sond-efects/intro-topic-sound-efect.mp3'); 
    
    // Opcional: ajustar volume
    som.volume = 0.5; 

    // Tocar
    som.play().catch(e => console.log("Autoplay bloqueado até interação do usuário"));
});

function selectTheme(theme) {
    localStorage.setItem('selectedTheme', theme);
    const fileName = `${theme}_q_1.html`;
    window.location.href = fileName;
}
function navigateTo(page) {
    window.location.href = page;
}

