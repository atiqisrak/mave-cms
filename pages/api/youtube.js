import instance from "../../axios";

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await instance.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
