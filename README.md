
# Wordle: Categories

<center>

![a picture of the landing page for the 'wordle: categories' game](./resources/github-header-image.png)

Software Engineering Bootcamp (June 2024)<br>
Project Assignment 1 - [General Assembly](https://generalassemb.ly/)<br>
Play [Wordle: Categories](https://jpham4801.github.io/wordle-game/) now!

</center>

## About the Project

<center><img src="./resources/wordle_gameplay.gif"></center>

The goal of this project was to utilize our current understanding of *HTML*, *CSS*, and *JavaScript* to build a functional game of our choosing. My choice was to recreate the popular web-based word game, **[Wordle](https://www.nytimes.com/games/wordle/index.html)**. I wanted to add a slight variation that differs from the original game which includes the option to select a different category. 

The original Wordle game only uses 5-letter words. I designed the tiles to be dynamically generate based on the number of letters in the hidden word since the words in other categories are more or less than 5. The original game's [word choices](https://github.com/JPham4801/wordle-game/blob/main/js/words.js) and [valid words](https://github.com/JPham4801/wordle-game/blob/main/js/wordlist.js) were sourced from the Wordle game itself and reconstructed into a simple array of words. The categories I chose to add are common [Colors](https://github.com/JPham4801/wordle-game/blob/main/js/colors.js) and [Fruits & Vegetables](https://github.com/JPham4801/wordle-game/blob/main/js/fruitsAndVegetables.js) for proof of concept.

I chose this game because it seemed like one of those games that look simple at first glance but it has alot of nuances and edge cases that would further sharpen my trade.

Some of the challanges I faced were:

- Using a single function `inputHandler()` to accept both keyboard keypress and on-screen keyboard clicks
- Dynaically generating the tiles based on the category chosen and the length of the word.
- Applying animation in succession without the code doing weird things to the variables. (round & row numbers would change before the animation finishes)
- Applying color to the tile *only* after the tile is halfway through its animation so it appears seemless.
- Naming variables (This is an *art*)

## Getting Started
The premise of *Wordle* is simple. In order to win, you must:
- Guess the hidden word in 6 tries or less.
- Each guess must be a valid 5-letter word.

The color of the tiles will change colors that will indicate how close your guess was to the hidden word.

<center>
<img alt="a row of wordle tiles showing the word 'WORDS'. The letter 'W' tile in the word is highlighted green" src="./resources/green-tile-example.png">

*Green* tiles means the letter ***is*** in the word and ***is*** in the correct position.

<img alt="a row of wordle tiles showing the word 'TILES'. The letter 'I' tile in the word is highlighted yellow" src="./resources/yellow-tile-example.png">

*Yellow* tiles means the letter ***is*** in the word but ***is not*** in the correct position.

<img alt="a row of wordle tiles showing the word 'ROGUE'. The letter 'U' tile in the word is highlighted gray" src="./resources/gray-tile-example.png">

*Gray* tiles means the letter ***is not*** in ***any*** of the positions in the word.
</center>

## Attributions

- Game mechanics and designs were used from the official Wordle as reference for Wordle: Categories.
    * https://www.nytimes.com/games/wordle/index.html
- Wordle Wiki
    * https://en.wikipedia.org/wiki/Wordle
- Animista
    * https://animista.net/play/
- Profile Header Generator by [leviarista](https://github.com/leviarista)
    * https://leviarista.github.io/github-profile-header-generator/

## Technologies used

Web based game is made with `HTML` `CSS` and `JavaScript`.