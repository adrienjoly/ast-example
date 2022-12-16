import * as fs from "fs";

type Song = {
  name: string;
};

async function loadSongs(): Promise<Song[]> {
  return await JSON.parse(
    (await fs.promises.readFile("data/songs.json")).toString()
  ).map((songFromFile: Song) => ({
    name: songFromFile.name,
  }));
}

let loadedSongs: Promise<Song[]> | undefined;

/** @deprecated */
async function getSongs(): Promise<Song[]> {
  if (!loadedSongs) loadedSongs = loadSongs(); // lazy caching, for speed optimization
  return loadedSongs;
}

(async () => {
  console.log(await getSongs());
})();
