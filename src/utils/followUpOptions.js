/**
 * Standardized list of follow-up options for Franchise Leads, covering various
 * stages from initial contact, qualification, negotiation, to closure/loss.
 */
// const followUpOptions = [
//   // --- Initial Contact & Scheduling (Stage 1) ---
//   "Attempted call, no answer, left detailed voicemail",
//   "Attempted call, line busy/not answered (Scheduled retry)",
//   "Called owner, busy, will call back later",
//   "Spoke to assistant/gatekeeper (Needs follow-up with decision-maker)",
//   "Owner requested contact tomorrow (Scheduled)",
//   "Owner requested contact next week (Scheduled)",
//   "Email/WhatsApp sent (Awaiting response)",
//   "Initial contact: Lead expressed high interest",
//   "Initial contact: Lead expressed low interest/is just browsing",
//   "Contact information validated (Phone/Email confirmed)",
//   "Contact information error (Wrong number/email - needs correction)",
//   "Scheduled 1st Discovery Call (Date/Time Confirmed)",
//   "Rescheduled Discovery Call",

//   // --- Qualification & Information Exchange (Stage 2) ---
//   "1st Discovery Call completed (Successful, Qualified)",
//   "1st Discovery Call completed (Not Qualified - Low Capital)",
//   "Sent detailed franchise brochure/pitch deck",
//   "Sent Fee Structure and Financial Projections",
//   "Received basic Lead Qualification Form (Reviewing)",
//   "Requested bank statements/proof of funds",

//   // --- Due Diligence & Validation (Stage 3) ---
//   "Scheduled site visit/office meeting (Date/Time Confirmed)",
//   "Site visit completed, location approved",
//   "Site visit completed, location rejected (Needs new proposal)",
//   "Financial documents received and validated",
//   "Background check initiated on applicant",
//   "Sent draft Letter of Intent (LOI)",

//   // --- Legal & Negotiation (Stage 4) ---
//   "LOI signed by applicant",
//   "Legal Documentation (FDD/Agreement) sent for review",
//   "Legal Team follow-up on agreement changes/queries",
//   "Negotiation phase started (Terms/Fee discussed)",
//   "Final Agreement sent for signing",

//   // --- Closure / Final Status (Stage 5) ---
//   "Deposit Payment received (Agreement locked)",
//   "Full Franchise Fee received (Agreement completed)",
//   "Lead converted to 'Active Franchisee'",
//   "Lead converted to 'Pending Agreement'",

//   // --- Loss Tracking (Important for Analysis) ---
//   "Lead marked as 'Not Interested' (Reason: Too costly/High Fee)",
//   "Lead marked as 'Lost' (Reason: Went with competitor: [Specify Name])",
//   "Lead marked as 'Lost' (Reason: Failed background/financial check)",
//   "Lead marked as 'Lost' (Reason: Region/Area conflict)",
//   "Lead marked as 'Dormant' (No communication in 30+ days)",
// ];

// export default followUpOptions;

const followUpOptions = [
  // =========================================================
  // --- Stage 1: Initial Contact & Scheduling ---
  // =========================================================
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

  // --- NEW ADDITIONS ---
  "Intro message sent via WhatsApp (Awaiting reply)",
  "Follow-up WhatsApp sent (No reply to first message)",
  "Lead requested franchise details via chat",
  "Lead viewed brochure but hasn’t responded",
  "First follow-up attempt after brochure sent",
  "Cold call follow-up scheduled",
  "Lead said will call back (Pending)",
  "Lead requested call after office hours",
  "Lead requested more clarity on investment amount",
  "Lead asked for success stories/testimonials",

  // =========================================================
  // --- Stage 2: Qualification & Information Exchange ---
  // =========================================================
  "1st Discovery Call completed (Successful, Qualified)",
  "1st Discovery Call completed (Not Qualified - Low Capital)",
  "Sent detailed franchise brochure/pitch deck",
  "Sent Fee Structure and Financial Projections",
  "Received basic Lead Qualification Form (Reviewing)",
  "Requested bank statements/proof of funds",

  // --- NEW ADDITIONS ---
  "Discovery call scheduled via calendar invite",
  "Discovery call completed — Needs to discuss with family",
  "Discovery call completed — Needs partner approval",
  "Lead asked for ROI proof/case studies",
  "Lead requested franchise training details",
  "Lead requested center setup requirements",
  "Lead wants to compare multiple franchise models",
  "Lead asked for franchise margin clarification",
  "Lead asked for average student intake per month",
  "Lead requested staff hiring & onboarding details",

  // =========================================================
  // --- Stage 3: Due Diligence & Validation ---
  // =========================================================
  "Scheduled site visit/office meeting (Date/Time Confirmed)",
  "Site visit completed, location approved",
  "Site visit completed, location rejected (Needs new proposal)",
  "Financial documents received and validated",
  "Background check initiated on applicant",
  "Sent draft Letter of Intent (LOI)",

  // --- NEW ADDITIONS ---
  "Requested franchise application form",
  "Application form submitted — Under review",
  "Lead requested EMI/Installment options for franchise fee",
  "Financial discussion completed — Awaiting decision",
  "Lead asked for expected break-even timeline",
  "Lead exploring bank loan/financing options",
  "Requested GST documents for agreement",
  "Lead requested sample agreement for review",
  "Lead asked for invoice for token advance",

  // =========================================================
  // --- Stage 4: Legal & Negotiation ---
  // =========================================================
  "LOI signed by applicant",
  "Legal Documentation (FDD/Agreement) sent for review",
  "Legal Team follow-up on agreement changes/queries",
  "Negotiation phase started (Terms/Fee discussed)",
  "Final Agreement sent for signing",

  // --- NEW ADDITIONS ---
  "Agreement discussion call completed",
  "Lead asked for clarity on royalty/payment cycle",
  "Lead reviewing agreement with legal advisor",
  "Lead requested revision in agreement terms",
  "Final agreement ready — Awaiting lead sign-off",
  "Token/advance initiated — Awaiting payment confirmation",
  "Lead confirmed joining date for franchise training",

  // =========================================================
  // --- Stage 5: Closure & Conversion ---
  // =========================================================
  "Deposit Payment received (Agreement locked)",
  "Full Franchise Fee received (Agreement completed)",
  "Lead converted to 'Active Franchisee'",
  "Lead converted to 'Pending Agreement'",

  // --- NEW ADDITIONS ---
  "Onboarding form sent",
  "Onboarding form completed",
  "Center setup checklist shared",
  "Training date scheduled",
  "Marketing kit sent",

  // =========================================================
  // --- Loss / Drop-Off Tracking ---
  // =========================================================
  "Lead marked as 'Not Interested' (Reason: Too costly/High Fee)",
  "Lead marked as 'Lost' (Reason: Went with competitor: [Specify Name])",
  "Lead marked as 'Lost' (Reason: Failed background/financial check)",
  "Lead marked as 'Lost' (Reason: Region/Area conflict)",
  "Lead marked as 'Dormant' (No communication in 30+ days)",

  // --- NEW ADDITIONS ---
  "Lead unresponsive after multiple attempts (5+ follow-ups)",
  "Lead postponed plan for next 3–6 months",
  "Lead said investment is too high — Requested alternative franchise",
  "Lead dropped due to personal reasons",
  "Lead not reachable — Number switched off",
  "Lead marked low priority (Budget mismatch)",
  "Lead discontinued — Opened with competitor",
];

export default followUpOptions;
