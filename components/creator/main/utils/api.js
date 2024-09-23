import axios from "axios";

// API instance for making requests to the backend
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET request for fetching pages
export const fetchPages = async () => {
  const response = await api.get("/pages");
  return response.data;
};

// PUT request for updating a page
export const updatePage = async (pageId, pageData) => {
  const response = await api.put(`/pages/${pageId}`, pageData);
  return response.data;
};

// DELETE request for removing a page
export const deletePage = async (pageId) => {
  await api.delete(`/pages/${pageId}`);
};

export default api;
