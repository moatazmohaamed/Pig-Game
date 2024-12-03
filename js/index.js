`use strict`;

// player zero
const scoreZero = document.getElementById(`score--0`);
const currentZero = document.getElementById(`current--0`);

const playerZero = document.querySelector(`.player--0`);
const playerOne = document.querySelector(`.player--1`);

// player one
const scoreOne = document.getElementById(`score--1`);
const currentOne = document.getElementById(`current--1`);

// buttons
const newGameBtn = document.getElementById(`newGameBtn`);
const rowDiceBtn = document.getElementById(`rowDiceBtn`);
const holdBtn = document.getElementById(`holdBtn`);

const diceImg = document.getElementById(`diceImg`);

let finalScores, activePlayer, currentScore, playing;
let rolledNumbers = [];
/* ======================================================= */

init()

rowDiceBtn.addEventListener(`click`, () => {
    if (playing) {
        // Generate a random dice roll
        let randomNumber;
        do {
            randomNumber = Math.trunc(Math.random() * 6) + 1;
        } while (rolledNumbers.includes(randomNumber));
        rolledNumbers.push(randomNumber);
        // Display Dice
        diceImg.classList.remove('hidden');
        diceImg.src = `assets/dice-${randomNumber}.png`
        // check for rolled 1
        if (randomNumber !== 1) {
            // add dice to current score
            currentScore += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // switch to next player
            switchPlayer()
        }
    }

    if (rolledNumbers.length === 6) {
        rolledNumbers = [];
    }
})

holdBtn.addEventListener(`click`, () => {
    if (playing) {
        finalScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = finalScores[activePlayer];
        if (finalScores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
            diceImg.classList.add(`hidden`);
        } else(
            switchPlayer()
        )
    }

})

newGameBtn.addEventListener(`click`, init)

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerZero.classList.toggle(`player--active`)
    playerOne.classList.toggle(`player--active`)
}

function init() {
    finalScores = [0, 0];
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    scoreZero.textContent = 0;
    scoreOne.textContent = 0;
    currentZero.textContent = 0
    currentOne.textContent = 0
    diceImg.classList.add(`hidden`);
    playerZero.classList.remove(`player--winner`)
    playerOne.classList.remove(`player--winner`)

    playerZero.classList.add(`player--active`)
    playerOne.classList.remove(`player--active`)
}