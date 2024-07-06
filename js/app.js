//// As a user, I want to be given instructions as the page loads so that I know how to play the game.
//// As a user, I want to be able to access a “How to Play” infobox so that I can learn how to play in case I forget.
//// As a user, I want to be able to select a category to start the game.
//// As a user, I want a keyboard layout so that I can choose to click or type in my selection.
//// As a user, I want to hit enter or click the enter button so that I can validate my word.
//// As a user, I want a visual representation of how many chances I have left.
//// As a user, I want my tiles to perform an animation when I submit my word choice.
//// As a user, I want the inputs tiles to be highlighted green, yellow, or grey so that I know which inputs are in the the correct place, wrong place, or not used at all respectively.
//// As a user, I want inputs that I have previously used to be null and cannot be reused.
// As a user, I want word validation so that I cannot use a word not on the list.
//// As a user, I want the game to end when I entered the correct answer.
//// As a user, I want a word reveal when I have not guessed the correct word in the set amount of tries.
//// As a user, I want the option to play again after I complete my game.
//// As a user, I want the option to play again at any given time to start over with a new word

//todo
//// dynamically make tiles once random word is chose to equal the word length
//// add different arrays
//// change color of on-screen keyboard according to letter color
//// add animations
//// modal
////  - diff arrays button options
////  - button in modal to select
//// change modal cached element ref names

//! ---------- STRETCH GOALS ----------
// refactor the '.toUpperCase' throughout code (possibly not needed after implmenting arrays)
// (Yellow tiles) if letter is in the right place but does not exist anywhere else, make those tiles false (maybe forEach method)
// refactor css (especially the modal section)

/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let round;
let gameIsOver;
let playerWord;
let validWords;
let category;
let winningWord;

/*------------------------ Cached Element References ------------------------*/
const inputEl = document.querySelectorAll('.input-tile');
const board = document.querySelector('.board-area');
const gameoverMessage = document.getElementById('gameover-message');
const categoryMessage = document.getElementById('category-message');
const keyboardBtn = document.querySelectorAll('.keyboard-btn');
const invalidPromptContainer = document.querySelector(
  '.invalid-prompt-container'
);
// modal element references
const howToBtn = document.getElementById('info-button');
const categoriesBtn = document.getElementById('select-category-btn');
const categoriesModal = document.getElementById('select-category-modal');
const howToModal = document.getElementById('how-to-modal');
const closeHowToModal = document.getElementById('close-how-to-modal');
const closeCategoriesModal = document.getElementById('close-categories-modal');

const titleEl = document.querySelector('.header'); //! remove in final product

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  categoriesModal.style.display = 'none';
};

const generateTiles = () => {
  // clears default board and dynamically generate new tiles for chosen word
  board.innerHTML = '';

  // for loop to generate 6 rows (tries in game) with n numbers of tiles equal to the letters in winning word
  for (let i = 0; i < 6; i++) {
    let newBoardRow = document.createElement('div');
    newBoardRow.className = 'board-container';
    newBoardRow.id = `row-${[i]}`;

    winningWord.forEach((element, index) => {
      let newBoardContainer = document.createElement('div');
      newBoardContainer.className = 'letter-tile';
      newBoardContainer.id = `row-${[i]}-tile-${index}`;
      newBoardRow.appendChild(newBoardContainer);
    });

    board.appendChild(newBoardRow);
  }
};

const render = (array, validWordList) => {
  categoriesModal.style.display = 'none';
  let randomNum = Math.floor(Math.random() * array.length);
  console.log(array.length);

  round = 0; // round starts at 0
  gameIsOver = false;
  playerWord = [];
  validWords = validWordList;
  category = array;
  winningWord = array[randomNum].toUpperCase().split(''); // splits word into letters into an array
  categoryMessage.innerText = 'Select a Category';
  gameoverMessage.innerText = '';
  keyboardBtn.forEach((btn) => {
    btn.style.backgroundColor = '#757575'; // resets keyboard back to default
  });

  generateTiles();
  howToModal.style.display = 'block';

  //! remove in final product START
  titleEl.innerHTML = `Wordle: Categories For Testing: ${array[
    randomNum
  ].toUpperCase()}`;
  //! remove in final product END
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
    event.target.className === 'keyboard-row' ||
    !category
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
  if (playerWord.length !== winningWord.length) {
    // prevents submission if word isn't filled
    let prompt = 'Not enough letters!';
    showInvalidPrompt(prompt);
    return;
  } else if (!validWords.includes(playerWord.join(''))) {
    let prompt = 'Not a valid word!';
    showInvalidPrompt(prompt);
    return;
  } else if (validWords.includes(playerWord.join(''))) {
    eval(playerWord, winningWord);
  }
};

