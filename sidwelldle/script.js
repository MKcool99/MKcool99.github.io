const words = [ //words for the month — shuffled; day 31 is fixed
  "X", // 0 in the array
  "quakers", // day 1
  "archive",
  "mentor",
  "eluceat", // motto: Eluceat omnibus lux
  "justice",
  "foxden",
  "seniors",
  "witness",
  "reflect",
  "library", //day 10
  "zartman", // Zartman House
  "respect",
  "capstone",
  "upton", // Upton Street — the new Upper School
  "omnibus",
  "diploma",
  "gather",
  "ethical",
  "silence",
  "service", //day 20
  "reunion",
  "queries",
  "wisconsin", // Wisconsin Avenue
  "clerk",
  "worship",
  "campus",
  "equality",
  "kitchen",
  "friends",
  "seminar", //day 30
  "horizon", //day 31 — the student newspaper
  ];

const today = new Date().getDate();
const WORD = words[today];

// shown once the board is finished, win or lose, on the day the word is horizon
const SPECIAL_NOTE = WORD === "horizon" ? "note: the horizon is inferior to the oat" : "";

let wordLength = WORD.length;
document.documentElement.style.setProperty("--length", `${wordLength}`);

const board = document.getElementById("board");
const message = document.getElementById("message");
const keyboard = document.getElementById("keyboard");

const KEY_ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const RANK = { absent: 0, present: 1, correct: 2 };
const STATS_KEY = "sidwelldle-stats";

const MAX_ATTEMPTS = 6;
const STORAGE_KEY = "sidwelldle-progress";

let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let attempts = Array.from({ length: MAX_ATTEMPTS }, () =>
  Array(wordLength).fill("")
);

// Saved progress is keyed to the day's word, so a new day starts fresh
// but a reload mid-game restores exactly where you left off.
function saveProgress() {
  const submitted = attempts
    .slice(0, gameOver ? currentRow + 1 : currentRow)
    .map((row) => row.join(""));

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ day: today, word: WORD, guesses: submitted })
    );
  } catch (e) {
    // private browsing / storage disabled — game still plays, just won't persist
  }
}

function loadProgress() {
  let saved;
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (e) {
    return;
  }

  if (!saved || saved.day !== today || saved.word !== WORD) return;
  if (!Array.isArray(saved.guesses)) return;

  saved.guesses.slice(0, MAX_ATTEMPTS).forEach((guess) => {
    if (gameOver) return;
    if (typeof guess !== "string" || guess.length !== wordLength) return;
    attempts[currentRow] = guess.split("");
    colorTiles(guess, currentRow);

    if (guess === WORD) {
      gameOver = true;
      recordResult(true, currentRow + 1);
      if (SPECIAL_NOTE) showMessage(SPECIAL_NOTE, true);
    } else if (currentRow === MAX_ATTEMPTS - 1) {
      gameOver = true;
      recordResult(false);
      showMessage(lossMessage(), Boolean(SPECIAL_NOTE));
    } else {
      currentRow++;
    }
  });

  updateBoard();
}

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

function loadStats() {
  const blank = { played: 0, wins: 0, streak: 0, maxStreak: 0, dist: [0, 0, 0, 0, 0, 0], lastDay: null };
  try {
    const saved = JSON.parse(localStorage.getItem(STATS_KEY));
    if (saved && Array.isArray(saved.dist) && saved.dist.length === 6) return saved;
  } catch (e) {
    // fall through to a blank record
  }
  return blank;
}

// Recorded once per day, when the board is finished. `lastDay` guards against
// double-counting if the finished board is replayed from saved progress.
function recordResult(won, guessCount) {
  const stats = loadStats();
  if (stats.lastDay === today) return;

  stats.played++;
  if (won) {
    stats.wins++;
    stats.streak = stats.lastDay === today - 1 ? stats.streak + 1 : 1;
    stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    stats.dist[guessCount - 1]++;
  } else {
    stats.streak = 0;
  }
  stats.lastDay = today;

  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    // storage unavailable — stats just won't carry over
  }
}

function renderStats() {
  const stats = loadStats();
  const winRate = stats.played ? Math.round((stats.wins / stats.played) * 100) : 0;

  const summary = [
    ["Played", stats.played],
    ["Win %", winRate],
    ["Streak", stats.streak],
    ["Max", stats.maxStreak],
  ];
  document.getElementById("stat-summary").innerHTML = summary
    .map(
      ([label, value]) =>
        `<div><div class="stat-num">${value}</div><div class="stat-label">${label}</div></div>`
    )
    .join("");

  const most = Math.max(...stats.dist, 1);
  const todayGuesses = gameOver && attempts[currentRow].join("") === WORD ? currentRow + 1 : -1;
  document.getElementById("stat-dist").innerHTML = stats.dist
    .map((count, i) => {
      const width = Math.max((count / most) * 100, 7);
      const highlight = i + 1 === todayGuesses ? " today" : "";
      return `<div class="dist-row"><span>${i + 1}</span><div class="dist-bar${highlight}" style="width:${width}%">${count}</div></div>`;
    })
    .join("");
}

function openModal(id) {
  renderStats();
  document.getElementById(id).hidden = false;
}

