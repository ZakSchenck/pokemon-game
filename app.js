const attackOne = document.querySelector(".attack1");
const attackTwo = document.querySelector(".attack2");
const attackThree = document.querySelector(".attack3");
const attackFour = document.querySelector(".attack4");
const playerTwoHealthBar = document.querySelector(".p2-health");
const playerTwoHealthCount = document.querySelector(".health-count-p2");
const playerOneHealthBar = document.querySelector(".p1-health");
const playerOneHealthCount = document.querySelector(".health-count-p1");
const gameStateText = document.querySelector(".game-state");
const attackContainer = document.querySelector(".attack-container");
const restartBtn = document.querySelector(".restart-game");
let playerOneHealth = 70;
let playerTwoHealth = 70;
const playerTwoAttacks = ["Psychic", "Confusion", "Facade", "Psycho Blast"];

// Changes health color for player one and player two
const healthColor = (playerHealth, playerBar) => {
  if (playerHealth < 40 && playerHealth > 20) {
    playerBar.style.backgroundColor = "#cee809";
  } else if (playerHealth < 20) {
    playerBar.style.backgroundColor = "red";
  } else {
    playerBar.style.backgroundColor = "green";
  }
};

// Checks if Charmander or Mewtwo win
const checkWinner = (name, playerBar, playerCount) => {
  gameStateText.innerText = `${name} wins! Press restart to play again!`;
  playerBar.style.width = "0%";
  gameStateText.style.display = "block";
  attackContainer.style.display = "none";
  playerCount.innerText = "0 / 70";
  restartBtn.style.display = "block";
};

// Player One Attacking logic function
const playerOneAttack = (subtract, missCount, attackName) => {
  // Gets random number to calculate if it's a miss
  const randomNumber = Math.floor(Math.random() * missCount) + 1;
  if (randomNumber !== 1) {
    // Subtract health
    playerTwoHealth -= subtract;
    if (playerTwoHealth <= 0) {
      checkWinner("Charmander", playerTwoHealthBar, playerTwoHealthCount);
    } else if (playerOneHealth <= 0) {
      checkWinner("Mewtwo", playerOneHealthBar, playerOneHealthCount);
    } else {
      intervalFunction();
      playerTwoHealthBar.style.width = `${playerTwoHealth}%`;
      playerTwoHealthBar.style.transition = "1.4s";
      playerTwoHealthCount.innerText = `${playerTwoHealth} / 70`;
      gameStateText.innerText = `Charmander used ${attackName}! It took away ${subtract} HP!`;
      attackContainer.style.display = "none";
    }
    // Miss game state text
  } else {
    gameStateText.innerText = `Charmander used ${attackName}... But it missed!`;
    intervalFunction();
  }
};

const playerTwoAttack = () => {
  let missCount;
  let subtractHealth;
  const randomAttackNum = Math.floor(Math.random() * 4) + 0;
  const randomAttack = playerTwoAttacks[randomAttackNum];
  if (randomAttack === "Psychic") {
    missCount = 10;
    subtractHealth = 15;
  } else if (randomAttack === "Confusion") {
    missCount = 7;
    subtractHealth = 17;
  } else if (randomAttack === "Facade") {
    missCount = 4;
    subtractHealth = 20;
  } else {
    missCount = 2;
    subtractHealth = 32;
  }
  const randomNumber = Math.floor(Math.random() * missCount) + 1;
  if (randomNumber !== 1) {
    playerOneHealth -= subtractHealth;
    if (playerOneHealth <= 0) {
      checkWinner("Mewtwo", playerOneHealthBar, playerOneHealthCount);
    } else {
      playerOneHealthBar.style.width = `${playerOneHealth}%`;
      playerOneHealthBar.style.transition = "1.4s";
      playerOneHealthCount.innerText = `${playerOneHealth} / 70`;
      gameStateText.innerText = `Mewtwo used ${randomAttack}! It took away ${subtractHealth} HP!`;
      attackContainer.style.display = "none";
    }
  } else {
    gameStateText.innerText = `Mewtwo used ${randomAttack}... But it missed!`;
  }
};

setInterval(() => {
  healthColor(playerOneHealth, playerOneHealthBar);
}, 500);
// Setting interval for the game state auto reading text
const intervalFunction = () => {
  healthColor(playerTwoHealth, playerTwoHealthBar);
  const interval = setInterval(() => {
    gameStateText.style.display = "block";
    attackContainer.style.display = "none";
  }, 1);
  const intervalTwo = setInterval(() => {
    playerTwoAttack();
    clearInterval(intervalTwo);
  }, 2502);
  setTimeout(() => {
    clearInterval(interval);
    if (playerOneHealth >= 0) {
      gameStateText.style.display = "none";
      attackContainer.style.display = "grid";
    }
  }, 5004);
};

// Restart game logic
const restartGame = () => {
  playerTwoHealthBar.style.width = "70%";
  gameStateText.style.display = "none";
  attackContainer.style.display = "grid";
  playerTwoHealthCount.innerText = "70 / 70";
  playerOneHealthBar.style.width = "70%";
  playerOneHealthBar.style.backgroundColor = "green";
  playerTwoHealthBar.style.backgroundColor = "green";
  playerOneHealthCount.innerText = "70 / 70";
  restartBtn.style.display = "none";
  playerOneHealth = 70;
  playerTwoHealth = 70;
};

// Restart button event listener
restartBtn.addEventListener("click", () => restartGame());

// Player one attack button events
attackOne.addEventListener("click", () => playerOneAttack(12, 18, "Body Slam"));
attackTwo.addEventListener("click", () =>
  playerOneAttack(20, 8, "Fire Breath")
);
attackThree.addEventListener("click", () =>
  playerOneAttack(24, 4, "Annihilate")
);
attackFour.addEventListener("click", () =>
  playerOneAttack(29, 2, "Flamethrower")
);
