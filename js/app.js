/*-------------------------------- Constants --------------------------------*/
const numOfGuesses = 6;
const singleCharacterLength = 1;
const letterRegex = /[a-zA-Z]/; // only letters A-Z are used, uppercase and lowercase

/*---------------------------- Variables (state) ----------------------------*/
let currentRound;
let isGameOver;
let guessedWord;
let validWordsList;
let selectedCategory;
let targetWord;

/*------------------------ Cached Element References ------------------------*/
const boardArea = document.querySelector('.board-area');
const gameOverMessage = document.getElementById('game-over-message');
const categoryMessageEl = document.getElementById('category-message');
const keyboardButtons = document.querySelectorAll('.keyboard-btn');
const invalidPromptContainerEl = document.querySelector(
  '.invalid-prompt-container'
);

// modal element references below
const howToBtn = document.getElementById('info-icon');
const selectCategoryButton = document.getElementById('select-category-btn');
const categorySelectionModal = document.getElementById(
  'category-selection-modal'
);
const howToModalEl = document.getElementById('how-to-modal');
const closeHowToModalBtn = document.getElementById('close-how-to-modal');
const closeCategoriesModalBtn = document.getElementById(
  'close-categories-modal'
);

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  // adds slight delay for modal after page loads for fluidity
  setTimeout(() => {
    categorySelectionModal.style.display = 'block';
    howToModalEl.style.display = 'none';
  }, 800);
};

// clears default board and dynamically generate new tiles for word within chosen category
const generateTiles = () => {
  boardArea.innerHTML = '';

  for (let i = 0; i < numOfGuesses; i++) {
    const newBoardRow = document.createElement('div');
    newBoardRow.className = 'board-container';
    newBoardRow.id = `row-${[i]}`;

    targetWord.forEach((_, index) => {
      const newBoardContainer = document.createElement('div');
      newBoardContainer.className = 'letter-tile';
      newBoardContainer.id = `row-${[i]}-tile-${index}`;
      newBoardRow.appendChild(newBoardContainer);
    });

    boardArea.appendChild(newBoardRow);
  }
};

const render = (wordsArray, validWordList) => {
  categorySelectionModal.style.display = 'none';
  let randomizer = Math.floor(Math.random() * wordsArray.length);

  // reset game
  currentRound = 0;
  isGameOver = false;
  guessedWord = [];
  validWordsList = validWordList;
  selectedCategory = wordsArray;
  targetWord = wordsArray[randomizer].split(''); // splits word into letters for word evaluation
  categoryMessageEl.innerText = 'Select a Category';
  gameOverMessage.innerText = '';

  keyboardButtons.forEach((button) => {
    button.style.backgroundColor = '#757575'; // resets keyboard back to default colors
  });

  setTimeout(() => {
    howToModalEl.style.display = 'block'; // prompts game instructions
  }, 500);
  generateTiles();
};

const inputHandler = (event) => {
  // prevents default button highlighting (focus)
  if (event.target.classList.contains('keyboard-btn')) {
    event.target.blur();
  }

  // handling of both keyboard inputs and on-screen keyboard clicks
  if (
    isGameOver === true ||
    event.target.classList.contains('keyboard-area') ||
    event.target.classList.contains('keyboard-row') ||
    !selectedCategory
  ) {
    return;
  } else if (event.target.id === 'backspace-btn' || event.key === 'Backspace') {
    backspaceHandler();
  } else if (event.target.id === 'enter-btn' || event.key === 'Enter') {
    event.preventDefault();
    isValidWord(guessedWord, targetWord);
  } else if (
    // on-screen keyboard clicks
    event.target.classList.contains('keyboard-btn') &&
    guessedWord.length < targetWord.length
  ) {
    guessedWord.push(event.target.innerText.toUpperCase()); // onscreen keyboard clicks
    let input = event.target.innerText.toUpperCase();
    let idx = guessedWord.length - 1; // -1 for index number
    updateTiles(input, idx);
  } else if (
    // keyboard keypress
    guessedWord.length < targetWord.length && // prevents going over word limit
    event.key.length === singleCharacterLength && // only 1 letter keyboard inputs (prevents 'Enter', 'Backspace', etc.)
    event.key.match(letterRegex)
  ) {
    guessedWord.push(event.key.toUpperCase());
    let input = event.key.toUpperCase();
    let idx = guessedWord.length - 1; // -1 for index number
    updateTiles(input, idx);
  }
};

const backspaceHandler = () => {
  guessedWord.pop(); // removes last letter
  let input = '';
  let idx = guessedWord.length;
  updateTiles(input, idx);
};

const updateTiles = (input, idx) => {
  // only updates tile if the game is not over and still have space for new letter
  if (!isGameOver && guessedWord.length <= targetWord.length) {
    let rowEl = document.querySelector(`#row-${currentRound}`); // row selector
    rowEl.querySelector(`#row-${currentRound}-tile-${idx}`).innerText =
      input.toUpperCase(); // display in current tile
  }
};

