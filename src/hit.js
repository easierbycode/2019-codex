function worldRect(unit) {
  const area = unit.hitArea ?? { x: 0, y: 0, width: unit.width, height: unit.height };
  return {
    x: unit.x + area.x,
    y: unit.y + area.y,
    width: area.width,
    height: area.height,
  };
}

export function hitTest(a, b) {
  const ar = worldRect(a);
  const br = worldRect(b);
  return ar.x < br.x + br.width
    && ar.x + ar.width > br.x
    && ar.y < br.y + br.height
    && ar.y + ar.height > br.y;
}
