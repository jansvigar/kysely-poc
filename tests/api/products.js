import http from "k6/http";
import { sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export default function () {
  http.get("https://kysely-poc.pages.dev/api/products");
  sleep(1);
}

export function handleSummary(data) {
  return {
    "tests/api/products_load_test_summary.html": htmlReport(data),
  };
}
