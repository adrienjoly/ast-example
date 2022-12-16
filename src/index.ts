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

async function getSongs(): Promise<Song[]> {
  return loadSongs(); // TODO: cache for speed optimization
}

(async () => {
  console.time("first call");
  await getSongs();
  console.timeEnd("first call");

  console.time("second call");
  await getSongs();
  console.timeEnd("second call");
})();
