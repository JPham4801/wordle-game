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

/*-------------------------------- Constants --------------------------------*/
const words = ["drive", "seven", "hover", "plate", "clock", "given", "label"];

/*---------------------------- Variables (state) ----------------------------*/
let playerWord = [];
let winningWord = ["w", "o", "r", "d", "s"];
let winner;
let currentRow;

/*------------------------ Cached Element References ------------------------*/
const inputEl = document.querySelectorAll(".input-tile");

/*-------------------------------- Functions --------------------------------*/
const init = () => {
    winner = false;
    currentRow = 0;
};

const inputHandler = (event) => {
    //prevents default submission (focus) on button after clicking a button and then a keyboard key
    if (event.target.className === "keyboard-btn") {
        event.target.blur(); 
    }

    //input handling conditions with code execution
    if (event.target.id === "backspace-btn" || event.key === "Backspace") {
        backspaceHandler();
    } else if (event.target.id === "enter-btn" || event.key === "Enter") {
        event.preventDefault();
        eval(playerWord, winningWord);
    } else if (
        //on-screen keyboard clicks
        event.target.className === "keyboard-btn" &&
        playerWord.length < winningWord.length
    ) {
        playerWord.push(event.target.innerText); // onscreen keyboard clicks
        let input = event.target.innerText;
        let idx = playerWord.length - 1;
        updateTiles(input, idx);
    } else if (
        //keyboard keypress
        playerWord.length < winningWord.length && //prevents going over word limit
        event.key.length === 1 && //only 1 letter keyboard inputs (prevents 'Enter', 'Backspace', etc.)
        event.key.match(/[a-zA-Z]/) //only letters A-Z are used, uppercase and lowercase
    ) {
        playerWord.push(event.key.toUpperCase());
        let input = event.key;
        let idx = playerWord.length - 1;
        updateTiles(input, idx);
    }
};

const backspaceHandler = () => {
    playerWord.pop(); //removes last letter from array
    let input = "";
    let idx = playerWord.length;
    updateTiles(input, idx);
};

const updateTiles = (input, idx) => {
    if (winner === false && playerWord.length <= winningWord.length) {
        let rowEl = document.querySelector(`#row-${currentRow}`); // row selector
        rowEl.querySelector(`#tile-${idx}`).innerText = input.toUpperCase(); //display in current tile

        console.log(playerWord);
    }
};

const eval = (playerLetter, correctLetter) => {
    if(playerWord.length !== winningWord.length){
        return
    } else{
        playerLetter.forEach((element, index) => {
            console.log(`Player: [${element}] Correct: [${correctLetter[index].toUpperCase()}]`);
        });
    }
};

init();

/*----------------------------- Event Listeners -----------------------------*/
document.querySelector(".keyboard-section").addEventListener("click", inputHandler) //listens for on-screen keyboard button clicks
document.addEventListener("keydown", inputHandler) //listens for keyboard keypress

// test area ------------------------------------------------------------------
// const testFunc = (event) =>{
//     console.dir(event)
// }

// document.addEventListener('keydown', testFunc)
