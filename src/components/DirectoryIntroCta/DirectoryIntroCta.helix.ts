const helixRadius = 32;
const helixPitch = 112;
const tilt = 24 * Math.PI / 180;
const tiltSine = Math.sin(tilt);
const tiltCosine = Math.cos(tilt);

export const helixCanvasWidth = 200;

export const getHelixGeometry = (height: number) => {
  const helixHeight = height / tiltCosine + 180;
  const getStations = (spacing: number) => {
    const count = Math.ceil(helixHeight / spacing / 2);
    return Array.from({ length: count * 2 + 1 }, (_, index) => {
      const y = (index - count) * spacing;
      const angle = y / helixPitch * Math.PI * 2;
      return { y, sine: Math.sin(angle), cosine: Math.cos(angle) };
    });
  };
  return { height, points: getStations(4), rungs: getStations(12) };
};

type HelixGeometry = ReturnType<typeof getHelixGeometry>;
type HelixStation = HelixGeometry[`points`][number];
type HelixPoint = { x: number; y: number; depth: number; scale: number };
type HelixPiece =
  | { type: `node`; depth: number; point: HelixPoint }
  | { type: `line`; depth: number; width: number; opacity: number; start: HelixPoint; end: HelixPoint };

export const createHelixSphere = () => {
  const sphere = document.createElement(`canvas`);
  sphere.width = 32;
  sphere.height = 32;
  const context = sphere.getContext(`2d`);
  if (!context) return sphere;
  const shading = context.createRadialGradient(11, 10, 0, 16, 16, 16);
  shading.addColorStop(0, `#171717`);
  shading.addColorStop(0.45, `#050505`);
  shading.addColorStop(1, `#000000`);
  context.fillStyle = shading;
  context.beginPath();
  context.arc(16, 16, 16, 0, Math.PI * 2);
  context.fill();
  return sphere;
};

export const drawHelix = (context: CanvasRenderingContext2D, geometry: HelixGeometry, rotation: number, sphere: HTMLCanvasElement) => {
  const rotationSine = Math.sin(rotation);
  const rotationCosine = Math.cos(rotation);
  const pieces: HelixPiece[] = [];
  const project = (station: HelixStation, direction: number): HelixPoint => {
    const x = (station.cosine * rotationCosine + station.sine * rotationSine) * helixRadius * direction;
    const depth = (station.sine * rotationCosine - station.cosine * rotationSine) * helixRadius * direction;
    const scale = 650 / (650 - depth);
    return {
      depth, scale,
      x: helixCanvasWidth / 2 + (x * tiltCosine - station.y * tiltSine) * scale,
      y: geometry.height / 2 + (x * tiltSine + station.y * tiltCosine) * scale,
    };
  };

  [1, -1].forEach((direction) => {
    const points = geometry.points.map((point) => project(point, direction));
    points.slice(1).forEach((end, index) => {
      const start = points[index];
      pieces.push({ type: `line`, start, end, width: 3, opacity: 1, depth: (start.depth + end.depth) / 2 });
    });
  });
  geometry.rungs.forEach((rung) => {
    const start = project(rung, 1);
    const end = project(rung, -1);
    pieces.push({ type: `line`, start, end, width: 1.5, opacity: 0.64, depth: 0 });
    pieces.push({ type: `node`, point: start, depth: start.depth });
    pieces.push({ type: `node`, point: end, depth: end.depth });
  });

  context.clearRect(0, 0, helixCanvasWidth, geometry.height);
  context.lineCap = `round`;
  context.strokeStyle = `#ffffff`;
  pieces.sort((first, second) => first.type === second.type ? first.depth - second.depth : first.type === `line` ? -1 : 1).forEach((piece) => {
    if (piece.type === `node`) {
      const radius = 4 * piece.point.scale;
      context.globalAlpha = 1;
      context.drawImage(sphere, piece.point.x - radius, piece.point.y - radius, radius * 2, radius * 2);
      return;
    }
    context.globalAlpha = piece.opacity;
    context.lineWidth = piece.width * (piece.start.scale + piece.end.scale) / 2;
    context.beginPath();
    context.moveTo(piece.start.x, piece.start.y);
    context.lineTo(piece.end.x, piece.end.y);
    context.stroke();
  });
  context.globalAlpha = 1;
};
