// utils/indexedDB.js

import Dexie from "dexie";

// Initialize IndexedDB
const db = new Dexie("MediaLibraryDB");
db.version(1).stores({
  media:
    "++id, title, file_name, file_path, tags, file_type, created_at, updated_at", // Added created_at and updated_at
});

// Add media items to IndexedDB
export const addMediaToDB = async (media) => {
  try {
    console.log("Adding media to IndexedDB:", media);
    await db.media.bulkPut(media);
    console.log("Media successfully added to IndexedDB.");
  } catch (error) {
    console.error("Error adding media to IndexedDB:", error);
  }
};

// Fetch all media from IndexedDB
export const getAllMediaFromDB = async () => {
  try {
    const allMedia = await db.media.toArray();
    console.log("Fetched all media from IndexedDB:", allMedia);
    return allMedia;
  } catch (error) {
    console.error("Error fetching media from IndexedDB:", error);
    return [];
  }
};

// Delete media from IndexedDB by ID
export const deleteMediaFromDB = async (id) => {
  try {
    console.log(`Deleting media with ID ${id} from IndexedDB.`);
    await db.media.delete(id);
    console.log("Media successfully deleted from IndexedDB.");
  } catch (error) {
    console.error("Error deleting media from IndexedDB:", error);
  }
};

// Update a media item in IndexedDB
export const updateMediaInDB = async (media) => {
  try {
    console.log(`Updating media with ID ${media.id} in IndexedDB.`);
    await db.media.put(media);
    console.log("Media successfully updated in IndexedDB.");
  } catch (error) {
    console.error("Error updating media in IndexedDB:", error);
  }
};

// Fetch paginated media from IndexedDB
export const getPaginatedMediaFromDB = async (
  page,
  pageSize,
  sortType,
  searchText,
  tagFilter
) => {
  try {
    console.log(
      `Fetching paginated media from IndexedDB - Page: ${page}, Page Size: ${pageSize}, Sort: ${sortType}, Search: ${searchText}, Tag: ${tagFilter}`
    );
    let collection = db.media.toCollection();

    // Apply search filter
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      collection = collection.filter(
        (m) =>
          m.title.toLowerCase().includes(lowerSearch) ||
          m.file_name.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply tag filter
    if (tagFilter) {
      collection = collection.filter(
        // (m) => Array.isArray(m.tags) && m.tags.includes(tagFilter)
        (m) => (m.tags || []).includes(tagFilter)
      );
    }

    // Apply sorting
    let sortedData;
    if (sortType === "asc") {
      sortedData = await collection.sortBy("created_at");
    } else {
      sortedData = await collection.sortBy("created_at");
      sortedData = sortedData.reverse();
    }

    // Get total count after filters
    const total = sortedData.length;

    // Apply pagination
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const paginatedData = sortedData.slice(start, end);

    console.log(`Fetched ${paginatedData.length} media items from IndexedDB.`);
    return { data: paginatedData, total };
  } catch (error) {
    console.error("Error fetching paginated media from IndexedDB:", error);
    return { data: [], total: 0 };
  }
};

export default db;
