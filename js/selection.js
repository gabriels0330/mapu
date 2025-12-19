document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // 1. SELEÇÃO DE ELEMENTOS DO DOM
    // ============================================================
    
    // Telas
    const screenSelection = document.getElementById('screen-selection');
    const screenTimer = document.getElementById('screen-timer');
    
    // Elementos da Tela de Seleção
    const cards = document.querySelectorAll('.cards');

    // Elementos da Tela de Timer Customizado
    const displayMin = document.getElementById('display-min');
    const displaySec = document.getElementById('display-sec');
    const btnMinus = document.getElementById('btn-minus');
    const btnPlus = document.getElementById('btn-plus');
    
    // Botões de Ação
    const btnStart = document.getElementById('btn-start-competitive');
    const btnBack = document.getElementById('btn-back');

    // ============================================================
    // 2. VARIÁVEIS DE ESTADO
    // ============================================================
    let currentSeconds = 30; // Tempo padrão inicial
    let intervalId = null;   // Para controlar a repetição rápida
    let timeoutId = null;    // Para controlar o atraso antes da repetição

    // ============================================================
    // 3. LÓGICA DO CRONÔMETRO (VISUAL E CONTROLE)
    // ============================================================

    // Atualiza o visual "00:00" na tela
    function updateDisplay() {
        const m = Math.floor(currentSeconds / 60);
        const s = currentSeconds % 60;
        // padStart(2, '0') garante que 5 vire "05"
        displayMin.textContent = String(m).padStart(2, '0');
        displaySec.textContent = String(s).padStart(2, '0');
    }

// Altera o tempo respeitando os limites
    function changeTime(amount) {
        let newTime = currentSeconds + amount;
        
        // Se o resultado for menor que 3 (ex: 5 - 5 = 0), força virar 3
        if (newTime < 3) {
            newTime = 3;
        }
        
        // Se passar de 300, trava em 300
        if (newTime > 300) {
            newTime = 300;
        }

        // Verifica se houve mudança real antes de atualizar
        if (newTime !== currentSeconds) {
            currentSeconds = newTime;
            updateDisplay();
        } else {
            // Se já está no limite (ex: já é 3 e tentou diminuir mais), para
            stopChanging();
        }
    }

    // --- Lógica de Pressionar e Segurar (Long Press) ---

    function startChanging(amount) {
        // 1. Muda imediatamente ao clicar
        changeTime(amount);

        // 2. Aguarda 500ms. Se o usuário continuar segurando, começa a mudar rápido
        timeoutId = setTimeout(() => {
            intervalId = setInterval(() => {
                changeTime(amount);
            }, 100); // Velocidade da repetição (100ms)
        }, 500);
    }

    function stopChanging() {
        clearTimeout(timeoutId); // Cancela o delay inicial
        clearInterval(intervalId); // Cancela a repetição rápida
    }

    // Adiciona eventos de Mouse (PC) e Touch (Celular) aos botões
    function addHoldEvents(button, amount) {
        // Início da interação (apertou)
        button.addEventListener('mousedown', (e) => {
            if(e.button !== 0) return; // Apenas botão esquerdo do mouse
            startChanging(amount);
        });
        button.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Evita zoom ou rolagem ao segurar
            startChanging(amount);
        }, { passive: false });

        // Fim da interação (soltou ou saiu de cima)
        const stopEvents = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
        stopEvents.forEach(event => {
            button.addEventListener(event, stopChanging);
        });
    }

    // Aplica a lógica aos botões Mais e Menos
    addHoldEvents(btnMinus, -1); // Diminui 1 segundos
    addHoldEvents(btnPlus, 1);   // Aumenta 1 segundos


    // ============================================================
    // 4. LÓGICA DE SELEÇÃO DE MODOS (CARDS)
    // ============================================================
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const mode = card.getAttribute('data-mode');

            if (mode === 'competitivo') {
                // Se for Competitivo, vamos para a tela de Timer
                screenSelection.style.display = 'none';
                screenTimer.style.display = 'flex';
                updateDisplay(); // Garante que o display esteja correto
            } else {
                // Se for Clássico ou Aprendizado, inicia direto (tempo 0)
                startGame(mode, 0); 
            }
        });
    });

    // ============================================================
    // 5. NAVEGAÇÃO ENTRE TELAS
    // ============================================================
    
    // Botão Voltar (do Timer para a Seleção)
    btnBack.addEventListener('click', () => {
        screenTimer.style.display = 'none';
        screenSelection.style.display = 'flex'; // Volta para o layout original
    });

    // Botão Iniciar (na tela do Timer)
    btnStart.addEventListener('click', () => {
        startGame('competitivo', currentSeconds);
    });

    // ============================================================
    // 6. FUNÇÃO MESTRA: INICIAR O JOGO
    // ============================================================
    function startGame(mode, time) {
        // A. Salva as configurações do jogo
        localStorage.setItem('gameMode', mode);
        localStorage.setItem('quiz_timer_limit', time);

        // B. Reseta estatísticas de jogos anteriores
        localStorage.setItem('correctCount', 0);
        localStorage.setItem('totalAnswered', 0);
        localStorage.setItem('quiz_indice_atual', 0);
        localStorage.removeItem('answeredIds');     // Limpa IDs já respondidos
        localStorage.removeItem('jumpedQuestions'); // Limpa pulados
        sessionStorage.removeItem('introPlayed');   // Permite tocar a intro novamente

        // C. Gera a ordem aleatória das questões (1 a 10)
        const totalQuestions = 10; 
        const order = generateRandomOrder(totalQuestions);
        localStorage.setItem('quiz_ordem', JSON.stringify(order));

        // D. Redirecionamento Dinâmico
        // Recupera o tema salvo no presentation.js (ex: 'natureza', 'sociedade')
        const prefix = localStorage.getItem('lastTopicPrefix');

        if (prefix) {
            // Monta o caminho: ex: natureza_q_5.html
            // Ajuste aqui caso seus arquivos estejam em subpastas
            window.location.href = `/questions_${prefix}/${prefix}_q_${order[0]}.html`;
        } else {
            // Tratamento de erro caso o usuário tenha aberto essa página direto
            alert("Erro: Tema não identificado. Voltando ao menu principal.");
            window.location.href = "../topico.html"; 
        }
    }

    // Algoritmo de Fisher-Yates para embaralhar o array
    function generateRandomOrder(max) {
        const arr = [];
        for (let i = 1; i <= max; i++) arr.push(i);
        
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
});