'use strict';
// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let currentScore;
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
let scores, activePlayer, playing;
//Starting conditions
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;

  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
//Switch players
const switchPlayer = function () {
  //   if (player0.classList.contains('player--active')) {
  //     player0.classList.remove('player--active');
  //     player1.classList.add('player--active');
  //   } else {
  //     player1.classList.remove('player--active');
  //     player0.classList.add('player--active');
  //   }
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player0.classList.toggle('player--active');
};

//Assign Current Score
const assignScore = function (score) {
  if (activePlayer === 0) {
    current0El.textContent = score;
  } else {
    current1El.textContent = score;
  }
};

//Roll dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // currentScore = 0;
      // assignScore(currentScore);
      switchPlayer();
    }
  }
});

//Hold functionality
btnHold.addEventListener('click', function () {
  // if (player0.classList.contains('player--active')) {
  //   score0El.textContent = currentScore;
  //   switchPlayer();
  // } else {
  //   score1El.textContent = currentScore;
  //   switchPlayer();
  // }

  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//New game
btnNew.addEventListener('click', init);
