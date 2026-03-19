export default async function handler(req, res) {
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
    const { name, email, phone, address, topic, timeline, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Send email to Mario
    const emailToMario = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'realtor@mariomanzano.com',
        subject: `New Consultation Request from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1A1A18;">New Consultation Request</h2>
            
            <div style="background-color: #F8F5F0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Property Address:</strong> ${address || 'Not provided'}</p>
              <p><strong>Topic:</strong> ${topic || 'Not specified'}</p>
              <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #1A1A18;">Message:</h3>
              <p style="color: #1A1A18; line-height: 1.6;">${message || 'No additional message provided'}</p>
            </div>

            <hr style="border: none; border-top: 1px solid #E8E0D5; margin: 20px 0;">
            <p style="color: #1A1A18; font-size: 12px;">
              This consultation request was submitted through mariomanzano.com
            </p>
          </div>
        `,
      }),
    });

    const marioResponse = await emailToMario.json();
    if (!emailToMario.ok) {
      console.error('Resend error to Mario:', marioResponse);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // Send confirmation email to user
    const emailToUser = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Consultation Request Received',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1A1A18;">Thank You, ${name}</h2>
            
            <p style="color: #1A1A18; line-height: 1.6;">
              We received your consultation request and appreciate your interest. Mario will reach out within 24 hours to schedule your conversation.
            </p>

            <div style="background-color: #F8F5F0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #1A1A18; margin: 0;">
                <strong>In the meantime, feel free to reach out directly:</strong><br>
                Phone: (512) 695-9255<br>
                Email: realtor@mariomanzano.com
              </p>
            </div>

            <p style="color: #1A1A18; line-height: 1.6;">
              Looking forward to our conversation.
            </p>

            <p style="color: #B8974A; font-weight: bold;">Mario Manzano</p>
            <p style="color: #1A1A18; font-size: 12px;">Austin REALTOR | Seller Strategist</p>
          </div>
        `,
      }),
    });

    const userResponse = await emailToUser.json();
    if (!emailToUser.ok) {
      console.error('Resend error to user:', userResponse);
      // Don't fail if confirmation email fails, main email was sent
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Consultation request submitted successfully' 
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
}
