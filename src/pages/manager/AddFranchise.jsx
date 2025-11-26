// const AddFranchise = () => {
//   return <div>AddFranchise</div>;
// };
// export default AddFranchise;
import { useNavigate, useParams } from "react-router-dom";
import { Form, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./AddFranchise.module.css";
import MapPicker from "../../components/MapPicker/MapPicker";

const AddFranchise = () => {
  const { FranchiseLeadId } = useParams();

  // console.log("Lead ID:", FranchiseLeadId);
  const navigation = useNavigation();

  // ⬇️ ONLY RUN WHEN PAGE IS REFRESHED
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const isRefresh =
  //     window.performance &&
  //     window.performance.navigation &&
  //     window.performance.navigation.type === 1;

  //   if (isRefresh) {
  //     navigate("/manager/enroll-lead/franchise", { replace: true });
  //   }
  // }, []);

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

  // Geo Location fields
  // const [lng, setLng] = useState("");
  // const [lat, setLat] = useState("");
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);

  // Payment fields
  const [franchiseFee, setFranchiseFee] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [extraCharges, setExtraCharges] = useState(0);
  const [yearlyRenewalFee, setYearlyRenewalFee] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");

  const [netTotal, setNetTotal] = useState(0);

  // Auto-calc net total
  useEffect(() => {
    const total =
      Number(franchiseFee) +
      Number(depositAmount) +
      Number(extraCharges) +
      Number(yearlyRenewalFee) -
      Number(discount) +
      Number(refundAmount);

    setNetTotal(total >= 0 ? total : 0);
  }, [
    franchiseFee,
    depositAmount,
    extraCharges,
    yearlyRenewalFee,
    discount,
    refundAmount,
  ]);
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
        <h3 className={styles.fullWidth}>Location</h3>

        <label>Address</label>
        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          name="address"
        />

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

        <label>Refund Amount</label>
        <input
          type="number"
          value={refundAmount}
          onChange={(e) => setRefundAmount(e.target.value)}
          name="refundAmount"
        />

        <label>Discount</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          name="discount"
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
