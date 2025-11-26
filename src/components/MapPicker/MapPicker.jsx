// // // MapPicker.jsx
// // import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// // import L from "leaflet";
// // // import { useEffect } from "react";

// // // Fix Leaflet default icon issue in React
// // const DefaultIcon = L.icon({
// //   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
// //   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// // });
// // L.Marker.prototype.options.icon = DefaultIcon;

// // export default function MapPicker({ lat, lng, setLat, setLng }) {
// //   const position = lat && lng ? [lat, lng] : [20.5937, 78.9629]; // Default India center

// //   function MapEvents() {
// //     useMapEvents({
// //       click(e) {
// //         setLat(e.latlng.lat);
// //         setLng(e.latlng.lng);
// //       },
// //     });
// //     return null;
// //   }

// //   return (
// //     <div style={{ height: "300px", width: "100%", marginBottom: "1rem" }}>
// //       <MapContainer
// //         center={position}
// //         zoom={13}
// //         style={{ height: "100%", width: "100%" }}
// //       >
// //         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

// //         {lat && lng && <Marker position={[lat, lng]} />}

// //         <MapEvents />
// //       </MapContainer>
// //     </div>
// //   );
// // }

// // MapPicker.jsx
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";
// import L from "leaflet";

// // Fix Leaflet default icon issue in React
// const DefaultIcon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// // ⭐ This component recenters the map whenever lat/lng changes
// function RecenterMap({ lat, lng }) {
//   const map = useMap();

//   // Recenter ONLY when valid (numbers)
//   if (!isNaN(lat) && !isNaN(lng)) {
//     map.setView([lat, lng], map.getZoom());
//   }

//   return null;
// }

// export default function MapPicker({ lat, lng, setLat, setLng }) {
//   const defaultCenter = lat && lng ? [lat, lng] : [20.5937, 78.9629];

//   function MapEvents() {
//     useMapEvents({
//       click(e) {
//         setLat(e.latlng.lat);
//         setLng(e.latlng.lng);
//       },
//     });
//     return null;
//   }

//   return (
//     <div style={{ height: "300px", width: "100%", marginBottom: "1rem" }}>
//       <MapContainer
//         center={defaultCenter}
//         zoom={13}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//         {/* Marker updates correctly */}
//         {lat && lng && <Marker position={[lat, lng]} />}

//         {/* Map click handler */}
//         <MapEvents />

//         {/* ⭐ Recenter map on manual input */}
//         <RecenterMap lat={lat} lng={lng} />
//       </MapContainer>
//     </div>
//   );
// }

// MapPicker.jsx
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react"; // Added useEffect
import styles from "./MapPicker.module.css";

// Fix Leaflet default icon issue in React
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// ⭐ Improved RecenterMap with useEffect for better performance
// function RecenterMap({ lat, lng }) {
//   const map = useMap();

//   useEffect(() => {
//     if (lat == null || lng == null) return;
//     if (!isNaN(lat) && !isNaN(lng)) {
//       map.setView([lat, lng], map.getZoom());
//     }
//   }, [lat, lng, map]);

//   return null;
// }

// ⭐ Improved RecenterMap with useEffect for better performance
// function RecenterMap({ lat, lng }) {
//   const map = useMap();

//   useEffect(() => {
//     // 🔥 CRITICAL FIX: Tell Leaflet to recalculate its size based on its container.
//     // This resolves issues where the map renders before its CSS is fully applied.
//     map.invalidateSize();

//     // Recenter logic
//     if (lat == null || lng == null) return;
//     if (!isNaN(lat) && !isNaN(lng)) {
//       map.setView([lat, lng], map.getZoom());
//     }
//   }, [lat, lng, map]); // dependencies must include lat, lng, map

//   return null;
// }
function RecenterMap({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    if (lat == null || lng == null) return;
    if (isNaN(lat) || isNaN(lng)) return;

    map.setView([lat, lng], map.getZoom());
    map.invalidateSize();
  }, [lat, lng, map]);

  return null;
}

// ⭐ Improved MapEvents with click validation
function MapEvents({ setLat, setLng }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      // Additional validation
      if (typeof lat === "number" && typeof lng === "number") {
        setLat(lat);
        setLng(lng);
      }
    },
  });
  return null;
}

export default function MapPicker({ lat, lng, setLat, setLng }) {
  // Better default handling
  //   const defaultCenter =
  //     !isNaN(lat) && !isNaN(lng)
  //       ? [lat, lng]
  //       : [16.908369694971217, 76.68457031250001];
  const defaultCenter =
    typeof lat === "number" && typeof lng === "number"
      ? [lat, lng]
      : [20.5937, 78.9629];

  // const hasValidCoordinates = !isNaN(lat) && !isNaN(lng);
  const hasValidCoordinates =
    lat !== null &&
    lng !== null &&
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng);

  return (
    <div className={styles.mapContainer}>
      <div
        style={{
          height: "300px",
          width: "100%",
          marginBottom: "1rem",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <MapContainer
          center={defaultCenter}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true} // Added for better UX
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker with better validation */}
          {hasValidCoordinates && <Marker position={[lat, lng]} />}

          {/* Map click handler */}
          <MapEvents setLat={setLat} setLng={setLng} />

          {/* ⭐ Recenter map on manual input */}
          <RecenterMap lat={lat} lng={lng} />
        </MapContainer>
      </div>
    </div>
  );
}
