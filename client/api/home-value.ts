import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

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

export default async (req: VercelRequest, res: VercelResponse) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    res.json({ success: true, message: "Thank you. Your home value request has been received. I will review your property and send your report shortly." });
  } catch (error: any) {
    console.error("BoldTrail API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to submit request. Please try again." });
  }
};
