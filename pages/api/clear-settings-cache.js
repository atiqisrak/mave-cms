import { clearApiSettingsCache } from "../../utils/apiSettings";

export default function handler(req, res) {
  if (req.method === "POST") {
    // Implement authentication here (e.g., API keys, tokens)
    const authHeader = req.headers.authorization;

    if (authHeader !== `Bearer YOUR_SECURE_TOKEN`) {
      // Replace with a secure method
      return res.status(401).json({ message: "Unauthorized" });
    }

    clearApiSettingsCache();
    res.status(200).json({ message: "Cache cleared successfully." });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
