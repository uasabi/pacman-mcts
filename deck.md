# playing pacman
## with
# monte carlo :evergreen_tree: search
#### @danielepolencic, Eleanor Keane

---

# [fit] i :heart: strategy games

---

![Chess](assets/chess.png)
![Carcassone](assets/carcassone.jpg)
![Hearthstone](assets/hearthstone.jpg)

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

![90%](assets/play_01.pdf)

---

![90%](assets/play_02.pdf)

---

![90%](assets/play_03.pdf)

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

![fit](assets/play_21.pdf)

---

![fit](assets/play_22.pdf)

---

![fit](assets/play_23.pdf)

---

![fit](assets/play_24.pdf)

---

TODO

---

can I apply the same process before a move?

---

of course

---

1. explore states
2. map winning/losing states
3. count
4. profit

---

# [fit] monte carlo :evergreen_tree: search

---

problem: when do I stop
problem: # of states per node (branching)

---

solution: do it iteratively

---

# [fit] 1. expansion
# [fit] **2. selection**
# [fit] **3. simulation**
# [fit] **4. backpropagation**

---

# [fit] **1. expansion**
# [fit] 2. selection
# [fit] **3. simulation**
# [fit] **4. backpropagation**

---

# [fit] **1. expansion**
# [fit] **2. selection**
# [fit] 3. simulation
# [fit] **4. backpropagation**

---

# [fit] **1. expansion**
# [fit] **2. selection**
# [fit] **3. simulation**
# [fit] 4. backpropagation

---

![fit](play_01.pdf)

---

# [fit] expand

---

![fit](play_02.pdf)

---

![fit](play_03.pdf)

---

# [fit] <sup>:musical_note:</sup> Erase and Rewind <sub>:musical_note:</sub>

---

# [fit] select

---

![fit](play_03_selected.pdf)

---

![fit](play_03_left.pdf)

---

# [fit] simulate

---

![fit](play_03_left.pdf)

---

# [fit] ghost **0** - pacman **0**
## matches played: 1

---

# [fit] backpropagate

---

![fit](play_03_left_score1.pdf)

---

![fit](play_03_left_score2.pdf)

---

# [fit] <sup>:musical_note:</sup> one more time <sub>:musical_note:</sub>

---

# [fit] select

---

![fit](play_03_selected_with_score.pdf)

---

![fit](play_03_left_score2.pdf)

---

# [fit] expand

---

![fit](play_05_expand_with_score.pdf)

---

# [fit] <sup>:musical_note:</sup> baby one more time <sub>:musical_note:</sub>

---

# [fit] select

---

![fit](play_05_select1.pdf)

---

![fit](play_05_select2.pdf)

---

![fit](play_05_select3.pdf)

---

# [fit] simulate

---

# [fit] ghost **0** - pacman **0**
## matches played: 2

---

# [fit] backpropagate

---

![fit](play_05_select3_with_score1.pdf)

---

![fit](play_05_select3_with_score2.pdf)

---

![fit](play_05_select3_with_score3.pdf)

---

# [fit] <sup>:musical_note:</sup> again **&** again <sub>:musical_note:</sub>

---

# [fit] ghost **1** - pacman **0**
## matches played: 3

---

# [fit] ghost **2** - pacman **0**
## matches played: 5

---

# [fit] ghost **2** - pacman **1**
## matches played: 11

---

# [fit] ghost **2** - pacman **1**
## matches played: 21

---

# [fit] ghost **3** - pacman **1**
## matches played: 34

---

# [fit] ghost **5** - pacman **2**
## matches played: 67

---

# [fit] ghost **15** - pacman **9**
## matches played: 823

---

# [fit] ghost **45** - pacman **92**
## matches played: 3177

---

![fit](play_05_select3_with_score3.pdf)

---

![fit](play_05_select3_only_tree.pdf)

---

![fit](play_05_select3_only_tree2.pdf)

---

![fit](play_05_select3_only_tree3.pdf)

---

![fit](play_05_select3_only_tree4.pdf)

---

![fit](aggregated1.pdf)

---

![fit](aggregated2.pdf)

---

![fit](aggregated3.pdf)

---

# [fit] you lost?

---

![fit](play_07.pdf)

---

![fit](play_03.pdf)

---

![fit](aggregated3.pdf)

---

# [fit] demo

---

# [fit] learnings

---

# [fit] 1. testing
# [fit] is **hard**

---

# [fit] 2. scary **algorithms**
# [fit] ain't scary anymore

---

# [fit] 3. immutability & **redux**
# [fit] ftw

---

![fit](redux_plan.pdf)

---

# [fit] Immutability
## [fit] **FEL made x many**
## 31<sub>st</sub> of March

---

# [fit] 4. **playing chess**
# [fit] against a pc :rage:

---

![fit](chess.png)

---

# [fit] thanks

---

# @danielepolencic

