/**
 * CFFR Trial Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * Set TRIAL_END_DATE to exactly 7 days from today.
 * When the trial ends, set IS_TRIAL_ACTIVE to false and payment kicks in
 * automatically — no other file needs to change.
 *
 * TODAY: Update this date to your actual launch date.
 */

// *** SET THIS TO YOUR LAUNCH DATE + 7 DAYS ***
// Format: "YYYY-MM-DDTHH:MM:SSZ" (UTC midnight)
// Example: if you deploy on 27 Apr 2026, set to 4 May 2026 midnight UTC
export const TRIAL_END_DATE = new Date("2026-05-01T00:00:00Z");

// Derived — do not edit manually
export const IS_TRIAL_ACTIVE = new Date() < TRIAL_END_DATE;

export const TRIAL_LABEL = " 🥳 Free Trial — Full access until 1st May 2026";
export const PAID_AMOUNT = "KES 100";
