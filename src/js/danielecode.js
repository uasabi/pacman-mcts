let then, fpsInterval;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    mainLoop();
}

const tick = {
  type: 'Tick',
  deltaInMilliseconds: 10000,
  input: 'up'
}

function crunchState(state,action) {
  const direction = action.input === 'nope' ? state.pacman.direction : action.input;
  switch(direction) {
    case 'left':
      return {...state, pacman: {...state.pacman,x: state.pacman.x - 1}};
    case 'up':
      return {...state, pacman: {...state.pacman, y: state.pacman.y + 1}};
    case 'right':
      return {...state, pacman: {...state.pacman, x: state.pacman.x + 1}};
    case 'down':
      return {...state, pacman: {...state.pacman, y: state.pacman.y - 1}};
    default:
      return state;
  }
}

function renderBoard(state, now) {
document.querySelector('body').innerHTML = `${now}: Pacman is in ${state.pacman.x} - ${state.pacman.y}`;
}

let currentState = {
  pacman: {
    x:5,
    y:5,
    direction:'left'
  }
};

function mainLoop() {
  requestAnimationFrame(mainLoop);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    crunchState(currentState, {type: 'Tick', deltaInMilliseconds: then, input: lastKeyPressed});
    renderBoard(currentState, now);
    lastKeyPressed = 'nope';
  }
}

let lastKeyPressed = 'nope';

document.addEventListener('keydown', (e)=> {
  e = e || window.event;
  if ( e.keyCode === 37 ) {
    lastKeyPressed = 'left';
  } else if ( e.keyCode === 38) {
    lastKeyPressed = 'up';
  } else if ( e.keyCode === 39) {
    lastKeyPressed = 'right';
  } else if ( e.keyCode === 40) {
    lastKeyPressed = 'down';
  }
});

startAnimating(2);
