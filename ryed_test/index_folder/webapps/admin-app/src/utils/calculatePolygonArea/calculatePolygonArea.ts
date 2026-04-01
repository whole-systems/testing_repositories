export const calculatePolygonArea = (
  paths: { lat: number; lng: number }[]
): number => {
  let area = 0;
  const points = paths.length;

  if (points < 3) return 0;

  for (let i = 0; i < points; i++) {
    const { lat: lat1, lng: lng1 } = paths[i];
    const { lat: lat2, lng: lng2 } = paths[(i + 1) % points];

    area += lng1 * lat2 - lng2 * lat1;
  }

  return Math.abs(area / 2);
};
