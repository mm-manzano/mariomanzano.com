import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.json());
  app.use(express.static(staticPath));

  // BoldTrail API endpoint for home value form submissions
  app.post("/api/submit-home-value", async (req, res) => {
    try {
      const { name, propertyAddress, email, phone } = req.body;

      // Validate required fields
      if (!name || !propertyAddress || !email || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Submit to BoldTrail API
      const boldtrailToken = process.env.BOLDTRAIL_API_TOKEN;
      if (!boldtrailToken) {
        console.error("BoldTrail API token not configured");
        return res.status(500).json({ error: "CRM not configured" });
      }

      const boldtrailResponse = await axios.post(
        "https://api.kvcore.com/contacts",
        {
          firstName: name.split(" ")[0],
          lastName: name.split(" ").slice(1).join(" ") || name,
          email: email,
          phone: phone,
          address: propertyAddress,
          source: "Website - Home Value Request",
          notes: `Property Address: ${propertyAddress}\nSubmitted via: Mario Manzano Website`
        },
        {
          headers: {
            "Authorization": `Bearer ${boldtrailToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      // Log successful submission
      console.log(`Lead created in BoldTrail: ${name} (${email})`);

      res.json({ success: true, message: "Lead submitted successfully" });
    } catch (error: any) {
      console.error("BoldTrail API error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to submit lead" });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
