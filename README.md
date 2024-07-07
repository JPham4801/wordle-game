
# Wordle: Categories

<div align="center">

![a green background banner with "Wordle: Categories" in white font to the left and white github logo to the right](./resources/github-header-image.png)

Software Engineering Bootcamp (June 2024)<br>
Project Assignment 1 - [General Assembly](https://generalassemb.ly/)<br>
Play [Wordle: Categories](https://jpham4801.github.io/wordle-game/)!

</div>

## About the Project

<div align="center"><img alt="Wordle category gameplay showing a 5x6 grid and on screen keyboard. The player guesses the word by typing letters and the game highlights the correct, misplaced, and invalid letters in each position." src="./resources/wordle_gameplay.gif"></div>

This project aims to demonstrate my current understanding of *HTML*, *CSS*, and *JavaScript* by building a functional game. I chose to recreate the popular web-based word game, ***[Wordle](https://www.nytimes.com/games/wordle/index.html)***, with a twist: allowing players to select different word categories.

While the original Wordle game uses only 5-letter words, I designed my version to dynamically generate tiles based on the length of the hidden word, which can vary across different categories. The original game's playable words and valid words were sourced and reconstructed into arrays found in [words.js](https://github.com/JPham4801/wordle-game/blob/main/js/words.js) and [wordlist.js](https://github.com/JPham4801/wordle-game/blob/main/js/wordlist.js). I added categories such as [Colors](https://github.com/JPham4801/wordle-game/blob/main/js/colors.js) and [Fruits & Vegetables](https://github.com/JPham4801/wordle-game/blob/main/js/fruitsAndVegetables.js) to demonstrate the concept.

I selected this game because, despite its simple appearance, it presents nuances and edge cases that are beneficial for developing my current skill set.

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

<div align="center">
<img alt="a row of wordle tiles showing the word 'WORDS'. The letter 'W' tile in the word is highlighted green" src="./resources/green-tile-example.png">

*Green* tiles means the letter ***is*** in the word and ***is*** in the correct position.

<img alt="a row of wordle tiles showing the word 'TILES'. The letter 'I' tile in the word is highlighted yellow" src="./resources/yellow-tile-example.png">

*Yellow* tiles means the letter ***is*** in the word but ***is not*** in the correct position.

<img alt="a row of wordle tiles showing the word 'ROGUE'. The letter 'U' tile in the word is highlighted gray" src="./resources/gray-tile-example.png">

*Gray* tiles means the letter ***is not*** in ***any*** of the positions in the word.
</div>

### Wordle: Categories variation

- Allows selection of categories with words of varying lengths.

Ready to play [Wordle: Categories](https://jpham4801.github.io/wordle-game/) or the original [Wordle](https://www.nytimes.com/games/wordle/index.html)?

[Original planning materials](https://github.com/JPham4801/wordle-game/blob/main/planning-material.md)

## Attributions

- Game mechanics and designs were inspired by the official Wordle.
    * https://www.nytimes.com/games/wordle/index.html
- Wordle Wiki
    * https://en.wikipedia.org/wiki/Wordle
- Animista
    * https://animista.net/play/
- Profile Header Generator by [leviarista](https://github.com/leviarista)
    * https://leviarista.github.io/github-profile-header-generator/

## Technologies Used

![Static Badge](https://img.shields.io/badge/JAVASCRIPT-yellow?style=for-the-badge&logo=javascript&logoColor=white&labelColor=black)
![Static Badge](https://img.shields.io/badge/HTML-green?style=for-the-badge&logo=HTML5&logoColor=white&labelColor=black)
![Static Badge](https://img.shields.io/badge/CSS-blue?style=for-the-badge&logo=CSS3&logoColor=white&labelColor=black)



## Next Steps

1. Implement a game mechanic to prevent yellow tiles from appearing if all instances of the indicated letter is already correctly placed in the word.

2. Refactor the code to improve maintainability by reducing the number of if statements, making conditions more concise, and enhancing the readability of code structures.

![GitHub last commit](https://img.shields.io/github/last-commit/JPham4801/wordle-game?link=https%3A%2F%2Fgithub.com%2FJPham4801%2Fwordle-game)
