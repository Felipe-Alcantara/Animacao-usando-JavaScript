// ============================================================================
// Animação de Bola Quicando — Canvas API
// Simula gravidade, colisão com bordas, atrito e colisão com o texto do título.
// Suporta interação por mouse (desktop) e toque (mobile).
// ============================================================================

// ----------------------------------------------------------------------------
// Configuração (constantes de física e layout)
// ----------------------------------------------------------------------------
const CONFIG = {
    gravity: 0.5,          // aceleração vertical aplicada a cada quadro
    bounce: -0.8,          // fator de inversão de velocidade ao colidir (amortecido)
    friction: 0.98,        // atrito horizontal aplicado no contato com superfícies
    minSpeed: 0.05,        // abaixo disso a velocidade é zerada (repouso)
    throwBoost: 1.5,       // multiplicador de impulso ao soltar a bola
    topLimit: 24,          // limite superior (px): a bola não ultrapassa este Y
    ballRadius: 40,
    bigTextLines: ['Animação Usando', 'JavaScript'],
};

// ----------------------------------------------------------------------------
// Canvas e contexto
// ----------------------------------------------------------------------------
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ----------------------------------------------------------------------------
// Estado do texto do título
// `textBox` é a ÚNICA fonte de verdade para posição/tamanho do texto: tanto o
// desenho (draw) quanto a colisão (ballHitsText) usam estes mesmos valores,
// garantindo que a caixa de colisão coincida com o texto visível.
// ----------------------------------------------------------------------------
let fontSize = 80;
let lineSpacing = 0;            // espaço vertical entre as duas linhas
const secondLineShift = -1;    // deslocamento horizontal da 2ª linha, em "fontSize"
const textBox = { x: 0, y: 0, w: 0, h: 0 };

// Recalcula tamanho da fonte e a caixa do título a partir das dimensões atuais.
function updateTextBox() {
    fontSize = Math.floor(
        canvas.width > canvas.height ? canvas.height * 0.08 : canvas.width * 0.06
    );
    lineSpacing = Math.floor(fontSize * 0.3);
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;

    // Largura: considera o deslocamento horizontal da segunda linha para que a
    // caixa englobe de fato o texto desenhado.
    let minLeft = Infinity;
    let maxRight = -Infinity;
    CONFIG.bigTextLines.forEach((line, i) => {
        const width = ctx.measureText(line).width;
        const shift = i === 1 ? secondLineShift * fontSize : 0;
        // O texto é desenhado centralizado (textAlign = 'center') em centerX + shift.
        minLeft = Math.min(minLeft, shift - width / 2);
        maxRight = Math.max(maxRight, shift + width / 2);
    });

    const totalWidth = maxRight - minLeft;
    const totalHeight = fontSize * CONFIG.bigTextLines.length + lineSpacing;

    textBox.w = totalWidth;
    textBox.h = totalHeight;
    textBox.x = canvas.width / 2 + minLeft;
    textBox.y = (canvas.height - totalHeight) / 2;
}

// ----------------------------------------------------------------------------
// Bolas
// ----------------------------------------------------------------------------
const balls = [];

// Estado do arraste (mouse/touch)
let isDragging = false;
let draggedBall = null;
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

// Cria uma bola e a adiciona à lista.
function createBall(x, y, radius = CONFIG.ballRadius) {
    const ball = {
        x, y, radius,
        vx: 0,
        vy: 0,

        // Atualiza posição/velocidade aplicando física e colisão com as bordas.
        update() {
            // Enquanto arrastada, a física é ignorada (a posição segue o cursor).
            if (isDragging && draggedBall === this) return;

            // Gravidade
            this.vy += CONFIG.gravity;
            this.x += this.vx;
            this.y += this.vy;

            // Parede esquerda
            if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.vx *= CONFIG.bounce;
            }
            // Parede direita
            if (this.x + this.radius > canvas.width) {
                this.x = canvas.width - this.radius;
                this.vx *= CONFIG.bounce;
            }
            // Topo (limite definido por CONFIG.topLimit)
            if (this.y - this.radius < CONFIG.topLimit) {
                this.y = CONFIG.topLimit + this.radius;
                this.vy *= CONFIG.bounce;
                this.vx *= CONFIG.friction;
            }
            // Chão
            if (this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius;
                this.vy *= CONFIG.bounce;
                this.vx *= CONFIG.friction;

                // Repouso: zera velocidades residuais muito pequenas.
                if (Math.abs(this.vx) < CONFIG.minSpeed) this.vx = 0;
                if (Math.abs(this.vy) < CONFIG.minSpeed) this.vy = 0;
            }
        },
    };

    balls.push(ball);
    return ball;
}

// Cria a bola inicial logo abaixo do título.
function spawnBallBelowText() {
    updateTextBox();
    const x = canvas.width / 2;
    const y = textBox.y + textBox.h + 60;
    createBall(x, y);
}

// ----------------------------------------------------------------------------
// Colisão bola × título (bounding box)
// ----------------------------------------------------------------------------

// Ponto da caixa do texto mais próximo do centro da bola.
function closestPointOnTextBox(ball) {
    return {
        x: Math.max(textBox.x, Math.min(ball.x, textBox.x + textBox.w)),
        y: Math.max(textBox.y, Math.min(ball.y, textBox.y + textBox.h)),
    };
}

