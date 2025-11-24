// // const AddManager = () => {
// //   return <div>AddManager</div>;
// // };

// import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import { useState } from "react";
// import axios from "axios";
// import { Form, useNavigation } from "react-router-dom";
// import styles from "./AddManager.module.css";

// // Generate random color
// const randomColor = () =>
//   "#" + Math.floor(Math.random() * 16777215).toString(16);

// // Map themes
// const mapStyles = [
//   {
//     name: "OSM Light",
//     url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//   },
//   {
//     name: "Stadia Dark",
//     url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
//   },
//   {
//     name: "Carto Dark",
//     url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
//   },
// ];

// const AddManager = () => {
//   const navigation = useNavigation();

//   const isLoading =
//     navigation.state === "submitting" || navigation.state === "loading";
//   const [polygons, setPolygons] = useState([]);
//   const [managerName, setManagerName] = useState("");
//   const [email, setEmail] = useState("");
//   const [themeIndex, setThemeIndex] = useState(0);

//   // NEW — region mode state
//   const [regionMode, setRegionMode] = useState("multi"); // multi | polygon | all

//   const handleChangeTheme = () => {
//     setThemeIndex((prev) => (prev + 1) % mapStyles.length);
//   };

//   const handleCreated = (e) => {
//     const layer = e.layer;

//     // ❌ block drawing in "all" mode
//     if (regionMode === "all") {
//       alert("Drawing is disabled in ALL access mode.");
//       return;
//     }

//     // ❌ allow only one region in Polygon mode
//     if (regionMode === "polygon" && polygons.length >= 1) {
//       alert("Only one polygon allowed in Polygon mode");
//       return;
//     }

//     // Extract coordinates
//     const latlngs = layer.getLatLngs()[0];
//     const coordinates = latlngs.map((p) => [p.lng, p.lat]);
//     coordinates.push([latlngs[0].lng, latlngs[0].lat]); // close polygon

//     const newPoly = {
//       id: layer._leaflet_id,
//       coordinates,
//       color: randomColor(),
//     };

//     // ✔ Polygon mode → overwrite
//     if (regionMode === "polygon") {
//       setPolygons([newPoly]);
//     }

//     // ✔ MultiPolygon mode → append
//     if (regionMode === "multiPolygon") {
//       setPolygons((prev) => [...prev, newPoly]);
//     }
//   };

//   const handleEdited = (e) => {
//     const updated = [];

//     e.layers.eachLayer((layer) => {
//       const id = layer._leaflet_id;
//       const latlngs = layer.getLatLngs()[0];

//       const coordinates = latlngs.map((p) => [p.lng, p.lat]);
//       coordinates.push([latlngs[0].lng, latlngs[0].lat]);

//       updated.push({ leafletId: id, coordinates });
//     });

//     setPolygons((prev) =>
//       prev.map((p) => {
//         const found = updated.find((u) => u.leafletId === p.id);
//         return found ? { ...p, coordinates: found.coordinates } : p;
//       })
//     );
//   };

//   const handleDeleted = (e) => {
//     const ids = [];
//     e.layers.eachLayer((layer) => ids.push(layer._leaflet_id));
//     setPolygons((prev) => prev.filter((p) => !ids.includes(p.id)));
//   };

//   // 🔥 Save manager
//   const handleSave = async () => {
//     if (!managerName || !email) {
//       alert("Please enter name and email");
//       return;
//     }

//     // 1️⃣ Region = ALL → send `"all"`
//     if (regionMode === "all") {
//       const res = await axios.post(
//         "http://localhost:3000/api/manager/multipleRegion",
//         {
//           name: managerName,
//           email,
//           allowedRegion: "all",
//         }
//       );
//       alert("Saved manager with ALL access: " + res.data.data.id);
//       return;
//     }

//     // Require polygon drawing
//     if (polygons.length === 0) {
//       alert("Draw at least one region");
//       return;
//     }

