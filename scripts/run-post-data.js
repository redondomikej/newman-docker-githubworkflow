const path = require('path');
const runNewmanWithReport = require('../utils/runNewmanWithReport');
const generateSummaryReport = require('../utils/generateSummaryReport');
const { getFormattedDateTime } = require('../utils/utils');

// Set collection name (just once)
const collectionName = 'Post data';
const baseName = collectionName.replace(/\s+/g, '_'); // sanitize

const baseDir = __dirname;
const reportDir = path.join(baseDir, '../Report/');
const timestamp = getFormattedDateTime();

// Declare paths (config-like)
const collectionPath = path.join(baseDir, `../api_collection/${collectionName}.json`);
const dataFilePath = path.join(baseDir, `../datafile/${collectionName}.json`);
const htmlReportPath = path.join(reportDir, `${baseName}_${timestamp}.html`);
const csvReportPath = path.join(reportDir, `${baseName}_${timestamp}.csv`);
const summaryReportPath = path.join(reportDir, `${baseName}_${timestamp}_summary.txt`);

// Run the Newman test + generate reports
runNewmanWithReport(collectionPath, dataFilePath, reportDir, {
  htmlReportPath,
  csvReportPath
}).then(() => {
  generateSummaryReport(csvReportPath, summaryReportPath);
});
