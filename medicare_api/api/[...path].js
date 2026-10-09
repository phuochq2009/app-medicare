const configurations = [
  { id: 1, id_name: "clinic_name", value: process.env.CLINIC_NAME || "Medicare" },
  { id: 2, id_name: "web_technical_issue_enable", value: "false" },
  { id: 3, id_name: "web_doctor_image", value: "" },
  { id: 4, id_name: "play_store_link", value: process.env.PLAY_STORE_URL || "" },
  { id: 5, id_name: "app_store_link", value: process.env.APP_STORE_URL || "" },
];

const collectionEndpoints = new Set([
  "get_city",
  "get_department_active",
  "get_doctor",
  "get_clinic",
  "get_testimonial",
  "get_social_media",
]);

const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const success = (data) => ({ response: 200, status: true, data });

export default function handler(req, res) {
  const origin = req.headers.origin;

  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({
      response: 403,
      status: false,
      message: "Origin is not allowed",
    });
  }

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Accept, Authorization, Content-Type"
    );
  }

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(405).json({
      response: 405,
      status: false,
      message: "Method not allowed",
    });
  }

  const endpoint = new URL(req.url, "http://localhost").pathname
    .split("/")
    .filter(Boolean)
    .pop();

  if (endpoint === "health") {
    return res.status(200).json({ status: "ok" });
  }

  if (endpoint === "get_configurations") {
    return res.status(200).json(success(configurations));
  }

  if (collectionEndpoints.has(endpoint)) {
    return res.status(200).json(success([]));
  }

  return res.status(404).json({
    response: 404,
    status: false,
    message: "Endpoint not found",
  });
}