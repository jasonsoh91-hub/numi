/**
 * Calculate the Core Number from a birthdate.
 *
 * Rule: Add all digits of the birthdate together, then keep reducing
 * until the result is a single number from 1 to 9.
 *
 * Example: 24 August 1992
 * Digits: 2 + 4 + 0 + 8 + 1 + 9 + 9 + 2 = 35
 * Reduce: 3 + 5 = 8
 * Core Number: 8
 *
 * @param dateString - Date string in format YYYY-MM-DD or similar
 * @returns Core number (1-9) or null if invalid
 */
export function calculateCoreNumber(dateString: string): number | null {
  if (!dateString) return null;

  // Extract all digits from the date string
  const digits = dateString.replace(/\D/g, "");
  if (!digits.length) return null;

  // Sum all digits
  let total = digits.split("").map(Number).reduce((sum, digit) => sum + digit, 0);

  // Keep reducing until single digit (1-9)
  while (total > 9) {
    total = total
      .toString()
      .split("")
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
  }

  // Edge case: if result is 0, return null
  return total === 0 ? null : total;
}

/**
 * Validate that a birthdate is not in the future
 */
export function isValidBirthdate(dateString: string): boolean {
  if (!dateString) return false;

  const date = new Date(dateString);
  const now = new Date();

  // Check if date is valid
  if (isNaN(date.getTime())) return false;

  // Check if date is not in the future
  return date <= now;
}

/**
 * Format a date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
