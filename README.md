
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
