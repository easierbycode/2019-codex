export const gameState = {
  score: 0,
  hiScore: Number(localStorage.getItem('hiScore') || 0),
  stageId: 0,
  mode: 'pc',
};

export function resetRun() {
  gameState.score = 0;
  gameState.stageId = 0;
}

export function addScore(points) {
  gameState.score += points;
  if (gameState.score > gameState.hiScore) {
    gameState.hiScore = gameState.score;
    localStorage.setItem('hiScore', String(gameState.hiScore));
  }
}

export function dlog(...args) {
  if (new URLSearchParams(location.search).has('debug')) console.debug(...args);
}
