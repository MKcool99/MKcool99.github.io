// Simple Express backend for Blind Country Guess
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'submissions.json');

app.use(express.json());
app.use(express.static(__dirname));

// Helper to read/write submissions
function readSubmissions() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}
function writeSubmissions(subs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(subs, null, 2));
}

// GET all submissions
app.get('/api/submissions', (req, res) => {
  res.json(readSubmissions());
});

// POST a new submission
app.post('/api/submit', (req, res) => {
  const { userId, guesses } = req.body;
  if (!userId || !Array.isArray(guesses) || guesses.length !== 4) {
    return res.status(400).json({ error: 'Invalid submission' });
  }
  let subs = readSubmissions();
  // Prevent duplicate userId
  subs = subs.filter(s => s.userId !== userId);
  subs.push({ userId, guesses });
  writeSubmissions(subs);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Blind Country Guess backend running on port ${PORT}`);
});
