//! ---------- STRETCH GOALS ----------
// refactor the '.toUpperCase' throughout code (possibly not needed after implmenting arrays)
// (Yellow tiles) if letter is in the right place but does not exist anywhere else, make those tiles false (maybe forEach method)
// refactor css (especially the modal section)
// clicks in keyboard section error (length)

/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let currentRound;
let isGameOver;
let guessedWord;
let validWordsList;
let selectedCategory;
let targetWord;

/*------------------------ Cached Element References ------------------------*/
const boardArea = document.querySelector('.board-area');
const gameOverMessage = document.getElementById('gameover-message');
const categoryMessageEl = document.getElementById('category-message');
const keyboardButtons = document.querySelectorAll('.keyboard-btn');
const invalidPromptContainerEl = document.querySelector(
  '.invalid-prompt-container'
);
// modal element references
const howToBtn = document.getElementById('info-button');
const selectCategoryButton = document.getElementById('select-category-btn');
const selectCategoryModal = document.getElementById('select-category-modal');
const howToModalEl = document.getElementById('how-to-modal');
const closeHowToModalBtn = document.getElementById('close-how-to-modal');
const closeCategoriesModalBtn = document.getElementById('close-categories-modal');


/*-------------------------------- Functions --------------------------------*/
const init = () => {
  selectCategoryModal.style.display = 'none';
  howToModalEl.style.display = 'block';
};

const generateTiles = () => {
  // clears default board and dynamically generate new tiles for chosen word
  boardArea.innerHTML = '';
  
  // for loop to generate 6 rows (tries in game) with n numbers of tiles equal to the letters in winning word
  for (let i = 0; i < 6; i++) {
    let newBoardRow = document.createElement('div');
    newBoardRow.className = 'board-container';
    newBoardRow.id = `row-${[i]}`;
    
    targetWord.forEach((_, index) => {
      let newBoardContainer = document.createElement('div');
      newBoardContainer.className = 'letter-tile';
      newBoardContainer.id = `row-${[i]}-tile-${index}`;
      newBoardRow.appendChild(newBoardContainer);
    });
    
    boardArea.appendChild(newBoardRow);
  }
};

const render = (wordsArray, validWordList) => {
  selectCategoryModal.style.display = 'none';
  let randomizer = Math.floor(Math.random() * wordsArray.length);
  console.log(wordsArray.length);
  
  currentRound = 0; // round starts at 0
  isGameOver = false;
  guessedWord = [];
  validWordsList = validWordList;
  selectedCategory = wordsArray;
  targetWord = wordsArray[randomizer].split(''); // splits word into letters into an array
  categoryMessageEl.innerText = 'Select a Category';
  gameOverMessage.innerText = '';
  
  keyboardButtons.forEach((button) => {
    button.style.backgroundColor = '#757575'; // resets keyboard back to default
  });
  
  howToModalEl.style.display = 'block';
  generateTiles();
  
  //! remove in final product START
  const headerTitleEl = document.querySelector('.header');
  headerTitleEl.innerHTML = `Wordle: Categories For Testing: ${wordsArray[randomizer]}`;
  //! remove in final product END
};

