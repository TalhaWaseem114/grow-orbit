/**
 * Calculates lead score dynamically based on rules:
 * - Meeting booked (meetingBooked: true): +40
 * - Phone provided (whatsapp is not N/A/empty): +10
 * - Business revenue provided (monthlyRevenue is not N/A/empty): +25
 * - Amazon store URL/ASIN provided (asinOrUrl is not N/A/empty): +15
 * - Requested specific service (not "Not specified"): +10
 * - Detailed message (notes length > 100 chars): +10
 * Total Max Score: 110 (Threshold 61+ guarantees HOT status)
 */
export const calculateLeadScore = (lead) => {
  if (!lead) return 0;
  let score = 0;
  if (lead.meetingBooked) score += 40;
  
  const hasPhone = lead.whatsapp && lead.whatsapp.trim() !== "" && lead.whatsapp.trim() !== "N/A";
  if (hasPhone) score += 10;
  
  const hasRevenue = lead.monthlyRevenue && lead.monthlyRevenue.trim() !== "" && lead.monthlyRevenue.trim() !== "N/A";
  if (hasRevenue) score += 25;
  
  const hasAsin = lead.asinOrUrl && lead.asinOrUrl.trim() !== "" && lead.asinOrUrl.trim() !== "N/A";
  if (hasAsin) score += 15;
  
  const hasService = lead.requestedService && lead.requestedService.trim() !== "" && lead.requestedService !== "Not specified" && lead.requestedService !== "General enquiry";
  if (hasService) score += 10;
  
  const hasDetailedNotes = lead.notes && lead.notes.trim().length > 100;
  if (hasDetailedNotes) score += 10;
  
  return score;
};

/**
 * Calculates lead priority dynamically based on rules:
 * - High: meetingBooked === true OR requestedService includes "Full Account Management" / "PPC Management"
 * - Otherwise: low/medium (or stored value)
 */
export const calculateLeadPriority = (lead) => {
  if (!lead) return "low";
  if (lead.meetingBooked) return "high";
  
  const service = (lead.requestedService || "").toLowerCase();
  if (
    service.includes("full account management") || 
    service.includes("ppc management") || 
    service.includes("full/amazon-management") ||
    service.includes("ppc-efficiency")
  ) {
    return "high";
  }
  
  return lead.priority || "low";
};

/**
 * Returns color category configs for score ranges
 * - Cold: 0 - 30
 * - Warm: 31 - 60
 * - Hot: 61 - 100
 */
export const getScoreCategory = (score) => {
  if (score <= 30) {
    return { label: "Cold", color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)" };
  } else if (score <= 60) {
    return { label: "Warm", color: "#f97316", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.25)" };
  } else {
    return { label: "Hot", color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.25)" };
  }
};
