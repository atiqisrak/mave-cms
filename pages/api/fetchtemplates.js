import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://ui8.net/api/categories/coded-templates"
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
