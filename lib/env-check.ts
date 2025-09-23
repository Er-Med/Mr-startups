/**
 * Environment variables checker for Sanity Studio
 * This helps debug production issues
 */

export function checkSanityEnv() {
  const requiredVars = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-14",
  };

  const missing = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error("Missing required environment variables:", missing);
    return {
      isValid: false,
      missing,
      error: `Missing environment variables: ${missing.join(", ")}`,
    };
  }

  console.log("All Sanity environment variables are present");
  return {
    isValid: true,
    missing: [],
    error: null,
  };
}
