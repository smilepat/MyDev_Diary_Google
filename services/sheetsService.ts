
import { LinkItem, Category } from '../types';

export interface SyncData {
  links: LinkItem[];
  categories: Category[];
}

/**
 * Service to handle data persistence to Google Sheets
 * Requires a Google Apps Script Web App URL
 */
export const syncToSheets = async (url: string, links: LinkItem[], categories: Category[]): Promise<boolean> => {
  if (!url) return false;

  try {
    // We utilize 'text/plain' to avoid CORS preflight checks (OPTIONS request) issues with GAS web apps.
    // This allows us to actually read the response instead of using 'no-cors'.
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        action: 'push',
        data: links,
        categories: categories
      }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text === "Success";
  } catch (error) {
    console.error('Cloud Sync Error:', error);
    return false;
  }
};

export const fetchFromSheets = async (url: string): Promise<SyncData | null> => {
  if (!url) return null;

  try {
    const response = await fetch(`${url}?action=pull`);
    const result = await response.json();
    return {
      links: (result.data as LinkItem[]) || [],
      categories: (result.categories as Category[]) || []
    };
  } catch (error) {
    console.error('Cloud Fetch Error:', error);
    return null;
  }
};

export const APPS_SCRIPT_TEMPLATE = `function getOrCreateSheet(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function sheetToArray(sheet) {
  var range = sheet.getDataRange();
  var values = range.getValues();
  if (values.length <= 1 || (values.length === 1 && values[0][0] === "")) {
    return [];
  }
  var headers = values[0];
  var data = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var item = {};
    for (var j = 0; j < headers.length; j++) {
      item[headers[j]] = row[j];
    }
    data.push(item);
  }
  return data;
}

function arrayToSheet(sheet, data) {
  sheet.clear();
  if (data && data.length > 0) {
    var headers = Object.keys(data[0]);
    sheet.appendRow(headers);
    var rows = data.map(function(item) {
      return headers.map(function(h) { return item[h] !== undefined ? item[h] : ""; });
    });
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
}

function doGet(e) {
  var action = e.parameter.action;
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (action === 'pull') {
    var linksSheet = getOrCreateSheet(ss, 'Links');
    var catsSheet = getOrCreateSheet(ss, 'Categories');
    var links = sheetToArray(linksSheet);
    var categories = sheetToArray(catsSheet);
    return ContentService.createTextOutput(JSON.stringify({ data: links, categories: categories }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var content = e.postData.contents;
    var params = JSON.parse(content);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (params.action === 'push') {
      var linksSheet = getOrCreateSheet(ss, 'Links');
      var catsSheet = getOrCreateSheet(ss, 'Categories');
      arrayToSheet(linksSheet, params.data || []);
      arrayToSheet(catsSheet, params.categories || []);
      return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    }
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}`;
