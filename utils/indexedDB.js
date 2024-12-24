// utils/indexedDB.js

import Dexie from "dexie";

// Initialize IndexedDB
const db = new Dexie("MediaLibraryDB");
db.version(1).stores({
  media: "++id, title, file_name, file_path, tags, file_type", // Indexed fields
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
      collection = collection.filter((m) => m.tags.includes(tagFilter));
    }

    // Apply sorting
    if (sortType === "asc") {
      collection = collection.sortBy("title");
    } else {
      // For descending, fetch sorted data and reverse
      const sortedData = await collection.sortBy("title");
      collection = sortedData.reverse();
    }

    // Get total count after filters
    let total = 0;
    if (sortType === "asc") {
      total = await collection.count();
    } else {
      total = await db.media
        .filter((m) =>
          searchText
            ? m.title.toLowerCase().includes(searchText.toLowerCase()) ||
              m.file_name.toLowerCase().includes(searchText.toLowerCase())
            : true
        )
        .filter((m) => (tagFilter ? m.tags.includes(tagFilter) : true))
        .count();
    }

    // Apply pagination
    let media = [];
    if (sortType === "asc") {
      media = await collection
        .offset((page - 1) * pageSize)
        .limit(pageSize)
        .toArray();
    } else {
      // For descending, slice the reversed array
      const allFilteredSorted = await db.media
        .filter((m) =>
          searchText
            ? m.title.toLowerCase().includes(searchText.toLowerCase()) ||
              m.file_name.toLowerCase().includes(searchText.toLowerCase())
            : true
        )
        .filter((m) => (tagFilter ? m.tags.includes(tagFilter) : true))
        .sortBy("title");
      const reversedData = allFilteredSorted.reverse();
      media = reversedData.slice((page - 1) * pageSize, page * pageSize);
    }

    console.log(`Fetched ${media.length} media items from IndexedDB.`);
    return { data: media, total };
  } catch (error) {
    console.error("Error fetching paginated media from IndexedDB:", error);
    return { data: [], total: 0 };
  }
};

export default db;
