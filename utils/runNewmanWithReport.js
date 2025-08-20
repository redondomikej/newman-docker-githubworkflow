const newman = require('newman');
const fs = require('fs');
const path = require('path');
const { determineActualResult } = require('./utils');

// Load and normalize utility (optional if you're importing it elsewhere)
const normalize = (val) => (val || '').toString().trim().toLowerCase();

function runNewmanWithReport(collection, dataFile, reportDir, options = {}) {
  return new Promise((resolve, reject) => {
    const htmlReportPath = options.htmlReportPath || path.join(reportDir, 'report.html');
    const csvReportPath = options.csvReportPath || path.join(reportDir, 'custom_report.csv');

    const iterationData = JSON.parse(fs.readFileSync(dataFile));

    newman.run({
      collection,
      iterationData: dataFile,
      reporters: ['cli', 'htmlextra'],
      reporter: {
        htmlextra: { export: htmlReportPath }
      }
    }, function (err, summary) {
      if (err) {
        console.error('❌ Newman run FAILED:', err);
        return reject(err);
      }

      const results = [];

      summary.run.executions.forEach((execution) => {
        const index = execution.cursor.iteration;
        const data = iterationData[index];
        const expectedResult = normalize(data.expected_result);
        const scenario = data.scenario || `Iteration ${index + 1}`;
        // -------
        const actualStatus = execution.response.code;
        const actualResult = (actualStatus === 200 || actualStatus === 201) ? 'PASSED' : 'FAILED';
        // const responseStream = execution.response.stream.toString();
        // const actualResult = determineActualResult(responseStream);

        // -------
        const automationResult = (normalize(actualResult) === expectedResult) ? 'PASSED' : 'FAILED';

        results.push({
          iteration: index + 1,
          scenario,
          actual_result: actualResult,
          expected_result: data.expected_result,
          automation_result: automationResult
        });
      });

      // Generate CSV
      const headers = ['iteration', 'scenario', 'actual_result', 'expected_result', 'automation_result'];
      const csvContent = [
        headers.join(','),
        ...results.map(row => headers.map(h => `"${row[h]}"`).join(','))
      ].join('\n');

      fs.writeFileSync(csvReportPath, csvContent);
      console.log('✅ Custom CSV Report saved at:', csvReportPath);

      // Show fail summary
      const hasFailures = results.some(row => row.automation_result === 'FAILED');
      if (hasFailures) {
        console.error('❌ Some automation results FAILED.');
      } else {
        console.log('✅ All automation results PASSED.');
      }

      resolve(); // ✅ Promise resolved after everything is done
    });
  });
}

module.exports = runNewmanWithReport;