const isValidWord = () => {
  if (guessedWord.length !== targetWord.length) {
    // notifies if word isn't filled
    let prompt = 'Not enough letters!';
    showInvalidPrompt(prompt);
    return;
  } else if (!validWordsList.includes(guessedWord.join(''))) {
    // notifies if word is invalid
    let prompt = 'Not a valid word!';
    showInvalidPrompt(prompt);
    return;
  } else if (validWordsList.includes(guessedWord.join(''))) {
    evaluateWord(guessedWord, targetWord);
  }
};

const showInvalidPrompt = (prompt) => {
  // generates invalid prompt
  const invalidPrompt = document.createElement('div');
  invalidPrompt.classList.add('invalid-prompt');
  invalidPrompt.innerText = prompt;
  invalidPromptContainerEl.appendChild(invalidPrompt);

  // removes prompt after 500ms with fading effect
  setTimeout(() => {
    invalidPrompt.style.opacity = '0';

    setTimeout(() => {
      invalidPromptContainerEl.removeChild(invalidPrompt);
    }, 500);
  }, 500);
};

const evaluateWord = (guessedLetters, targetWordLetters) => {
  let correctLetterCount = 0; // winner if all letters match winning letters

  guessedLetters.forEach((guessedLetter, index) => {
    setTimeout(() => {
      if (guessedLetter === targetWordLetters[index]) {
        // (Green tile) letter exists and is in the right place
        let tileBackgroundColor = '#498047';
        let tileEl = document.getElementById(
          `row-${currentRound}-tile-${index}`
        );

        updateTileAppearance(
          tileEl, // which tile to update
          tileBackgroundColor, // what color to update to (Green, Yellow, Gray)
          guessedLetters, // players letter choice for specific tile
          index // position of letter to match with tile
        );

        correctLetterCount = correctLetterCount + 1;
      } else if (
        targetWordLetters.includes(guessedLetter) &&
        guessedLetter !== targetWordLetters[index]
      ) {
        // (Yellow tile) letter exists and is in the wrong place
        let tileBackgroundColor = '#84732A';
        let tileEl = document.getElementById(
          `row-${currentRound}-tile-${index}`
        );

        updateTileAppearance(
          tileEl,
          tileBackgroundColor,
          guessedLetters,
          index
        );
      } else if (!targetWordLetters.includes(guessedLetter)) {
        // (Gray tile) letter does not exist anywhere
        let tileBackgroundColor = '#3d3d3d';
        let tileEl = document.getElementById(
          `row-${currentRound}-tile-${index}`
        );

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
    // checks after animation is complete
    checkForWinner(correctLetterCount);

    currentRound = currentRound + 1;
    guessedWord = []; // resets players guess
  }, guessedLetters.length * 200); // needs same delay as animation otherwise it would not sync with updateTileAppearance
};

const updateTileAppearance = (tile, tileColor, playerLetter, index) => {
  setTimeout(() => {
    tile.style.backgroundColor = tileColor;
  }, 300);
  tile.classList.add('flip-horizontal-top'); // add animation for each updated tile

  // updates color of on-screen keyboard
  let updateKey = document.querySelector(
    `.keyboard-btn[key="${playerLetter[index].toLowerCase()}"]`
  );
  updateKey.style.backgroundColor = tileColor;
};

const checkForWinner = (event) => {
  setTimeout(() => {
    if (event === targetWord.length && currentRound < 7) {
      // 7 rather than 6 because of unexpected results with evaluation timers
      isGameOver = true; // setting to true prevents further key inputs
      gameOverMessage.innerText = 'You guessed correct!';
      categoryMessageEl.innerText = 'Play again? Select a category.';
      categorySelectionModal.style.display = 'block'; // display game over prompt
    } else if (isGameOver === false && currentRound === numOfGuesses) {
      isGameOver = true;
      gameOverMessage.innerText = `You lost! The word was ${targetWord.join(
        ''
      )}`;
      categoryMessageEl.innerText = 'Play again? Select a category.';
      categorySelectionModal.style.display = 'block';
    }
  }, targetWord.length * 200); // delay for smooth game flow
};

// get array for chosen category and starts the game
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

// runs after page load
init();

/*----------------------------- Event Listeners -----------------------------*/
document
  .querySelector('.keyboard-area')
  .addEventListener('click', inputHandler); // listens for on-screen keyboard button clicks
document.addEventListener('keydown', inputHandler); // listens for keyboard keypress
categorySelectionModal.addEventListener('click', categoryOptions);

// modal listeners
howToBtn.onclick = () => (howToModalEl.style.display = 'block');

selectCategoryButton.onclick = () =>
  (categorySelectionModal.style.display = 'block');

closeHowToModalBtn.onclick = () => (howToModalEl.style.display = 'none');

closeCategoriesModalBtn.onclick = () =>
  (categorySelectionModal.style.display = 'none');

window.addEventListener('click', (event) => {
  if (event.target === howToModalEl) {
    howToModalEl.style.display = 'none';
  } else if (event.target === categorySelectionModal) {
    categorySelectionModal.style.display = 'none';
  }
});