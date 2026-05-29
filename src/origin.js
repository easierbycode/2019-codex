// PixiJS sprites default to a top-left origin, while Phaser sprites default to
// a centered origin. Every migrated texture passes through these helpers unless
// the original Pixi code explicitly called anchor.set(.5).
export function pixiOrigin(gameObject) {
  if (gameObject?.setOrigin) gameObject.setOrigin(0, 0);
  return gameObject;
}

export function centeredOrigin(gameObject) {
  if (gameObject?.setOrigin) gameObject.setOrigin(0.5, 0.5);
  return gameObject;
}

export function atlasSprite(scene, x, y, atlas, frame) {
  return pixiOrigin(scene.add.sprite(x, y, atlas, frame));
}
