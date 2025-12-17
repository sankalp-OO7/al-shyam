import { google } from "googleapis";

// Appends a payment transaction row to Google Sheets securely on the server.
export async function appendPaymentRow({
  country,
  gateway,
  amount,
  currency,
  paymentId,
  status,
}) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !clientEmail || !privateKey) {
    console.error("Google Sheets env vars missing");
    return;
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const now = new Date().toISOString();

  // Columns: Date, Country, Gateway, Amount, Currency, Payment ID, Status
  const row = [[now, country || "", gateway, amount, currency, paymentId, status]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: row,
    },
  });
}


