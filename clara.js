// clara.js

window.onload = function() {
    // Inicia a música de fundo automaticamente
    const music = document.getElementById("background-music");
    music.volume = 0.5; // Ajusta o volume
    music.play().catch(() => {
        // Se a reprodução automática falhar, aguarda uma interação do usuário
        document.addEventListener('click', () => {
            music.play();
        }, { once: true });
    });

    // Efeito de confetes caindo
    const confettiCanvas = document.getElementById("confetti-canvas");
    const confettiContext = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    const confetti = [];

    function createConfetti() {
        const count = 300;
        for (let i = 0; i < count; i++) {
            confetti.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                size: random(5, 15),
                speed: random(2, 5),
                opacity: random(0.6, 1),
                color: `hsl(${random(0, 360)}, 100%, 70%)`,
            });
        }
    }

    function drawConfetti() {
        confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confetti.forEach((c) => {
            confettiContext.globalAlpha = c.opacity;
            confettiContext.fillStyle = c.color;
            confettiContext.fillRect(c.x, c.y, c.size, c.size);
            c.y += c.speed;
            if (c.y > confettiCanvas.height) c.y = 0;
        });
        requestAnimationFrame(drawConfetti);
    }

    createConfetti();
    drawConfetti();

    // Efeito de mouse descontrolado
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.background = 'red';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.transition = 'transform 0.05s';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX + Math.random() * 100 - 50;
        const y = e.clientY + Math.random() * 100 - 50;
        cursor.style.transform = `translate(${x}px, ${y}px)`;
    });
};
