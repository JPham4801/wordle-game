# Planning Materials

## GitHub Repository
https://github.com/JPham4801/wordle-game

## Your choice of game:
Wordle: Categories

## User Stories
- As a user, I want to be given instructions as the page loads so that I know how to play the game.
- As a user, I want to be able to access a “How to Play” infobox so that I can learn how to play in case I forget.
- As a user, I want to be able to select a category to start the game.
- As a user, I want a keyboard layout so that I can choose to click  or type in my selection.
- As a user, I want to hit enter or click the enter button so that I can validate my word.
- As a user, I want a visual representation of how many chances I have left.
- As a user, I want my tiles to perform an animation when I submit my word choice.
- As a user, I want the letters tiles to be highlighted green, yellow, or grey so that I know which letters are in the the correct place, wrong place, or not used at all respectively.

- As a user, I want letters that I have previously used to be ~~null and cannot be reused~~ gray.
- As a user, I want word validation so that I cannot use a word not on the list.
- As a user, I want the game to end when I entered the correct answer.
- As a user, I want a word reveal when I have not guessed the correct word in the set amount of tries.
- As a user, I want the option to play again after I complete my game.
- As a user, I want the option to play again at any given time to start over with a new word

## Pseudocode for the overall gameplay:
```javascript
/*-------------------------------- Constants --------------------------------*/

CONSTANT arrays on seperate file within document (linked)
CONSTANT for category chosen
CONSTANT for random word from category
CONSTANT 
CONSTANT 


/*---------------------------- Variables (state) ----------------------------*/

VARIABLE for current user inputs
VARIABLE for used letters
VARIABLE for winner
VARIABLE for chances left


/*------------------------ Cached Element References ------------------------*/

SELECT square of current user input
SELECT info '?' button
SELECT category options
SELECT 'start over' option
SELECT all boxes for QWERTY style keyboard


/*-------------------------------- Functions --------------------------------*/

FUNCTION to start the game / reset all variable states
FUNCTION to select and implement chosen category(
    randomly select a random word
)
FUNCTION to render rows of squares depending on number of letters in randomized word
FUNCTION to handle clicks (on screen keyboard/ help button / start over)
FUNCTION to handle user selections and display that selection
FUNCTION to track which letters are correct, wrong place, or not used
FUNCTION to verify if user word is in the list or not

/*----------------------------- Event Listeners -----------------------------*/

LISTENER for user clicks for on screen keyboard
LISTENER for user input on physical keyboard
LISTENER for clicks on infobox
LISTENER for clicks on 'start over' option
LISTENER for category options
// may merge these into function instead for 'DRY'
```

## Anything Else You'd Like Us to Know

Will use CSS for animations and modal overlay styles