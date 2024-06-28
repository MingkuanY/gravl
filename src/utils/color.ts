export const interpolateColors = (
  steps: number,
  startColor: string,
  endColor: string,
  livedInColor = "#319fff"
) => {
  const startRGB = hexToRGB(startColor);
  const endRGB = hexToRGB(endColor);

  const stepR = (endRGB.r - startRGB.r) / steps;
  const stepG = (endRGB.g - startRGB.g) / steps;
  const stepB = (endRGB.b - startRGB.b) / steps;

  const interpolatedColors = [];
  interpolatedColors.push(livedInColor); // colors[0] = livedInColor always
  for (let i = 0; i <= steps; i++) {
    const r = Math.round(startRGB.r + stepR * i);
    const g = Math.round(startRGB.g + stepG * i);
    const b = Math.round(startRGB.b + stepB * i);
    interpolatedColors.push(rgbToHex(r, g, b));
  }

  return interpolatedColors;
};

const hexToRGB = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const todayColor = "#319fff";
export const otherColor = "#0d5ecf";
