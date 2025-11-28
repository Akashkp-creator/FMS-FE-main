// const AddFranchise = () => {
//   return <div>AddFranchise</div>;
// };
// export default AddFranchise;
import { useNavigate, useParams } from "react-router-dom";
import { Form, useNavigation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./AddFranchise.module.css";
import MapPicker from "../../components/MapPicker/MapPicker";
import { MapPinCheck } from "lucide-react";

const AddFranchise = () => {
  const { FranchiseLeadId } = useParams();

  // console.log("Lead ID:", FranchiseLeadId);
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  // ✔ Get all PIN data from Redux
  const pinData = useSelector((state) => state.auth.user);
  // Get leads from Redux
  const leads = useSelector((state) => state.franchiseLeads.leads);
  //   console.log(leads);

  // Find the selected lead
  const selectedLead = leads.find((lead) => lead._id === FranchiseLeadId);
  // console.log("Selected lead:", selectedLead);
  //   const leadData = useSelector((state) => state.franchiseLeads.leads);
  //   console.log("to find lead data" + leadData);

  // console.log("PIN DATA:", pinData); // verify

  // Franchise fields
  const [franchiseName, setFranchiseName] = useState("");
  const [franchiseEmail, setFranchiseEmail] = useState("");
  const [franchisePassword, setFranchisePassword] = useState("Franchise@123");
  const [address, setAddress] = useState("");

  // Geo Location field
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);

  // Payment fields
  const [franchiseFee, setFranchiseFee] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [extraCharges, setExtraCharges] = useState(0);
  const [yearlyRenewalFee, setYearlyRenewalFee] = useState(0);
  const [nonRefundAmount, setNonRefundAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [nonRefundPercent, setNonRefundPercent] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");

  const [netTotal, setNetTotal] = useState(0);
  // const baseTotal =
  //   Number(franchiseFee) +
  //   Number(depositAmount) +
  //   Number(extraCharges) +
  //   Number(yearlyRenewalFee);
  const baseTotal = useMemo(() => {
    return (
      Number(franchiseFee) +
      Number(depositAmount) +
      Number(extraCharges) +
      Number(yearlyRenewalFee)
    );
  }, [franchiseFee, depositAmount, extraCharges, yearlyRenewalFee]);

  // Auto-calc net total

  useEffect(() => {
    const total = baseTotal - Number(discount);
    setNetTotal(total >= 0 ? total : 0);
  }, [baseTotal, discount]);

  const [cityTier, setCityTier] = useState("");

  useEffect(() => {
    if (!cityTier) return;

    const selected = pinData?.client?.franchiseFinance?.find(
      (item) => item.cityTier === cityTier
    );

    if (selected) {
      setFranchiseFee(selected.franchiseFee || 0);
      setDepositAmount(selected.depositAmount || 0);
      setExtraCharges(selected.extraCharges || 0);
      setYearlyRenewalFee(selected.yearlyRenewalFee || 0);
    }
  }, [cityTier, pinData]);
  // Autofill from selected lead
  useEffect(() => {
    if (selectedLead) {
      setFranchiseEmail(selectedLead.ownerEmail || "");
      setAddress(selectedLead.fullAddress || "");
      //   setFranchiseName(selectedLead.name || "");

      // NEW FIELDS
      setOwnerName(selectedLead.ownerName || "");
      setOwnerPhone(selectedLead.ownerPhone || selectedLead.mobile || "");
    }
  }, [selectedLead]);
  useEffect(() => {
    console.log("LAT TYPE:", typeof lat, lat);
    console.log("LNG TYPE:", typeof lng, lng);
  }, [lat, lng]);

  return (
    <div className={styles.container}>
      <h2>Create Franchise</h2>

      <Form method="POST" className={styles.form}>
        {/* ------------------ Franchise Info ------------------ */}
        <label>Franchise Name</label>
        <input
          type="text"
          required
          value={franchiseName}
          onChange={(e) => setFranchiseName(e.target.value)}
          name="franchiseName"
        />

        {/* ------------------ Franchise User Credentials ------------------ */}
        <h3 className={styles.fullWidth}>Franchise User Credentials</h3>

        <label>Franchise Email</label>
        <input
          type="email"
          required
          value={franchiseEmail}
          onChange={(e) => setFranchiseEmail(e.target.value)}
          name="franchiseEmail"
        />

        <label>Franchise Password</label>
        <input
          type="text"
          required
          value={franchisePassword}
          onChange={(e) => setFranchisePassword(e.target.value)}
          name="franchisePassword"
        />
        <h3 className={styles.fullWidth}>Owner Details</h3>

        <label>Owner Name</label>
        <input
          type="text"
          required
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          name="ownerName"
        />

        <label>Owner Phone Number</label>
        <input
          type="text"
          required
          value={ownerPhone}
          onChange={(e) => setOwnerPhone(e.target.value)}
          name="ownerPhone"
        />

        {/* ------------------ Location Section ------------------ */}
        <h3 className={styles.fullWidth}>Location </h3>

        <label>Address</label>
        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          name="address"
        />
        <label>To Get Coordinates</label>
        <div>
          <a
            href="https://www.gps-coordinates.net/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.coordLink}
          >
            {/* <span className={styles.mapIcon}>📍</span> */}
            <MapPinCheck /> Click to get coordinates
          </a>
        </div>
        <label>Longitude (lng)</label>
        <input
          type="number"
          required
          step="any"
          value={lng ?? ""}
          // onChange={(e) => setLng(e.target.value)}
          onChange={(e) => setLng(Number(e.target.value))}
          name="lng"
        />

        <label>Latitude (lat)</label>
        <input
          type="number"
          required
          step="any"
          value={lat ?? ""}
          // onChange={(e) => setLat(e.target.value)}
          onChange={(e) => setLat(Number(e.target.value))}
          name="lat"
        />
        {/* ⭐ Add Leaflet Map Here */}
        {/* <MapPicker lat={lat} lng={lng} setLat={setLat} setLng={setLng} /> */}
        {/* ⭐ Add Leaflet Map Here */}
        <div className={styles.mapContainer}>
          <MapPicker lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
        </div>

        {/* ------------------ Payment Details ------------------ */}
        <h3 className={styles.fullWidth}>Payment Details</h3>

        <label>City Tier</label>
        <select
          name="cityTier"
          value={cityTier}
          onChange={(e) => setCityTier(e.target.value)}
          required
        >
          <option value="">-- Select City Tier --</option>
          {pinData?.client?.franchiseFinance?.map((item, index) => (
            <option key={index} value={item.cityTier}>
              {item.cityTier}
            </option>
          ))}
        </select>

        <label>Franchise Fee</label>
        <input
          type="number"
          value={franchiseFee}
          onChange={(e) => setFranchiseFee(e.target.value)}
          name="franchiseFee"
          readOnly
          className={`${styles.readOnly}`}
          required
        />

        <label>Deposit Amount</label>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          name="depositAmount"
          readOnly
          className={`${styles.readOnly}`}
          required
        />

        <label>Extra Charges</label>
        <input
          type="number"
          value={extraCharges}
          onChange={(e) => setExtraCharges(e.target.value)}
          name="extraCharges"
          readOnly
          className={`${styles.readOnly}`}
        />

        <label>Yearly Renewal Fee</label>
        <input
          type="number"
          value={yearlyRenewalFee}
          onChange={(e) => setYearlyRenewalFee(e.target.value)}
          name="yearlyRenewalFee"
          readOnly
          className={`${styles.readOnly}`}
          required
        />

        {/* <label>Non-Refundable Amount</label>
        <input
          type="number"
          value={nonRefundAmount}
          onChange={(e) => setNonRefundAmount(e.target.value)}
          name="nonRefundAmount"
        />

        <label>Discount</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          name="discount"
        /> */}
        <label>Non-Refundable Amount</label>
        <input
          type="number"
          value={nonRefundAmount}
          name="nonRefundAmount"
          readOnly
          className={styles.readOnly}
        />

        <label>Discount</label>
        <input
          type="number"
          value={discount}
          name="discount"
          readOnly
          className={styles.readOnly}
        />
        {/* -------- New Percentage Inputs -------- */}

        <label>Discount (%)</label>
        <input
          type="text"
          min="0"
          max="100"
          value={discountPercent}
          onChange={(e) => {
            const p = Number(e.target.value);
            setDiscountPercent(p);
            // setDiscount(Math.round((p / 100) * netTotal)); // discount affects net total
            setDiscount(Math.round((p / 100) * baseTotal));
          }}
        />

        {/* <label>Non-Refundable (%)</label> */}
        <label>Non-Refundable (%)</label>
        <input
          type="text"
          min="0"
          max="100"
          value={nonRefundPercent}
          onChange={(e) => {
            const p = Number(e.target.value);
            setNonRefundPercent(p);
            setNonRefundAmount(Math.round((p / 100) * netTotal)); // does NOT affect netTotal
          }}
        />

        {/* ------------------ Net Total ------------------ */}
        <label>Net Total</label>
        <input
          type="number"
          readOnly
          value={netTotal}
          name="netTotal"
          className={`${styles.readOnly}`}
        />

        {/* Hidden GeoJSON Fields */}
        <input type="hidden" name="location[type]" value="Point" />
        <input
          type="hidden"
          name="location[coordinates][0]"
          value={lng ?? ""}
        />
        <input
          type="hidden"
          name="location[coordinates][1]"
          value={lat ?? ""}
        />

        <h3 className={styles.fullWidth}>Submit</h3>

        <button
          disabled={isSubmitting}
          className={`${styles.submitBtn} ${styles.fullWidth}`}
        >
          {isSubmitting ? "Creating Franchise..." : "Create Franchise"}
        </button>
      </Form>
    </div>
  );
};

export default AddFranchise;
