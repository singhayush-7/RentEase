import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ address }) {
  useEffect(() => {
    if (!address) return;

    // Convert address to coordinates
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          // Create the map
          const map = L.map('map').setView([lat, lon], 15);

          // Add OpenStreetMap tiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          // Add marker
          L.marker([lat, lon]).addTo(map)
            .bindPopup(address)
            .openPopup();
        }
      });

    return () => {
      const container = L.DomUtil.get('map');
      if (container) container._leaflet_id = null; // reset map
    };
  }, [address]);

  return (
    <div
      id="map"
      style={{ height: '400px', width: '100%', borderRadius: '8px', marginTop: '10px' }}
    />
  );
}
