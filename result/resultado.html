<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../imgs/favicon/favicon.ico" type="image/x-icon">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Iceland&family=Jersey+10&display=swap" rel="stylesheet">

<title>Mapu | Resultado Final</title>

<style>
/* ====== PALETA PADRÃO (CLÁSSICO/APRENDIZADO) ====== */
:root {
    --bg-color: #f5f3e7;
    --text-color: #1B2A41;
    --primary-color: #0B5D52;
    --highlight-color: #41E18E;
    --accent-color: #c09b51e2;
}

/* ====== PALETA COMPETITIVA (DARK) ====== */
body.competitive-mode {
    --bg-color: #121212;
    --text-color: #ffffff;
    --primary-color: #8B0000; /* Vermelho Vinho */
    --highlight-color: #FFD700; /* Dourado */
    --accent-color: #ff4500; /* Laranja avermelhado */
}

body {
    margin: 0;
    padding: 0;
    background: var(--bg-color);
    font-family: 'Trebuchet MS', sans-serif;
    overflow: hidden;
    color: var(--text-color);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.5s;
}

/* ====== CAMADAS ====== */
.particles, .energy-rings {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: 1;
}

/* ====== ANÉIS DE ENERGIA ====== */
.energy-ring {
    position: absolute;
    width: 300px;
    height: 300px;
    border: 6px solid var(--accent-color);
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: pulse 4s infinite ease-out;
}

.energy-ring:nth-child(2) { animation-delay: 1s; }
.energy-ring:nth-child(3) { animation-delay: 2s; }
.energy-ring:nth-child(4) { animation-delay: 3s; }

@keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
}

/* ====== PARTÍCULAS ====== */
.particle {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: rise 5s linear forwards;
    opacity: 0.9;
}

@keyframes rise {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-200vh); opacity: 0; }
}

/* ====== CONTEÚDO ====== */
.end-screen {
    text-align: center;
    padding: 40px 20px;
    position: relative;
    z-index: 5;
    background: rgba(255, 255, 255, 0.1); /* Vidro translúcido */
    border-radius: 30px;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 30px rgba(0,0,0, 0.1);
    border: 1px solid rgba(255,255,255,0.2);
    max-width: 600px;
    width: 90%;
}

/* Ajuste específico para modo clássico/aprendizado */
body:not(.competitive-mode) .end-screen {
    background: rgba(245, 243, 231, 0.8);
    box-shadow: 0 0 30px rgba(11, 93, 82, 0.1);
}

/* Título */
.end-title {
    font-size: 60px;
    font-family: "Jersey 10", sans-serif;
    font-weight: bold;
    margin: 0 0 15px 0;
    color: var(--primary-color);
    text-shadow: 0 0 20px var(--highlight-color);
    animation: titlePop 0.8s ease-out;
}

@media (max-width: 500px) {
    .end-title { font-size: 45px; }
    .star { font-size: 50px; }
}

