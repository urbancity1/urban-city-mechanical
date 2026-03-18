import nodemailer from 'nodemailer';

const NOTIFY_EMAIL = 'Urbancityair@gmail.com';
const FROM_EMAIL = 'Urbancityair@gmail.com';

function getTransporter() {
  const appPassword = process.env.GMAIL_APP_PASSWORD;
  if (!appPassword) {
    throw new Error('GMAIL_APP_PASSWORD not set');
  }
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: FROM_EMAIL,
      pass: appPassword,
    },
  });
}

export async function sendNewLeadEmail(lead: {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  description?: string | null;
  zipCode?: string | null;
}) {
  try {
    const transporter = getTransporter();

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">🚨 New HVAC Lead - Urban City Mechanical</h2>
        </div>
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${lead.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Phone</td><td style="padding: 8px 0; font-weight: bold;">${lead.phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;">${lead.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Service</td><td style="padding: 8px 0;">${lead.serviceType}</td></tr>
            ${lead.zipCode ? `<tr><td style="padding: 8px 0; color: #64748b;">Zip Code</td><td style="padding: 8px 0;">${lead.zipCode}</td></tr>` : ''}
            ${lead.description ? `<tr><td style="padding: 8px 0; color: #64748b; vertical-align: top;">Issue</td><td style="padding: 8px 0;">${lead.description}</td></tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 12px; background: #dbeafe; border-radius: 6px; font-size: 14px; color: #1e40af;">
            Reply to this email or call the customer directly to follow up.
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Urban City Mechanical" <${FROM_EMAIL}>`,
      to: NOTIFY_EMAIL,
      subject: `🚨 New Lead: ${lead.name} - ${lead.serviceType}`,
      html,
      text: `NEW HVAC LEAD\n\nName: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nService: ${lead.serviceType}${lead.zipCode ? `\nZip: ${lead.zipCode}` : ''}${lead.description ? `\nIssue: ${lead.description}` : ''}\n\nReply to follow up with this customer.`,
    });

    console.log('Email notification sent to', NOTIFY_EMAIL);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}

export async function sendSmsViaVerizonGateway(lead: {
  name: string;
  phone: string;
  serviceType: string;
  zipCode?: string | null;
}) {
  try {
    const transporter = getTransporter();

    const shortMsg = `🚨 NEW LEAD: ${lead.name}\nPhone: ${lead.phone}\nService: ${lead.serviceType}${lead.zipCode ? `\nZip: ${lead.zipCode}` : ''}\n⚡ CALL NOW - leads go cold in 5 mins!`;

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: '5106196586@vtext.com',
      subject: 'New Lead',
      text: shortMsg,
    });

    console.log('SMS via Verizon gateway sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send SMS via Verizon gateway:', error);
    return false;
  }
}
