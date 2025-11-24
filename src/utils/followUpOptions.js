/**
 * Standardized list of follow-up options for Franchise Leads, covering various
 * stages from initial contact, qualification, negotiation, to closure/loss.
 */
const followUpOptions = [
  // --- Initial Contact & Scheduling (Stage 1) ---
  "Attempted call, no answer, left detailed voicemail",
  "Attempted call, line busy/not answered (Scheduled retry)",
  "Called owner, busy, will call back later",
  "Spoke to assistant/gatekeeper (Needs follow-up with decision-maker)",
  "Owner requested contact tomorrow (Scheduled)",
  "Owner requested contact next week (Scheduled)",
  "Email/WhatsApp sent (Awaiting response)",
  "Initial contact: Lead expressed high interest",
  "Initial contact: Lead expressed low interest/is just browsing",
  "Contact information validated (Phone/Email confirmed)",
  "Contact information error (Wrong number/email - needs correction)",
  "Scheduled 1st Discovery Call (Date/Time Confirmed)",
  "Rescheduled Discovery Call",

  // --- Qualification & Information Exchange (Stage 2) ---
  "1st Discovery Call completed (Successful, Qualified)",
  "1st Discovery Call completed (Not Qualified - Low Capital)",
  "Sent detailed franchise brochure/pitch deck",
  "Sent Fee Structure and Financial Projections",
  "Received basic Lead Qualification Form (Reviewing)",
  "Requested bank statements/proof of funds",

  // --- Due Diligence & Validation (Stage 3) ---
  "Scheduled site visit/office meeting (Date/Time Confirmed)",
  "Site visit completed, location approved",
  "Site visit completed, location rejected (Needs new proposal)",
  "Financial documents received and validated",
  "Background check initiated on applicant",
  "Sent draft Letter of Intent (LOI)",

  // --- Legal & Negotiation (Stage 4) ---
  "LOI signed by applicant",
  "Legal Documentation (FDD/Agreement) sent for review",
  "Legal Team follow-up on agreement changes/queries",
  "Negotiation phase started (Terms/Fee discussed)",
  "Final Agreement sent for signing",

  // --- Closure / Final Status (Stage 5) ---
  "Deposit Payment received (Agreement locked)",
  "Full Franchise Fee received (Agreement completed)",
  "Lead converted to 'Active Franchisee'",
  "Lead converted to 'Pending Agreement'",

  // --- Loss Tracking (Important for Analysis) ---
  "Lead marked as 'Not Interested' (Reason: Too costly/High Fee)",
  "Lead marked as 'Lost' (Reason: Went with competitor: [Specify Name])",
  "Lead marked as 'Lost' (Reason: Failed background/financial check)",
  "Lead marked as 'Lost' (Reason: Region/Area conflict)",
  "Lead marked as 'Dormant' (No communication in 30+ days)",
];

export default followUpOptions;
