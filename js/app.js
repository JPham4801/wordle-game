// As a user, I want to be given instructions as the page loads so that I know how to play the game.
// As a user, I want to be able to access a “How to Play” infobox so that I can learn how to play in case I forget.
// As a user, I want to be able to select a category to start the game.
// As a user, I want a keyboard layout so that I can choose to click or type in my selection.
// As a user, I want to hit enter or click the enter button so that I can validate my word.
// As a user, I want a visual representation of how many chances I have left.
// As a user, I want my tiles to perform an animation when I submit my word choice.
// As a user, I want the inputs tiles to be highlighted green, yellow, or grey so that I know which inputs are in the the correct place, wrong place, or not used at all respectively.
// As a user, I want inputs that I have previously used to be null and cannot be reused.
// As a user, I want word validation so that I cannot use a word not on the list.
// As a user, I want the game to end when I entered the correct answer.
// As a user, I want a word reveal when I have not guessed the correct word in the set amount of tries.
// As a user, I want the option to play again after I complete my game.
// As a user, I want the option to play again at any given time to start over with a new word

//! ---------- STRETCH GOALS ----------
// refactor the '.toUpperCase' throughout code (possibly not needed after implmenting arrays)
// (Yellow tiles) if letter is in the right place but does not exist anywhere else, make those tiles false (maybe forEach method)
// refactor css (especially the modal section)

//todo
// dynamically make tiles once random word is chose to equal the word length
// add different arrays
// add animations
// modal
//  - diff arrays button options
//  - button in modal to select
// change modal cached element ref names

//!reminder   Wordle = words, wordList    Pokemon = pokemons, pokemons

/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let round;
let gameIsOver;
let playerWord;
let category;
let validWords;
let winningWord;

/*------------------------ Cached Element References ------------------------*/
const inputEl = document.querySelectorAll('.input-tile');
const modal = document.getElementById('how-to-modal');
const btn = document.getElementById('myBtn');
const span = document.getElementsByClassName('close')[0];
const board = document.querySelector('.board-area');

const titleEl = document.querySelector('.header'); //! remove in final product

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  let randomNum = Math.floor(Math.random() * words.length);

  round = 0; // round starts at 0 not 1
  gameIsOver = false;
  playerWord = [];
  category = words;
  validWords = wordList;
  winningWord = words[randomNum].toUpperCase().split(''); // splits word into letters into an array

  //! remove in final product START
  titleEl.innerHTML = `Wordle: Categories For Testing: ${words[
    randomNum
  ].toUpperCase()}`;
  //! remove in final product END
};

const generateTiles = () => {
  // clears default board to dynamically generate new tiles for chosen word
  board.innerHTML = ''

  // for loop to generate 6 rows (tries in game) with n numbers of tiles equal to the letters in winning word
  for (let i = 0; i < 6; i++) {
    let newBoardRow = document.createElement('div');
    newBoardRow.className = 'board-container';
    newBoardRow.id = `row-${[i]}`

    winningWord.forEach((element, index) => {
      let newBoardContainer = document.createElement('div');
      newBoardContainer.className = 'letter-tile';
      newBoardContainer.id = `row-${[i]}-tile-${index}`;
      newBoardRow.appendChild(newBoardContainer);
    })
    
    board.appendChild(newBoardRow)
  }
};

const inputHandler = (event) => {
  // prevents default button highlighting (focus)
  if (event.target.className === 'keyboard-btn') {
    event.target.blur();
  }
  // handling of both keyboard inputs and on-screen keyboard clicks
  if (
    gameIsOver === true ||
    event.target.className === 'keyboard-section' ||
    event.target.className === 'keyboard-row'
  ) {
    return;
  } else if (event.target.id === 'backspace-btn' || event.key === 'Backspace') {
    backspaceHandler();
  } else if (event.target.id === 'enter-btn' || event.key === 'Enter') {
    event.preventDefault(); // prevents default submission (focus)
    isValidWord(playerWord, winningWord);
  } else if (
    // on-screen keyboard clicks
    event.target.className === 'keyboard-btn' &&
    playerWord.length < winningWord.length
  ) {
    playerWord.push(event.target.innerText); // onscreen keyboard clicks
    let input = event.target.innerText;
    let idx = playerWord.length - 1;
    updateTiles(input, idx);
  } else if (
    // keyboard keypress
    playerWord.length < winningWord.length && // prevents going over word limit
    event.key.length === 1 && // only 1 letter keyboard inputs (prevents 'Enter', 'Backspace', etc.)
    event.key.match(/[a-zA-Z]/) // only letters A-Z are used, uppercase and lowercase
  ) {
    playerWord.push(event.key.toUpperCase());
    let input = event.key;
    let idx = playerWord.length - 1;
    updateTiles(input, idx);
  }
};

const backspaceHandler = () => {
  playerWord.pop(); // removes last letter from array
  let input = '';
  let idx = playerWord.length;
  updateTiles(input, idx);
};

const updateTiles = (input, idx) => {
  if (playerWord.length <= winningWord.length && gameIsOver === false) {
    let rowEl = document.querySelector(`#row-${round}`); // row selector
    rowEl.querySelector(`#row-${round}-tile-${idx}`).innerText =
      input.toUpperCase(); // display in current tile
  }
};

const isValidWord = () => {
  console.log(category);
  if (playerWord.length !== winningWord.length) {
    // prevents submission if word isn't filled
    return;
  } else if (!validWords.includes(playerWord.join(''))) {
    console.log('Not in word list!');
    return;
  } else if (validWords.includes(playerWord.join(''))) {
    console.log('match!');
    console.log(playerWord);
    console.log(winningWord);
    eval(playerWord, winningWord);
  }
};

const eval = (playerLetter, correctLetter) => {
  let numCorrect = 0;

  playerLetter.forEach((element, index) => {
    if (element === correctLetter[index]) {
      // (Green tile) letter exist and in right place
      let greenTile = document.getElementById(`row-${round}-tile-${index}`);
      greenTile.style.backgroundColor = '#498047';

      numCorrect = numCorrect + 1;
    } else if (
      correctLetter.includes(element) &&
      element !== correctLetter[index]
    ) {
      // (Yellow tile) letter exist and in wrong place
      let yellowTile = document.getElementById(`row-${round}-tile-${index}`);
      yellowTile.style.backgroundColor = '#84732A';
    } else if (!correctLetter.includes(element)) {
      // (Gray tile) letter does not exist anywhere
      let grayTile = document.getElementById(`row-${round}-tile-${index}`);
      grayTile.style.backgroundColor = '#727274';
    }
  });

  console.log(`round ${round} correct ${numCorrect}`);
  checkForWinner(numCorrect);

  round = round + 1;
  playerWord = [];
  console.log(`--Test for round ${round}--`);
};

const checkForWinner = (event) => {
  if (event === winningWord.length && round < 6) {
    console.log('Winner!');
    gameIsOver = true;
  } else if (gameIsOver === false && round === 5) {
    console.log('loser!');
    gameIsOver = true;
  }
};

// modal functions

btn.onclick = () => {
  modal.style.display = 'block';
};

span.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

init();
generateTiles();

/*----------------------------- Event Listeners -----------------------------*/
document
  .querySelector('.keyboard-section')
  .addEventListener('click', inputHandler); // listens for on-screen keyboard button clicks
document.addEventListener('keydown', inputHandler); // listens for keyboard keypress
