import random from "pex-random";
import { aabb, rect } from "pex-geom";
import { mat4, utils, vec2, vec3, vec4 } from "pex-math";

// Helpers
const getContext = (selector) =>
  document.querySelector(selector).getContext("2d");
const getValue = (selector) =>
  parseFloat(document.querySelector(selector).value);

const drawCircle = (context, x, y, r, fillStyle) => {
  if (fillStyle) context.fillStyle = fillStyle;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2);
  fillStyle ? context.fill() : context.stroke();
};

const fade = (ctx, alpha) => {
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const erase = (ctx, alpha) => {
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = "source-over";
};

const createPixels = (ctx) => {
  const { width, height } = ctx.canvas;
  const image = ctx.createImageData(width, height);
  const color = [0, 0, 0];
  return (getColor) => {
    for (let i = 0; i < width * height; i++) {
      getColor(i % width, Math.floor(i / width), color);
      image.data.set(color, i * 4);
      image.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
  };
};

const createRenderer3d = ({ width, height, distance, pitch, fov }) => {
  const projection = mat4.perspective(
    mat4.create(),
    fov,
    width / height,
    1,
    2 * distance,
  );
  const view = mat4.create();
  const viewProjection = mat4.create();
  const eye = [0, 0, 0];
  const target = [0, 0, 0];
  const point = vec4.create();

  const project = (position, out) => {
    vec3.set(point, position);
    point[3] = 1;
    vec4.multMat4(point, viewProjection);
    const w = point[3];
    out[0] = ((1 + point[0] / w) * width) / 2;
    out[1] = ((1 - point[1] / w) * height) / 2;
    out[2] = w - distance;
    out[3] = distance / w;
    return out;
  };

  return {
    project,
    orbit(yaw) {
      eye[0] = distance * Math.cos(pitch) * Math.sin(yaw);
      eye[1] = distance * Math.sin(pitch);
      eye[2] = distance * Math.cos(pitch) * Math.cos(yaw);
      mat4.set(viewProjection, projection);
      mat4.mult(viewProjection, mat4.lookAt(view, eye, target));
    },
    strokeLines(ctx, points, lines) {
      const screen = points.map((p) => project(p, []));
      ctx.beginPath();
      for (const [a, b] of lines) {
        ctx.moveTo(screen[a][0], screen[a][1]);
        ctx.lineTo(screen[b][0], screen[b][1]);
      }
      ctx.stroke();
    },
  };
};

// Noise
const NOISE_FREQUENCY = 0.02;

const createNoisePixels = (selector, size) => {
  const ctx = getContext(selector);
  ctx.canvas.width = size;
  ctx.canvas.height = size;
  const drawPixels = createPixels(ctx);
  return (getNoise) =>
    drawPixels((x, y, out) =>
      out.fill((getNoise(x * NOISE_FREQUENCY, y * NOISE_FREQUENCY) + 1) * 128),
    );
};

random.seed(0);
for (const size of [64, 128, 256]) {
  createNoisePixels(`.Noise-2d-${size}`, size)((x, y) => random.noise2(x, y));
}
const drawNoise3d = createNoisePixels(".Noise-3d", 256);
createNoisePixels(
  ".Noise-octave",
  256,
)((x, y) => random.fbm({ octaves: 4 }, x, y));

// vec2Noise/vec3Noise/curl2/curl3
const DT = 1 / 60;
const SIZE = 256;
const RECT = [
  [0, 0],
  [SIZE, SIZE],
];
const LIFETIME = [1, 4];

// Separate PRNGs: spawning never shifts the field and replays match.
let seed = 0;
let time = 0;
let frequency;
let speed;
const field = random.create(seed);
const spawner = random.create(seed);

const getLifeAlpha = ({ age, lifetime }) =>
  Math.sin((Math.PI * age) / lifetime);

const createParticles = (count, bounds, lifetime) => {
  const is2d = bounds[0].length == 2;
  const { addScaled } = is2d ? vec2 : vec3;
  const containsPoint = is2d ? rect.containsPoint : aabb.containsPoint;
  const getPoint = (is2d ? spawner.vec2InRect : spawner.vec3InAABB).bind(
    spawner,
  );
  const spawn = (particle) => {
    getPoint(bounds, particle.position);
    particle.age = 0;
    particle.lifetime = lifetime ? spawner.float(...lifetime) : Infinity;
  };
  const velocity = [];
  const particles = Array.from({ length: count }, () => ({ position: [] }));
  return {
    particles,
    reset: () => particles.forEach(spawn),
    advect(getVelocity) {
      for (const particle of particles) {
        getVelocity(particle.position, velocity);
        // Not scaled by frequency: speed stays independent of feature size.
        addScaled(particle.position, velocity, speed);
        particle.age += DT;
        if (
          particle.age > particle.lifetime ||
          !containsPoint(bounds, particle.position)
        ) {
          spawn(particle);
        }
      }
    },
  };
};

// Matches curl2 mean speed for a fair comparison.
const NOISE_GAIN = 3.4;
const getNoise2Velocity = ([x, y], out) =>
  vec2.scale(
    field.vec2Noise(x * frequency, y * frequency, time, out),
    NOISE_GAIN,
  );
const getCurl2Velocity = ([x, y], out) =>
  field.curl2(x * frequency, y * frequency, time, out);
const getCurl3Velocity = ([x, y, z], out) =>
  field.curl3(x * frequency, y * frequency, z * frequency, time, out);

const createCurlParticles = () => {
  const ctx = getContext(".Curl-particles");
  const particles = createParticles(3000, RECT, LIFETIME);
  return {
    reset() {
      particles.reset();
      fade(ctx, 1);
    },
    draw() {
      particles.advect(getCurl2Velocity);
      fade(ctx, 0.08);
      for (const particle of particles.particles) {
        ctx.fillStyle = `rgba(0, 0, 0, ${getLifeAlpha(particle)})`;
        ctx.fillRect(particle.position[0], particle.position[1], 1, 1);
      }
    },
  };
};

// No lifetime: density only depends on the flow.
// Simulated past the edges: inflow edges would otherwise stay empty.
const MARGIN = 64;
const DIVERGENCE_BOUNDS = [
  [-MARGIN, -MARGIN],
  [SIZE + MARGIN, SIZE + MARGIN],
];
const DIVERGENCE_PARTICLES = 1500 * ((SIZE + 2 * MARGIN) / SIZE) ** 2;
const COVERAGE_CELLS = 32;

const getCoverage = (particles) => {
  const occupied = new Set();
  for (const { position } of particles) {
    if (!rect.containsPoint(RECT, position)) continue;
    occupied.add(
      Math.floor((position[0] / SIZE) * COVERAGE_CELLS) * COVERAGE_CELLS +
        Math.floor((position[1] / SIZE) * COVERAGE_CELLS),
    );
  }
  return `${Math.round((100 * occupied.size) / COVERAGE_CELLS ** 2)}%`;
};

const createDivergence = (name, getVelocity) => {
  const ctx = getContext(`.Curl-${name}`);
  const coverage = document.querySelector(`.Curl-${name}-coverage`);
  const particles = createParticles(DIVERGENCE_PARTICLES, DIVERGENCE_BOUNDS);
  return {
    reset: particles.reset,
    draw(frame) {
      particles.advect(getVelocity);
      fade(ctx, 1);
      ctx.fillStyle = "#000";
      for (const { position } of particles.particles) {
        ctx.fillRect(position[0] - 1, position[1] - 1, 2, 2);
      }
      if (frame % 10 == 0) {
        coverage.textContent = getCoverage(particles.particles);
      }
    },
  };
};

const ARROWS = 16;
const ARROW_CELL = SIZE / ARROWS;

const createPotential = () => {
  const ctx = getContext(".Curl-potential");
  const drawPixels = createPixels(ctx);
  const mode = document.querySelector(".Curl-potential-mode");
  const arrow = [];
  return {
    draw() {
      const isMorph = mode.value == "morph";
      const offset = isMorph ? 0 : time;
      const t = isMorph ? time : 0;

      drawPixels((x, y, out) => {
        const n = field.noise3(x * frequency + offset, y * frequency, t);
        // Contour lines are the streamlines of the flow.
        const isContour = Math.abs((((n + 1) * 4) % 1) - 0.5) > 0.45;
        out.fill(isContour ? 64 : (n + 1) * 64 + 96);
      });

      ctx.strokeStyle = "#95171d";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < ARROWS; i++) {
        for (let j = 0; j < ARROWS; j++) {
          const x = (i + 0.5) * ARROW_CELL;
          const y = (j + 0.5) * ARROW_CELL;
          field.curl2(x * frequency + offset, y * frequency, t, arrow);
          const length = vec2.length(arrow);
          vec2.scale(
            arrow,
            (0.45 * ARROW_CELL * Math.min(1, length / 3)) / length,
          );
          const [dx, dy] = arrow;
          ctx.moveTo(x - dx, y - dy);
          ctx.lineTo(x + dx, y + dy);
          ctx.lineTo(x + dx * 0.4 - dy * 0.4, y + dy * 0.4 + dx * 0.4);
        }
      }
      ctx.stroke();
    },
  };
};

const createVec3NoiseRgb = () => {
  const ctx = getContext(".Curl-rgb");
  const drawPixels = createPixels(ctx);
  const scale = SIZE / ctx.canvas.width;
  const color = [];
  return {
    draw() {
      drawPixels((x, y, out) => {
        field.vec3Noise(
          x * scale * frequency,
          y * scale * frequency,
          0,
          time,
          color,
        );
        for (let i = 0; i < 3; i++) out[i] = (color[i] + 1) * 128;
      });
    },
  };
};

const HALF_SIZE = SIZE / 2;
const CUBE = [
  [-HALF_SIZE, -HALF_SIZE, -HALF_SIZE],
  [HALF_SIZE, HALF_SIZE, HALF_SIZE],
];
// Corner indices from aabb.getCorners: bottom, top and vertical edges.
const CUBE_EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];
const PARTICLE_ALPHA = 0.35;
const PARTICLE_SIZE = 1.2;

