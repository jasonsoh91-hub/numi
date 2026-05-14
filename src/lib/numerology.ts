/**
 * Numerology Calculation Utilities
 * Core logic for calculating Life Path Numbers and related numerology values
 */

export interface UserData {
  fullName: string;
  dateOfBirth: string; // ISO date string (YYYY-MM-DD)
  timeOfBirth?: string; // HH:MM format
  location: string;
}

export interface NumerologyResult {
  lifePathNumber: number;
  userData: UserData;
  timestamp: string;
}

/**
 * Calculate Life Path Number from date of birth
 * Formula: Sum all digits of the DOB until you get a single digit (1-9)
 * Special case: Master numbers 11, 22, 33 are kept as is
 *
 * @param dateOfBirth - Date string in YYYY-MM-DD format
 * @returns Life Path Number (1-9, or 11, 22, 33)
 */
export function calculateLifePathNumber(dateOfBirth: string): number {
  // Remove any non-digit characters
  const cleanDate = dateOfBirth.replace(/\D/g, "");

  // Sum all digits
  let sum = 0;
  for (const digit of cleanDate) {
    sum += parseInt(digit, 10);
  }

  // Reduce to single digit or master number (11, 22, 33)
  return reduceToSingleDigit(sum);
}

/**
 * Reduce a number to a single digit (1-9) or master number (11, 22, 33)
 * @param num - Number to reduce
 * @returns Reduced number
 */
function reduceToSingleDigit(num: number): number {
  // Check for master numbers first
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }

  // If already a single digit, return it
  if (num < 10) {
    return num;
  }

  // Sum the digits
  let sum = 0;
  let temp = num;
  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }

  // Recursively reduce
  return reduceToSingleDigit(sum);
}

/**
 * Calculate Destiny Number (Expression Number) from full name
 * Based on the Pythagorean system letter values
 * Note: Simplified version - full implementation needs proper letter-to-number mapping
 *
 * @param fullName - Full name string
 * @returns Destiny Number (1-9)
 */
export function calculateDestinyNumber(fullName: string): number {
  // Pythagorean letter values
  const letterValues: { [key: string]: number } = {
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, r: 9,
  };

  // Remove spaces and special characters, convert to lowercase
  const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "");

  // Calculate sum
  let sum = 0;
  for (const letter of cleanName) {
    sum += letterValues[letter] || 0;
  }

  return reduceToSingleDigit(sum);
}

/**
 * Calculate complete numerology profile
 * @param userData - User input data
 * @returns Complete numerology result
 */
export function calculateNumerology(userData: UserData): NumerologyResult {
  const lifePathNumber = calculateLifePathNumber(userData.dateOfBirth);

  return {
    lifePathNumber,
    userData,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Log user data as formatted JSON for webhook integration
 * @param result - Numerology calculation result
 */
export function logUserDataForWebhook(result: NumerologyResult): void {
  const webhookPayload = {
    event: "numerology_calculation",
    timestamp: result.timestamp,
    data: {
      fullName: result.userData.fullName,
      dateOfBirth: result.userData.dateOfBirth,
      timeOfBirth: result.userData.timeOfBirth || null,
      location: result.userData.location,
      calculatedLifePathNumber: result.lifePathNumber,
    },
    metadata: {
      source: "numi_landing_page",
      version: "1.0.0",
    },
  };

  console.log("=== NUMEROLOGY WEBHOOK PAYLOAD ===");
  console.log(JSON.stringify(webhookPayload, null, 2));
  console.log("==================================");
}

/**
 * Validate user input
 * @param userData - User input data
 * @returns Validation result with errors if any
 */
export function validateUserData(userData: Partial<UserData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!userData.fullName || userData.fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters");
  }

  if (!userData.dateOfBirth) {
    errors.push("Date of birth is required");
  } else {
    const dob = new Date(userData.dateOfBirth);
    const today = new Date();
    if (dob > today) {
      errors.push("Date of birth cannot be in the future");
    }
    if (dob < new Date("1900-01-01")) {
      errors.push("Please enter a valid date of birth");
    }
  }

  if (!userData.location || userData.location.trim().length < 2) {
    errors.push("Location must be at least 2 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Format date for display
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get zodiac sign from date of birth
 * @param dateString - ISO date string
 * @returns Zodiac sign name
 */
export function getZodiacSign(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}
