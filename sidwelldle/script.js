const words = [ //words for the month (32 words)
  "X", // 0 in the array
  "dialogue", // day 1
  "mentor", 
  "justice", 
  "truthful", 
  "seminar",
  "quakers", 
  "reflect", 
  "service", 
  "meeting", 
  "worship", //day 10 
  "writing",
  "speece", 
  "finals", 
  "english", 
  "garman", 
  "reading", 
  "history",
  "arts", 
  "ethics", 
  "learning", //day 20
  "growth", 
  "respect", 
  "graduation",
  "research", 
  "teacher", 
  "equality", 
  "foxden", 
  "purpose", 
  "discuss",
  "science", //day 30
  "community",
  ];

const today = new Date().getDate();
const WORD = words[today];

let wordLength = WORD.length;
document.documentElement.style.setProperty("--length", `${wordLength}`);

const board = document.getElementById("board");
const message = document.getElementById("message");

const MAX_ATTEMPTS = 6;
let currentRow = 0;
let currentCol = 0;
let attempts = Array.from({ length: MAX_ATTEMPTS }, () => Array(5).fill(""));

function initializeBoard() {
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    for (let j = 0; j < wordLength; j++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.id = `tile-${i}-${j}`;
      board.appendChild(tile);
    }
  }
}

function updateBoard() {
  for (let i = 0; i <= currentRow; i++) {
    for (let j = 0; j < wordLength; j++) {
      const tile = document.getElementById(`tile-${i}-${j}`);
      tile.textContent = attempts[i][j];
    }
  }
}

function checkWord() {
  const guess = attempts[currentRow].join("");
  if (guess.length < wordLength) {
    showMessage("Word must be "+wordLength+" letters long!");
    return;
  }

  if (guess === WORD) {
    colorTiles(guess);
    return;
  }

  if (currentRow === MAX_ATTEMPTS - 1) {
    colorTiles(guess);
    showMessage(`Game Over! The word was "${WORD}".`);
    return;
  }

  colorTiles(guess);
  currentRow++;
  currentCol = 0;
}

function colorTiles(guess) {
  for (let i = 0; i < wordLength; i++) {
    const tile = document.getElementById(`tile-${currentRow}-${i}`);
    if (guess[i] === WORD[i]) {
      tile.classList.add("correct");
    } else if (WORD.includes(guess[i])) {
      tile.classList.add("present");
    } else {
      tile.classList.add("absent");
    }
  }
}

function showMessage(text) {
  message.textContent = text;
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (key === "enter") {
    checkWord();
  } else if (key === "backspace") {
    if (currentCol > 0) {
      currentCol--;
      attempts[currentRow][currentCol] = "";
    }
  } else if (/^[a-z]$/.test(key) && currentCol < wordLength) {
    attempts[currentRow][currentCol] = key;
    currentCol++;
  }

  updateBoard();
});

initializeBoard();
