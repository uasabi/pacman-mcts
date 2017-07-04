# playing pacman
### with
# monte carlo :evergreen_tree: search
#### @danielepolencic & Eleanor Keane

---

![80%](assets/uasabi-logo.pdf)

---

![Chess](assets/chess.png)
![Carcassone](assets/carcassone.jpg)
![Hearthstone](assets/hearthstone.jpg)

---

# [fit] i :heart: strategy games

---

## …does it think _for real_?
## …can I build one?

---

# [fit] the challenge

---

![](assets/real-chess.jpg)

---

## 400 positions __after 2 moves__
## 10,921,506 __after 7 moves__
## avg game ~30 moves

---

## not all moves are the same
## sequence of moves

---

![](assets/goban.png)

---

## avg game ~150 moves
## 386356909593 games __with 2x2__
## __19x19 -__ 10<sup>10<sup>48</sup></sup> possible games

---

![](assets/pacman-original.jpg)

---

## 4 directions
## walls, pills, pacman & ghosts
## 1-5 lives
## score

---

## real time
## ∞ possbile games
## sequence of moves

---

# interesting because…

---

## deterministic movements
## simple to understand
## real time
## constrained space

---

# [fit] hey computer,
# [fit] __what's your__ next move?

^ how does AI play cards?
^ cannot be brute force

---

# brute force :muscle:
# Heuristic
# Neural networks

---

# Brute force :muscle:
# __Heuristic__
# __Neural networks__

---

## fast?
## __easy to implement?__
## __skilled ai player?__

---

## __fast__ :x:
## easy to implement?
## __skilled ai player?__

---

## __fast__ :x:
## __easy to implement__ :white_check_mark:
## skilled ai player?

---

## __fast__ :x:
## __easy to implement__ :white_check_mark:
## __skilled ai player__ :x:

---

# __Brute force__ :muscle:
# Heuristic
# __Neural networks__

---

## fast?
## __easy to implement?__
## __skilled ai player?__

---

## __fast__ :white_check_mark:
## easy to implement?
## __skilled ai player?__

---

## __fast__ :white_check_mark:
## __easy to implement__ :x:
## skilled ai player?

---

## __fast__ :white_check_mark:
## __easy to implement__ :x:
## __skilled ai player__ :white_check_mark:

---

# __Brute force__ :muscle:
# __Heuristic__
# Neural networks

---

## __fast__ :white_check_mark:
## __easy to implement__ :x:
## __skilled ai player__ :white_check_mark:

---

# :weary: :sob:

---

# easy to code & smart,
# __please__

---

# *another* approach

---

# pacman

---

![fit](assets/animated-pacman.gif)

---

![fit](assets/play_01.pdf)

---

![fit](assets/play_02.pdf)

---

![fit](assets/play_03.pdf)

---

![fit](assets/play_04.pdf)

---

![fit](assets/play_05.pdf)

---

![fit](assets/play_06.pdf)

---

![fit](assets/play_07.pdf)

---

# :link: of moves

---

# [fit] more like a :evergreen_tree:

---

![fit](assets/play_08.pdf)

---

![fit](assets/play_09.pdf)

---

![fit](assets/play_10.pdf)

---

![fit](assets/play_11.pdf)

---

![fit](assets/play_12.pdf)

---

![fit](assets/play_13.pdf)

---

![fit](assets/play_14.pdf)

---

![fit](assets/play_15.pdf)

---

![fit](assets/play_16.pdf)

---

![fit](assets/play_17.pdf)

---

![fit](assets/play_18.pdf)

---

![fit](assets/play_19.pdf)

---

![fit](assets/play_20.pdf)

---

## the next move for pacman is…

---

![fit](assets/play_21.pdf)

---

![fit](assets/play_22.pdf)

---

![fit](assets/play_23.pdf)

---

![fit](assets/play_24.pdf)

---

![fit](assets/play_25.pdf)

---

![fit](assets/play_26.pdf)

---

![fit](assets/play_27.pdf)

---

![fit](assets/play_28.pdf)

---

# …and if pacman is distracted

---

![fit](assets/play_29.pdf)

---

![fit](assets/play_30.pdf)

---

![fit](assets/play_31.pdf)

---

![fit](assets/play_32.pdf)

---

# :bulb: like a human!

---

# recap

---

## 1. explore states
## 2. map winning/losing states
## 3. count

---

## __easy to implement?__
## skilled ai player?
## fast?

---

## coding involved:
## 1. movements
## 2. win/lose

---

## __easy to implement__ :white_check_mark:
## skilled ai player?
## fast?

---

## __easy to implement__ :white_check_mark:
## __skilled ai player__ :white_check_mark:
## fast?

---

## when should I stop?
## how many children per node?
## full :evergreen_tree: for every move?

---

## fast :x:

---

# __unelss__ incremental

---

![fit](assets/iterative-play_01.pdf)

---

![fit](assets/iterative-play_03.pdf)

---

![fit](assets/iterative-play_04.pdf)

---

![fit](assets/iterative-play_05.pdf)

---

![fit](assets/iterative-play_06.pdf)

---

![fit](assets/iterative-play_07.pdf)

---

![fit](assets/iterative-play_08.pdf)

---

![fit](assets/iterative-play_09.pdf)

---

![fit](assets/iterative-play_10.pdf)

---

![fit](assets/iterative-play_11.pdf)

---

![fit](assets/iterative-play_12.pdf)

---

![fit](assets/iterative-play_13.pdf)

---

![fit](assets/iterative-play_14.pdf)

---

![fit](assets/iterative-play_15.pdf)

---

![fit](assets/iterative-play_16.pdf)

---

## the next move for pacman is…

---

![fit](assets/iterative-play_17.pdf)

---

![fit](assets/iterative-play_18.pdf)

---

![fit](assets/iterative-play_19.pdf)

---

## stop at any time
## explore only *promising* branches
## reuse previous states

---

![fit](assets/iterative-play_20.pdf)

---

![fit](assets/iterative-play_21.pdf)

---

![fit](assets/iterative-play_22.pdf)

---

# incremental is fast :white_check_mark:

---

# [fit] demo

---

# [fit] learnings

---

# 1. testing ai is **hard**

---

## is it a bug or feature?
## unit & integration test not enough

---

![fit](assets/3levels.png)

---

![fit](assets/4levels.png)

---

## easy to inspect
## extra tooling
## still time consuming

---

# 2. ƛ functional

---

## 𝒻(state, message) -> state

---

```js
function update(state, message) {
  switch(action.type) {

  case PACMAN_MOVES:
    /* ... */

  default:
  return state;
  }
}
```

---

```js
const message = {
  type: PACMAN_MOVES,
  direction: 'left'
};

const state = {
  pacman: {x: 1, y: 0},
  red: {x: 0, y: 2}
};
```

---

## no implicit state
## no need to serialise classes
## memoisation

---

# 3. time travel

---

```js
const list_of_actions = [
  createAction_movePacman('left'),
  createAction_movePacman('right'),
  createAction_movePacman('right')
];

const initial_state = {
  pacman: {x: 1, y: 0},
  red: {x: 0, y: 2}
};

list_of_actions.reduce(update, initial_state);
```

---

## easier to debug
## easier to reproduce bugs/features
## easier to test

---

# thanks
