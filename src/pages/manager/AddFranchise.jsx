// AddFranchise.jsx
import { useNavigate, useParams } from "react-router-dom";
import { Form, useNavigation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./AddFranchise.module.css";
import MapPicker from "../../components/MapPicker/MapPicker";
import { MapPinCheck } from "lucide-react";
import api from "../../utils/axiosConfig";

const clampPercent = (v) => {
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(100, Math.round(v)));
};

const AddFranchise = () => {
  const { FranchiseLeadId } = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Redux sources
  const pinData = useSelector((state) => state.auth.user);
  const leads = useSelector((state) => state.franchiseLeads.leads || []);

  // local fallback for client finance (populated only if backend returned)
  const [localFranchiseFinance, setLocalFranchiseFinance] = useState([]);

  // form fields
  const [franchiseName, setFranchiseName] = useState("");
  const [franchiseEmail, setFranchiseEmail] = useState("");
  const [franchisePassword, setFranchisePassword] = useState("Franchise@123");
  const [address, setAddress] = useState("");

  // geo
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);

  // payment fields
  const [franchiseFee, setFranchiseFee] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [extraCharges, setExtraCharges] = useState(0);
  const [yearlyRenewalFee, setYearlyRenewalFee] = useState(0);

  const [nonRefundAmount, setNonRefundAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

  // owner / contact
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");

  // misc
  const [revenueSharePercent, setRevenueSharePercent] = useState("");
  const [nonRefundPercent, setNonRefundPercent] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [validUpTo, setValidUpTo] = useState("");
  const [cityTier, setCityTier] = useState("");

  const [netTotal, setNetTotal] = useState(0);

  // Compute source lead from Redux (if present)
  const selectedLead = useMemo(
    () => leads.find((l) => l._id === FranchiseLeadId),
    [leads, FranchiseLeadId]
  );

  // financeToUse: prefer local fetched finance, otherwise Redux pinData finance
  const financeToUse = useMemo(() => {
    if (localFranchiseFinance && localFranchiseFinance.length > 0)
      return localFranchiseFinance;
    return pinData?.client?.franchiseFinance || [];
  }, [localFranchiseFinance, pinData]);

  // baseTotal = sum of static fees (before discount / nonRefund)
  const baseTotal = useMemo(() => {
    return (
      Number(franchiseFee || 0) +
      Number(depositAmount || 0) +
      Number(extraCharges || 0) +
      Number(yearlyRenewalFee || 0)
    );
  }, [franchiseFee, depositAmount, extraCharges, yearlyRenewalFee]);

  // When user selects a cityTier from dropdown, fill fees from financeToUse
  useEffect(() => {
    if (!cityTier) return;
    const selected = financeToUse.find((f) => f.cityTier === cityTier);
    if (selected) {
      setFranchiseFee(selected.franchiseFee ?? 0);
      setDepositAmount(selected.depositAmount ?? 0);
      setExtraCharges(selected.extraCharges ?? 0);
      setYearlyRenewalFee(selected.yearlyRenewalFee ?? 0);
    }
  }, [cityTier, financeToUse]);

  // If Redux has selectedLead data, use it to prefill owner / email / address
  useEffect(() => {
    if (!selectedLead) return;

    if (selectedLead.ownerName) setOwnerName(selectedLead.ownerName);
    if (selectedLead.ownerPhone) setOwnerPhone(selectedLead.ownerPhone);
    if (selectedLead.ownerEmail) setFranchiseEmail(selectedLead.ownerEmail);
    if (selectedLead.fullAddress) setAddress(selectedLead.fullAddress);
    // we do NOT fetch client finance here if Redux already has it — financeToUse will handle that
  }, [selectedLead]);

  // Fetch backend only if those fields are still empty (Option A)
  useEffect(() => {
    const shouldUseRedux =
      ownerName || ownerPhone || franchiseEmail || address || selectedLead;

    if (shouldUseRedux) {
      // We already have something (either state filled or selectedLead present) — do not fetch
      return;
    }

    // Only fetch when FranchiseLeadId exists
    if (!FranchiseLeadId) return;

    let cancelled = false;
    const fetchData = async () => {
      try {
        const res = await api.get(
          `/getLeadFranchiseData/manager/franchise-lead/${FranchiseLeadId}`
        );

        if (cancelled) return;

        const { lead, clientFinance } = res.data || {};

        if (lead) {
          if (!ownerName && lead.ownerName) setOwnerName(lead.ownerName);
          if (!ownerPhone && lead.ownerPhone) setOwnerPhone(lead.ownerPhone);
          if (!franchiseEmail && lead.ownerEmail)
            setFranchiseEmail(lead.ownerEmail);
          if (!address && lead.fullAddress) setAddress(lead.fullAddress);
        }

        if (clientFinance && clientFinance.length) {
          setLocalFranchiseFinance(clientFinance);
        }
      } catch (err) {
        console.error("Error fetching lead/client data:", err);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
    // We intentionally do not include ownerName/ownerPhone/franchiseEmail/address in deps,
    // because we only want the "initial emptiness" check to decide whether to fetch.
    // Note: selectedLead is included above in the early exit condition so fetch won't run if selectedLead exists.
    // FranchiseLeadId and selectedLead control the effect re-evaluation.
  }, [FranchiseLeadId, selectedLead]);

  useEffect(() => {
    if (!cityTier) return;
    console.log("🔥 Effect triggered", {
      baseTotal,
      discountPercent,
      nonRefundPercent,
    });

    const dP = Number(discountPercent);
    const nRP = Number(nonRefundPercent);

    if (baseTotal <= 0 || isNaN(dP) || isNaN(nRP)) {
      return;
    }

    const calculateAmounts = async () => {
      try {
        const res = await api.post(
          "/getLeadFranchiseData/manager/calculateFranchiseAmounts",
          {
            baseTotal,
            discountPercent: dP,
            nonRefundPercent: nRP,
          }
        );

        const { discount, netTotal, nonRefundAmount } = res.data.data;

        setDiscount(discount);
        setNetTotal(netTotal);
        setNonRefundAmount(nonRefundAmount);
      } catch (error) {
        console.error("Error calculating franchise amounts:", error);
      }
    };

    const timer = setTimeout(calculateAmounts, 300);
    return () => clearTimeout(timer);
  }, [baseTotal, discountPercent, nonRefundPercent]);

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

        <label>Revenue Share Percent</label>
        <input
          type="number"
          required
          value={revenueSharePercent}
          onChange={(e) => setRevenueSharePercent(e.target.value)}
          name="revenueSharePercent"
          onWheel={(e) => {
            e.target.blur();
            e.preventDefault();
          }}
        />

        {/* --- Valid Up To Date Field --- */}
        <label>Valid Up To</label>
        <input
          type="date"
          required
          value={validUpTo}
          onChange={(e) => setValidUpTo(e.target.value)}
          name="validUpTo"
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

        <label>To Get Coordinates</label>
        <div>
          <a
            href="https://www.gps-coordinates.net/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.coordLink}
          >
            <MapPinCheck /> Click to get coordinates
          </a>
        </div>

        <label>Longitude (lng)</label>
        <input
          type="number"
          step="any"
          value={lng ?? ""}
          onChange={(e) =>
            setLng(e.target.value === "" ? "" : Number(e.target.value))
          }
          name="lng"
          onWheel={(e) => {
            e.target.blur();
            e.preventDefault();
          }}
        />

        <label>Latitude (lat)</label>
        <input
          type="number"
          step="any"
          value={lat ?? ""}
          onChange={(e) =>
            setLat(e.target.value === "" ? "" : Number(e.target.value))
          }
          name="lat"
          onWheel={(e) => {
            e.target.blur();
            e.preventDefault();
          }}
        />

        <div className={styles.mapContainer}>
          <MapPicker lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
        </div>

        {/* ------------------ Payment Details ------------------ */}
        <h3 className={styles.fullWidth}>Payment Details</h3>

        <div>
          <label>City Tier</label>
          <select
            name="cityTier"
            value={cityTier}
            onChange={(e) => setCityTier(e.target.value)}
            required
          >
            <option value="">-- Select City Tier --</option>
            {financeToUse.map((item, idx) => (
              <option key={idx} value={item.cityTier}>
                {item.cityTier}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Franchise Fee</label>
          <input
            type="number"
            value={franchiseFee}
            readOnly
            className={`${styles.readOnly}`}
            name="franchiseFee"
          />
        </div>
        <div>
          <label>Deposit Amount</label>
          <input
            type="number"
            value={depositAmount}
            readOnly
            className={`${styles.readOnly}`}
            name="depositAmount"
          />
        </div>
        <div>
          <label>Extra Charges</label>
          <input
            type="number"
            value={extraCharges}
            readOnly
            className={`${styles.readOnly}`}
            name="extraCharges"
          />
        </div>
        <div>
          <label>Yearly Renewal Fee</label>
          <input
            type="number"
            value={yearlyRenewalFee}
            readOnly
            className={`${styles.readOnly}`}
            name="yearlyRenewalFee"
          />
        </div>

        <div>
          <label>Base total</label>
          <input
            type="number"
            value={baseTotal}
            readOnly
            className={`${styles.readOnly}`}
          />
        </div>

        <div>
          <label>Non-Refundable Amount</label>
          <input
            type="number"
            value={nonRefundAmount}
            name="nonRefundAmount"
            readOnly
            className={styles.readOnly}
          />
        </div>
        <div>
          <label>Non-Refundable (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={nonRefundPercent}
            onWheel={(e) => e.target.blur()} // <=== FIX
            onChange={(e) => {
              const p = clampPercent(Number(e.target.value));
              setNonRefundPercent(p);
            }}
          />
        </div>
        <div>
          <label>Discount</label>
          <input
            type="number"
            value={discount}
            name="discount"
            readOnly
            className={styles.readOnly}
          />
        </div>
        <div>
          <label>Discount (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={discountPercent}
            onWheel={(e) => e.target.blur()} // <=== FIX
            onChange={(e) => {
              const p = clampPercent(Number(e.target.value));
              setDiscountPercent(p);
            }}
          />
        </div>

        {/* <label>Net Total</label> */}

        {/* <label className={styles.netTotalLabel}>Net Total</label>

        <input
          type="number"
          readOnly
          value={netTotal}
          name="netTotal"
          className={`${styles.readOnly}`}
        /> */}

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

        <h3 className={styles.fullWidth}>Net Total is {netTotal}</h3>

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
