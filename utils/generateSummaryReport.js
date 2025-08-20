const fs = require('fs');
const path = require('path');

function generateSummaryReport(csvPath, summaryPath) {
  const fs = require('fs');

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found at: ${csvPath}`);
    return;
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8').trim();
  const lines = csvContent.split('\n');

  if (lines.length < 2) {
    console.warn('⚠️ No test results found in CSV.');
    return;
  }

  const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
  const rows = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.replace(/"/g, ''));
    const rowObj = {};
    headers.forEach((h, i) => {
      rowObj[h] = values[i];
    });
    return rowObj;
  });

  const total = rows.length;
  const passed = rows.filter(r => r.automation_result.toLowerCase() === 'passed').length;
  const failed = rows.filter(r => r.automation_result.toLowerCase() === 'failed').length;
  const failedScenarios = rows.filter(r => r.automation_result.toLowerCase() === 'failed');

  const now = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });

  let summary = `📄 Automation Summary Report
Generated At     : ${now}
CSV Source       : ${csvPath}
------------------------------------
✅ Total APIs Tested     : ${total}
✅ Passed                : ${passed}
❌ Failed                : ${failed}
------------------------------------
`;

  if (failedScenarios.length > 0) {
    summary += `❌ Failed Scenarios:\n`;
    failedScenarios.forEach(row => {
      summary += `  - Iteration ${row.iteration}: ${row.scenario}\n`;
    });
  }

  summary += '\n🧪 End of Report.\n';

  fs.writeFileSync(summaryPath, summary);
  console.log('✅ Summary report saved at:', summaryPath);
}

module.exports = generateSummaryReport;