@keyframes titlePop {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

/* Estrelas com explosão */
.stars {
    margin: 25px 0;
    min-height: 80px; /* Reserva espaço para não pular layout */
}

.star {
    font-size: 75px;
    opacity: 0.2;
    margin: 0 5px;
    color: #FFD700;
    transition: 0.4s;
    display: inline-block;
}

.star.active {
    opacity: 1;
    text-shadow: 0 0 25px #FFD700, 0 0 40px #FFF2A0;
    animation: explode 0.8s ease-out;
}

@keyframes explode {
    0% { transform: scale(0) rotate(180deg); }
    70% { transform: scale(1.6); }
    100% { transform: scale(1); }
}

/* Texto dos acertos */
.feedback-info {
    font-size: 28px;
    font-weight: bold;
    margin-top: 20px;
    color: var(--text-color);
}

/* Detalhes extras do competitivo */
.competitive-stats {
    display: none;
    font-size: 18px;
    margin-top: 10px;
    color: var(--text-color);
    opacity: 0.8;
}

.feedback {
    font-size: 22px;
    margin-top: 15px;
    font-weight: bold;
    color: var(--primary-color);
    min-height: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Botões */
.button-row {
    margin-top: 35px;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.btn {
    padding: 15px 32px;
    border: none;
    border-radius: 18px;
    font-size: 18px;
    cursor: pointer;
    font-weight: bold;
    color: white;
    background: var(--primary-color);
    box-shadow: 0 0 18px rgba(0,0,0,0.2);
    transition: 0.2s;
    text-transform: uppercase;
}

.btn:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
    box-shadow: 0 0 25px var(--primary-color);
}

.btn.secondary {
    background: #1B2A41;
}

body.competitive-mode .btn.secondary {
    background: #333;
}

.btn.secondary:hover {
    background: #152131;
}

</style>
</head>

<body>

<div class="energy-rings">
    <div class="energy-ring"></div>
    <div class="energy-ring"></div>
    <div class="energy-ring"></div>
    <div class="energy-ring"></div>
</div>

<div class="particles"></div>

<div class="end-screen">

    <h1 class="end-title" id="endTitle">Desafio Concluído!</h1>

    <div class="stars" id="starsContainer">
        <span class="star" id="s1">★</span>
        <span class="star" id="s2">★</span>
        <span class="star" id="s3">★</span>
    </div>

    <div class="feedback-info" id="mainStats">
        Acertos: <span id="correctCount">0</span> / <span id="totalCount">10</span>
    </div>
    
    <div class="competitive-stats" id="compStats">
        Respondidas: <span id="answeredCount">0</span> | Precisão: <span id="accuracyVal">0%</span>
    </div>

    <p class="feedback" id="feedbackMsg"></p>

    <div class="button-row">
        <button class="btn" onclick="retry()">Jogar Novamente</button>
        <button class="btn secondary" onclick="menu()">Menu Principal</button>
    </div>

</div>

<script>
/* ========================================================
   1. BLOQUEIO DO BOTÃO VOLTAR
   ======================================================== */
history.pushState(null, null, location.href);

window.addEventListener('popstate', function () {
    const userConfirmed = confirm("Você tem certeza de que deseja sair do jogo? Seu progresso pode ser perdido.");
    if (userConfirmed) {
        window.location.replace('../topico.html');
    } else {
        history.pushState(null, null, window.location.href);
    }
});

/* ========================================================
   2. SOM
   ======================================================== */
const clickSound = new Audio("../sond-efects/final-sound-efect.mp3");
clickSound.volume = 0.6;

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log("Audio play blocked"));
}

