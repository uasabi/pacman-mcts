# Monte Carlo Tree Search Pacman Game
[![Build Status](https://travis-ci.org/uasabi/pacman-mcts.svg?branch=master)](https://travis-ci.org/uasabi/pacman-mcts)
## Running the app
Run `yarn install` to install the dependencies and then `yarn start` to continuously build the game. Open `index.html` in your browser to play the game.

## Pac-man research
### Game mechanics
#### Ghost behaviour
(from the [pacman wikipedia article](https://en.wikipedia.org/wiki/Pac-Man#Enemies))
* Red ghost chases Pacman
* Pink ghost aims for position infront of Pacman's mouth
* Blue ghost sometimes heads towards Pacman, sometimes away
* Orange ghost alternates between red enemy when far from Pacman and when close to Pacman aims to lower-left corner of the maze