const createCurlParticles3d = () => {
  const ctx = getContext(".Curl-particles-3d");
  // Trails on their own layer so the cube edges are not smeared.
  const trailsCtx = new OffscreenCanvas(SIZE, SIZE).getContext("2d");
  const renderer = createRenderer3d({
    width: SIZE,
    height: SIZE,
    distance: 3 * SIZE,
    pitch: 0.4,
    // Fits the orbiting cube in the canvas.
    fov: 0.55,
  });
  const particles = createParticles(2500, CUBE, LIFETIME);
  const corners = aabb.getCorners(CUBE);
  const projected = [];
  return {
    reset() {
      particles.reset();
      erase(trailsCtx, 1);
    },
    draw(frame) {
      particles.advect(getCurl3Velocity);
      renderer.orbit(frame * 0.003);
      erase(trailsCtx, 0.05);
      for (const particle of particles.particles) {
        const [x, y, depth, scale] = renderer.project(
          particle.position,
          projected,
        );
        // Low alpha accumulates into density. Fog fades the back for depth.
        const fog = utils.clamp(0.5 - depth / SIZE, 0, 1);
        const alpha =
          PARTICLE_ALPHA * getLifeAlpha(particle) * utils.lerp(0.2, 1, fog);
        trailsCtx.fillStyle = `rgba(20, 20, 40, ${alpha})`;
        trailsCtx.fillRect(x, y, PARTICLE_SIZE * scale, PARTICLE_SIZE * scale);
      }
      fade(ctx, 1);
      ctx.drawImage(trailsCtx.canvas, 0, 0);
      ctx.strokeStyle = "#222222";
      renderer.strokeLines(ctx, corners, CUBE_EDGES);
    },
  };
};

