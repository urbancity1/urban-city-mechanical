// Twilio SMS Integration for Urban City Mechanical
// Uses direct environment variable authentication
import twilio from 'twilio';

interface TwilioCredentials {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

function getCredentials(): TwilioCredentials {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
  
  if (!accountSid || !accountSid.startsWith('AC')) {
    throw new Error('TWILIO_ACCOUNT_SID not set or invalid - should start with AC');
  }
  
  if (!authToken || authToken.length < 20) {
    throw new Error('TWILIO_AUTH_TOKEN not set or invalid');
  }
  
  if (!phoneNumber) {
    throw new Error('TWILIO_PHONE_NUMBER not set');
  }
  
  console.log('Twilio credentials loaded from environment');
  console.log('  Account SID:', accountSid.substring(0, 6) + '...');
  console.log('  From Number:', phoneNumber);
  
  return { accountSid, authToken, phoneNumber };
}

export function getTwilioClient() {
  const { accountSid, authToken } = getCredentials();
  return twilio(accountSid, authToken);
}

export function getTwilioFromPhoneNumber() {
  const { phoneNumber } = getCredentials();
  // Ensure from number is in E.164 format
  return formatPhoneNumber(phoneNumber);
}

// Format phone number to E.164 format
function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return '+1' + digits;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return '+' + digits;
  }
  return '+' + digits;
}

// Send SMS notification for new lead
export async function sendNewLeadNotification(lead: {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  description?: string;
  zipCode?: string;
}) {
  try {
    const client = getTwilioClient();
    const fromNumber = getTwilioFromPhoneNumber();
    
    const notifyNumber = process.env.TWILIO_NOTIFY_PHONE;
    
    if (!notifyNumber) {
      console.log('TWILIO_NOTIFY_PHONE not set - skipping SMS notification');
      return null;
    }

    const message = `NEW LEAD - Urban City Mechanical

Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Service: ${lead.serviceType}
${lead.zipCode ? `Zip: ${lead.zipCode}` : ''}
${lead.description ? `Issue: ${lead.description.substring(0, 100)}` : ''}

Reply to this number or call the customer directly.`;

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formatPhoneNumber(notifyNumber)
    });

    console.log('SMS notification sent successfully:', result.sid);
    return result;
  } catch (error) {
    console.error('Failed to send SMS notification:', error);
    return null;
  }
}

// Send confirmation SMS to customer
export async function sendCustomerConfirmation(customerPhone: string, customerName: string) {
  try {
    const client = getTwilioClient();
    const fromNumber = getTwilioFromPhoneNumber();

    const message = `Hi ${customerName}! Thank you for contacting Urban City Mechanical. We've received your service request and will be in touch shortly. For immediate assistance, call us back at this number.`;

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formatPhoneNumber(customerPhone)
    });

    console.log('Customer confirmation SMS sent:', result.sid);
    return result;
  } catch (error) {
    console.error('Failed to send customer confirmation SMS:', error);
    return null;
  }
}
