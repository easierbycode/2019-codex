let soundManager;

export function initSound(game) {
  soundManager = game.sound;
}

export function play(key, config = {}) {
  if (!soundManager) return undefined;
  try {
    return soundManager.play(key, config);
  } catch {
    return undefined;
  }
}

export function stop(key) {
  soundManager?.stopByKey(key);
}

export function stopAll() {
  soundManager?.stopAll();
}
