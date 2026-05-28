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
 * Detailed numerology breakdown
 */
export interface NumerologyBreakdown {
  dayNumber: number;
  monthNumber: number;
  yearNumber: number;
  dayRaw: number;
  connecting1: number;
  connecting2: number;
  lifePathNumber: number;
  daySum: number;
  monthSum: number;
  yearSum: number;
}

/**
 * Calculate detailed numerology breakdown
 * @param dateString - Date string in format DD/MM/YYYY or DD-MM-YYYY
 * @returns Detailed breakdown or null if invalid
 */
export function calculateNumerologyBreakdown(dateString: string): NumerologyBreakdown | null {
  if (!dateString) return null;

  // Parse date assuming DD/MM/YYYY or DD-MM-YYYY format
  const parts = dateString.split(/[-/]/);
  if (parts.length !== 3) return null;

  const [dayStr, monthStr, yearStr] = parts;
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  // Calculate day number (sum digits of day)
  const daySum = String(day).split("").map(Number).reduce((sum, d) => sum + d, 0);
  const dayNumber = reduceToSingleDigit(daySum);

  // Month is already 1-12, but may need reduction for double digits
  const monthSum = month;
  const monthNumber = reduceToSingleDigit(month);

  // Calculate year number (sum digits of year)
  const yearSum = String(year).split("").map(Number).reduce((sum, d) => sum + d, 0);
  const yearNumber = reduceToSingleDigit(yearSum);

  // Connecting numbers
  const connecting1 = reduceToSingleDigit(dayNumber + monthNumber);
  const connecting2 = reduceToSingleDigit(monthNumber + yearNumber);

  // Life Path Number (all digits summed)
  const allDigits = String(day) + String(month).padStart(2, "0") + String(year);
  const totalSum = allDigits.split("").map(Number).reduce((sum, d) => sum + d, 0);
  const lifePathNumber = reduceToSingleDigit(totalSum);

  return {
    dayNumber,
    monthNumber,
    yearNumber,
    dayRaw: day,
    connecting1,
    connecting2,
    lifePathNumber,
    daySum,
    monthSum,
    yearSum,
  };
}

/**
 * Reduce a number to single digit (1-9)
 */
function reduceToSingleDigit(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num)
      .split("")
      .map(Number)
      .reduce((sum, d) => sum + d, 0);
  }
  return num;
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
