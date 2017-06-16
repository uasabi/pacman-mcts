# Monte Carlo Tree Search Pacman Game
[![Build Status](https://travis-ci.org/uasabi/pacman-mcts.svg?branch=master)](https://travis-ci.org/uasabi/pacman-mcts)
## Running the app
Run `yarn install` to install node modules, and then `yarn run build` to build the `dist/` directory and `yarn run start` or `yarn run sync` to run directly from the `src/` directory.

## Pac-man research
### Game mechanics
#### Ghost behaviour
(from the [pacman wikipedia article](https://en.wikipedia.org/wiki/Pac-Man#Enemies))
* Red ghost chases Pacman
* Pink ghost aims for position infront of Pacman's mouth
* Blue ghost sometimes heads towards Pacman, sometimes away
* Orange ghost alternates between red enemy when far from Pacman and when close to Pacman aims to lower-left corner of the maze
