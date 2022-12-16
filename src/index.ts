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

async function getSongs(): Promise<Song[]> {
  if (!loadedSongs) loadedSongs = loadSongs(); // lazy caching, for speed optimization
  return loadedSongs;
}

(async () => {
  console.time("first call");
  await getSongs();
  console.timeEnd("first call");

  console.time("second call");
  await getSongs();
  console.timeEnd("second call");
})();
