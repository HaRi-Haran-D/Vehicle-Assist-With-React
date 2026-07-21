import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Truck, Home } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

// Fix for default leaflet marker icon in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Icons
const customerIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <div className="bg-brandDark text-brandYellow p-2 rounded-full shadow-lg border-2 border-white w-8 h-8 flex items-center justify-center">
      <Home size={16} />
    </div>
  ),
  className: 'custom-leaflet-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const mechanicIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <div className="bg-brandYellow text-brandDark p-2 rounded-full shadow-lg border-2 border-brandDark w-10 h-10 flex items-center justify-center">
      <Truck size={20} />
    </div>
  ),
  className: 'custom-leaflet-icon',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

function FitBounds({ customerLocation, mechanicLocation }) {
  const map = useMap();
  useEffect(() => {
    if (customerLocation && mechanicLocation) {
      const bounds = L.latLngBounds(customerLocation, mechanicLocation);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (customerLocation) {
      map.flyTo(customerLocation, 14);
    }
  }, [customerLocation, mechanicLocation, map]);
  return null;
}

export function MechanicTrackingMap({ request }) {
  const [mechanicLocation, setMechanicLocation] = useState(null);
  
  const customerLocation = request.latitude && request.longitude 
    ? [request.latitude, request.longitude] 
    : null;

  useEffect(() => {
    if (!customerLocation) return;
    
    // Simulate mechanic location if request is accepted/in progress
    if (['IN_PROGRESS', 'ON_THE_WAY', 'REPAIR_STARTED'].includes(request.status)) {
      // Start mechanics about ~2km away
      const initialMechanicLoc = [
        customerLocation[0] - 0.02,
        customerLocation[1] + 0.015,
      ];
      setMechanicLocation(initialMechanicLoc);

      let step = 0;
      const totalSteps = 60; // Steps to reach customer
      const interval = setInterval(() => {
        if (step < totalSteps) {
          step++;
          setMechanicLocation(prev => {
            if (!prev) return initialMechanicLoc;
            const newLat = prev[0] + (customerLocation[0] - prev[0]) * 0.1;
            const newLng = prev[1] + (customerLocation[1] - prev[1]) * 0.1;
            return [newLat, newLng];
          });
        }
      }, 1000); // move every second

      return () => clearInterval(interval);
    } else {
      setMechanicLocation(null);
    }
  }, [request.status, request.latitude, request.longitude]);

  if (!customerLocation) {
    return (
      <div className="h-64 w-full rounded-lg overflow-hidden border border-borderDark flex items-center justify-center bg-gray-50 text-textMuted mt-4">
        <p>Location data not available for this request.</p>
      </div>
    );
  }

  return (
    <div className="h-80 w-full rounded-lg overflow-hidden border border-borderDark z-0 mt-4">
      <MapContainer
        center={customerLocation}
        zoom={13}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={customerLocation} icon={customerIcon}>
          <Popup>Your Location</Popup>
        </Marker>
        
        {mechanicLocation && (
          <Marker position={mechanicLocation} icon={mechanicIcon}>
            <Popup>
              {request.mechanic && request.mechanic.username ? `${request.mechanic.username} is on the way!` : "Mechanic is on the way!"}
            </Popup>
          </Marker>
        )}

        {mechanicLocation && (
          <Polyline 
            positions={[customerLocation, mechanicLocation]} 
            color="#EAB308" 
            dashArray="5, 10" 
            weight={3}
          />
        )}
        
        <FitBounds customerLocation={customerLocation} mechanicLocation={mechanicLocation} />
      </MapContainer>
    </div>
  );
}
