const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    draw();
});

const balls = [];

function createBall(x, y, radius = 40) {
    const ball = {
        x: x,
        y: y,
        radius: radius,
        vx: 0,
        vy: 0,
        update: function() {
            this.vy += 0.5;
            this.x += this.vx;
            this.y += this.vy;

            if(this.x - this.radius < 0) {
                this.x = this.radius;
                this.vx *= -0.8;
            }

            if(this.x + this.radius > canvas.width) {
                this.x = canvas.width - this.radius;
                this.vx *= -0.8;
            }

            if(this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius;
                this.vy *= -0.8;
            }
        }
    };

    balls.push(ball);

    return ball;
}

createBall(canvas.width / 2, 100);

function update() {
    for(const ball of balls) ball.update();
}

function fillCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.fillStyle = '#1b1d21';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    for(const ball of balls) fillCircle(ball.x, ball.y, ball.radius);
}

function animate() {
    requestAnimationFrame(animate);
    update();
    draw();
}

animate();