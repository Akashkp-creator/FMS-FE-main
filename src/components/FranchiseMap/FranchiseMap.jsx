import React, { useEffect, useState, useMemo } from "react";
import styles from "./FranchiseMap.module.css";
import api from "../../utils/axiosConfig";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/**
 * FranchiseMap with Institution filter dropdown
 *
 * - Fetches /franchises/locations
 * - Builds unique institution list from result
 * - Allows selection of an institution to filter markers
 * - If backend supports query param `company`, it will re-fetch with that param
 */

export default function FranchiseMap() {
  const [locations, setLocations] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedInstitution, setSelectedInstitution] = useState("all");

  // raw fetch from backend (accepts optional company param)
  const fetchLocations = async (company = null) => {
    setLoading(true);
    setError(null);
    try {
      const params = company && company !== "all" ? { company } : {};
      const res = await api.get("/franchises/locations", { params });
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setLocations(res.data.data);
      } else {
        setLocations([]);
      }
    } catch (err) {
      console.error("Franchise fetch failed:", err);
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Unable to load franchise locations";
      setError(msg);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  // initial load (no company filter)
  useEffect(() => {
    fetchLocations();
  }, []);

  // Derived list of unique institutions from locations
  const institutions = useMemo(() => {
    if (!locations || !Array.isArray(locations)) return [];
    const set = new Set();
    locations.forEach((f) => {
      if (f.institutionName) set.add(f.institutionName);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [locations]);

  // filtered data shown on map
  const filteredData = useMemo(() => {
    if (!locations) return [];
    if (!selectedInstitution || selectedInstitution === "all") return locations;
    return locations.filter((f) => f.institutionName === selectedInstitution);
  }, [locations, selectedInstitution]);

  // compute map center using filteredData (fallback to full locations or constants)
  const computeCenter = (data) => {
    const items =
      data && data.length
        ? data
        : locations && locations.length
        ? locations
        : [];
    const latitudes = items.map((d) => Number(d.lat)).filter(Boolean);
    const longitudes = items.map((d) => Number(d.lng)).filter(Boolean);
    const centerLat = latitudes.length
      ? latitudes.reduce((s, v) => s + v, 0) / latitudes.length
      : 19.076;
    const centerLng = longitudes.length
      ? longitudes.reduce((s, v) => s + v, 0) / longitudes.length
      : 72.8777;
    return [centerLat, centerLng];
  };

  const [centerLat, centerLng] = computeCenter(filteredData);

  // handler when user selects an institution
  const handleInstitutionChange = async (e) => {
    const value = e.target.value;
    setSelectedInstitution(value);

    // try server-side fetch if you want the backend to filter (keeps UI snappy for large sets)
    // if backend doesn't support it the local filter above still works.
    if (value === "all") {
      // fetch without company filter to get full dataset
      fetchLocations();
    } else {
      // attempt to ask backend for filtered data by company name (if API supports it)
      // fallback: we still keep current locations and let the local filter work.
      fetchLocations(value).catch(() => {
        /* ignore - local filter will remain available */
      });
    }
  };

  // fallback small sample if nothing returned and not loading
  const fallback = [
    {
      id: "s1",
      franchiseName: "Sample Franchise 1",
      institutionName: "Snipe Partner",
      lat: 19.076,
      lng: 72.8777,
      address: "Mumbai",
    },
    {
      id: "s2",
      franchiseName: "Sample Franchise 2",
      institutionName: "Snipe Partner",
      lat: 19.119,
      lng: 72.8356,
      address: "Andheri",
    },
  ];

  const dataToShow =
    filteredData && filteredData.length
      ? filteredData
      : locations && locations.length
      ? filteredData
      : fallback;

  return (
    <div className={styles.outer}>
      <div className={styles.headingRow}>
        <h1 className={styles.heading}>Franchises Near You</h1>
        <div className={styles.filterWrap}>
          <label htmlFor="institutionSelect" className={styles.filterLabel}>
            <h3>Institutions: </h3>
          </label>
          <select
            id="institutionSelect"
            className={styles.filterSelect}
            value={selectedInstitution}
            onChange={handleInstitutionChange}
            disabled={loading || institutions.length === 0}
          >
            <option value="all">All Institutions</option>
            {institutions.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.container}>
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={11}
          className={styles.map}
          scrollWheelZoom
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {dataToShow.map((f) => {
            const lat = Number(f.lat);
            const lng = Number(f.lng);
            if (!isFinite(lat) || !isFinite(lng)) return null;
            const title = f.franchiseName || f.name || "Franchise";
            return (
              <Marker key={f.id || `${lat}-${lng}`} position={[lat, lng]}>
                <Tooltip direction="top" sticky>
                  {title}
                </Tooltip>
                <Popup>
                  <div style={{ textAlign: "left", color: "black" }}>
                    <strong>{title}</strong>
                    {f.institutionName && (
                      <div style={{ marginTop: 4 }}>{f.institutionName}</div>
                    )}
                    {f.address && (
                      <div style={{ marginTop: 6, opacity: 0.95 }}>
                        {f.address}
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
