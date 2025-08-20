# 🧪 JCA-LSGH API Automation Framework

This project provides an automated solution for running **Postman API test collections** using **Newman**.  
It includes dynamic test data, reusable utilities, HTML/CSV reports, and summary generation.  
Perfect for CI/CD pipelines or manual regression testing.

---

## 📁 Project Structure

- **api_collection/** – Contains Postman collections (e.g., `Get data.json`, `Post data.json`)
- **datafile/** – Contains JSON or CSV test data used for iteration
- **scripts/** – Node.js scripts that trigger Newman runs (`run-get-data.js`, `run-post-data.js`)
- **utils/** – Reusable utility modules (`runNewmanWithReport.js`, `generateSummaryReport.js`, etc.)
- **Report/** – Output directory for generated reports (HTML, CSV, and TXT)
- **package.json** – NPM configuration with dependencies and test scripts
- **README.md** – This documentation file

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run API Test Suites

Use the provided npm scripts:

```bash
npm run run_getData     # Executes the GET test suite
npm run run_postData    # Executes the POST test suite
```

Each run will:
- ✅ Execute your Postman collection using Newman
- 📄 Generate:
  - HTML report via `newman-reporter-htmlextra`
  - Custom CSV result report
  - Summary text file listing pass/fail count and scenarios

---

## 📂 Sample Report Output

All reports are saved in the `Report/` directory with timestamps:

```
Report/
├── Get_data_20250715_1545.html
├── Get_data_20250715_1545.csv
└── Get_data_20250715_1545_summary.txt
```

---

## 📌 Postman Collections

### ✅ Get Data

- **Method**: `GET`
- **Variables**: `{base_url}`, `{end_point}`
- **Tests**:
  - Status code is 200 or 201
  - Compares `actual_result` to `expected_result` from the data file

### ✅ Post Data

- **Method**: `POST`
- **Variables**: `{base_url}`, `{payload_Data_stringified}`
- **Pre-request Script**: Converts `payload_Data` into stringified JSON
- **Tests**:
  - Status code is 200 or 201
  - Compares `actual_result` to `expected_result` from the data file

---

## 🔧 Utility Modules

### `utils/utils.js`

| Function                    | Purpose                                         |
|----------------------------|-------------------------------------------------|
| `getFormattedDateTime()`   | Returns timestamp in `YYYYMMDD_HHmm` format     |
| `determineActualResult()`  | Returns `PASSED` or `FAILED` based on response  |

### `utils/runNewmanWithReport.js`

- Runs the Newman collection
- Generates:
  - ✅ Custom CSV result
  - 🌐 HTML report
- Compares `actual_result` to `expected_result`

### `utils/generateSummaryReport.js`

- Reads the CSV report
- Summarizes:
  - Total tests
  - Passed / Failed count
  - Lists failed scenarios
- Saves as `.txt` summary report

---

## 📜 package.json Scripts

```json
"scripts": {
  "run_getData": "node scripts/run-get-data.js",
  "run_postData": "node scripts/run-post-data.js"
}
```

Run using:

```bash
npm run run_getData
npm run run_postData
```

---

## 📦 Dependencies

| Package                    | Purpose                                |
|---------------------------|----------------------------------------|
| `newman`                  | Run Postman collections from CLI       |
| `newman-reporter-htmlextra` | Generate styled HTML report           |
| `newman-reporter-csv`     | Add CSV output support to Newman       |
| `csv-writer`              | Create custom CSV result files         |
| `path`                    | Node.js module for file paths          |

---

## ✅ Use Cases

- ✅ Nightly regression tests
- ✅ CI/CD pipeline test validation
- ✅ Manual API test runs with reports
- ✅ Shareable test reports for team or clients

---

## 👤 Author

**Mike EJ Redondo**  
📍 Barangay Laurel, Tanauan City, Batangas  
📧 redondomikej@gmail.com

---

## 🧠 Notes

- JSON/CSV test data files must include:
  - `scenario`
  - `expected_result`
  - For POST tests: `payload_Data`
- Ensure Postman variables like `{base_url}` and `{end_point}` are properly set in the collection

---

## 📨 Contact

Need help or want to improve the framework?  
Feel free to contribute, fork, or contact the author directly.

---
