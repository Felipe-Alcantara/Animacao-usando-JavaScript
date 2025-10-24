// Parâmetros do texto grande
const bigTextLines = ["Animação Usando", "      JavaScript"];
let fontSize = 80;
let textBox = {x: 0, y: 0, w: 0, h: 0};
// Limite superior (em pixels) — a bola não poderá ultrapassar este valor
let topLimit = 24;

function updateTextBox() {
    fontSize = Math.floor(canvas.width > canvas.height ? canvas.height * 0.08 : canvas.width * 0.06); // Reduz o tamanho da fonte
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    // Calcula largura máxima entre as linhas
    let maxWidth = 0;
    for (const line of bigTextLines) {
        const metrics = ctx.measureText(line);
        if (metrics.width > maxWidth) maxWidth = metrics.width;
    }
    // Altura total: duas linhas + espaçamento
    const lineSpacing = fontSize * 0.3;
    const textHeight = fontSize * bigTextLines.length + lineSpacing;
    textBox.w = maxWidth;
    textBox.h = textHeight;
    textBox.x = (canvas.width - maxWidth) / 2;
    textBox.y = (canvas.height - textHeight) / 2;
}

window.addEventListener('resize', updateTextBox);
// Seleciona o elemento canvas na página
const canvas = document.querySelector('canvas');
// Obtém o contexto de desenho 2D do canvas
const ctx = canvas.getContext('2d');

// Define a largura e a altura do canvas para corresponder à largura e à altura da janela do navegador
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adiciona um ouvinte de evento para redimensionar a janela
window.addEventListener('resize', function() {
    // Atualiza a largura e a altura do canvas para corresponder à nova largura e altura da janela
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Redesenha a cena
    draw();
});

// Cria uma lista vazia para armazenar as bolas
const balls = [];

// Variáveis para controlar o arrasto da bola
let isDragging = false;
let draggedBall = null;
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

// Define uma função para criar uma nova bola
function createBall(x, y, radius = 40) {
    // Cria um novo objeto bola
    const ball = {
        x: x, // Posição x da bola
        y: y, // Posição y da bola
        radius: radius, // Raio da bola
        vx: 0, // Velocidade x da bola
        vy: 0, // Velocidade y da bola
        // Define uma função para atualizar a posição e a velocidade da bola
        update: function() {
            // Se a bola está sendo arrastada, não aplica física
            if(isDragging && draggedBall === this) {
                return;
            }
            
            // Aumenta a velocidade y da bola (simulando a gravidade)
            this.vy += 0.5;
            // Atualiza a posição x e y da bola com base em suas velocidades
            this.x += this.vx;
            this.y += this.vy;

            // Verifica se a bola atingiu o lado esquerdo da tela
            if(this.x - this.radius < 0) {
                // Se sim, move a bola de volta para a borda da tela e inverte sua velocidade x
                this.x = this.radius;
                this.vx *= -0.8;
            }

            // Verifica se a bola atingiu o lado direito da tela
            if(this.x + this.radius > canvas.width) {
                // Se sim, move a bola de volta para a borda da tela e inverte sua velocidade x
                this.x = canvas.width - this.radius;
                this.vx *= -0.8;
            }

            // Verifica se a bola atingiu o topo definido (topLimit)
            if(this.y - this.radius < topLimit) {
                // Move a bola para baixo do limite e inverte a velocidade vertical
                this.y = topLimit + this.radius;
                this.vy *= -0.8;
                // Pequeno amortecimento horizontal ao bater no topo
                this.vx *= 0.98;
            }

            // Verifica se a bola atingiu o fundo da tela
            if(this.y + this.radius > canvas.height) {
                // Se sim, move a bola de volta para a borda da tela e inverte sua velocidade y
                this.y = canvas.height - this.radius;
                this.vy *= -0.8;
                
                // Aplica atrito quando a bola está no chão
                this.vx *= 0.98;
                
                // Para a bola completamente se a velocidade for muito baixa
                if(Math.abs(this.vx) < 0.05) {
                    this.vx = 0;
                }
                if(Math.abs(this.vy) < 0.05) {
                    this.vy = 0;
                }
            }
        }
    };

    // Adiciona a nova bola à lista de bolas
    balls.push(ball);

    // Retorna a nova bola
    return ball;
}

