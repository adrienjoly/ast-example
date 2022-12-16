import * as fs from "fs";

fs.readFile("src/index.ts", (err, data) => {
  console.log(data.toString());
});
