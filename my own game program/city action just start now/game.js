// Game variables
let gameStarted = false;
let player = {
  x: 400,
  y: 360,
  width: 40,
  height: 40,
  health: 100,
  ammo: 30,
  score: 0,
  level: 1
};
let enemies = [];
let bullets = [];
let obstacles = [];

// Define weapon types
const weapons = {
  pistol: { damage: 25, ammoCapacity: 10, reloadTime: 1000 },
  // Add more weapon types here as needed
};
let currentWeapon = 'pistol'; // Default starting weapon

let powerUpActive = false;
let powerUpDuration = 10000; // Power-up duration in milliseconds (e.g., 10 seconds)

// Initialize game elements
function initializeGame() {
  spawnObstacles();
}

// Start game
function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    resetGame();
    updateGame();
  }
}

// Reset game state
function resetGame() {
  player.health = 100;
  player.ammo = 30;
  player.score = 0;
  player.level = 1;
  document.getElementById('healthBar').style.width = `${player.health}%`;
  document.getElementById('scoreValue').textContent = player.score;
  document.getElementById('levelValue').textContent = player.level;
  spawnEnemies();
}

// Spawn enemies based on current level
function spawnEnemies() {
  enemies = [];
  let numEnemies = player.level * 5; // Increase enemies with level
  for (let i = 0; i < numEnemies; i++) {
    let enemy = {
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 300 + 20,
      width: 30,
      height: 30,
      health: 50 * player.level // Scale enemy health with level
    };
    enemies.push(enemy);
  }
}

// Update game loop
function updateGame() {
  if (gameStarted) {
    updatePlayer();
    updateEnemies();
    updateBullets();
    renderGame();
    checkGameStatus();
    requestAnimationFrame(updateGame);
  }
}

// Update player position and state
function updatePlayer() {
  // Example: Handle player movement based on user input or AI
}

// Update enemies position and behaviors
function updateEnemies() {
  for (let enemy of enemies) {
    // Example: Implement enemy AI behaviors (patrolling, attacking, etc.)
  }
}

// Update bullets position and collision detection
function updateBullets() {
  for (let bullet of bullets) {
    bullet.y -= 10; // Bullets move upwards
    // Check collision with enemies
    for (let i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      if (checkCollision(bullet, enemy)) {
        bullets.splice(bullets.indexOf(bullet), 1); // Remove bullet
        enemy.health -= weapons[currentWeapon].damage;
        if (enemy.health <= 0) {
          enemies.splice(i, 1); // Remove enemy
          player.score += 100;
          document.getElementById('scoreValue').textContent = player.score;
        }
        break; // Exit loop after hitting one enemy
      }
    }
    // Remove bullets when out of bounds
    if (bullet.y < 0) {
      bullets.splice(bullets.indexOf(bullet), 1);
    }
  }
}

// Render game elements on screen
function renderGame() {
  // Render player
  document.getElementById('player').style.left = `${player.x}px`;
  document.getElementById('player').style.bottom = `${player.y}px`;

  // Render enemies
  let enemiesHTML = '';
  for (let enemy of enemies) {
    enemiesHTML += `<div class="enemy" style="left:${enemy.x}px; bottom:${enemy.y}px;"></div>`;
  }
  document.getElementById('enemies').innerHTML = enemiesHTML;

  // Render bullets
  let bulletsHTML = '';
  for (let bullet of bullets) {
    bulletsHTML += `<div class="bullet" style="left:${bullet.x}px; bottom:${bullet.y}px;"></div>`;
  }
  document.getElementById('bullets').innerHTML = bulletsHTML;

  // Render obstacles
  let obstaclesHTML = '';
  for (let obstacle of obstacles) {
    obstaclesHTML += `<div class="obstacle" style="left:${obstacle.x}px; bottom:${obstacle.y}px;"></div>`;
  }
  document.getElementById('obstacles').innerHTML = obstaclesHTML;
}

// Check game status (e.g., player health, enemies left)
function checkGameStatus() {
  if (player.health <= 0) {
    gameOver('Game Over - You were defeated!');
  } else if (enemies.length === 0) {
    nextLevel();
  }
}

// Game over logic
function gameOver(message) {
  gameStarted = false;
  document.getElementById('gameOverSound').play();
  alert(message);
}

// Proceed to next level
function nextLevel() {
  player.level++;
  resetGame();
}

// Function to handle shooting with current weapon
function shoot() {
  if (player.health > 0 && player.ammo > 0) {
    let weapon = weapons[currentWeapon];
    bullets.push({ x: player.x + 15, y: player.y + 40 });
    player.ammo--;
    document.getElementById('ammoCount').textContent = player.ammo;
    document.getElementById('shootSound').play();
  }
}

// Function to reload current weapon
function reload() {
  if (player.health > 0) {
    let weapon = weapons[currentWeapon];
    setTimeout(() => {
      player.ammo = weapon.ammoCapacity;
      document.getElementById('ammoCount').textContent = player.ammo;
    }, weapon.reloadTime);
  }
}

// Function to check collision between two objects
function checkCollision(obj1, obj2) {
  // Example: Implement collision detection logic
}

// Initialize game
initializeGame();
