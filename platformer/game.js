const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player properties
const player = {
    x: 100,
    y: 400,
    width: 40,
    height: 40,
    speed: 5,
    velocityY: 0,
    jumping: false,
    gravity: 0.5,
    jumpStrength: -12,
    jumpCount: 0, // Added jumpCount property
    maxJumps: 2   // Maximum number of jumps allowed
};

// Load player image
const playerImage = new Image();
playerImage.src = 'duck.png';

// Platform properties
let platforms = [];
const platformWidth = 200;
const platformHeight = 20;
let lastPlatformX = 0;

// Game state
let score = 0;
let gameSpeed = 5;
let gameOver = false;

// Controls
let keys = {
    jump: false,
    restart: false
};

// Event listeners for controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
            keys.jump = true;
            break;
        case 'r':
        case 'R':
            keys.restart = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.key) {
        case ' ':
            keys.jump = false;
            break;
        case 'r':
        case 'R':
            keys.restart = false;
            break;
    }
});

// Generate new platform
function generatePlatform() {
    const minGap = 50;  
    const maxGap = 100; 
    const minHeight = 100;
    const maxHeight = 400;

    const gap = Math.random() * (maxGap - minGap) + minGap;
    const height = Math.random() * (maxHeight - minHeight) + minHeight;

    platforms.push({
        x: lastPlatformX + gap,
        y: canvas.height - height,
        width: platformWidth,
        height: platformHeight
    });

    lastPlatformX = platforms[platforms.length - 1].x;
}

// Initial platforms
function initializePlatforms() {
    platforms = [{
        x: 0,
        y: canvas.height - 100,
        width: platformWidth,
        height: platformHeight
    }];
    lastPlatformX = platformWidth;
}

// Reset game state
function resetGame() {
    player.x = 100;
    player.y = 400;
    player.velocityY = 0;
    player.jumping = false;
    player.jumpCount = 0; // Reset jump count
    score = 0;
    gameSpeed = 5;
    gameOver = false;
    initializePlatforms();
}

// Game loop
function update() {
    if (gameOver) {
        ctx.fillStyle = '#000000';
        ctx.font = '40px Arial';
        ctx.fillText('Score: ' + score, canvas.width / 2 - 100, canvas.height / 2 - 50);
        ctx.fillText('R to Restart', canvas.width / 2 - 100, canvas.height / 2 + 50);
        if (keys.restart) {
            resetGame();
        }
        requestAnimationFrame(update);
        return;
    }

    // Player movement
    if (keys.jump && player.jumpCount < player.maxJumps) {
        player.velocityY = player.jumpStrength;
        player.jumping = true;
        player.jumpCount++;
        keys.jump = false; // Prevent continuous jumping
    }

    // Apply gravity
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Generate new platforms
    if (platforms.length < 5) {
        generatePlatform();
    }

    // Move platforms (simulating infinite scroll)
    platforms.forEach(platform => {
        platform.x -= gameSpeed;
    });

    // Remove off-screen platforms
    platforms = platforms.filter(platform => platform.x + platform.width > 0);

    // Collision detection
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height <= platform.y + platform.height &&
            player.velocityY > 0) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.jumping = false;
            player.jumpCount = 0; // Reset jump count on landing
        }
    });

    // Keep player on screen
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y > canvas.height) {
        gameOver = true;
    }

    // Update score
    score += 1;
    if (score % 100 === 0) gameSpeed += 0.1;

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw platforms
    ctx.fillStyle = '#228B22';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Draw player
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    // Draw score
    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(update);
}

// Initialize game
initializePlatforms();
update();