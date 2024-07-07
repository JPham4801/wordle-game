
# Wordle: Categories

<center>

![a green background banner with "Wordle: Categories" in white font to the left and white github logo to the right](./resources/github-header-image.png)

Software Engineering Bootcamp (June 2024)<br>
Project Assignment 1 - [General Assembly](https://generalassemb.ly/)<br>
Play [Wordle: Categories](https://jpham4801.github.io/wordle-game/)!

</center>

## About the Project

<center><img alt="Wordle category gameplay interface with a 5x6 grid and on screen keyboard. The player guesses the word by typing letters and the game highlights the correct, misplaced, and invalid letters in each position." src="./resources/wordle_gameplay.gif"></center>

This project aims to demonstrate my current understanding of *HTML*, *CSS*, and *JavaScript* by building a functional game. I chose to recreate the popular web-based word game, **[Wordle](https://www.nytimes.com/games/wordle/index.html)**, with a twist: allowing players to select different word categories.

While the original Wordle game uses only 5-letter words, I designed my version to dynamically generate tiles based on the length of the hidden word, which can vary across different categories. The original game's [word choices](https://github.com/JPham4801/wordle-game/blob/main/js/words.js) and [valid words](https://github.com/JPham4801/wordle-game/blob/main/js/wordlist.js) were sourced and reconstructed into simple arrays. I added categories such as [Colors](https://github.com/JPham4801/wordle-game/blob/main/js/colors.js) and [Fruits & Vegetables](https://github.com/JPham4801/wordle-game/blob/main/js/fruitsAndVegetables.js) to demonstrate the concept.

I selected this game because it appears simple but has complex nuances and edge cases, which are beneficial for learning.

### Challenges:

- Implementing the `inputHandler()` function to handle both keyboard key presses and on-screen keyboard clicks
- Dynamically generating tiles based on the chosen category and word length.
- Applying animations sequentially without affecting the variables unexpectedly (e.g., round & row numbers changing before the animation completes).
- Applying color to the tile only after the tile is halfway through its animation for a seamless appearance.
- Naming variables effectively (an art form in itself).

## Getting Started
The premise of the original ***Wordle*** is simple. To win, you must:
- Guess the hidden word in 6 tries or less.
- Each guess must be a valid 5-letter word.

The color of the tiles change to indicate how close your guess was to the hidden word.

<center>
<img alt="a row of wordle tiles showing the word 'WORDS'. The letter 'W' tile in the word is highlighted green" src="./resources/green-tile-example.png">

*Green* tiles means the letter ***is*** in the word and ***is*** in the correct position.

<img alt="a row of wordle tiles showing the word 'TILES'. The letter 'I' tile in the word is highlighted yellow" src="./resources/yellow-tile-example.png">

*Yellow* tiles means the letter ***is*** in the word but ***is not*** in the correct position.

<img alt="a row of wordle tiles showing the word 'ROGUE'. The letter 'U' tile in the word is highlighted gray" src="./resources/gray-tile-example.png">

*Gray* tiles means the letter ***is not*** in ***any*** of the positions in the word.
</center>

### Wordle: Categories variation

- Allows selection of categories with words of varying lengths.

Ready to play [Wordle: Categories](https://jpham4801.github.io/wordle-game/) or the original [Wordle](https://www.nytimes.com/games/wordle/index.html)?

## Attributions

- Game mechanics and designs were inspired by the official Wordle.
    * https://www.nytimes.com/games/wordle/index.html
- Wordle Wiki
    * https://en.wikipedia.org/wiki/Wordle
- Animista
    * https://animista.net/play/
- Profile Header Generator by [leviarista](https://github.com/leviarista)
    * https://leviarista.github.io/github-profile-header-generator/

## Technologies used

*Wordle: Categories* web-based game is made with `HTML` `CSS` and `JavaScript`.