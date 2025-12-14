document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // 1. VARIÁVEIS, SELETORES E ESTADO INICIAL
    // ============================================================
    const cards = document.querySelectorAll('.cards');
    const nextButton = document.getElementById('next');
    const explain = document.getElementById('resolution');
    const sideBottom = document.getElementsByClassName('check');
    const check_circle_content = document.getElementById('check_circle_content');
    const audioCorrect = document.getElementById('audioCorrect');
    const audioIncorrect = document.getElementById('audioIncorrect');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const jumpButton = document.getElementById('jump_button');

    const correctCountElement = document.getElementById('correctCount');
    const totalAnsweredElement = document.getElementById('totalAnswered');
    
    audioCorrect.volume = 0.6;
    audioIncorrect.volume = 0.6;
    // Identificação da Página Atual
    const getFileNameFromUrl = () => {
        const url = window.location.pathname;
        return url.substring(url.lastIndexOf('/') + 1);
    };
    const currentFileName = getFileNameFromUrl();

    // Identifica o prefixo do tópico atual e SALVA para o botão "Revanche"
    const topicPrefix = currentFileName.split('_q_')[0];
    
    if (topicPrefix) {
        localStorage.setItem('lastTopicPrefix', topicPrefix);
    }

    // --- VARIÁVEIS DE ESTADO ---
    let jumpedQuestions = JSON.parse(localStorage.getItem('jumpedQuestions')) || []; 
    let correctCount = parseInt(localStorage.getItem('correctCount')) || 0;
    let totalAnswered = parseInt(localStorage.getItem('totalAnswered')) || 0;
    
    // Define se estamos em modo "Revisão"
    const isRevisiting = jumpedQuestions.includes(currentFileName);

    let questionNumber = parseInt(localStorage.getItem('currentQuestionNumber')) || 1;
    
    // Variáveis de controle local
    let selectedCard = null;
    let questionChecked = false;
    let nextCount = 0;
    const TOTAL_QUESTIONS = 10; 

    // Sincroniza número da questão com o HTML
    const currentPageQuestionNumber = parseInt(document.body.getAttribute('data-question-number')) || 1;
    if (currentPageQuestionNumber > 0) {
        questionNumber = currentPageQuestionNumber;
        if (!isRevisiting) {
            localStorage.setItem('currentQuestionNumber', questionNumber);
        }
    }

    // Atualiza a interface inicial
    if (correctCountElement) correctCountElement.textContent = correctCount;
    if (totalAnsweredElement) totalAnsweredElement.textContent = totalAnswered;

    // ============================================================
    // 2. FUNÇÕES DE UTILIDADE E RESET
    // ============================================================

    function resetCounters() {
        localStorage.removeItem('correctCount');
        localStorage.removeItem('totalAnswered');
        localStorage.removeItem('currentQuestionNumber');
        localStorage.removeItem('jumpedQuestions');
        
        correctCount = 0;
        totalAnswered = 0;
        jumpedQuestions = [];
        
        if (correctCountElement) correctCountElement.textContent = 0;
        if (totalAnsweredElement) totalAnsweredElement.textContent = 0;
        if (progressText) progressText.textContent = '0/10';
        if (progressFill) progressFill.style.width = '0%';
    }

    // Reset na Q1 de qualquer tópico
    if (currentFileName.endsWith('_q_1.html') && !isRevisiting) {
         const savedTotal = parseInt(localStorage.getItem('totalAnswered')) || 0;
         if (savedTotal > 0 && jumpedQuestions.length === 0) {
             resetCounters();
         }
    }

    // Reset ao recarregar a página na Q1
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        if (currentFileName.endsWith('_q_1.html') && !isRevisiting) {
            resetCounters();
        }
    }
    if (currentFileName.endsWith('_q_1.html')) {
        resetCounters();
    }
    updateProgressBar();

    // ============================================================
    // [NOVO] ÁUDIO DE INTRODUÇÃO NA QUESTÃO 1
    // ============================================================
    // Toca apenas se for a Q1 e não for revisão de questão pulada
    if (currentFileName.endsWith('_q_1.html') && !isRevisiting) {
        // Ajuste o caminho e a extensão (.mp3) se necessário
        const introAudio = new Audio('../sond-efects/intro-sound-efect.mp3');
        introAudio.volume = 0.6; // Volume agradável (60%)
        
        // Tentativa de play com tratamento de erro (para navegadores que bloqueiam autoplay)
        introAudio.play().catch(error => {
            console.log("Autoplay de intro bloqueado pelo navegador (aguardando interação):", error);
        });
    }

    // ============================================================
    // 3. LÓGICA DO BOTÃO PULAR
    // ============================================================
    
    if (jumpButton) {
        if (isRevisiting && jumpedQuestions.length <= 1) {
            jumpButton.style.display = 'none';
        }

        jumpButton.addEventListener('click', () => {
            if (questionChecked) return;

            if (!jumpedQuestions.includes(currentFileName)) {
                jumpedQuestions.push(currentFileName);
            } else {
                jumpedQuestions = jumpedQuestions.filter(q => q !== currentFileName);
                jumpedQuestions.push(currentFileName);
            }
            localStorage.setItem('jumpedQuestions', JSON.stringify(jumpedQuestions));

            if (!isRevisiting && questionNumber < TOTAL_QUESTIONS) {
                questionNumber++;
                localStorage.setItem('currentQuestionNumber', questionNumber);
                window.location.href = `${topicPrefix}_q_${questionNumber}.html`;
            } else {
                processJumpedQuestions(); 
            }
        });
    }

    function processJumpedQuestions() {
        const pendingQuestions = jumpedQuestions.filter(q => q !== currentFileName);
        
        if (pendingQuestions.length > 0) {
            window.location.href = pendingQuestions[0];
        } else {
            finishQuiz();
        }
    }

    // Função de Finalização Unificada
    function finishQuiz() {
        window.location.href = '../result/resultado.html';
    }

    // ============================================================
    // 4. INTERAÇÃO COM CARDS
    // ============================================================
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (questionChecked) return; 
            
            if (selectedCard) selectedCard.classList.remove('selected');
            card.classList.add('selected');
            selectedCard = card;
            
            nextButton.disabled = false;
            nextButton.classList.add('enabled');
            nextButton.style.backgroundColor = 'rgb(51, 167, 51)';
            nextButton.style.borderBottom = '5px solid rgb(0, 51, 0)';
            nextButton.style.cursor = 'pointer';
        });
    });

    // ============================================================
    // 5. BOTÃO PRÓXIMO
    // ============================================================
    nextButton.addEventListener('click', () => {
        if (!selectedCard) return;

        // --- 1º CLIQUE: CONFERIR ---
        if (nextCount === 0) {
            nextCount = 1;

            if (!questionChecked) {
                questionChecked = true;
                
                if (jumpedQuestions.includes(currentFileName)) {
                    jumpedQuestions = jumpedQuestions.filter(q => q !== currentFileName);
                    localStorage.setItem('jumpedQuestions', JSON.stringify(jumpedQuestions));
                }

                totalAnswered++;
                localStorage.setItem('totalAnswered', totalAnswered);
                if(totalAnsweredElement) totalAnsweredElement.textContent = totalAnswered;
                updateProgressBar();

                explain.style.display = "block";
                if (jumpButton) jumpButton.style.display = "none";

                const isCorrect = selectedCard.getAttribute('data-answer') === 'correct';
                
                if (isCorrect) {
                    selectedCard.classList.add('correct');
                    correctCount++;
                    localStorage.setItem('correctCount', correctCount);
                    if(correctCountElement) correctCountElement.textContent = correctCount;
                    
                    nextButton.style.backgroundColor = 'rgb(51, 167, 51)';
                    nextButton.style.borderBottom = '5px solid rgb(0, 51, 0)';
                    check_circle_content.innerHTML = `<div class="bola"><div class="checked">✓</div></div>`;
                    if (audioCorrect) audioCorrect.play();
                } else {
                    selectedCard.classList.add('incorrect');
                    nextButton.style.backgroundColor = 'red';
                    nextButton.style.borderBottom = '5px solid rgb(164, 3, 3)';
                    check_circle_content.innerHTML = `<div class="erro"><div class="error-mark">✗</div></div>`;
                    if (audioIncorrect) audioIncorrect.play();
                }

                cards.forEach(card => {
                    if (card !== selectedCard) {
                        card.classList.add(card.getAttribute('data-answer') === 'correct' ? 'correct' : 'incorrect');
                    }
                    card.style.pointerEvents = 'none';
                });

                Array.from(sideBottom).forEach(check => {
                    check.classList.add(isCorrect ? 'correct' : 'incorrect');
                });

                nextButton.textContent = 'PRÓXIMO';
            }

            nextButton.disabled = true;
            nextButton.blur();
            setTimeout(() => { nextButton.disabled = false; }, 350);
            return;
        }

        // --- 2º CLIQUE: AVANÇAR ---
        if (nextCount === 1) {
            nextCount = 2;
            
            if (!isRevisiting && questionNumber < TOTAL_QUESTIONS) {
                questionNumber++;
                localStorage.setItem('currentQuestionNumber', questionNumber);
                window.location.href = `${topicPrefix}_q_${questionNumber}.html`;
            } 
            else if (jumpedQuestions.length > 0) {
                processJumpedQuestions();
            } 
            else {
                finishQuiz();
            }
            return;
        }
    });

    function updateProgressBar() {
        const percentage = (totalAnswered / TOTAL_QUESTIONS) * 100;
        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `${totalAnswered}/${TOTAL_QUESTIONS}`;
        
        if (progressFill) {
            if (percentage <= 30) progressFill.style.background = 'linear-gradient(90deg, #FF5722, #FF9800)';
            else if (percentage <= 70) progressFill.style.background = 'linear-gradient(90deg, #FF9800, #FFEB3B)';
            else progressFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
        }
    }

    // ============================================================
    // 6. PROTEÇÃO CONTRA SAÍDA
    // ============================================================
    
    history.pushState(null, null, window.location.href);

    window.addEventListener('popstate', (event) => {
        const userConfirmed = confirm("Você tem certeza de que deseja sair do jogo? Seu progresso pode ser perdido.");
        
        if (userConfirmed) {
            resetCounters(); 
            window.location.href = '../topico.html';
        } else {
            history.pushState(null, null, window.location.href);
        }
    });
});