// Cria uma nova bola abaixo do texto
function spawnBallBelowText() {
    updateTextBox();
    const x = canvas.width / 2;
    const y = textBox.y + textBox.h + 60;
    createBall(x, y);
}

spawnBallBelowText();

// Define uma função para atualizar todas as bolas
// Função de colisão bola-retângulo (bounding box do texto)
function ballHitsText(ball) {
    // Caixa do texto
    const bx = textBox.x, by = textBox.y, bw = textBox.w, bh = textBox.h;
    // Ponto mais próximo do centro da bola dentro do retângulo
    const closestX = Math.max(bx, Math.min(ball.x, bx + bw));
    const closestY = Math.max(by, Math.min(ball.y, by + bh));
    // Distância do centro da bola ao ponto mais próximo
    const dx = ball.x - closestX;
    const dy = ball.y - closestY;
    return (dx*dx + dy*dy) < (ball.radius*ball.radius);
}

function update() {
    for(const ball of balls) {
        ball.update();
        // Colisão com o texto
        if(ballHitsText(ball)) {
            // Empurra a bola para fora do texto
            // Calcula o vetor de afastamento
            const bx = textBox.x, by = textBox.y, bw = textBox.w, bh = textBox.h;
            const closestX = Math.max(bx, Math.min(ball.x, bx + bw));
            const closestY = Math.max(by, Math.min(ball.y, by + bh));
            const dx = ball.x - closestX;
            const dy = ball.y - closestY;
            const dist = Math.sqrt(dx*dx + dy*dy) || 1;
            // Move a bola para fora
            ball.x = closestX + dx/dist * (ball.radius+0.1);
            ball.y = closestY + dy/dist * (ball.radius+0.1);
            // Reflete a velocidade
            const normalX = dx/dist;
            const normalY = dy/dist;
            const dot = ball.vx*normalX + ball.vy*normalY;
            ball.vx -= 2*dot*normalX;
            ball.vy -= 2*dot*normalY;
            // Amortecimento
            ball.vx *= 0.8;
            ball.vy *= 0.8;
        }
    }
}

// Define uma função para desenhar um círculo preenchido
function fillCircle(x, y, radius) {
    // Começa um novo caminho de desenho
    ctx.beginPath();
    // Desenha um arco (que é um círculo completo)
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    // Preenche o círculo
    ctx.fill();
    // Fecha o caminho de desenho
    ctx.closePath();
}

// Define uma função para desenhar a cena
function draw() {
    // Fundo
    ctx.fillStyle = '#1b1d21';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha uma barra no topo para indicar o limite superior
    ctx.fillStyle = '#2f3336';
    const barHeight = Math.max(3, Math.floor(topLimit * 0.6));
    ctx.fillRect(0, topLimit - Math.floor(barHeight/2), canvas.width, barHeight);

    // Texto grande em duas linhas, ambos centralizados no centro do canvas
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = Math.max(4, Math.floor(fontSize * 0.08));
    const centerX = canvas.width / 2;
    // Calcule posição inicial vertical para as linhas (centralizado como bloco)
    const spacing = Math.floor(fontSize * 0.3);
    const totalHeight = fontSize * bigTextLines.length + spacing;
    const startY = Math.floor((canvas.height - totalHeight) / 2);

    for (let i = 0; i < bigTextLines.length; i++) {
        const line = bigTextLines[i];
        const y = startY + i * (fontSize + spacing);
        // Ajuste fino: desloca a segunda linha um pouco para a esquerda
        const horizontalShift = (i === 1) ? -Math.floor(fontSize * 0.70) : 0; // tweak this multiplier if needed
        const x = centerX + horizontalShift;
        // Primeiro desenha o contorno escuro pequeno para destacar
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = Math.max(4, Math.floor(fontSize * 0.08));
        ctx.strokeText(line, x, y);
        // Em seguida o preenchimento com a cor da bolinha
        ctx.fillStyle = '#ffffff';
        ctx.fillText(line, x, y);
    }

    // Desenha todas as bolas
    ctx.fillStyle = '#ffffff';
    for(const ball of balls) fillCircle(ball.x, ball.y, ball.radius);
}

