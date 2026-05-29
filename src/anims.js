export function speedToFps(animationSpeed) {
  return Math.max(1, Math.round(animationSpeed * 60));
}

export function ensureAnim(scene, key, atlas, frames, animationSpeed = 0.1, repeat = -1) {
  if (!scene.anims.exists(key)) {
    scene.anims.create({
      key,
      frames: frames.map((frame) => ({ key: atlas, frame })),
      frameRate: speedToFps(animationSpeed),
      repeat,
    });
  }
  return key;
}