/* ========================================================
   3. LÓGICA DE RESULTADOS
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Recupera dados
    const gameMode = localStorage.getItem('gameMode') || 'classico';
    const score = parseInt(localStorage.getItem('correctCount')) || 0;
    const totalAnswered = parseInt(localStorage.getItem('totalAnswered')) || 10;
    
    const quizOrdem = JSON.parse(localStorage.getItem('quiz_ordem')) || [];
    const totalQuestions = quizOrdem.length || 10;

    setupUI(gameMode, score, totalAnswered, totalQuestions);
});

function setupUI(mode, score, answered, totalFixed) {
    const title = document.getElementById("endTitle");
    const mainStats = document.getElementById("mainStats");
    const compStats = document.getElementById("compStats");
    const starsContainer = document.getElementById("starsContainer");
    const msg = document.getElementById("feedbackMsg");
    
    // --- 1. MODO COMPETITIVO ---
    if (mode === 'competitivo') {
        document.body.classList.add('competitive-mode');
        title.textContent = "SESSÃO FINALIZADA";
        starsContainer.style.display = 'block'; // Mostra estrelas
        
        mainStats.innerHTML = `Acertos: <span style="color:#41E18E">${score}</span>`;
        compStats.style.display = 'block';
        document.getElementById("answeredCount").textContent = answered;
        
        let accuracy = answered > 0 ? Math.round((score / answered) * 100) : 0;
        document.getElementById("accuracyVal").textContent = accuracy + "%";

        calculateStarsAndFeedback(score, answered, 'competitivo'); 
    } 
    
    // --- 2. MODO APRENDIZADO ---
    else if (mode === 'aprendizado') {
        document.body.classList.remove('competitive-mode');
        title.textContent = "ESTUDO CONCLUÍDO";
        
        // Esconde as estrelas
        starsContainer.style.display = 'none'; 
        
        document.getElementById("correctCount").textContent = score;
        document.getElementById("totalCount").textContent = totalFixed;

        // Feedback simples sem julgamento
        if (score === totalFixed) {
            msg.textContent = "Excelente! Você absorveu todo o conteúdo.";
        } else if (score >= totalFixed / 2) {
            msg.textContent = "Bom trabalho! Continue revisando.";
        } else {
            msg.textContent = "Continue estudando, o conhecimento vem com a prática!";
        }
    } 
    
    // --- 3. MODO CLÁSSICO (Padrão) ---
    else {
        document.body.classList.remove('competitive-mode');
        title.textContent = "DESAFIO CONCLUÍDO";
        starsContainer.style.display = 'block'; // Mostra estrelas
        
        document.getElementById("correctCount").textContent = score;
        document.getElementById("totalCount").textContent = totalFixed;
        
        calculateStarsAndFeedback(score, totalFixed, 'classico');
    }
}

function calculateStarsAndFeedback(score, total, modeType) {
    const msg = document.getElementById("feedbackMsg");
    let percent = total > 0 ? score / total : 0;
    let stars = 0;

    if (percent === 1) stars = 3;       
    else if (percent >= 0.6) stars = 2; 
    else if (percent >= 0.3) stars = 1; 
    else stars = 0;                     

    // Animação das estrelas
    for (let i = 1; i <= stars; i++) {
        setTimeout(() => {
            const star = document.getElementById("s" + i);
            if(star) {
                star.classList.add("active");
                playClick();
            }
        }, i * 400);
    }

    // Mensagens Diferentes para Clássico vs Competitivo
    if (modeType === 'competitivo') {
        if (stars === 3) {
            msg.textContent = "🏆 RANK: DIAMANTE (PERFEITO!)";
            msg.style.color = "#FFD700";
        }
        else if (stars === 2) msg.textContent = "🥇 RANK: OURO (MUITO BOM)";
        else if (stars === 1) msg.textContent = "🥈 RANK: PRATA (NA MÉDIA)";
        else msg.textContent = "🥉 RANK: BRONZE (TREINE MAIS)";
    } else {
        // Clássico
        if (stars === 3) {
            msg.textContent = "🔥 ÉPICO! Você brilhou no Mapu!";
            msg.style.color = "#0B5D52";
        }
        else if (stars === 2) msg.textContent = "⚡ Muito bom! Evoluindo firme!";
        else if (stars === 1) msg.textContent = "💪 Continue! A jornada te espera!";
        else msg.textContent = "🎯 Todo herói começa em algum lugar!";
    }
}

/* ========================================================
   4. REDIRECIONAMENTO INTELIGENTE
   ======================================================== */
function retry() { 
    playClick(); 
    const topicPrefix = localStorage.getItem('lastTopicPrefix');
    
    localStorage.removeItem('correctCount');
    localStorage.removeItem('totalAnswered');
    localStorage.removeItem('currentQuestionNumber');
    localStorage.removeItem('jumpedQuestions');
    localStorage.removeItem('answeredIds');
    
    if (topicPrefix) {
        window.location.href = `../questions_${topicPrefix}/${topicPrefix}_q_1.html`;
    } else {
        window.location.href = '../topico.html';
    }
}

function menu() { 
    playClick(); 
    window.location.href = '../topico.html'; 
}

/* PARTÍCULAS */
const particleContainer = document.querySelector(".particles");

function spawnParticle() {
    const p = document.createElement("div");
    p.classList.add("particle");
    particleContainer.appendChild(p);
    
    const isComp = document.body.classList.contains('competitive-mode');
    
    if (isComp) {
        p.style.background = Math.random() > 0.5 ? "#FFD700" : "#8B0000";
    } else {
        p.style.background = Math.random() > 0.5 ? "#41E18E" : "#2E7D32";
    }

    p.style.left = Math.random() * window.innerWidth + "px";
    p.style.top = window.innerHeight + "px";

    setTimeout(() => p.remove(), 5200);
}

setInterval(spawnParticle, 150);

</script>
</body>
</html>