//     let payloadRegion;

//     // 2️⃣ Region = POLYGON
//     if (regionMode === "polygon") {
//       payloadRegion = {
//         type: "Polygon",
//         coordinates: [polygons[0].coordinates],
//       };
//     }

//     // 3️⃣ Region = MULTIPOLYGON
//     if (regionMode === "multi") {
//       payloadRegion = {
//         type: "MultiPolygon",
//         coordinates: polygons.map((p) => [p.coordinates]),
//       };
//     }

//     const res = await axios.post(
//       "http://localhost:3000/api/manager/multipleRegion",
//       {
//         name: managerName,
//         email,
//         allowedRegion: payloadRegion,
//       }
//     );

//     alert("Saved manager: " + res.data.data.id);
//   };

//   return (
//     <Form method="POST" className={styles.loginForm}>
//       {/* Hidden Client ID (you can update value dynamically) */}
//       {/* <input type="hidden" name="clientId" value={client?._id} /> */}

//       {/* Name */}
//       <div className={styles.formGroup}>
//         <label htmlFor="name" className={styles.formLabel}>
//           <span>Name</span>
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           className={styles.formInput}
//           placeholder="Enter manager name"
//           required
//           disabled={isLoading}
//         />
//       </div>

//       {/* Email */}
//       <div className={styles.formGroup}>
//         <label htmlFor="email" className={styles.formLabel}>
//           <span>Email Address</span>
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           className={styles.formInput}
//           placeholder="Enter email"
//           required
//           disabled={isLoading}
//         />
//       </div>

//       {/* Phone */}
//       <div className={styles.formGroup}>
//         <label htmlFor="phone" className={styles.formLabel}>
//           <span>Phone</span>
//         </label>
//         <input
//           type="text"
//           id="phone"
//           name="phone"
//           className={styles.formInput}
//           placeholder="Enter phone number"
//           required
//           disabled={isLoading}
//         />
//       </div>

//       {/* Is Active Toggle */}
//       <div className={styles.formGroup}>
//         <label htmlFor="isActive" className={styles.formLabel}>
//           <span>Active Status</span>
//         </label>

//         <select
//           id="isActive"
//           name="isActive"
//           className={styles.formInput}
//           defaultValue="true"
//           disabled={isLoading}
//         >
//           <option value="true">Active</option>
//           <option value="false">Inactive</option>
//         </select>
//       </div>

//       {/* Allowed Region */}
//       <div className={styles.formGroup}>
//         <label htmlFor="allowedRegionType" className={styles.formLabel}>
//           <span>Allowed Region</span>
//         </label>
//         <select
//           id="allowedRegionType"
//           name="allowedRegionType"
//           className={styles.formInput}
//           defaultValue="all"
//           disabled={isLoading}
//         >
//           <option value="all">All Regions</option>
//           <option value="polygon">One Region</option>
//           <option value="multipolygon">Multiple Region</option>
//         </select>
//       </div>

//       {/* Polygon / MultiPolygon JSON Input */}
//       <div className={styles.formGroup}>
//         <label htmlFor="regionJson" className={styles.formLabel}>
//           <span>Region JSON</span>
//         </label>
//         <textarea
//           id="regionJson"
//           name="regionJson"
//           className={styles.formInput}
//           placeholder='{"type": "Polygon", "coordinates": [...] }'
//           rows="5"
//           disabled={isLoading}
//         ></textarea>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className={styles.submitButton}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <div className={styles.loadingSpinner}></div>
//         ) : (
//           <>
//             <span>Add Manager</span>
//           </>
//         )}
//       </button>
//     </Form>
//   );
// };

