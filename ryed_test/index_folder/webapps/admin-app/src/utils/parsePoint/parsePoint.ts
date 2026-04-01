export const parsePoint = (wkt?: string) => {
  if (!wkt) {
    return null;
  }
  const match = wkt.match(/POINT\((\d+\.\d+)\s+(\d+\.\d+)\)/);
  if (match) {
    const lng = parseFloat(match[1]);
    const lat = parseFloat(match[2]);
    return { lat, lng };
  }
};