function initializeModals() {
  document.getElementById("help-btn").addEventListener("click", () => openModal("help-modal"));
  document.getElementById("stats-btn").addEventListener("click", () => openModal("stats-modal"));

  document.querySelectorAll(".overlay").forEach((overlay) => {
    // click the backdrop or the X to dismiss, but not the modal body
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay || event.target.closest("[data-close]")) {
        overlay.hidden = true;
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".overlay").forEach((o) => (o.hidden = true));
    }
  });
}

function modalOpen() {
  return [...document.querySelectorAll(".overlay")].some((o) => !o.hidden);
}

function initializeKeyboard() {
  KEY_ROWS.forEach((letters, index) => {
    const row = document.createElement("div");
    row.className = "kb-row";

    if (index === 2) row.appendChild(makeKey("enter", "Enter", true));

    letters.split("").forEach((letter) => {
      row.appendChild(makeKey(letter, letter));
    });

    if (index === 2) row.appendChild(makeKey("backspace", "Del", true));

    keyboard.appendChild(row);
  });
}

function makeKey(key, label, wide) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = wide ? "key wide" : "key";
  button.textContent = label;
  button.id = `key-${key}`;
  button.setAttribute("aria-label", key);
  button.addEventListener("click", () => {
    // drop focus, or a physical Enter/Space would re-fire this button's click
    button.blur();
    handleKey(key);
  });
  return button;
}

// A letter's key colour only ever gets better, never worse — a letter shown
// correct in one guess shouldn't drop back to present in the next.
function updateKey(letter, result) {
  const button = document.getElementById(`key-${letter}`);
  if (!button) return;

  const current = ["absent", "present", "correct"].find((state) =>
    button.classList.contains(state)
  );
  if (current && RANK[current] >= RANK[result]) return;

  button.classList.remove("absent", "present", "correct");
  button.classList.add(result);
}

function updateBoard() {
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    for (let j = 0; j < wordLength; j++) {
      const tile = document.getElementById(`tile-${i}-${j}`);
      tile.textContent = attempts[i][j];
      tile.classList.toggle("filled", attempts[i][j] !== "");
    }
  }
}

function checkWord() {
  if (gameOver) return;

  const guess = attempts[currentRow].join("");
  if (guess.length < wordLength) {
    showMessage(`Not enough letters — the word is ${wordLength} long`);
    return;
  }

  colorTiles(guess, currentRow, true);

  // let the tiles finish flipping before the result lands
  const reveal = wordLength * 120 + 300;

  if (guess === WORD) {
    gameOver = true;
    recordResult(true, currentRow + 1);
    // no win text — the stats modal is the confirmation
    setTimeout(() => {
      if (SPECIAL_NOTE) showMessage(SPECIAL_NOTE, true);
      openModal("stats-modal");
    }, reveal);
  } else if (currentRow === MAX_ATTEMPTS - 1) {
    gameOver = true;
    recordResult(false);
    setTimeout(() => {
      showMessage(lossMessage(), Boolean(SPECIAL_NOTE));
      openModal("stats-modal");
    }, reveal);
  } else {
    currentRow++;
    currentCol = 0;
    showMessage("");
  }

  saveProgress();
}

function colorTiles(guess, row, animate) {
  const results = Array(wordLength).fill("absent");

  // count the letters in the answer that greens haven't already claimed
  const remaining = {};
  for (let i = 0; i < wordLength; i++) {
    if (guess[i] === WORD[i]) {
      results[i] = "correct";
    } else {
      remaining[WORD[i]] = (remaining[WORD[i]] || 0) + 1;
    }
  }

  // second pass: yellows only while copies of that letter are left over
  for (let i = 0; i < wordLength; i++) {
    if (results[i] === "correct") continue;
    if (remaining[guess[i]] > 0) {
      results[i] = "present";
      remaining[guess[i]]--;
    }
  }

  for (let i = 0; i < wordLength; i++) {
    const tile = document.getElementById(`tile-${row}-${i}`);

    if (animate) {
      // colour lands halfway through the flip, so the tile turns mid-rotation
      tile.style.animationDelay = `${i * 0.12}s`;
      tile.classList.add("flip");
      setTimeout(() => {
        tile.classList.add(results[i]);
        updateKey(guess[i], results[i]);
      }, i * 120 + 250);
    } else {
      tile.classList.add(results[i]);
      updateKey(guess[i], results[i]);
    }
  }
}

// on a loss the word is always revealed; the note rides along after it
function lossMessage() {
  const reveal = `The word was ${WORD.toUpperCase()}`;
  return SPECIAL_NOTE ? `${reveal} — ${SPECIAL_NOTE}` : reveal;
}

function showMessage(text, isNote) {
  message.textContent = text;
  message.classList.toggle("note", Boolean(isNote));
}

function handleKey(key) {
  if (gameOver || modalOpen()) return;

  if (key === "enter") {
    checkWord();
  } else if (key === "backspace") {
    if (currentCol > 0) {
      currentCol--;
      attempts[currentRow][currentCol] = "";
      showMessage("");
    }
  } else if (/^[a-z]$/.test(key) && currentCol < wordLength) {
    attempts[currentRow][currentCol] = key;
    currentCol++;
  }

  updateBoard();
}

document.addEventListener("keydown", (event) => {
  handleKey(event.key.toLowerCase());
});

initializeBoard();
initializeKeyboard();
initializeModals();
loadProgress();
