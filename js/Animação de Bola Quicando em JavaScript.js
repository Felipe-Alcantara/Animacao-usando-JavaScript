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

            // Verifica se a bola atingiu o fundo da tela
            if(this.y + this.radius > canvas.height) {
                // Se sim, move a bola de volta para a borda da tela e inverte sua velocidade y
                this.y = canvas.height - this.radius;
                this.vy *= -0.8;
            }
        }
    };

    // Adiciona a nova bola à lista de bolas
    balls.push(ball);

    // Retorna a nova bola
    return ball;
}

// Cria uma nova bola no meio da tela
createBall(canvas.width / 2, 100);

// Define uma função para atualizar todas as bolas
function update() {
    for(const ball of balls) ball.update();
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
    // Define a cor de preenchimento para preto
    ctx.fillStyle = '#1b1d21';
    // Desenha um retângulo preenchido que cobre toda a tela
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Define a cor de preenchimento para branco
    ctx.fillStyle = '#ffffff';
    // Desenha todas as bolas
    for(const ball of balls) fillCircle(ball.x, ball.y, ball.radius);
}

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