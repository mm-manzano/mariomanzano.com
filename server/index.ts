import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to submit lead to BoldTrail
async function submitToBoldTrail(leadData: any) {
  const boldtrailToken = process.env.BOLDTRAIL_API_TOKEN;
  if (!boldtrailToken) {
    console.error("BoldTrail API token not configured");
    throw new Error("CRM not configured");
  }

  const response = await axios.post(
    "https://api.kvcore.com/contacts",
    leadData,
    {
      headers: {
        "Authorization": `Bearer ${boldtrailToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

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

  // ─── HOME VALUE FORM SUBMISSION ───────────────────────────────────
  app.post("/api/submit-home-value", async (req, res) => {
    try {
      const { name, propertyAddress, email, phone, timeline } = req.body;

      // Validate required fields
      if (!name || !propertyAddress || !email || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const nameParts = name.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || name;

      const leadData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        address: propertyAddress,
        lead_source: "Website - Home Value Request",
        notes: `Property Address: ${propertyAddress}\nSelling Timeline: ${timeline || "Not specified"}\nSubmitted via: Mario Manzano Website - Home Value Form`
      };

      await submitToBoldTrail(leadData);
      console.log(`Lead created in BoldTrail: ${name} (${email}) - Home Value`);

      res.json({ success: true, message: "Lead submitted successfully" });
    } catch (error: any) {
      console.error("BoldTrail API error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to submit lead" });
    }
  });

  // ─── CONTACT FORM SUBMISSION ───────────────────────────────────────
  app.post("/api/submit-contact", async (req, res) => {
    try {
      const { name, email, phone, address, topic, message, timeline } = req.body;

      // Validate required fields
      if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const nameParts = name.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || name;

      const leadData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone || undefined,
        address: address || undefined,
        lead_source: "Website - Contact Form",
        notes: `Topic: ${topic || "Not specified"}\nMessage: ${message || "No message"}\nTimeline: ${timeline || "Not specified"}\nSubmitted via: Mario Manzano Website - Contact Form`
      };

      // Remove undefined fields
      Object.keys(leadData).forEach(key => leadData[key] === undefined && delete leadData[key]);

      await submitToBoldTrail(leadData);
      console.log(`Lead created in BoldTrail: ${name} (${email}) - Contact Form`);

      res.json({ success: true, message: "Contact submitted successfully" });
    } catch (error: any) {
      console.error("BoldTrail API error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to submit contact" });
    }
  });

  // ─── BOOK CONSULTATION FORM SUBMISSION ──────────────────────────────
  app.post("/api/submit-book-consultation", async (req, res) => {
    try {
      const { name, email, phone, address, timeline, message } = req.body;

      // Validate required fields
      if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const nameParts = name.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || name;

      const leadData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone || undefined,
        address: address || undefined,
        lead_source: "Website - Book Consultation",
        notes: `Timeline: ${timeline || "Not specified"}\nMessage: ${message || "No message"}\nSubmitted via: Mario Manzano Website - Book Consultation`
      };

      // Remove undefined fields
      Object.keys(leadData).forEach(key => leadData[key] === undefined && delete leadData[key]);

      await submitToBoldTrail(leadData);
      console.log(`Lead created in BoldTrail: ${name} (${email}) - Book Consultation`);

      res.json({ success: true, message: "Consultation request submitted successfully" });
    } catch (error: any) {
      console.error("BoldTrail API error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to submit consultation request" });
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
