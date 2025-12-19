document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // 1. CONFIGURAÇÕES INICIAIS E LIMPEZA
    // ============================================================
    
    const POOL_SIZE = 20;         // Total de arquivos disponíveis
    const QUESTIONS_TO_PLAY = 10; // Limite exato de perguntas por jogo
    const STORAGE_KEY = 'quiz_ordem_v3'; // Chave nova para limpar caches antigos

    // Recupera ou cria a ordem das perguntas
    let quizOrdem = JSON.parse(localStorage.getItem(STORAGE_KEY));

    // SE NÃO EXISTIR ORDEM (Início do Jogo)
    if (!quizOrdem || quizOrdem.length === 0) {
        const fullPool = Array.from({ length: POOL_SIZE }, (_, i) => i + 1);

        // Embaralha
        for (let i = fullPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [fullPool[i], fullPool[j]] = [fullPool[j], fullPool[i]];
        }

        // Corta para ter EXATAMENTE 10
        quizOrdem = fullPool.slice(0, QUESTIONS_TO_PLAY);

        // Salva e reseta tudo
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quizOrdem));
        localStorage.setItem('quiz_indice_atual', 0);
        localStorage.setItem('correctCount', 0);
        localStorage.setItem('totalAnswered', 0);
        localStorage.setItem('answeredIds', JSON.stringify([]));
        localStorage.setItem('jumpedQuestions', JSON.stringify([]));
    }

    // TRAVA DE SEGURANÇA: Garante que nunca tenha mais que 10, mesmo se carregar cache antigo
    if (quizOrdem.length > QUESTIONS_TO_PLAY) {
        quizOrdem = quizOrdem.slice(0, QUESTIONS_TO_PLAY);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quizOrdem));
    }

    const TOTAL_QUESTIONS = QUESTIONS_TO_PLAY; // Força ser 10

    // ============================================================
    // 2. ELEMENTOS DO DOM
    // ============================================================
    const cards = document.querySelectorAll('.cards');
    const nextButton = document.getElementById('next');
    const explain = document.getElementById('resolution');
    const sideBottom = document.getElementsByClassName('check');
    const check_circle_content = document.getElementById('check_circle_content');
    const jumpButton = document.getElementById('jump_button');

    // HUDs
    const questionsHud = document.getElementById('questions-hud');
    const scoreHud = document.getElementById('score-hud');
    const progressHud = document.getElementById('progress-hud'); 
    const competitiveHud = document.getElementById('competitive-hud'); 
    const timerDisplay = document.getElementById('timer-display'); 
    const progressFill = document.getElementById('progress-fill');
    
    // Áudio
    const audioCorrect = document.getElementById('audioCorrect');
    const audioIncorrect = document.getElementById('audioIncorrect');
    if (audioCorrect) audioCorrect.volume = 0.6;
    if (audioIncorrect) audioIncorrect.volume = 0.6;

    // Estado do Jogo
    const gameMode = localStorage.getItem('gameMode') || 'classico'; 
    const userDefinedTime = parseInt(localStorage.getItem('quiz_timer_limit')) || 30;
    
    let indiceAtual = parseInt(localStorage.getItem('quiz_indice_atual')) || 0;
    let answeredIds = JSON.parse(localStorage.getItem('answeredIds')) || [];
    let jumpedQuestions = JSON.parse(localStorage.getItem('jumpedQuestions')) || []; 
    let correctCount = parseInt(localStorage.getItem('correctCount')) || 0;
    let totalAnswered = parseInt(localStorage.getItem('totalAnswered')) || 0;

    let selectedCard = null;
    let questionChecked = false;
    let nextCount = 0;
    let timerInterval = null;

    // Tratamento de URL
    const getFileNameFromUrl = () => {
        const url = window.location.pathname;
        return url.substring(url.lastIndexOf('/') + 1);
    };
    const currentFileName = getFileNameFromUrl();
    const topicPrefix = currentFileName.split('_q_')[0];
    const currentIdMatch = currentFileName.match(/_q_(\d+)\.html/);
    const currentQuestionId = currentIdMatch ? parseInt(currentIdMatch[1]) : null;

    if (topicPrefix) localStorage.setItem('lastTopicPrefix', topicPrefix);

    // ============================================================
    // 3. CORREÇÃO VISUAL (FIX DO "/20")
    // ============================================================
    
    // Atualiza o HUD de perguntas
    if (questionsHud) {
        // Reescreve o HTML interno para corrigir o "/20" para "/10"
        questionsHud.innerHTML = `Perguntas: <span id="totalAnswered">${totalAnswered}</span>/${TOTAL_QUESTIONS}`;
    }
    
    // Atualiza o HUD de acertos
    if (scoreHud) {
        scoreHud.innerHTML = `Acertos: <span id="correctCount">${correctCount}</span>`;
    }

    // Recaptura os elementos span após reescrever o HTML
    const totalAnsweredElement = document.getElementById('totalAnswered');
    const correctCountElement = document.getElementById('correctCount');

    // ============================================================
    // 4. LÓGICA DE UI E MODO DE JOGO
    // ============================================================
    
    // Som de intro
    if (totalAnswered === 0 && !sessionStorage.getItem('introPlayed')) {
        const introAudio = new Audio('../sond-efects/intro-sound-efect.mp3');
        introAudio.volume = 0.6;
        introAudio.play().catch(e => console.log("Autoplay bloqueado"));
        sessionStorage.setItem('introPlayed', 'true');
    }

    function setupModeUI() {
        if (gameMode === 'classico') {
            if (questionsHud) questionsHud.style.visibility = 'visible';
            if (scoreHud) scoreHud.style.visibility = 'visible';
            if (progressHud) progressHud.style.visibility = 'visible';
            if (competitiveHud) competitiveHud.style.display = 'none';
        } else if (gameMode === 'aprendizado') {
            if (questionsHud) questionsHud.style.visibility = 'hidden';
            if (scoreHud) scoreHud.style.visibility = 'hidden';
            if (progressHud) progressHud.style.visibility = 'hidden';
            if (competitiveHud) competitiveHud.style.display = 'none';
        } else if (gameMode === 'competitivo') {
            if (questionsHud) questionsHud.style.visibility = 'visible'; 
            if (scoreHud) scoreHud.style.visibility = 'visible';     
            if (progressHud) progressHud.style.visibility = 'visible';
            
            if (competitiveHud) {
                competitiveHud.style.display = 'block';
                startTimer(userDefinedTime);
            }
        }
        updateProgressBar();
    }

    function startTimer(seconds) {
        let timeLeft = seconds;
        updateTimerDisplay(timeLeft);
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }, 1000);
    }

    function updateTimerDisplay(s) {
        if (!timerDisplay) return;
        const minutes = Math.floor(s / 60);
        const seconds = s % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (s <= 5) {
            timerDisplay.style.color = '#fb0101'; 
            timerDisplay.style.fontWeight = 'bold'; 
        } else {
            timerDisplay.style.color = '#000000'; 
            timerDisplay.style.fontWeight = 'normal';
        }
    }

    function handleTimeout() {
        if (questionChecked) return;
        questionChecked = true;
        
        cards.forEach(card => {
            card.style.opacity = "0.6";
            card.style.pointerEvents = 'none';
            card.style.filter = "grayscale(100%)";
        });

        nextButton.disabled = false;
        nextButton.innerHTML = "TEMPO ESGOTADO<br>AVANÇAR"; 
        nextButton.style.backgroundColor = "#ff9800";
        nextButton.style.borderBottom = "5px solid #e65100";
        nextButton.style.color = "#fff";
        nextButton.style.cursor = 'pointer';

        if (jumpButton) jumpButton.style.display = 'none';
        
        check_circle_content.innerHTML = `<div class="erro"><div class="error-mark">✗</div></div>`;
        if (audioIncorrect) audioIncorrect.play();
    }

    function updateProgressBar() {
        if (!progressFill) return;
        const percentage = (totalAnswered / TOTAL_QUESTIONS) * 100;
        progressFill.style.width = `${percentage}%`;
        
        if (percentage <= 30) progressFill.style.background = 'linear-gradient(90deg, #FF5722, #FF9800)';
        else if (percentage <= 70) progressFill.style.background = 'linear-gradient(90deg, #FF9800, #FFEB3B)';
        else progressFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
    }

    function finishQuiz() {
        sessionStorage.removeItem('introPlayed');
        localStorage.removeItem(STORAGE_KEY); 
        window.location.href = '../result/resultado.html';
    }

    // ============================================================
    // 5. LÓGICA DE INTERAÇÃO
    // ============================================================
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (questionChecked) return; 
            
            if (selectedCard) selectedCard.classList.remove('selected');
            card.classList.add('selected');
            selectedCard = card;
            
            nextButton.disabled = false;
            nextButton.textContent = "CONFERIR";
            nextButton.style.backgroundColor = 'rgb(51, 167, 51)';
            nextButton.style.borderBottom = '5px solid rgb(0, 51, 0)';
            nextButton.style.cursor = 'pointer';
        });
    });

    if (jumpButton) {
        // Esconde botão pular se já estiver no final
        const questoesRestantes = TOTAL_QUESTIONS - totalAnswered;
        if (questoesRestantes <= 1) jumpButton.style.display = 'none';

        jumpButton.addEventListener('click', () => {
            if (questionChecked) return;
            if (timerInterval) clearInterval(timerInterval);

            if (!jumpedQuestions.includes(currentFileName)) {
                jumpedQuestions.push(currentFileName);
                localStorage.setItem('jumpedQuestions', JSON.stringify(jumpedQuestions));
            }
            navigateNext(true);
        });
    }

    nextButton.addEventListener('click', () => {
        if (nextButton.textContent.includes("TEMPO") || nextButton.textContent.includes("AVANÇAR")) {
            navigateNext(false); 
            return;
        }

        if (!selectedCard && !questionChecked) return;

        // --- CLIQUE 1: CONFERIR ---
        if (nextCount === 0) {
            nextCount = 1;
            questionChecked = true;
            if (timerInterval) clearInterval(timerInterval);

            // Marca ID como respondido
            if (currentQuestionId && !answeredIds.includes(currentQuestionId)) {
                answeredIds.push(currentQuestionId);
                localStorage.setItem('answeredIds', JSON.stringify(answeredIds));
            }

            // Remove dos pulados se for o caso
            if (jumpedQuestions.includes(currentFileName)) {
                jumpedQuestions = jumpedQuestions.filter(q => q !== currentFileName);
                localStorage.setItem('jumpedQuestions', JSON.stringify(jumpedQuestions));
            }
            
            // Atualiza contadores
            totalAnswered++;
            localStorage.setItem('totalAnswered', totalAnswered);
            
            // Atualiza UI visualmente
            if (totalAnsweredElement) totalAnsweredElement.textContent = totalAnswered;
            updateProgressBar();

            if (explain) explain.style.display = "block";
            if (jumpButton) jumpButton.style.display = "none";

            const isCorrect = selectedCard.getAttribute('data-answer') === 'correct';
            
            cards.forEach(card => {
                if (card.getAttribute('data-answer') === 'correct') {
                    card.classList.add('correct');
                    card.style.border = "3px solid #4CAF50"; 
                } else {
                    card.classList.add('incorrect');
                }
                card.style.pointerEvents = 'none';
            });

            if (isCorrect) {
                correctCount++;
                localStorage.setItem('correctCount', correctCount);
                if (correctCountElement) correctCountElement.textContent = correctCount;
                
                check_circle_content.innerHTML = `<div class="bola"><div class="checked">✓</div></div>`;
                if (audioCorrect) audioCorrect.play();
            } else {
                nextButton.style.backgroundColor = 'red';
                nextButton.style.borderBottom = '5px solid rgb(164, 3, 3)';
                check_circle_content.innerHTML = `<div class="erro"><div class="error-mark">✗</div></div>`;
                if (audioIncorrect) audioIncorrect.play();
            }

            Array.from(sideBottom).forEach(check => check.classList.add(isCorrect ? 'correct' : 'incorrect'));

            nextButton.textContent = 'PRÓXIMO';
            return;
        }

        // --- CLIQUE 2: AVANÇAR ---
        if (nextCount === 1) {
            navigateNext(false);
        }
    });

    function navigateNext(isJump) {
        // Se já respondeu 10, acaba o jogo imediatamente
        if (totalAnswered >= TOTAL_QUESTIONS) {
            finishQuiz();
            return;
        }

        let foundNext = false;
        let tempIndice = indiceAtual;
        let loopSafety = 0;
        const safetyLimit = POOL_SIZE + 10; 

        while (!foundNext && loopSafety <= safetyLimit) {
            tempIndice++;
            if (tempIndice >= TOTAL_QUESTIONS) tempIndice = 0;

            const candidateId = quizOrdem[tempIndice];
            const jaRespondida = answeredIds.includes(candidateId);
            const ehMesmaAtual = (candidateId === currentQuestionId);

            if (!jaRespondida) {
                if (isJump && ehMesmaAtual) {
                    // Continua procurando
                } else {
                    foundNext = true;
                    indiceAtual = tempIndice;
                    localStorage.setItem('quiz_indice_atual', indiceAtual);
                    window.location.href = `${topicPrefix}_q_${candidateId}.html`;
                }
            }
            loopSafety++;
        }

        if (!foundNext) finishQuiz();
    }

    history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', () => {
        if (confirm("Deseja sair? Seu progresso será perdido.")) {
            localStorage.removeItem('correctCount');
            localStorage.removeItem('totalAnswered');
            localStorage.removeItem('quiz_indice_atual');
            localStorage.removeItem('answeredIds');
            localStorage.removeItem('jumpedQuestions');
            localStorage.removeItem(STORAGE_KEY);
            window.location.href = '../topico.html'; 
        } else {
            history.pushState(null, null, window.location.href);
        }
    });

    setupModeUI();
});