const curlDemos = [
  createCurlParticles(),
  createDivergence("gutters", getNoise2Velocity),
  createDivergence("divergence-free", getCurl2Velocity),
  createPotential(),
  createVec3NoiseRgb(),
  createCurlParticles3d(),
];

const seedLabel = document.querySelector(".Curl-seed");
const replay = () => {
  field.seed(seed);
  spawner.seed(seed);
  time = 0;
  for (const demo of curlDemos) demo.reset?.();
  seedLabel.textContent = `seed: ${seed}`;
};
document.querySelector(".Curl-replay").addEventListener("click", replay);
document.querySelector(".Curl-reseed").addEventListener("click", () => {
  seed++;
  replay();
});
replay();

// chance
const generateChance = () => {
  const probability = getValue(".Chance-input");
  const ChanceCtx = getContext(".Chance-canvas");
  const chanceResults = [];
  for (let i = 0; i < 100; i++) {
    chanceResults.push(random.chance(probability));
  }
  const { width, height } = ChanceCtx.canvas;
  ChanceCtx.clearRect(0, 0, width, height);

  const barWidth = width * 0.2;
  const barHeight = (height * chanceResults.filter(Boolean).length) / 100;
  ChanceCtx.fillRect(0, (1 - probability) * height, width, 2);
  ChanceCtx.fillRect(width * 0.2, height - barHeight, barWidth, barHeight);
  ChanceCtx.fillRect(width * 0.6, barHeight, barWidth, height - barHeight);
};
document
  .querySelector(".Chance-generate")
  .addEventListener("click", generateChance);
