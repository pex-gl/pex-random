import seedrandom from "seedrandom";
import SimplexNoise from "simplex-noise";

let simplex = new SimplexNoise(Math.random);

export function seed(s) {
  seedrandom(s, { global: true });
  simplex = new SimplexNoise(Math.random);
}

export function float(min, max) {
  if (arguments.length == 0) {
    min = 0;
    max = 1;
  } else if (arguments.length == 1) {
    max = min;
    min = 0;
  }
  return min + (max - min) * Math.random();
}

export function int(min, max) {
  if (arguments.length == 0) {
    min = 0;
    max = Number.MAX_SAFE_INTEGER;
  } else if (arguments.length == 1) {
    max = min;
    min = 0;
  }
  return Math.floor(float(min, max));
}

export function vec2(r) {
  if (typeof r == "undefined") r = 1;
  const x = 2 * Math.random() - 1;
  const y = 2 * Math.random() - 1;
  const rr = Math.random() * r;
  const len = Math.sqrt(x * x + y * y);
  return [(rr * x) / len, (rr * y) / len];
}

export function vec3(r) {
  if (typeof r == "undefined") r = 1;
  const x = 2 * Math.random() - 1;
  const y = 2 * Math.random() - 1;
  const z = 2 * Math.random() - 1;
  const rr = Math.random() * r;
  const len = Math.sqrt(x * x + y * y + z * z);
  return [(rr * x) / len, (rr * y) / len, (rr * z) / len];
}

export function vec2InRect(rect) {
  return [
    rect[0][0] + Math.random() * (rect[1][0] - rect[0][0]),
    rect[0][1] + Math.random() * (rect[1][1] - rect[0][1]),
  ];
}

export function vec3InAABB(bbox) {
  const x = bbox[0][0] + Math.random() * (bbox[1][0] - bbox[0][0]);
  const y = bbox[0][1] + Math.random() * (bbox[1][1] - bbox[0][1]);
  const z = bbox[0][2] + Math.random() * (bbox[1][2] - bbox[0][2]);
  return [x, y, z];
}

export function chance(probability) {
  return Math.random() <= probability;
}

export function element(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function noise2(x, y) {
  return simplex.noise2D(x, y);
}

export function noise3(x, y, z) {
  return simplex.noise3D(x, y, z);
}

export function noise4(x, y, z, w) {
  return simplex.noise4D(x, y, z, w);
}