const inputHandler = (event) => {
  // prevents default button highlighting (focus)
  if (event.target.classList.contains('keyboard-btn')) {
    event.target.blur();
  }

  // handling of both keyboard inputs and on-screen keyboard clicks
  if (
    isGameOver === true ||
    event.target.classList.contains('keyboard-section') ||
    event.target.classList.contains('keyboard-row') ||
    !selectedCategory
  ) {
    return;
  } else if (event.target.id === 'backspace-btn' || event.key === 'Backspace') {
    backspaceHandler();
  } else if (event.target.id === 'enter-btn' || event.key === 'Enter') {
    event.preventDefault(); // prevents default submission (focus)
    isValidWord(guessedWord, targetWord);
  } else if (
    // on-screen keyboard clicks
    event.target.classList.contains('keyboard-btn') &&
    guessedWord.length < targetWord.length
  ) {
    guessedWord.push(event.target.innerText.toUpperCase()); // onscreen keyboard clicks
    let input = event.target.innerText.toUpperCase();
    let idx = guessedWord.length - 1;
    updateTiles(input, idx);
  } else if (
    // keyboard keypress
    guessedWord.length < targetWord.length && // prevents going over word limit
    event.key.length === 1 && // only 1 letter keyboard inputs (prevents 'Enter', 'Backspace', etc.)
    event.key.match(/[a-zA-Z]/) // only letters A-Z are used, uppercase and lowercase
  ) {
    guessedWord.push(event.key.toUpperCase());
    let input = event.key.toUpperCase();
    let idx = guessedWord.length - 1;
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
  if (guessedWord.length <= targetWord.length && isGameOver === false) {
    let rowEl = document.querySelector(`#row-${currentRound}`); // row selector
    rowEl.querySelector(`#row-${currentRound}-tile-${idx}`).innerText =
      input.toUpperCase(); // display in current tile
  }
};

const isValidWord = () => {
  if (guessedWord.length !== targetWord.length) {
    // prevents submission if word isn't filled
    let prompt = 'Not enough letters!';
    showInvalidPrompt(prompt);
    return;
  } else if (!validWordsList.includes(guessedWord.join(''))) {
    let prompt = 'Not a valid word!';
    showInvalidPrompt(prompt);
    return;
  } else if (validWordsList.includes(guessedWord.join(''))) {
    evaluateWord(guessedWord, targetWord);
  }
};

const showInvalidPrompt = (prompt) => {
  const invalidPrompt = document.createElement('div');
  invalidPrompt.classList.add('invalid-prompt');
  invalidPrompt.innerText = prompt;
  invalidPromptContainerEl.appendChild(invalidPrompt);

  setTimeout(() => {
    invalidPrompt.style.opacity = '0';

    setTimeout(() => {
      invalidPromptContainerEl.removeChild(invalidPrompt);
    }, 200);
  }, 1000);
};

const evaluateWord = (guessedLetters, targetWordLetters) => {
  let correctLetterCount = 0;

  guessedLetters.forEach((guessedLetter, index) => {
    setTimeout(() => {
      if (guessedLetter === targetWordLetters[index]) {
        // (Green tile) letter exists and is in the right place
        let tileBackgroundColor = '#498047';
        let tileEl = document.getElementById(`row-${currentRound}-tile-${index}`);

        updateTileAppearance(
          tileEl,
          tileBackgroundColor,
          guessedLetters,
          index
        );
        correctLetterCount = correctLetterCount + 1;
      } else if (
        targetWordLetters.includes(guessedLetter) &&
        guessedLetter !== targetWordLetters[index]
      ) {
        // (Yellow tile) letter exists and is in the wrong place
        let tileBackgroundColor = '#84732A';
        let tileEl = document.getElementById(`row-${currentRound}-tile-${index}`);

        updateTileAppearance(
          tileEl,
          tileBackgroundColor,
          guessedLetters,
          index
        );
      } else if (!targetWordLetters.includes(guessedLetter)) {
        // (Gray tile) letter does not exist anywhere
        let tileBackgroundColor = '#3d3d3d';
        let tileEl = document.getElementById(`row-${currentRound}-tile-${index}`);

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
    console.log(`round ${currentRound} correct ${correctLetterCount}`);
    checkForWinner(correctLetterCount);

    currentRound = currentRound + 1;
    guessedWord = [];
    console.log(`--Test for round ${currentRound}--`);
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
    if (event === targetWord.length && currentRound < 7) {
      isGameOver = true;
      gameOverMessage.innerText = 'You guessed correct!';
      categoryMessageEl.innerText = 'Play again? Select a category.';
      selectCategoryModal.style.display = 'block';
    } else if (isGameOver === false && currentRound === 6) {
      isGameOver = true;
      gameOverMessage.innerText = `You lost! The word was ${targetWord.join(
        ''
      )}`;
      categoryMessageEl.innerText = 'Play again? Select a category.';
      selectCategoryModal.style.display = 'block';
    }
  }, targetWord.length * 200);
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
howToBtn.onclick = () => (howToModalEl.style.display = 'block');

selectCategoryButton.onclick = () => (selectCategoryModal.style.display = 'block');

closeHowToModalBtn.onclick = () => (howToModalEl.style.display = 'none');

closeCategoriesModalBtn.onclick = () => (selectCategoryModal.style.display = 'none');

window.addEventListener('click', (event) => {
  if (event.target === howToModalEl) {
    howToModalEl.style.display = 'none';
  } else if (event.target === selectCategoryModal) {
    selectCategoryModal.style.display = 'none';
  }
});