document
  .querySelector(".Chance-input")
  .addEventListener("change", generateChance);
generateChance();

// vec2/vec3 and vec2InRect/vec3InAABB
const SAMPLE_RADIUS = 32;
const SAMPLE_RECT = [
  [10, 10],
  [100, 100],
];
const SAMPLE_BOX = [
  [10, 10, 10],
  [100, 100, 100],
];

const drawCircleBounds = (ctx) => {
  ctx.translate(ctx.canvas.width / 3, ctx.canvas.height / 3);
  drawCircle(ctx, 0, 0, SAMPLE_RADIUS);
};
const drawRectBounds = (ctx) =>
  ctx.strokeRect(
    ...SAMPLE_RECT[0],
    rect.width(SAMPLE_RECT),
    rect.height(SAMPLE_RECT),
  );

const drawSamples = (selector, drawBounds, sample) => {
  random.seed(0);
  const ctx = getContext(selector);
  drawBounds(ctx);
  for (let i = 0; i < 100; i++) {
    const [x, y, z] = sample();
    drawCircle(
      ctx,
      x,
      y,
      1,
      z === undefined ? "#000" : `hsl(${360 * z}, 100%, 50%)`,
    );
  }
};

drawSamples(".Vec2", drawCircleBounds, () => random.vec2(SAMPLE_RADIUS));
drawSamples(".Vec3", drawCircleBounds, () => random.vec3(SAMPLE_RADIUS));
drawSamples(".Vec2InRect", drawRectBounds, () =>
  random.vec2InRect(SAMPLE_RECT),
);
drawSamples(".Vec3InAABB", drawRectBounds, () => random.vec3InAABB(SAMPLE_BOX));

// Fixed step so replays are identical regardless of the frame rate.
let frame = 0;
requestAnimationFrame(function loop() {
  drawNoise3d((x, y) => random.noise3(x, y, (frame * NOISE_FREQUENCY) / 2));

  frequency = getValue(".Curl-frequency");
  speed = getValue(".Curl-speed");
  for (const demo of curlDemos) demo.draw(frame);
  time += getValue(".Curl-time-scale") * DT;

  frame++;
  requestAnimationFrame(loop);
});