// export default AddManager;
import { Form, useNavigation } from "react-router-dom";
import { MapContainer, TileLayer, Polygon, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import { useState } from "react";
import styles from "./AddManager.module.css";
import { useSelector } from "react-redux";

const mapStyles = [
  { name: "Light", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  {
    name: "Dark",
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  },
];

const AddManager = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user?.client?.id);
  const navigation = useNavigation();
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  const [regionMode, setRegionMode] = useState("all");
  const [polygons, setPolygons] = useState([]);
  const [themeIndex, setThemeIndex] = useState(0);

  // Theme switcher
  const handleChangeTheme = () => {
    setThemeIndex((prev) => (prev + 1) % mapStyles.length);
  };

  // When polygon/multipolygon is drawn
  const handleCreated = (e) => {
    const layer = e.layer;
    const latlngs = layer.getLatLngs()[0];

    const coordinates = latlngs.map((p) => [p.lng, p.lat]);
    coordinates.push([latlngs[0].lng, latlngs[0].lat]); // close polygon

    setPolygons((prev) => [
      ...prev,
      {
        id: Date.now(),
        coordinates,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      },
    ]);
  };

  const handleEdited = (e) => {
    const updates = [];
    e.layers.eachLayer((layer) => {
      const latlngs = layer.getLatLngs()[0];
      const coordinates = latlngs.map((p) => [p.lng, p.lat]);
      coordinates.push([latlngs[0].lng, latlngs[0].lat]);

      updates.push({
        id: layer._leaflet_id,
        coordinates,
      });
    });

    setPolygons((prev) =>
      prev.map((p) => {
        const updated = updates.find((u) => u.id === p.id);
        return updated ? { ...p, coordinates: updated.coordinates } : p;
      })
    );
  };

  const handleDeleted = (e) => {
    const deletedIds = [];
    e.layers.eachLayer((layer) => deletedIds.push(layer._leaflet_id));

    setPolygons((prev) => prev.filter((p) => !deletedIds.includes(p.id)));
  };

  return (
    <Form method="POST" className={styles.loginForm}>
      {/* Hidden Client ID (you can update value dynamically) */}
      <input type="hidden" name="clientId" value={user?.client?.id || ""} />

      {/* Name */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Name</label>
        <input
          type="text"
          name="name"
          className={styles.formInput}
          placeholder="Enter manager name"
          required
          disabled={isLoading}
        />
      </div>

      {/* Email */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Email</label>
        <input
          type="email"
          name="email"
          className={styles.formInput}
          placeholder="Enter email"
          required
          disabled={isLoading}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Password</label>
        <input
          type="password"
          name="password"
          className={styles.formInput}
          placeholder="Enter manager name"
          required
          disabled={isLoading}
        />
      </div>

      {/* Phone */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Phone</label>
        <input
          type="text"
          name="phone"
          className={styles.formInput}
          placeholder="Enter phone number"
          required
          disabled={isLoading}
        />
      </div>

      {/* REGION MODE DROPDOWN HERE */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Allowed Region</label>

        <select
          value={regionMode}
          name="allowedRegionType"
          onChange={(e) => {
            setRegionMode(e.target.value);
            setPolygons([]);
          }}
          className={styles.formInput}
        >
          <option value="all">All Regions</option>
          <option value="polygon">One Region</option>
          <option value="multiPolygon">Multiple Regions</option>
        </select>
      </div>

      {/* MAP APPEARS ONLY IF polygon OR multi */}
      {regionMode !== "all" && (
        <div style={{ marginTop: "15px", position: "relative" }}>
          <MapContainer
            center={[20.59, 78.96]}
            zoom={5}
            style={{ height: "450px", width: "100%" }}
          >
            <TileLayer url={mapStyles[themeIndex].url} />

            <FeatureGroup>
              <EditControl
                position="topright"
                draw={{
                  rectangle: false,
                  marker: false,
                  circle: false,
                  circlemarker: false,
                  polyline: false,
                  polygon:
                    regionMode === "polygon" ? polygons.length === 0 : true,
                }}
                onCreated={handleCreated}
                onEdited={handleEdited}
                onDeleted={handleDeleted}
              />

              {polygons.map((p) => (
                <Polygon
                  key={p.id}
                  positions={p.coordinates.map(([lng, lat]) => [lat, lng])}
                  pathOptions={{ color: p.color }}
                />
              ))}
            </FeatureGroup>
          </MapContainer>

          {/* THEME SWITCH */}
          <button
            type="button"
            onClick={handleChangeTheme}
            style={{
              position: "absolute",
              top: "80px",
              //   right: "10px",
              left: "10px",
              padding: "8px 14px",
              borderRadius: "4px",
              background: "#222",
              color: "#fff",
              border: "none",
              zIndex: 999,
            }}
          >
            Theme: {mapStyles[themeIndex].name}
          </button>
        </div>
      )}

      {/* JSON OUTPUT */}
      {regionMode !== "all" && (
        <textarea
          id="regionJson"
          name="regionJson"
          className={styles.formInput}
          style={{ marginTop: "15px" }}
          placeholder="Region GeoJSON will appear here automatically"
          readOnly
          value={
            regionMode === "all"
              ? ""
              : JSON.stringify(
                  regionMode === "polygon"
                    ? {
                        type: "Polygon",
                        coordinates:
                          polygons.map((p) => p.coordinates)[0] || [],
                      }
                    : {
                        type: "MultiPolygon",
                        coordinates: polygons.map((p) => [p.coordinates]) || [],
                      },
                  null,
                  2
                )
          }
        />
      )}

      {/* Submit */}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className={styles.loadingSpinner}></div>
        ) : (
          "Add Manager"
        )}
      </button>
    </Form>
  );
};
// const AddManager = () => {
//   const { user } = useSelector((state) => state.auth);
//   const navigation = useNavigation();

//   const isLoading =
//     navigation.state === "submitting" || navigation.state === "loading";

//   // Always start with a safe initial value
//   const [regionMode, setRegionMode] = useState("all");
//   const [polygons, setPolygons] = useState([]);
//   const [themeIndex, setThemeIndex] = useState(0);

//   const handleChangeTheme = () =>
//     setThemeIndex((prev) => (prev + 1) % mapStyles.length);

//   // DRAW HANDLERS -----------------------------------------------------------------

//   const handleCreated = (e) => {
//     const layer = e.layer;
//     const latlngs = layer.getLatLngs()[0];

//     const coordinates = latlngs.map((p) => [p.lng, p.lat]);
//     coordinates.push([latlngs[0].lng, latlngs[0].lat]);

//     setPolygons((prev) => [
//       ...prev,
//       {
//         id: layer._leaflet_id,
//         coordinates,
//         color: "#" + Math.floor(Math.random() * 16777215).toString(16),
//       },
//     ]);
//   };

//   const handleEdited = (e) => {
//     const updates = [];

//     e.layers.eachLayer((layer) => {
//       const latlngs = layer.getLatLngs()[0];
//       const coordinates = latlngs.map((p) => [p.lng, p.lat]);
//       coordinates.push([latlngs[0].lng, latlngs[0].lat]);

//       updates.push({ id: layer._leaflet_id, coordinates });
//     });

//     setPolygons((prev) =>
//       prev.map((p) => {
//         const updated = updates.find((u) => u.id === p.id);
//         return updated ? { ...p, coordinates: updated.coordinates } : p;
//       })
//     );
//   };

//   const handleDeleted = (e) => {
//     const deletedIds = [];
//     e.layers.eachLayer((layer) => deletedIds.push(layer._leaflet_id));

//     setPolygons((prev) => prev.filter((p) => !deletedIds.includes(p.id)));
//   };

//   // BUILD GEOJSON ---------------------------------------------------------

//   const geoJson =
//     regionMode === "all"
//       ? ""
//       : regionMode === "polygon"
//       ? JSON.stringify(
//           {
//             type: "Polygon",
//             coordinates: polygons[0]?.coordinates || [],
//           },
//           null,
//           2
//         )
//       : JSON.stringify(
//           {
//             type: "MultiPolygon",
//             coordinates: polygons.map((p) => [p.coordinates]),
//           },
//           null,
//           2
//         );

//   return (
//     <Form method="POST" className={styles.loginForm}>
//       <input type="hidden" name="clientId" value={user?.client?.id || ""} />

//       {/* Name */}
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Name</label>
//         <input
//           type="text"
//           name="name"
//           className={styles.formInput}
//           placeholder="Enter manager name"
//           required
//           disabled={isLoading}
//         />
//       </div>

//       {/* Email */}
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Email</label>
//         <input
//           type="email"
//           name="email"
//           className={styles.formInput}
//           placeholder="Enter email"
//           required
//           disabled={isLoading}
//         />
//       </div>

//       {/* Password */}
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Password</label>
//         <input
//           type="password"
//           name="password"
//           className={styles.formInput}
//           required
//           disabled={isLoading}
//         />
//       </div>

//       {/* Phone */}
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Phone</label>
//         <input
//           type="text"
//           name="phone"
//           className={styles.formInput}
//           required
//           disabled={isLoading}
//         />
//       </div>

//       {/* REGION MODE */}
//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Allowed Region</label>

//         <select
//           name="allowedRegionType"
//           className={styles.formInput}
//           value={regionMode || "all"} // SAFE FALLBACK
//           onChange={(e) => {
//             setRegionMode(e.target.value);
//             setPolygons([]);
//           }}
//         >
//           <option value="all">All Regions</option>
//           <option value="polygon">One Region</option>
//           <option value="multiPolygon">Multiple Regions</option>
//         </select>
//       </div>

//       {/* MAP */}
//       {regionMode !== "all" && (
//         <div style={{ marginTop: "15px", position: "relative" }}>
//           <MapContainer
//             center={[20.59, 78.96]}
//             zoom={5}
//             style={{ height: "450px", width: "100%" }}
//           >
//             <TileLayer url={mapStyles[themeIndex].url} />

//             <FeatureGroup>
//               <EditControl
//                 position="topright"
//                 draw={{
//                   rectangle: false,
//                   marker: false,
//                   circle: false,
//                   circlemarker: false,
//                   polyline: false,
//                   polygon:
//                     regionMode === "polygon" ? polygons.length === 0 : true,
//                 }}
//                 onCreated={handleCreated}
//                 onEdited={handleEdited}
//                 onDeleted={handleDeleted}
//               />

//               {polygons.map((p) => (
//                 <Polygon
//                   key={p.id}
//                   positions={p.coordinates.map(([lng, lat]) => [lat, lng])}
//                   pathOptions={{ color: p.color }}
//                 />
//               ))}
//             </FeatureGroup>
//           </MapContainer>

//           <button
//             type="button"
//             onClick={handleChangeTheme}
//             style={{
//               position: "absolute",
//               top: "80px",
//               left: "10px",
//               padding: "8px 14px",
//               borderRadius: "4px",
//               background: "#222",
//               color: "#fff",
//               border: "none",
//               zIndex: 999,
//             }}
//           >
//             Theme: {mapStyles[themeIndex].name}
//           </button>
//         </div>
//       )}

//       {/* JSON OUTPUT */}
//       {regionMode !== "all" && (
//         <textarea
//           name="regionJson"
//           className={styles.formInput}
//           readOnly
//           style={{ marginTop: "15px" }}
//           value={geoJson || ""} // SAFE FALLBACK → NEVER undefined
//         />
//       )}

//       {/* SUBMIT */}
//       <button
//         type="submit"
//         className={styles.submitButton}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <div className={styles.loadingSpinner}></div>
//         ) : (
//           "Add Manager"
//         )}
//       </button>
//     </Form>
//   );
// };

export default AddManager;
