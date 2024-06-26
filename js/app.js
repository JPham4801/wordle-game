// As a user, I want to be given instructions as the page loads so that I know how to play the game.
// As a user, I want to be able to access a “How to Play” infobox so that I can learn how to play in case I forget.
// As a user, I want to be able to select a category to start the game.
// As a user, I want a keyboard layout so that I can choose to click or type in my selection.
// As a user, I want to hit enter or click the enter button so that I can validate my word.
// As a user, I want a visual representation of how many chances I have left.
// As a user, I want my tiles to perform an animation when I submit my word choice.
// As a user, I want the letters tiles to be highlighted green, yellow, or grey so that I know which letters are in the the correct place, wrong place, or not used at all respectively.
// As a user, I want letters that I have previously used to be null and cannot be reused.
// As a user, I want word validation so that I cannot use a word not on the list.
// As a user, I want the game to end when I entered the correct answer.
// As a user, I want a word reveal when I have not guessed the correct word in the set amount of tries.
// As a user, I want the option to play again after I complete my game.
// As a user, I want the option to play again at any given time to start over with a new word

/*-------------------------------- Constants --------------------------------*/
const words = ['drive', 'seven', 'hover', 'plate', 'clock', 'given', 'label']


/*---------------------------- Variables (state) ----------------------------*/
let userWord = [];
let winningWord = ['d', 'r', 'i', 'v', 'e'];
let winner;
let currentRow;


/*------------------------ Cached Element References ------------------------*/
const letterEl = document.querySelectorAll('.letter-tile');


/*-------------------------------- Functions --------------------------------*/
const init = () =>{
    winner = false;
    currentRow = 0;
}

const handleClick = (event) =>{
    if(event.target.id === 'back-btn' ){
        userWord.pop();
        let letter = '';
        let letterIdx = userWord.length;

        updateTiles(letter, letterIdx)
        console.log(userWord);
    } else if(event.target.className === 'keyboard-btn' && userWord.length < winningWord.length){
        userWord.push(event.target.innerText);
        let letter = event.target.innerText;
        let letterIdx = userWord.length - 1;

        updateTiles(letter, letterIdx)
        console.log(userWord);
    }
}

const updateTiles = (letter, idx) =>{
    if(winner === false && userWord.length <= winningWord.length){
        let rowEl = document.querySelector(`#row-${currentRow}`);
        rowEl.querySelector(`#tile-${idx}`).innerText = letter;
    }
}

init();

/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('.keyboard-section').addEventListener('click', handleClick);