// Inicializa a caixa de colisão do texto
updateTextBox();

// Define uma função para animar a cena
function animate() {
    // Solicita o próximo quadro de animação
    requestAnimationFrame(animate);
    // Atualiza todas as bolas
    update();
    // Desenha a nova cena
    draw();
}

// Inicia a animação
animate();

// Função para verificar se o mouse está sobre uma bola
function getBallAtPosition(x, y) {
    // Verifica as bolas de trás para frente (a última desenhada primeiro)
    for(let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        const dx = x - ball.x;
        const dy = y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if(distance < ball.radius) {
            return ball;
        }
    }
    return null;
}

// Evento de mouse pressionado
canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    
    // Verifica se clicou em alguma bola
    draggedBall = getBallAtPosition(mouseX, mouseY);
    
    if(draggedBall) {
        isDragging = true;
        // Zera as velocidades ao pegar a bola
        draggedBall.vx = 0;
        draggedBall.vy = 0;
    }
});

// Evento de movimento do mouse
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    if(isDragging && draggedBall) {
        // Move a bola para a posição do mouse
        draggedBall.x = mouseX;
        draggedBall.y = mouseY;
        
        // Calcula a velocidade baseada no movimento do mouse
        draggedBall.vx = mouseX - lastMouseX;
        draggedBall.vy = mouseY - lastMouseY;
    }
    
    lastMouseX = mouseX;
    lastMouseY = mouseY;
});

// Evento de mouse solto
canvas.addEventListener('mouseup', function(e) {
    if(isDragging && draggedBall) {
        // Aplica a velocidade do arrasto ao soltar
        draggedBall.vx *= 1.5; // Multiplica para dar mais impulso
        draggedBall.vy *= 1.5;
    }
    
    isDragging = false;
    draggedBall = null;
});

// ===== SUPORTE PARA TOUCH (DISPOSITIVOS MÓVEIS) =====

// Evento de toque iniciado
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Previne o comportamento padrão (como scroll)
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouseX = touch.clientX - rect.left;
    mouseY = touch.clientY - rect.top;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    
    // Verifica se tocou em alguma bola
    draggedBall = getBallAtPosition(mouseX, mouseY);
    
    if(draggedBall) {
        isDragging = true;
        // Zera as velocidades ao pegar a bola
        draggedBall.vx = 0;
        draggedBall.vy = 0;
    }
});

// Evento de movimento do toque
canvas.addEventListener('touchmove', function(e) {
    e.preventDefault(); // Previne o scroll da página
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouseX = touch.clientX - rect.left;
    mouseY = touch.clientY - rect.top;
    
    if(isDragging && draggedBall) {
        // Move a bola para a posição do toque
        draggedBall.x = mouseX;
        draggedBall.y = mouseY;
        
        // Calcula a velocidade baseada no movimento do toque
        draggedBall.vx = mouseX - lastMouseX;
        draggedBall.vy = mouseY - lastMouseY;
    }
    
    lastMouseX = mouseX;
    lastMouseY = mouseY;
});

// Evento de toque finalizado
canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    
    if(isDragging && draggedBall) {
        // Aplica a velocidade do arrasto ao soltar
        draggedBall.vx *= 1.5; // Multiplica para dar mais impulso
        draggedBall.vy *= 1.5;
    }
    
    isDragging = false;
    draggedBall = null;
});
