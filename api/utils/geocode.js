// api/utils/geocode.js
export async function getCoordinates(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.length === 0) {
    return null;
  }

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon)
  };
}
