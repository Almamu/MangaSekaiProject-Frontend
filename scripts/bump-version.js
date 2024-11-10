const fs = require("fs");

const contents = fs.readFileSync("app.version.json", "utf8");
const version = JSON.parse(contents);

if (typeof version !== "number") {
  throw new Error(
    "app.version.json doesn't contain a number to increment. Bailing out...!"
  );
}

fs.writeFileSync("app.version.json", JSON.stringify(version + 1));
