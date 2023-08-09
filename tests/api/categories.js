import http from "k6/http";
import { sleep } from "k6";

export default function () {
  http.get("https://kysely-poc.pages.dev/api/categories");
  sleep(1);
}