const showInvalidPrompt = (prompt) => {
  const invalidPrompt = document.createElement('div');
  invalidPrompt.className = 'invalid-prompt';
  invalidPrompt.innerText = prompt;
  invalidPromptContainer.appendChild(invalidPrompt);

  setTimeout(() => {
    invalidPrompt.style.opacity = '0';

    setTimeout(() => {
      invalidPromptContainer.removeChild(invalidPrompt);
    }, 100);
  }, 600);
};

const eval = (guessedLetters, targetWordLetters) => {
  let correctLetterCount = 0;

  guessedLetters.forEach((letter, index) => {
    setTimeout(() => {
      if (letter === targetWordLetters[index]) {
        // (Green tile) letter exists and is in the right place
        let tileBackgroundColor = '#498047';
        let tileEl = document.getElementById(`row-${round}-tile-${index}`);

        updateTileAppearance(
          tileEl,
          tileBackgroundColor,
          guessedLetters,
          index
        );
        correctLetterCount = correctLetterCount + 1;
      } else if (
        targetWordLetters.includes(letter) &&
        letter !== targetWordLetters[index]
      ) {
        // (Yellow tile) letter exists and is in the wrong place
        let tileBackgroundColor = '#84732A';
        let tileEl = document.getElementById(`row-${round}-tile-${index}`);

        updateTileAppearance(
          tileEl,
          tileBackgroundColor,
          guessedLetters,
          index
        );
      } else if (!targetWordLetters.includes(letter)) {
        // (Gray tile) letter does not exist anywhere
        let tileBackgroundColor = '#3d3d3d';
        let tileEl = document.getElementById(`row-${round}-tile-${index}`);

        updateTileAppearance(
          tileEl,
          tileBackgroundColor,
          guessedLetters,
          index
        );
      }
    }, index * 200); // delay each iteration by 200ms
  });

  setTimeout(() => {
    console.log(`round ${round} correct ${correctLetterCount}`);
    checkForWinner(correctLetterCount);

    round = round + 1;
    playerWord = [];
    console.log(`--Test for round ${round}--`);
  }, guessedLetters.length * 200); // needs delay based on length of player letter, otherwise it would colorize next row instead
};

const updateTileAppearance = (tile, tileColor, playerLetter, index) => {
  setTimeout(() => {
    tile.style.backgroundColor = tileColor;
  }, 300);
  tile.classList.add('flip-horizontal-top');

  let updateKey = document.querySelector(
    `.keyboard-btn[key="${playerLetter[index].toLowerCase()}"]`
  );
  updateKey.style.backgroundColor = tileColor;
};

const checkForWinner = (event) => {
  setTimeout(() => {
    if (event === winningWord.length && round < 7) {
      gameIsOver = true;
      gameoverMessage.innerText = 'CONGRATULATIONS!';
      categoryMessage.innerText = 'Play again? Select a category.';
      categoriesModal.style.display = 'block';
    } else if (gameIsOver === false && round === 6) {
      gameIsOver = true;
      gameoverMessage.innerText = `You lost! The word was ${winningWord.join(
        ''
      )}`;
      categoryMessage.innerText = 'Play again? Select a category.';
      categoriesModal.style.display = 'block';
    }
  }, winningWord.length * 200);
};

const categoryOptions = (event) => {
  if (event.target.id === 'wordle-category-btn') {
    render(words, wordList);
  } else if (event.target.id === 'colors-category-btn') {
    render(colors, colors);
  } else if (event.target.id === 'fruits-and-vegetables-category-btn') {
    render(fruitsAndVegetables, fruitsAndVegetables);
  } else {
    return;
  }
};

init();

/*----------------------------- Event Listeners -----------------------------*/
document
  .querySelector('.keyboard-section')
  .addEventListener('click', inputHandler); // listens for on-screen keyboard button clicks
document.addEventListener('keydown', inputHandler); // listens for keyboard keypress
document
  .querySelector('.select-category-modal')
  .addEventListener('click', categoryOptions);

// modal listeners
howToBtn.onclick = () => (howToModal.style.display = 'block');

categoriesBtn.onclick = () => (categoriesModal.style.display = 'block');

closeHowToModal.onclick = () => (howToModal.style.display = 'none');

closeCategoriesModal.onclick = () => (categoriesModal.style.display = 'none');

window.addEventListener('click', (event) => {
  if (event.target === howToModal) {
    howToModal.style.display = 'none';
  } else if (event.target === categoriesModal) {
    categoriesModal.style.display = 'none';
  }
});
