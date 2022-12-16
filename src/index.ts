import * as fs from "fs";

async function loadSongs() {
  return await JSON.parse(
    (await fs.promises.readFile("data/songs.json")).toString()
  );
}

loadSongs().then((songs) => console.log(songs));
