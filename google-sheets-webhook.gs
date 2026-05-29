/*
  Paste this code into a Google Apps Script project
  and deploy it as a web app (execute as you, access anyone).
  Then copy the web app URL into VISIT_WEBHOOK_URL in script.js.
*/

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getSheetByName('Visits');
    const data = JSON.parse(e.postData.contents || '{}');
    const row = [
      new Date(),
      data.timestamp || '',
      data.url || '',
      data.page || '',
      data.userAgent || '',
      data.language || '',
      data.referrer || '',
    ];
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
