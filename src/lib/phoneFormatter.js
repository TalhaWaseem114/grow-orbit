/**
 * Normalizes phone numbers strictly to E.164 format (+1XXXXXXXXXX)
 * for United States & Canada ad campaigns.
 * 
 * Rules (North American Numbering Plan):
 * 1. 10 digits (e.g. 213-373-4253, (416) 555-0192) -> '+1' + 10 digits
 * 2. 11 digits starting with 1 (e.g. 1-213-373-4253) -> '+' + 11 digits
 * 3. Area code (first digit of 10-digit number) must be between 2 and 9.
 * 4. Rejects dummy / test numbers (000-000-0000, 123-456-7890, repeated digits, etc.).
 * 5. Returns null for anything invalid, empty, or placeholder so the parameter is
 *    safely omitted from TikTok payloads, eliminating any chance of format errors.
 */
export function normalizeE164Phone(rawPhone) {
  if (!rawPhone || typeof rawPhone !== "string") return null;

  const trimmed = rawPhone.trim();
  if (!trimmed) return null;

  const lower = trimmed.toLowerCase();
  const placeholders = [
    "n/a",
    "na",
    "null",
    "undefined",
    "none",
    "nil",
    "no",
    "test",
    "fake",
  ];
  if (placeholders.includes(lower)) return null;

  // Extract digits only
  const digits = trimmed.replace(/\D/g, "");

  // Must be either 10 digits (without country code) or 11 digits (with country code '1')
  if (digits.length !== 10 && digits.length !== 11) {
    return null;
  }

  // Reject all identical repeated digits (e.g. 0000000000, 1111111111, 9999999999)
  if (/^(\d)\1{9,}$/.test(digits)) {
    return null;
  }

  // Reject common dummy test sequences
  if (
    digits === "1234567890" ||
    digits === "0123456789" ||
    digits === "9876543210" ||
    digits === "11234567890"
  ) {
    return null;
  }

  // Case A: 10-digit US/Canada number
  // In NANP: First digit of Area Code must be 2-9 (cannot be 0 or 1)
  if (digits.length === 10) {
    const areaCodeFirstDigit = digits[0];
    if (areaCodeFirstDigit >= "2" && areaCodeFirstDigit <= "9") {
      return `+1${digits}`;
    }
    return null;
  }

  // Case B: 11-digit US/Canada number starting with '1'
  if (digits.length === 11 && digits.startsWith("1")) {
    const areaCodeFirstDigit = digits[1];
    if (areaCodeFirstDigit >= "2" && areaCodeFirstDigit <= "9") {
      return `+${digits}`;
    }
    return null;
  }

  return null;
}
