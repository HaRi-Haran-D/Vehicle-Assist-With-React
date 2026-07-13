import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default leaflet marker icon in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapEvents({ setPosition, onPositionChanged }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      if (onPositionChanged) onPositionChanged(e.latlng);
    },
  });
  return null;
}

function CenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);
  return null;
}

export function LocationPickerMap({ position, setPosition, onPositionChanged }) {
  const defaultCenter = [13.0827, 80.2707]; // Default London or anywhere

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border border-borderDark z-0">
      <MapContainer
        center={position || defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Marker position={position} />}
        {position && <CenterMap position={position} />}
        <MapEvents setPosition={setPosition} onPositionChanged={onPositionChanged} />
      </MapContainer>
    </div>
  );
}
