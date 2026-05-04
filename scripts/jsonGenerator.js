import fs from "node:fs";

const JSON_FOLDER = "./.json";

try {
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify([]));
} catch (err) {
  console.error(err);
}
