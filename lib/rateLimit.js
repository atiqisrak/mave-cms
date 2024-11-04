// lib/rateLimit.js

let requests = {};
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // Adjust as needed

export default function rateLimit(req, res, next) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!requests[ip]) {
    requests[ip] = { count: 1, firstRequest: Date.now() };
  } else {
    requests[ip].count += 1;
  }

  const currentTime = Date.now();
  if (currentTime - requests[ip].firstRequest > RATE_LIMIT_WINDOW_MS) {
    requests[ip] = { count: 1, firstRequest: currentTime };
  }

  if (requests[ip].count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ message: "Too Many Requests" });
  }

  next();
}