function ballHitsText(ball) {
    const p = closestPointOnTextBox(ball);
    const dx = ball.x - p.x;
    const dy = ball.y - p.y;
    return dx * dx + dy * dy < ball.radius * ball.radius;
}

// Resolve a colisão empurrando a bola para fora e refletindo a velocidade.
function resolveTextCollision(ball) {
    const p = closestPointOnTextBox(ball);
    const dx = ball.x - p.x;
    const dy = ball.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const normalX = dx / dist;
    const normalY = dy / dist;

    // Reposiciona a bola na borda da caixa
    ball.x = p.x + normalX * (ball.radius + 0.1);
    ball.y = p.y + normalY * (ball.radius + 0.1);

    // Reflete a velocidade ao longo da normal e amortece
    const dot = ball.vx * normalX + ball.vy * normalY;
    ball.vx = (ball.vx - 2 * dot * normalX) * 0.8;
    ball.vy = (ball.vy - 2 * dot * normalY) * 0.8;
}

// Atualiza todas as bolas (física + colisão com o texto).
function update() {
    for (const ball of balls) {
        ball.update();
        if (ballHitsText(ball)) resolveTextCollision(ball);
    }
}

// ----------------------------------------------------------------------------
// Desenho
// ----------------------------------------------------------------------------
function fillCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}

// Desenha o título usando exatamente a posição/tamanho de `textBox`.
function drawText() {
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.lineWidth = Math.max(4, Math.floor(fontSize * 0.08));

    const centerX = canvas.width / 2;
    const lineColors = ['#ffffff', '#ffb300']; // 2ª linha ("JavaScript") em amarelo

    CONFIG.bigTextLines.forEach((line, i) => {
        const y = textBox.y + i * (fontSize + lineSpacing);
        const x = centerX + (i === 1 ? secondLineShift * fontSize : 0);

        // Contorno escuro para destacar sobre o fundo e as bolas.
        ctx.strokeStyle = '#000000';
        ctx.strokeText(line, x, y);

        ctx.fillStyle = lineColors[i] ?? '#ffffff';
        ctx.fillText(line, x, y);
    });
}

function draw() {
    // Fundo
    ctx.fillStyle = '#1b1d21';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Barra indicativa do limite superior
    ctx.fillStyle = '#2f3336';
    const barHeight = Math.max(3, Math.floor(CONFIG.topLimit * 0.1));
    ctx.fillRect(0, CONFIG.topLimit - Math.floor(barHeight / 2), canvas.width, barHeight);

    drawText();

    // Bolas
    ctx.fillStyle = '#ffffff';
    for (const ball of balls) fillCircle(ball.x, ball.y, ball.radius);
}

// ----------------------------------------------------------------------------
// Loop de animação
// ----------------------------------------------------------------------------
function animate() {
    requestAnimationFrame(animate);
    update();
    draw();
}

// ----------------------------------------------------------------------------
// Interação (mouse e toque)
// ----------------------------------------------------------------------------

// Retorna a bola sob o ponto (x, y), procurando da última para a primeira.
function getBallAtPosition(x, y) {
    for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        const dx = x - ball.x;
        const dy = y - ball.y;
        if (dx * dx + dy * dy < ball.radius * ball.radius) return ball;
    }
    return null;
}

// Converte coordenadas de um evento de ponteiro para coordenadas do canvas.
function getPointerPos(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
}

// Início do arraste: tenta agarrar uma bola sob o ponteiro.
function startDrag(clientX, clientY) {
    const pos = getPointerPos(clientX, clientY);
    mouseX = lastMouseX = pos.x;
    mouseY = lastMouseY = pos.y;

    draggedBall = getBallAtPosition(mouseX, mouseY);
    if (draggedBall) {
        isDragging = true;
        draggedBall.vx = 0;
        draggedBall.vy = 0;
    }
}

// Movimento durante o arraste: a bola segue o ponteiro e acumula velocidade.
function moveDrag(clientX, clientY) {
    const pos = getPointerPos(clientX, clientY);
    mouseX = pos.x;
    mouseY = pos.y;

    if (isDragging && draggedBall) {
        draggedBall.x = mouseX;
        draggedBall.y = mouseY;
        draggedBall.vx = mouseX - lastMouseX;
        draggedBall.vy = mouseY - lastMouseY;
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;
}

// Fim do arraste: aplica impulso proporcional ao movimento final.
function endDrag() {
    if (isDragging && draggedBall) {
        draggedBall.vx *= CONFIG.throwBoost;
        draggedBall.vy *= CONFIG.throwBoost;
    }
    isDragging = false;
    draggedBall = null;
}

// Mouse
canvas.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
canvas.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
canvas.addEventListener('mouseup', endDrag);

// Touch
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    moveDrag(touch.clientX, touch.clientY);
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    endDrag();
}, { passive: false });

// Redimensionamento: ajusta o canvas e recalcula o layout do texto.
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateTextBox();
    draw();
});

// ----------------------------------------------------------------------------
// Inicialização
// ----------------------------------------------------------------------------
updateTextBox();
spawnBallBelowText();
animate();
