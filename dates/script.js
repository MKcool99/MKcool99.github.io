'use strict';

// Weekday by remainder, per the method: 0 = Saturday.
var WEEKDAYS = ['Saturday', 'Sunday', 'Monday', 'Tuesday',
                'Wednesday', 'Thursday', 'Friday'];

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'];

// Month key numbers. January and February shift in a leap year.
var MONTH_CODES        = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
var MONTH_CODES_LEAP   = [0, 3, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];

// The century adjustment below only covers these two centuries,
// so that is the range we roll from.
var MIN_YEAR = 1900;
var MAX_YEAR = 2099;

var current = null;

function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function daysInMonth(y, m) {
  return [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30,
          31, 31, 30, 31, 30, 31][m];
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomDate() {
  var y = randomInt(MIN_YEAR, MAX_YEAR);
  var m = randomInt(0, 11);
  return { year: y, month: m, day: randomInt(1, daysInMonth(y, m)) };
}

// Runs the method and returns every intermediate value, so the
// walkthrough shows exactly the arithmetic you would do by hand.
function solve(d) {
  var leap = isLeapYear(d.year);
  var yy = d.year % 100;
  var quarter = Math.floor(yy / 4);
  var monthCode = (leap ? MONTH_CODES_LEAP : MONTH_CODES)[d.month];
  var century = d.year < 2000 ? 0 : -1;
  var total = yy + quarter + d.day + monthCode + century;
  var remainder = ((total % 7) + 7) % 7;

  return {
    leap: leap,
    yy: yy,
    quarter: quarter,
    monthCode: monthCode,
    century: century,
    total: total,
    remainder: remainder,
    weekday: WEEKDAYS[remainder]
  };
}

function formatDate(d) {
  return MONTHS[d.month] + ' ' + d.day + ', ' + d.year;
}

function num(n) {
  return '<span class="num">' + n + '</span>';
}

function buildWork(d, r) {
  var leapNote = r.leap
    ? ' <span class="note">(' + d.year + ' is a leap year)</span>'
    : '';
  var monthNote = (d.month === 0 || d.month === 1)
    ? leapNote
    : '';

  var centuryLine = r.century === 0
    ? 'Century adjustment for the 1900s: add ' + num(0)
    : 'Century adjustment for the 2000s: subtract ' + num(1);

  var html = '<ol>';
  html += '<li>Last two digits of ' + d.year + ': ' + num(r.yy) + '</li>';
  html += '<li>A quarter of ' + r.yy + ', remainder dropped: ' + num(r.quarter) + '</li>';
  html += '<li>Day of the month: ' + num(d.day) + '</li>';
  html += '<li>Month code for ' + MONTHS[d.month] + ': ' + num(r.monthCode) + monthNote + '</li>';
  html += '<li>' + centuryLine + '</li>';
  html += '</ol>';

  var sum = r.yy + ' + ' + r.quarter + ' + ' + d.day + ' + ' + r.monthCode +
            (r.century === 0 ? ' + 0' : ' &minus; 1');

  html += '<div class="total">' + sum + ' = ' + num(r.total) + '</div>';
  html += '<div class="total">' + r.total + ' &divide; 7 leaves a remainder of ' +
          num(r.remainder) + ' &rarr; <strong>' + r.weekday + '</strong></div>';

  return html;
}

document.addEventListener('DOMContentLoaded', function () {
  var rollBtn   = document.getElementById('rollBtn');
  var card      = document.getElementById('dateCard');
  var dateText  = document.getElementById('dateText');
  var answerBtn = document.getElementById('answerBtn');
  var workBtn   = document.getElementById('workBtn');
  var answerEl  = document.getElementById('answer');
  var workEl    = document.getElementById('work');

  var pickForm  = document.getElementById('pickForm');
  var pickDate  = document.getElementById('pickDate');
  var pickError = document.getElementById('pickError');

  var helpBtn   = document.getElementById('helpBtn');
  var helpModal = document.getElementById('helpModal');
  var helpClose = document.getElementById('helpClose');

  // Show a date and hide any answer left over from the previous one.
  function showDate(d) {
    current = d;
    dateText.textContent = formatDate(d);

    answerEl.classList.add('hidden');
    workEl.classList.add('hidden');
    answerEl.innerHTML = '';
    workEl.innerHTML = '';

    card.classList.remove('hidden');
    rollBtn.textContent = 'Another Date';
  }

  function showError(msg) {
    pickError.textContent = msg;
    pickError.classList.remove('hidden');
  }

  function clearError() {
    pickError.textContent = '';
    pickError.classList.add('hidden');
  }

  rollBtn.addEventListener('click', function () {
    clearError();
    pickDate.value = '';
    showDate(randomDate());
  });

  pickForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Parse the field by hand. new Date('1974-11-27') reads as UTC and can
    // shift a day in western time zones.
    var raw = pickDate.value.trim();
    if (!raw) {
      // A native date field also blanks itself on an impossible date
      // such as 1900-02-29, so this covers that too.
      showError('Choose a date first.');
      return;
    }

    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
    if (!m) {
      showError('Enter a date as yyyy-mm-dd.');
      return;
    }

    var y = parseInt(m[1], 10);
    var mo = parseInt(m[2], 10) - 1;
    var day = parseInt(m[3], 10);

    if (y < MIN_YEAR || y > MAX_YEAR) {
      showError('This method only covers ' + MIN_YEAR + ' to ' + MAX_YEAR + '.');
      return;
    }
    if (mo < 0 || mo > 11) {
      showError('That is not a real month.');
      return;
    }
    if (day < 1 || day > daysInMonth(y, mo)) {
      showError(MONTHS[mo] + ' ' + y + ' only has ' + daysInMonth(y, mo) + ' days.');
      return;
    }

    clearError();
    showDate({ year: y, month: mo, day: day });
  });

  pickDate.addEventListener('input', clearError);

  answerBtn.addEventListener('click', function () {
    if (!current) return;
    answerEl.textContent = solve(current).weekday;
    answerEl.classList.remove('hidden');
  });

  workBtn.addEventListener('click', function () {
    if (!current) return;
    var r = solve(current);
    workEl.innerHTML = buildWork(current, r);
    workEl.classList.remove('hidden');
    // The work ends on the answer anyway, so reveal it too.
    answerEl.textContent = r.weekday;
    answerEl.classList.remove('hidden');
  });

  function openHelp()  { helpModal.classList.remove('hidden'); helpClose.focus(); }
  function closeHelp() { helpModal.classList.add('hidden'); helpBtn.focus(); }

  helpBtn.addEventListener('click', openHelp);
  helpClose.addEventListener('click', closeHelp);

  helpModal.addEventListener('click', function (e) {
    if (e.target === helpModal) closeHelp();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !helpModal.classList.contains('hidden')) closeHelp();
  });
});
