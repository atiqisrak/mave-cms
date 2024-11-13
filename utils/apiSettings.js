// utils/apiSettings.js
import instance from "../axios";

let cachedSettings = null;
let lastFetched = null;
let lastUpdatedAt = null; // To track the latest update timestamp
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

/**
 * Fetches API settings from the backend and caches them.
 * If cached settings are still valid based on time or updated_at, returns them instead of fetching again.
 */
export async function getApiSettings() {
  const now = Date.now();

  try {
    // Fetch the settings from the backend
    const response = await instance.get("/settings");

    if (response.status === 200) {
      // Assuming the response data is an array
      const apiSettings = response.data.find(
        (item) => item.type === "api-settings"
      );

      if (apiSettings) {
        const { config, updated_at } = apiSettings;

        // Check if settings have been updated since last fetch
        if (lastUpdatedAt !== updated_at) {
          cachedSettings = config;
          lastFetched = now;
          lastUpdatedAt = updated_at;
          console.log("API settings updated and cached.");
        } else if (
          cachedSettings &&
          lastFetched &&
          now - lastFetched < CACHE_DURATION
        ) {
          console.log("Using cached API settings.");
        } else {
          // Cache duration expired, refetch
          cachedSettings = config;
          lastFetched = now;
          lastUpdatedAt = updated_at;
          console.log("API settings cache expired. Refetched and cached.");
        }

        return cachedSettings;
      } else {
        throw new Error("API settings not found in the response.");
      }
    } else {
      throw new Error(`Failed to fetch settings: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching API settings:", error);
    throw error;
  }
}

/**
 * Clears the cached API settings. Useful for manual cache invalidation.
 */
export function clearApiSettingsCache() {
  cachedSettings = null;
  lastFetched = null;
  lastUpdatedAt = null;
  console.log("API settings cache cleared.");
}
