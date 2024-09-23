import generateRandomId from "./generateRandomId";

// Create a new page object with default values
export const createPage = (titleEn, titleBn) => {
  return {
    _id: generateRandomId(16),
    page_name_en: titleEn,
    page_name_bn: titleBn,
    slug: titleEn.toLowerCase().split(" ").join("-"),
    favicon_id: 10,
    type: "Page",
    body: [],
  };
};

// Find a page by ID
export const findPageById = (pages, pageId) => {
  return pages.find((page) => page._id === pageId);
};

// Update page details
export const updatePageDetails = (page, titleEn, titleBn, slug) => {
  return {
    ...page,
    page_name_en: titleEn,
    page_name_bn: titleBn,
    slug: slug,
  };
};
